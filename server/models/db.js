const { Pool } = require('pg');

// 判断是否有 PostgreSQL 连接
const usePg = !!process.env.DATABASE_URL;

let pool = null;
if (usePg) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
}

// 内存回退存储（本地开发无数据库时使用）
const memStore = {
  users: [],
  userStats: [],
  learnedWords: [],
  studyRecords: []
};

// 初始化数据库表
async function initDb() {
  if (!usePg) {
    console.log('[DB] 使用内存存储（本地开发模式）');
    return;
  }
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        nickname VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_stats (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        total_points INTEGER DEFAULT 0,
        streak INTEGER DEFAULT 0,
        study_time INTEGER DEFAULT 0,
        last_study_date TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS learned_words (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        word VARCHAR(100) NOT NULL,
        learned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, word)
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS study_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        activity_type VARCHAR(50),
        details TEXT,
        points INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('[DB] PostgreSQL 连接成功，表已初始化');
  } catch (err) {
    console.error('[DB] PostgreSQL 初始化失败，回退到内存存储:', err.message);
  }
}

initDb();

// ===== 用户相关 =====
async function createUser(username, passwordHash, nickname) {
  if (!usePg) {
    const id = Date.now();
    memStore.users.push({ id, username, password_hash: passwordHash, nickname: nickname || username, created_at: new Date().toISOString() });
    memStore.userStats.push({ user_id: id, total_points: 0, streak: 0, study_time: 0, last_study_date: null });
    return id;
  }
  const result = await pool.query(
    'INSERT INTO users (username, password_hash, nickname) VALUES ($1, $2, $3) RETURNING id',
    [username, passwordHash, nickname || username]
  );
  const userId = result.rows[0].id;
  await pool.query(
    'INSERT INTO user_stats (user_id, total_points, streak, study_time) VALUES ($1, 0, 0, 0)',
    [userId]
  );
  return userId;
}

async function findUserByUsername(username) {
  if (!usePg) return memStore.users.find(u => u.username === username);
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0] || null;
}

async function findUserById(id) {
  if (!usePg) {
    const user = memStore.users.find(u => u.id === id);
    if (!user) return null;
    const { password_hash, ...safe } = user;
    return safe;
  }
  const result = await pool.query('SELECT id, username, nickname, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// ===== 学习进度 =====
async function markWordLearned(userId, word) {
  if (!usePg) {
    const exists = memStore.learnedWords.find(l => l.user_id === userId && l.word === word);
    if (exists) return;
    memStore.learnedWords.push({ user_id: userId, word, learned_at: new Date().toISOString() });
    return;
  }
  try {
    await pool.query(
      'INSERT INTO learned_words (user_id, word) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, word]
    );
  } catch (err) {
    console.error('markWordLearned error:', err.message);
  }
}

async function getLearnedWords(userId) {
  if (!usePg) {
    return memStore.learnedWords
      .filter(l => l.user_id === userId)
      .sort((a, b) => new Date(b.learned_at) - new Date(a.learned_at));
  }
  const result = await pool.query(
    'SELECT * FROM learned_words WHERE user_id = $1 ORDER BY learned_at DESC',
    [userId]
  );
  return result.rows;
}

async function isWordLearned(userId, word) {
  if (!usePg) return memStore.learnedWords.some(l => l.user_id === userId && l.word === word);
  const result = await pool.query(
    'SELECT 1 FROM learned_words WHERE user_id = $1 AND word = $2 LIMIT 1',
    [userId, word]
  );
  return result.rows.length > 0;
}

// ===== 用户统计 =====
async function getUserStats(userId) {
  if (!usePg) return memStore.userStats.find(s => s.user_id === userId);
  const result = await pool.query('SELECT * FROM user_stats WHERE user_id = $1', [userId]);
  return result.rows[0] || null;
}

async function updateUserStats(userId, updates) {
  if (!usePg) {
    const stats = memStore.userStats.find(s => s.user_id === userId);
    if (!stats) return;
    if (updates.total_points !== undefined) stats.total_points = (stats.total_points || 0) + updates.total_points;
    if (updates.streak !== undefined) stats.streak = updates.streak;
    if (updates.study_time !== undefined) stats.study_time = (stats.study_time || 0) + updates.study_time;
    if (updates.last_study_date !== undefined) stats.last_study_date = updates.last_study_date;
    return;
  }
  const sets = [];
  const vals = [];
  let idx = 1;
  if (updates.total_points !== undefined) { sets.push(`total_points = total_points + $${idx++}`); vals.push(updates.total_points); }
  if (updates.streak !== undefined) { sets.push(`streak = $${idx++}`); vals.push(updates.streak); }
  if (updates.study_time !== undefined) { sets.push(`study_time = study_time + $${idx++}`); vals.push(updates.study_time); }
  if (updates.last_study_date !== undefined) { sets.push(`last_study_date = $${idx++}`); vals.push(updates.last_study_date); }
  if (sets.length === 0) return;
  vals.push(userId);
  await pool.query(`UPDATE user_stats SET ${sets.join(', ')} WHERE user_id = $${idx}`, vals);
}

async function setUserStats(userId, updates) {
  if (!usePg) {
    const stats = memStore.userStats.find(s => s.user_id === userId);
    if (!stats) return;
    for (const [key, val] of Object.entries(updates)) stats[key] = val;
    return;
  }
  const sets = [];
  const vals = [];
  let idx = 1;
  for (const [key, val] of Object.entries(updates)) {
    sets.push(`${key} = $${idx++}`);
    vals.push(val);
  }
  if (sets.length === 0) return;
  vals.push(userId);
  await pool.query(`UPDATE user_stats SET ${sets.join(', ')} WHERE user_id = $${idx}`, vals);
}

// ===== 学习记录 =====
async function addStudyRecord(userId, activityType, details, points) {
  const detailsStr = typeof details === 'string' ? details : JSON.stringify(details || {});
  if (!usePg) {
    memStore.studyRecords.push({
      id: Date.now(),
      user_id: userId,
      activity_type: activityType,
      details: detailsStr,
      points: points || 0,
      created_at: new Date().toISOString()
    });
    return;
  }
  await pool.query(
    'INSERT INTO study_records (user_id, activity_type, details, points) VALUES ($1, $2, $3, $4)',
    [userId, activityType, detailsStr, points || 0]
  );
}

async function getStudyRecords(userId, limit = 50) {
  if (!usePg) {
    return memStore.studyRecords
      .filter(r => r.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);
  }
  const result = await pool.query(
    'SELECT * FROM study_records WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
    [userId, limit]
  );
  return result.rows;
}

// ===== 排行榜 =====
async function getLeaderboard(limit = 20) {
  if (!usePg) {
    return memStore.userStats
      .map(s => {
        const user = memStore.users.find(u => u.id === s.user_id);
        const wordCount = memStore.learnedWords.filter(l => l.user_id === s.user_id).length;
        return {
          id: s.user_id,
          username: user?.username || 'unknown',
          nickname: user?.nickname || user?.username || 'unknown',
          total_points: s.total_points || 0,
          streak: s.streak || 0,
          study_time: s.study_time || 0,
          word_count: wordCount
        };
      })
      .sort((a, b) => b.total_points - a.total_points)
      .slice(0, limit);
  }
  const result = await pool.query(`
    SELECT 
      u.id, u.username, u.nickname,
      s.total_points, s.streak, s.study_time,
      (SELECT COUNT(*) FROM learned_words lw WHERE lw.user_id = u.id) as word_count
    FROM users u
    JOIN user_stats s ON u.id = s.user_id
    ORDER BY s.total_points DESC
    LIMIT $1
  `, [limit]);
  return result.rows;
}

module.exports = {
  db: pool,
  createUser,
  findUserByUsername,
  findUserById,
  markWordLearned,
  getLearnedWords,
  isWordLearned,
  getUserStats,
  updateUserStats,
  setUserStats,
  addStudyRecord,
  getStudyRecords,
  getLeaderboard
};
