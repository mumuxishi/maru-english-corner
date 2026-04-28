// ===== SVG 图标工具 =====
const SVG = {
  icon(name, cls = 'icon') {
    const paths = {
      check: '<polyline points="20 6 9 17 4 12"/>',
      cross: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      flame: '<path d="M12 2c0 4-3 6-3 10a3 3 0 0 0 6 0c0-4-3-6-3-10z"/><path d="M12 22c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-5l1 3c.5-1 1-2.5 1-4 0 3 1.5 5 3.5 5.5"/><path d="M17 16c0 3.5-2.5 6-5 6"/>',
      gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3L8 9l4 13"/><path d="M13 3l3 6-4 13"/><path d="M2 9h20"/>',
      trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.58 7 21"/><path d="M15 16l2 7"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.359 3.593.618 7.255 2.445 10.025a3.89 3.89 0 0 0 3.288 1.685c1.033 0 1.983-.49 2.616-1.32L12 17.5l1.949 2.48a3.39 3.39 0 0 0 2.616 1.32 3.89 3.89 0 0 0 3.288-1.685c1.827-2.77 2.804-6.432 2.445-10.025A4 4 0 0 0 17.32 5z"/>',
      rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.5-.6 1.17-1.33 1.5-2L4.5 16.5z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
      lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.9.27-1.46.27-2A5.5 5.5 0 0 0 5.5 9.5 5.5 5.5 0 0 0 12 15c1.2 0 2.3-.4 3.18-1.07"/><path d="M12 2v1"/><path d="M12 15v3"/><path d="M4.22 4.22l.71.71"/><path d="M19.07 4.22l-.71.71"/>',
      leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.6C11.3 4.5 14 3 17 3c3 0 5.5 1.5 7 3.5-2.5 2-4 5-4 7.5 0 3.5-2 6.5-5 8-3 1.5-6 1-8-.5z"/><path d="M11 20v4"/><path d="M11 14c-2.5 2-5 2.5-7 1.5"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      puzzle: '<path d="M19 11h-1.7c0 .7-.2 1.4-.6 2l1.1 1.1a2.5 2.5 0 1 1-3.5 3.5l-1.1-1.1c-.6.4-1.3.6-2 .6V19a2.5 2.5 0 1 1-5 0v-1.7c-.7 0-1.4-.2-2-.6l-1.1 1.1a2.5 2.5 0 1 1-3.5-3.5l1.1-1.1c-.4-.6-.6-1.3-.6-2H2a2.5 2.5 0 1 1 0-5h1.7c0-.7.2-1.4.6-2L3.2 3.2a2.5 2.5 0 1 1 3.5-3.5l1.1 1.1c.6-.4 1.3-.6 2-.6V2a2.5 2.5 0 1 1 5 0v1.7c.7 0 1.4.2 2 .6l1.1-1.1a2.5 2.5 0 1 1 3.5 3.5l-1.1 1.1c.4.6.6 1.3.6 2H19a2.5 2.5 0 1 1 0 5z"/>',
      speaker: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
      lightning: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
      arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    };
    const p = paths[name] || '';
    const strokeW = name === 'check' ? '3' : '2.2';
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  }
};

// ===== 应用状态 =====
const AppState = {
  currentPage: 'home',
  currentRoot: 'spect',
  currentWordIndex: 0,
  learnedWords: new Set(JSON.parse(localStorage.getItem('learnedWords') || '[]')),
  totalPoints: parseInt(localStorage.getItem('totalPoints') || '0'),
  studyTime: parseInt(localStorage.getItem('studyTime') || '0'),
  gameActive: false,
  gameScore: 0,
  gameTimer: null,
  gameTimeLeft: 0,
  streak: parseInt(localStorage.getItem('streak') || '3'),
  startTime: Date.now(),
  user: null,
  serverStats: null,
  isOnline: true
};

// ===== 核心应用对象 =====
const app = {
  // 页面导航
  goTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.bottom-nav-item').forEach(l => l.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('active');
    document.querySelector(`.bottom-nav-item[data-page="${page}"]`)?.classList.add('active');
    AppState.currentPage = page;
    
    if (page === 'home') this.renderHome();
    if (page === 'learn') this.initLearn();
    if (page === 'games') this.exitGame();
    window.scrollTo(0, 0);
  },

  
// ===== 初始化 =====
  async init() {
    // 检查登录状态
    if (AuthAPI.isLoggedIn()) {
      try {
        const data = await AuthAPI.me();
        AppState.user = data.user;
        AppState.serverStats = data.stats;
        this.renderUserArea();
        // 从服务器获取已学单词
        const learned = await WordsAPI.getLearnedWords();
        if (learned && learned.learned) {
          learned.learned.forEach(w => AppState.learnedWords.add(w));
        }
        // 同步服务器统计到本地
        if (data.stats) {
          AppState.totalPoints = Math.max(AppState.totalPoints, data.stats.total_points || 0);
          AppState.streak = Math.max(AppState.streak, data.stats.streak || 0);
          AppState.studyTime = Math.max(AppState.studyTime, data.stats.study_time || 0);
        }
        // 刷新本地存储
        this.saveLocalStats();
      } catch (err) {
        console.log('Auto-login failed:', err);
        AuthAPI.logout();
      }
    }
    this.renderHome();
  },

  saveLocalStats() {
    localStorage.setItem('learnedWords', JSON.stringify([...AppState.learnedWords]));
    localStorage.setItem('totalPoints', AppState.totalPoints);
    localStorage.setItem('streak', AppState.streak);
    localStorage.setItem('studyTime', AppState.studyTime);
  },

  // ===== 用户认证 UI =====
  renderUserArea() {
    const area = document.getElementById('user-area');
    if (AppState.user) {
      area.innerHTML = `
        <div class="user-info">
          <div class="user-avatar">${(AppState.user.nickname || AppState.user.username).charAt(0).toUpperCase()}</div>
          <span class="user-name">${AppState.user.nickname || AppState.user.username}</span>
          <button class="user-menu-btn" onclick="app.logout()" title="退出">${SVG.icon('arrowLeft', 'icon')}</button>
        </div>
      `;
    } else {
      area.innerHTML = `<button class="btn btn-small btn-primary" onclick="app.showAuthModal()">登录</button>`;
    }
  },

  showAuthModal(tab) {
    document.getElementById('auth-modal').style.display = 'flex';
    document.getElementById('auth-error').textContent = '';
    this.clearFieldErrors();
    if (tab) this.switchAuthTab(tab);
    setTimeout(function() {
      var visibleForm = tab === 'register' ? 'register-form' : 'login-form';
      var firstInput = document.querySelector('#' + visibleForm + ' input');
      if (firstInput) firstInput.focus();
    }, 100);
  },

  hideAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    this.clearFieldErrors();
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    var pwStrength = document.getElementById('pwd-strength');
    if (pwStrength) pwStrength.innerHTML = '';
  },

  switchAuthTab(tab) {
    document.querySelectorAll('.modal-tab').forEach(function(t) { t.classList.remove('active'); });
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('auth-error').textContent = '';
    this.clearFieldErrors();
  },

  clearFieldErrors() {
    document.querySelectorAll('.field-error').forEach(function(el) { el.textContent = ''; });
    document.querySelectorAll('.modal-input').forEach(function(el) { el.classList.remove('input-error'); });
  },

  setFieldError(id, message) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = message;
      var input = el.closest('.form-field')?.querySelector('.modal-input');
      if (input) input.classList.add('input-error');
    }
  },

  setBtnLoading(btnId, loading) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent;
      btn.innerHTML = '<span class="spinner"></span>处理中...';
    } else {
      btn.disabled = false;
      btn.textContent = btn.dataset.originalText || (btnId === 'login-btn' ? '登录' : '创建账号');
    }
  },

  togglePassword(btn) {
    var input = btn.parentElement.querySelector('input');
    if (input.type === 'password') {
      input.type = 'text';
      btn.title = '隐藏密码';
    } else {
      input.type = 'password';
      btn.title = '显示密码';
    }
  },

  checkPasswordStrength(password) {
    var el = document.getElementById('pwd-strength');
    if (!el) return;
    if (!password) { el.innerHTML = ''; return; }
    var score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    var labels = ['太短', '弱', '一般', '不错', '强', '很强'];
    var colors = ['#FF4B4B', '#FF4B4B', '#FF9600', '#FFC800', '#58CC02', '#1CB0F6'];
    var widths = ['20%', '40%', '60%', '70%', '85%', '100%'];
    var idx = Math.min(score, 5);
    el.innerHTML = '<div class="strength-bar"><div class="strength-fill" style="width:' + widths[idx] + ';background:' + colors[idx] + '"></div></div><span class="strength-label" style="color:' + colors[idx] + '">' + labels[idx] + '</span>';
  },

  validateUsername(username) {
    if (!username) return '用户名不能为空';
    if (username.length < 3) return '用户名至少3个字符';
    if (username.length > 20) return '用户名最多20个字符';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return '仅支持字母、数字和下划线';
    return '';
  },

  validatePassword(password) {
    if (!password) return '密码不能为空';
    if (password.length < 6) return '密码至少6位';
    return '';
  },



  async handleLogin(e) {
    e.preventDefault();
    var form = e.target;
    var errorEl = document.getElementById('auth-error');
    this.clearFieldErrors();
    errorEl.textContent = '';
    var username = form.username.value.trim();
    var password = form.password.value;
    var uErr = this.validateUsername(username);
    if (uErr) { this.setFieldError('login-username-error', uErr); return; }
    var pErr = this.validatePassword(password);
    if (pErr) { this.setFieldError('login-password-error', pErr); return; }
    this.setBtnLoading('login-btn', true);
    try {
      var data = await AuthAPI.login(username, password);
      AppState.user = data.user;
      AppState.serverStats = data.stats;
      this.hideAuthModal();
      this.renderUserArea();
      this.renderHome();
      this.showToast('欢迎回来，' + (data.user.nickname || data.user.username) + '！');
      SyncQueue.flush();
    } catch (err) {
      errorEl.textContent = err.message || '登录失败，请检查用户名和密码';
    } finally {
      this.setBtnLoading('login-btn', false);
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    var form = e.target;
    var errorEl = document.getElementById('auth-error');
    this.clearFieldErrors();
    errorEl.textContent = '';
    var username = form.username.value.trim();
    var password = form.password.value;
    var nickname = form.nickname.value.trim();
    var uErr = this.validateUsername(username);
    if (uErr) { this.setFieldError('reg-username-error', uErr); return; }
    var pErr = this.validatePassword(password);
    if (pErr) { this.setFieldError('reg-password-error', pErr); return; }
    this.setBtnLoading('register-btn', true);
    try {
      var data = await AuthAPI.register(username, password, nickname);
      AppState.user = data.user;
      AppState.serverStats = data.stats;
      this.hideAuthModal();
      this.renderUserArea();
      this.renderHome();
      this.showToast('欢迎加入，' + (data.user.nickname || data.user.username) + '！');
      SyncQueue.flush();
    } catch (err) {
      errorEl.textContent = err.message || '注册失败，用户名可能已被使用';
    } finally {
      this.setBtnLoading('register-btn', false);
    }
  },

  logout() {
    if (!confirm('确定要退出登录吗？')) return;
    AuthAPI.logout();
    AppState.user = null;
    AppState.serverStats = null;
    this.renderUserArea();
    this.renderHome();
    this.showToast('已退出登录');
  },

  // ===== 首页 =====
  renderHome() {
    const learnedCount = AppState.learnedWords.size;
    const totalWords = WORD_DATA.length;
    const accuracy = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;
    const studyMinutes = Math.floor((Date.now() - AppState.startTime) / 60000) + AppState.studyTime;
    
    document.getElementById('learned-count').textContent = learnedCount;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('study-time').textContent = studyMinutes;
    document.getElementById('total-points').textContent = AppState.totalPoints;
    document.getElementById('streak').textContent = AppState.streak;

    // 渲染推荐词根
    const showcase = document.getElementById('root-showcase');
    const roots = getAllRoots();
    const shuffled = [...roots].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    showcase.innerHTML = shuffled.map(root => {
      const info = ROOT_DATA[root];
      const words = getWordsByRoot(root).slice(0, 4);
      return `
        <div class="root-item" onclick="app.goTo('learn'); app.selectRoot('${root}')" style="border-left-color: ${info.color}">
          <div class="root-name" style="color: ${info.color}">${root}</div>
          <div class="root-meaning">${info.meaning}</div>
          <div class="root-words">
            ${words.map(w => `<span class="root-word-tag">${w.word}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  // ===== 词根学习 =====
  initLearn() {
    this.renderRootList();
    this.selectRoot(AppState.currentRoot);
  },

  renderRootList() {
    const list = document.getElementById('root-list');
    const roots = getAllRoots().sort((a, b) => a.localeCompare(b));
    list.innerHTML = roots.map((root, index) => {
      const info = ROOT_DATA[root];
      const count = getWordsByRoot(root).length;
      return `
        <button class="root-btn ${root === AppState.currentRoot ? 'active' : ''}" 
                onclick="app.selectRoot('${root}')">
          <span class="root-serial" style="opacity:0.4;font-size:11px;margin-right:2px;min-width:18px;display:inline-block;text-align:right;">${index + 1}.</span>
          <span class="root-color-dot" style="background: ${info.color}"></span>
          ${root} <span style="opacity:0.5;font-size:12px">(${count})</span>
        </button>
      `;
    }).join('');
  },

  selectRoot(root) {
    AppState.currentRoot = root;
    AppState.currentWordIndex = 0;
    
    document.querySelectorAll('.root-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim().startsWith(root));
    });
    
    this.renderWordCard();
  },

  renderWordCard() {
    const words = getWordsByRoot(AppState.currentRoot);
    const word = words[AppState.currentWordIndex];
    if (!word) return;

    document.getElementById('word-index').textContent = `${AppState.currentWordIndex + 1} / ${words.length}`;
    document.getElementById('word-main').textContent = word.word;
    document.getElementById('word-phonetic').textContent = word.phonetic;
    document.getElementById('word-meaning').textContent = word.meaning;

    // 拆解
    const partsEl = document.getElementById('breakdown-parts');
    let partsHTML = '';
    word.breakdown.forEach((part, i) => {
      const typeClass = part.type;
      partsHTML += `
        <div class="part-item ${typeClass}">
          <div class="part-type">${part.type === 'prefix' ? '前缀' : part.type === 'root' ? '词根' : '后缀'}</div>
          <div class="part-text">${part.part}</div>
          <div class="part-meaning">${part.meaning}</div>
        </div>
      `;
      if (i < word.breakdown.length - 1) {
        partsHTML += `<span class="part-plus">+</span>`;
      }
    });
    partsHTML += `<span class="part-equals">=</span><div class="part-item" style="background:#f0f0f0;color:#333"><div class="part-type">单词</div><div class="part-text">${word.word}</div><div class="part-meaning">${word.meaning}</div></div>`;
    partsEl.innerHTML = partsHTML;

    // 词根信息
    const rootInfo = ROOT_DATA[word.root];
    document.getElementById('root-info').innerHTML = `
      <span class="root-tag" style="background: ${rootInfo.color}">${word.root}</span>
      <span class="root-desc">${rootInfo.meaning}（${rootInfo.origin}）</span>
    `;

    // 例句
    const examplesEl = document.getElementById('examples-list');
    examplesEl.innerHTML = word.examples.map(ex => `
      <div class="example-item">
        <div class="example-en">${this.highlightWord(ex.en, word.word)}</div>
        <div class="example-cn">${ex.cn}</div>
      </div>
    `).join('');

    // 词根家族
    const rootInfo2 = ROOT_DATA[word.root];
    const familyList = rootInfo2.family || [];
    const familyEl = document.getElementById('family-list');
    familyEl.innerHTML = familyList.map(fw => `
      <span class="family-tag ${fw === word.word ? 'current' : ''}" 
            onclick="app.goToFamilyWord('${fw}')" 
            title="${fw === word.word ? '当前单词' : '点击查看'}">${fw}</span>
    `).join('');
    document.getElementById('family-count').textContent = 
      `该词根共有 ${familyList.length} 个相关单词，${getWordsByRoot(word.root).length} 个已收录详细学习数据`;
  },

  goToFamilyWord(word) {
    const wordData = getWord(word);
    if (wordData) {
      this.selectRoot(wordData.root);
      const words = getWordsByRoot(wordData.root);
      const idx = words.findIndex(w => w.word === word);
      AppState.currentWordIndex = idx >= 0 ? idx : 0;
      this.renderWordCard();
    } else {
      this.showToast(`"${word}" 尚未收录详细学习数据`);
    }
  },

  highlightWord(sentence, word) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return sentence.replace(regex, `<strong style="color:var(--primary)">${word}</strong>`);
  },

  prevWord() {
    const words = getWordsByRoot(AppState.currentRoot);
    AppState.currentWordIndex = (AppState.currentWordIndex - 1 + words.length) % words.length;
    this.renderWordCard();
  },

  nextWord() {
    const words = getWordsByRoot(AppState.currentRoot);
    AppState.currentWordIndex = (AppState.currentWordIndex + 1) % words.length;
    this.renderWordCard();
  },

  speakWord() {
    const words = getWordsByRoot(AppState.currentRoot);
    const word = words[AppState.currentWordIndex];
    if (word && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  },

  async markLearned() {
    const words = getWordsByRoot(AppState.currentRoot);
    const word = words[AppState.currentWordIndex];
    if (word) {
      AppState.learnedWords.add(word.word);
      this.saveLocalStats();
      
      // 同步到后端
      if (AuthAPI.isLoggedIn()) {
        try {
          await WordsAPI.markLearned(word.word);
          await ProgressAPI.addPoints(10, 'learn_word', { word: word.word });
        } catch (err) {
          SyncQueue.add('learn_word', { word: word.word });
          SyncQueue.add('add_points', { points: 10 });
        }
      }
      
      AppState.totalPoints += 10;
      this.saveLocalStats();
      this.showToast(`已学会 "${word.word}"，+10分！`);
      this.nextWord();
    }
  },

  // ===== 趣味游戏 =====
  startGame(type) {
    AppState.gameActive = true;
    AppState.gameScore = 0;
    document.getElementById('game-score').textContent = '0';
    document.querySelector('.games-menu').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-timer').textContent = '';

    if (type === 'root-match') this.startRootMatch();
    if (type === 'memory') this.startMemory();
    if (type === 'speed') this.startSpeed();
  },

  exitGame() {
    AppState.gameActive = false;
    if (AppState.gameTimer) clearInterval(AppState.gameTimer);
    document.querySelector('.games-menu').style.display = 'grid';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('game-content').innerHTML = '';
  },

  // 词根拼图游戏
  startRootMatch() {
    this.nextRootMatchQuestion();
  },

  nextRootMatchQuestion() {
    const word = WORD_DATA[Math.floor(Math.random() * WORD_DATA.length)];
    const parts = word.breakdown.map(b => b.part);
    const shuffled = [...parts].sort(() => 0.5 - Math.random());

    const content = document.getElementById('game-content');
    content.innerHTML = `
      <div class="puzzle-game">
        <div class="puzzle-target">请用下方部件拼出单词：<strong>${word.meaning}</strong></div>
        <div class="puzzle-slots" id="puzzle-slots">
          ${parts.map((_, i) => `<div class="puzzle-slot" data-index="${i}"></div>`).join('')}
        </div>
        <div class="puzzle-pieces" id="puzzle-pieces">
          ${shuffled.map((part, i) => `
            <div class="puzzle-piece-draggable" data-part="${part}" onclick="app.placePuzzlePiece(this)">${part}</div>
          `).join('')}
        </div>
      </div>
    `;
    AppState.currentPuzzleWord = word;
    AppState.placedParts = [];
  },

  placePuzzlePiece(el) {
    const part = el.dataset.part;
    const slots = document.querySelectorAll('.puzzle-slot');
    
    for (const slot of slots) {
      if (!slot.classList.contains('filled')) {
        slot.textContent = part;
        slot.classList.add('filled');
        slot.dataset.placed = part;
        el.classList.add('placed');
        AppState.placedParts.push(part);
        break;
      }
    }

    const allFilled = Array.from(slots).every(s => s.classList.contains('filled'));
    if (allFilled) {
      const placed = Array.from(slots).map(s => s.dataset.placed).join('');
      const correct = AppState.currentPuzzleWord.word;
      
      setTimeout(() => {
        const isCorrect = correct.includes(placed) || placed === correct ||
          AppState.currentPuzzleWord.breakdown.every(b => placed.includes(b.part));
        
        if (isCorrect || placed === correct.replace(/-/g, '')) {
          AppState.gameScore += 20;
          document.getElementById('game-score').textContent = AppState.gameScore;
          AppState.totalPoints += 20;
          this.saveLocalStats();
          this.syncPoints(20, 'root_match', { word: AppState.currentPuzzleWord.word });
          this.showToast('拼图正确！+20分');
          confettiEffect();
        } else {
          this.showToast(`正确答案是 ${correct}`);
        }
        setTimeout(() => this.nextRootMatchQuestion(), 1500);
      }, 300);
    }
  },

  // 记忆翻牌游戏
  startMemory() {
    const selected = getRandomWords(6);
    const cards = [];
    selected.forEach(w => {
      cards.push({ type: 'word', text: w.word, pair: w.word });
      cards.push({ type: 'meaning', text: w.meaning, pair: w.word });
    });
    const shuffled = cards.sort(() => 0.5 - Math.random());

    const content = document.getElementById('game-content');
    content.innerHTML = `
      <div class="memory-game">
        <div class="memory-grid" id="memory-grid">
          ${shuffled.map((card, i) => `
            <div class="memory-card" data-index="${i}" data-pair="${card.pair}" onclick="app.flipCard(this)">
              <svg class="icon" style="width:28px;height:28px;color:white"><use href="#icon-leaf"/></svg>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    AppState.memoryCards = shuffled;
    AppState.flippedCards = [];
    AppState.matchedPairs = 0;
  },

  flipCard(el) {
    if (el.classList.contains('flipped') || el.classList.contains('matched')) return;
    if (AppState.flippedCards.length >= 2) return;

    const index = parseInt(el.dataset.index);
    const card = AppState.memoryCards[index];
    
    el.classList.add('flipped');
    el.textContent = card.text;
    el.style.fontSize = card.type === 'word' ? '20px' : '14px';
    AppState.flippedCards.push({ el, pair: card.pair });

    if (AppState.flippedCards.length === 2) {
      const [c1, c2] = AppState.flippedCards;
      if (c1.pair === c2.pair) {
        setTimeout(() => {
          c1.el.classList.add('matched');
          c2.el.classList.add('matched');
          AppState.flippedCards = [];
          AppState.matchedPairs++;
          AppState.gameScore += 15;
          document.getElementById('game-score').textContent = AppState.gameScore;
          AppState.totalPoints += 15;
          this.saveLocalStats();
          this.syncPoints(15, 'memory_match', { word: c1.pair });
          this.showToast('匹配成功！+15分');
          
          if (AppState.matchedPairs >= 6) {
            setTimeout(() => this.showGameOver('记忆翻牌完成！'), 800);
          }
        }, 600);
      } else {
        setTimeout(() => {
          c1.el.classList.remove('flipped');
          c1.el.innerHTML = '<svg class="icon" style="width:28px;height:28px;color:white"><use href="#icon-leaf"/></svg>';
          c1.el.style.fontSize = '28px';
          c2.el.classList.remove('flipped');
          c2.el.innerHTML = '<svg class="icon" style="width:28px;height:28px;color:white"><use href="#icon-leaf"/></svg>';
          c2.el.style.fontSize = '28px';
          AppState.flippedCards = [];
        }, 1000);
      }
    }
  },

  // 极速词根游戏
  startSpeed() {
    AppState.gameTimeLeft = 60;
    document.getElementById('game-timer').textContent = '60s';
    
    AppState.gameTimer = setInterval(() => {
      AppState.gameTimeLeft--;
      document.getElementById('game-timer').textContent = AppState.gameTimeLeft + 's';
      if (AppState.gameTimeLeft <= 0) {
        clearInterval(AppState.gameTimer);
        this.showGameOver('时间到！');
      }
    }, 1000);

    this.nextSpeedQuestion();
  },

  nextSpeedQuestion() {
    const rootKeys = getAllRoots();
    const root = rootKeys[Math.floor(Math.random() * rootKeys.length)];
    const correctWords = getWordsByRoot(root);
    const correct = correctWords[Math.floor(Math.random() * correctWords.length)];
    
    const distractors = WORD_DATA
      .filter(w => w.root !== root)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [correct, ...distractors].sort(() => 0.5 - Math.random());

    const content = document.getElementById('game-content');
    content.innerHTML = `
      <div class="speed-game">
        <div class="speed-question">
          哪个单词包含词根 <span class="root-hint">${root}</span>（${ROOT_DATA[root].meaning.split('/')[0].trim()}）？
        </div>
        <div class="speed-options">
          ${options.map(opt => `
            <button class="speed-option" onclick="app.checkSpeedAnswer('${opt.word}', '${correct.word}')">
              <div style="font-size:20px;font-weight:700;margin-bottom:4px">${opt.word}</div>
              <div style="font-size:13px;color:var(--text-light)">${opt.meaning}</div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    AppState.currentSpeedCorrect = correct.word;
  },

  checkSpeedAnswer(selected, correct) {
    if (selected === correct) {
      const timeBonus = Math.max(1, AppState.gameTimeLeft);
      const points = 10 + Math.floor(timeBonus / 10);
      AppState.gameScore += points;
      document.getElementById('game-score').textContent = AppState.gameScore;
      AppState.totalPoints += points;
      this.saveLocalStats();
      this.syncPoints(points, 'speed_quiz', { word: correct });
      this.showToast(`正确！+${points}分`);
    } else {
      this.showToast(`正确答案是 ${correct}`);
    }
    this.nextSpeedQuestion();
  },

  async syncPoints(points, activityType, details) {
    if (AuthAPI.isLoggedIn()) {
      try {
        await ProgressAPI.addPoints(points, activityType, details);
      } catch (err) {
        SyncQueue.add('add_points', { points, activityType, details });
      }
    }
  },

  showGameOver(title) {
    if (AppState.gameTimer) clearInterval(AppState.gameTimer);
    
    const modal = document.createElement('div');
    modal.className = 'game-over-overlay';
    modal.innerHTML = `
      <div class="game-over-modal">
        <div class="modal-icon"><svg class="icon" style="width:64px;height:64px;color:var(--duo-yellow)"><use href="#icon-trophy"/></svg></div>
        <div class="modal-title">${title}</div>
        <div class="modal-score">${AppState.gameScore}</div>
        <div class="modal-desc">总分已保存，继续加油！</div>
        <button class="btn btn-primary" onclick="app.closeGameOver()">再玩一次</button>
        <button class="btn btn-outline" style="margin-left:12px" onclick="app.exitGame(); app.closeGameOver();">返回菜单</button>
      </div>
    `;
    document.body.appendChild(modal);
    confettiEffect();
  },

  closeGameOver() {
    document.querySelector('.game-over-overlay')?.remove();
    const timerText = document.getElementById('game-timer').textContent;
    const currentGame = timerText.includes('s') ? 'speed' : 
                        document.querySelector('.memory-grid') ? 'memory' : 'root-match';
    if (currentGame === 'speed') this.startSpeed();
    else if (currentGame === 'memory') this.startMemory();
    else this.startRootMatch();
  },

  // ===== 排行榜 =====
  async showLeaderboard() {
    document.getElementById('leaderboard-modal').style.display = 'flex';
    const listEl = document.getElementById('leaderboard-list');
    listEl.innerHTML = '<div style="text-align:center;padding:40px">加载中...</div>';
    
    try {
      const data = await ProgressAPI.getLeaderboard(20);
      const board = data.leaderboard || [];
      
      if (board.length === 0) {
        listEl.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light)">暂无数据</div>';
        return;
      }
      
      listEl.innerHTML = board.map((item, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'normal';
        const isMe = AppState.user && item.id === AppState.user.id;
        return `
          <div class="lb-item" style="${isMe ? 'background:rgba(74,144,217,0.08)' : ''}">
            <div class="lb-rank ${rankClass}">${i + 1}</div>
            <div class="lb-info">
              <div class="lb-name">${item.nickname || item.username} ${isMe ? '<span style="color:var(--primary);font-size:12px">(你)</span>' : ''}</div>
              <div class="lb-meta">${item.word_count || 0} 单词 · ${item.streak || 0} 天连击</div>
            </div>
            <div class="lb-score">${item.total_points || 0}</div>
          </div>
        `;
      }).join('');
    } catch (err) {
      listEl.innerHTML = '<div style="text-align:center;padding:40px;color:var(--danger)">加载失败</div>';
    }
  },

  hideLeaderboard() {
    document.getElementById('leaderboard-modal').style.display = 'none';
  },

  // ===== 工具函数 =====
  showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
};

// ===== 庆祝粒子效果 =====
function confettiEffect() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#58CC02', '#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF', '#FF9600'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      life: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      if (p.life > 0) {
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= 0.015;
        
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (alive) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animate();
}

// ===== 导航事件绑定 =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    app.goTo(link.dataset.page);
  });
});

// ===== 初始化 =====
window.addEventListener('DOMContentLoaded', function() {
  app.init();
  var regPwd = document.querySelector('#register-form input[name="password"]');
  if (regPwd) {
    regPwd.addEventListener('input', function() { app.checkPasswordStrength(this.value); });
  }
});

// 定期保存学习时间
setInterval(() => {
  const minutes = Math.floor((Date.now() - AppState.startTime) / 60000);
  localStorage.setItem('studyTime', AppState.studyTime + minutes);
}, 60000);
