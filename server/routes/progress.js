const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getUserStats, updateUserStats, setUserStats,
  addStudyRecord, getStudyRecords, getLeaderboard, markWordLearned
} = require('../models/db');

const router = express.Router();

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await getUserStats(req.userId);
    if (!stats) return res.json({ total_points: 0, streak: 0, study_time: 0, last_study_date: null });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: '获取统计失败' });
  }
});

router.post('/sync', authMiddleware, async (req, res) => {
  try {
    const { learned_words, total_points, streak, study_time, last_study_date } = req.body;
    if (Array.isArray(learned_words)) {
      for (const word of learned_words) await markWordLearned(req.userId, word);
    }
    const updates = {};
    if (total_points !== undefined) updates.total_points = total_points;
    if (streak !== undefined) updates.streak = streak;
    if (study_time !== undefined) updates.study_time = study_time;
    if (last_study_date !== undefined) updates.last_study_date = last_study_date;
    if (Object.keys(updates).length > 0) await setUserStats(req.userId, updates);
    await addStudyRecord(req.userId, 'sync', { learned_count: learned_words?.length || 0 }, 0);
    const stats = await getUserStats(req.userId);
    res.json({ success: true, stats });
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ error: '同步失败' });
  }
});

router.post('/add-points', authMiddleware, async (req, res) => {
  try {
    const { points, activity_type, details } = req.body;
    if (!points || points <= 0) return res.status(400).json({ error: '积分必须为正数' });
    await updateUserStats(req.userId, { total_points: points });
    await addStudyRecord(req.userId, activity_type || 'activity', details || {}, points);
    const stats = await getUserStats(req.userId);
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ error: '添加积分失败' });
  }
});

router.post('/update-streak', authMiddleware, async (req, res) => {
  try {
    const { streak, last_study_date } = req.body;
    const updates = {};
    if (streak !== undefined) updates.streak = streak;
    if (last_study_date !== undefined) updates.last_study_date = last_study_date;
    await setUserStats(req.userId, updates);
    const stats = await getUserStats(req.userId);
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ error: '更新失败' });
  }
});

router.get('/records', authMiddleware, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const records = await getStudyRecords(req.userId, limit);
    res.json({ records: records.map(r => ({ ...r, details: r.details ? JSON.parse(r.details) : null })) });
  } catch (err) {
    res.status(500).json({ error: '获取记录失败' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const board = await getLeaderboard(limit);
    res.json({ leaderboard: board });
  } catch (err) {
    res.status(500).json({ error: '获取排行榜失败' });
  }
});

module.exports = router;
