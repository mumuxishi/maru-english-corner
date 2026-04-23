const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 请求日志
app.use((req, res, next) => {
  const time = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`[${time}] ${req.method} ${req.path}`);
  next();
});

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/words', require('./routes/words'));
app.use('/api/progress', require('./routes/progress'));

// 静态文件托管（前端）
app.use(express.static(path.join(__dirname, '..')));

// 所有非 API 请求返回前端入口
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log('=================================');
  console.log('🌱 词根词缀 - 英语单词学习网站');
  console.log('=================================');
  console.log(`📡 服务已启动: http://localhost:${PORT}`);
  console.log(`📁 数据库: ${path.join(__dirname, '../data/wordroot.db')}`);
  console.log('');
  console.log('API 端点:');
  console.log('  POST /api/auth/register    - 注册');
  console.log('  POST /api/auth/login       - 登录');
  console.log('  GET  /api/auth/me          - 获取当前用户');
  console.log('  GET  /api/words/roots      - 词根列表');
  console.log('  GET  /api/words/all        - 所有单词');
  console.log('  GET  /api/words/random     - 随机单词');
  console.log('  GET  /api/progress/stats   - 学习统计');
  console.log('  POST /api/progress/sync    - 同步进度');
  console.log('  GET  /api/progress/leaderboard - 排行榜');
  console.log('=================================');
});
