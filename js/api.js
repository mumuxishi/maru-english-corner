// ===== API 服务层 =====
const API_BASE = '';

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function apiFetch(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
  const headers = { ...getAuthHeaders(), ...(options.headers || {}) };
  
  try {
    const response = await fetch(fullUrl, { ...options, headers });
    const data = await response.json().catch(() => null);
    
    if (!response.ok) {
      throw new Error(data?.error || `HTTP ${response.status}`);
    }
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

// ===== 认证 API =====
const AuthAPI = {
  async register(username, password, nickname) {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, nickname })
    });
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  
  async login(username, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  
  async me() {
    return apiFetch('/api/auth/me');
  },
  
  logout() {
    clearToken();
  },
  
  isLoggedIn() {
    return !!getToken();
  },
  
  getUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }
};

// ===== 单词 API =====
const WordsAPI = {
  async getRoots() {
    return apiFetch('/api/words/roots');
  },
  
  async getAllWords() {
    return apiFetch('/api/words/all');
  },
  
  async getWordsByRoot(root) {
    return apiFetch(`/api/words/by-root/${root}`);
  },
  
  async getRandomWords(count = 5) {
    return apiFetch(`/api/words/random?count=${count}`);
  },
  
  async getWord(word) {
    return apiFetch(`/api/words/${word}`);
  },
  
  async markLearned(word) {
    if (!AuthAPI.isLoggedIn()) return null;
    return apiFetch(`/api/words/${word}/learn`, { method: 'POST' });
  },
  
  async getLearnedWords() {
    if (!AuthAPI.isLoggedIn()) return { learned: [] };
    return apiFetch('/api/words/user/learned');
  }
};

// ===== 进度 API =====
const ProgressAPI = {
  async getStats() {
    if (!AuthAPI.isLoggedIn()) return null;
    return apiFetch('/api/progress/stats');
  },
  
  async sync(data) {
    if (!AuthAPI.isLoggedIn()) return null;
    return apiFetch('/api/progress/sync', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  async addPoints(points, activityType, details) {
    if (!AuthAPI.isLoggedIn()) return null;
    return apiFetch('/api/progress/add-points', {
      method: 'POST',
      body: JSON.stringify({ points, activity_type: activityType, details })
    });
  },
  
  async getLeaderboard(limit = 20) {
    return apiFetch(`/api/progress/leaderboard?limit=${limit}`);
  }
};

// ===== 离线同步队列 =====
const SyncQueue = {
  add(type, data) {
    const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    queue.push({ type, data, time: Date.now() });
    localStorage.setItem('syncQueue', JSON.stringify(queue));
  },
  
  async flush() {
    if (!AuthAPI.isLoggedIn()) return;
    const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    if (queue.length === 0) return;
    
    try {
      const learnedWords = [];
      let totalPoints = 0;
      
      for (const item of queue) {
        if (item.type === 'learn_word') learnedWords.push(item.data.word);
        if (item.type === 'add_points') totalPoints += item.data.points;
      }
      
      await ProgressAPI.sync({ learned_words: learnedWords, total_points: totalPoints });
      localStorage.removeItem('syncQueue');
    } catch (err) {
      console.log('Sync failed, will retry later');
    }
  },
  
  getCount() {
    return JSON.parse(localStorage.getItem('syncQueue') || '[]').length;
  }
};

// 定期同步
setInterval(() => {
  if (AuthAPI.isLoggedIn() && SyncQueue.getCount() > 0) {
    SyncQueue.flush();
  }
}, 30000);
