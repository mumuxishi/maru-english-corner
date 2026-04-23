const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { getLearnedWords, markWordLearned, isWordLearned } = require('../models/db');
const { ROOT_DATA, WORD_DATA } = require('../../js/data.js');

const router = express.Router();

router.get('/roots', (req, res) => { res.json({ roots: ROOT_DATA }); });
router.get('/all', (req, res) => { res.json({ words: WORD_DATA }); });

router.get('/by-root/:root', (req, res) => {
  const words = WORD_DATA.filter(w => w.root === req.params.root);
  res.json({ words });
});

router.get('/random', (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 5, 20);
  const shuffled = [...WORD_DATA].sort(() => 0.5 - Math.random());
  res.json({ words: shuffled.slice(0, count) });
});

router.get('/:word', (req, res) => {
  const word = WORD_DATA.find(w => w.word === req.params.word);
  if (!word) return res.status(404).json({ error: '单词不存在' });
  res.json({ word });
});

router.post('/:word/learn', authMiddleware, async (req, res) => {
  try {
    await markWordLearned(req.userId, req.params.word);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '标记失败' });
  }
});

router.get('/user/learned', authMiddleware, async (req, res) => {
  try {
    const learned = await getLearnedWords(req.userId);
    res.json({ learned: learned.map(l => l.word) });
  } catch (err) {
    res.status(500).json({ error: '获取失败' });
  }
});

router.get('/:word/learned', authMiddleware, async (req, res) => {
  try {
    const learned = await isWordLearned(req.userId, req.params.word);
    res.json({ learned });
  } catch (err) {
    res.status(500).json({ error: '查询失败' });
  }
});

module.exports = router;
