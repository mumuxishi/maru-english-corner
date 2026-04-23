const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername, findUserById, getUserStats } = require('../models/db');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, password, nickname } = req.body;
    if (!username || !password) return res.status(400).json({ error: '用户名和密码不能为空' });
    if (username.length < 3 || username.length > 20) return res.status(400).json({ error: '用户名长度为 3-20 个字符' });
    if (password.length < 6) return res.status(400).json({ error: '密码长度至少 6 位' });

    const existing = await findUserByUsername(username);
    if (existing) return res.status(409).json({ error: '用户名已存在' });

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUser(username, passwordHash, nickname);
    const token = generateToken(userId);

    res.json({ success: true, token, user: { id: userId, username, nickname: nickname || username } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: '注册失败' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: '用户名和密码不能为空' });

    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ error: '用户名或密码错误' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: '用户名或密码错误' });

    const token = generateToken(user.id);
    const stats = await getUserStats(user.id);

    res.json({ success: true, token, user: { id: user.id, username: user.username, nickname: user.nickname || user.username }, stats: stats || { total_points: 0, streak: 0, study_time: 0 } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: '登录失败' });
  }
});

// 获取当前用户信息
router.get('/me', require('../middleware/auth').authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.userId);
    const stats = await getUserStats(req.userId);
    if (!user) return res.status(404).json({ error: '用户不存在' });
    res.json({ user, stats: stats || { total_points: 0, streak: 0, study_time: 0 } });
  } catch (err) {
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

module.exports = router;
