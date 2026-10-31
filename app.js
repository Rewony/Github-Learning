// GitMaster Akademi: Ana Uygulama Mantığı (3.3 Müfredat Destekli)
class App {
  constructor() {
    this.engine = new GitEngine();
    this.visualizer = new GitVisualizer('visualizer-container');
    this.currentMode = 'practice'; // 'learn' | 'guide' | 'practice' | 'sandbox'
    this.currentChallengeIndex = 0;
    this.currentTopicIndex = 0;
    this.currentGuideIndex = 0;
    this.historyIndex = -1;
    this.completedChallenges = new Set(this.loadProgress());

    this.initDOM();
    this.bindEvents();
    this.initLevel(0);
    this.renderTopicsMenu();
    this.renderTopicsContent(0);
    this.renderGuideMenu();
    this.renderGuideContent(0);
    this.updateProgressUI();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('gitmaster_completed_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('gitmaster_completed_v2', JSON.stringify(Array.from(this.completedChallenges)));
    } catch (e) {}
  }

  initDOM() {
    this.termOutput = document.getElementById('terminal-output');
    this.termInput = document.getElementById('terminal-input');
    this.termPrompt = document.getElementById('terminal-prompt');
    this.levelsContainer = document.getElementById('levels-list');
    this.challengeStory = document.getElementById('challenge-story');
    this.challengeTitle = document.getElementById('challenge-title');
    this.challengeBadge = document.getElementById('challenge-badge');
    this.challengeGoals = document.getElementById('challenge-goals');
    this.progressBar = document.getElementById('overall-progress-bar');
    this.progressText = document.getElementById('overall-progress-text');

    this.engine.onChange(() => {
      this.visualizer.render(this.engine);
      this.updatePrompt();
      this.checkLevelGoals();
    });
  }

  bindEvents() {
    this.termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = this.termInput.value;
        this.termInput.value = '';
        this.executeCommand(val);
        this.historyIndex = -1;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const hist = this.engine.history;
        if (hist.length > 0) {
          if (this.historyIndex === -1) {
            this.historyIndex = hist.length - 1;
          } else if (this.historyIndex > 0) {
            this.historyIndex--;
          }
          this.termInput.value = hist[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const hist = this.engine.history;
        if (this.historyIndex !== -1) {
          if (this.historyIndex < hist.length - 1) {
            this.historyIndex++;
            this.termInput.value = hist[this.historyIndex] || '';
          } else {
            this.historyIndex = -1;
            this.termInput.value = '';
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleAutocomplete();
      }
    });

    document.getElementById('terminal-container').addEventListener('click', () => {
      this.termInput.focus();
    });

    document.getElementById('tab-practice').addEventListener('click', () => this.switchMode('practice'));
    document.getElementById('tab-learn').addEventListener('click', () => this.switchMode('learn'));
    document.getElementById('tab-guide').addEventListener('click', () => this.switchMode('guide'));
    document.getElementById('tab-sandbox').addEventListener('click', () => this.switchMode('sandbox'));

    document.getElementById('btn-cheatsheet').addEventListener('click', () => {
      document.getElementById('cheatsheet-modal').classList.remove('hidden');
    });
    document.getElementById('close-cheatsheet').addEventListener('click', () => {
      document.getElementById('cheatsheet-modal').classList.add('hidden');
    });

    document.getElementById('btn-hint').addEventListener('click', () => this.showHintModal());
    document.getElementById('btn-solution').addEventListener('click', () => this.showSolutionModal());
    document.getElementById('btn-reset-level').addEventListener('click', () => {
      this.initLevel(this.currentChallengeIndex);
      this.printTerminalLine(`<span class="text-amber-400">↺ Seviye sıfırlandı.</span>`, 'info');
    });

    window.inspectCommit = (commitId) => this.showCommitDetails(commitId);
  }

  updatePrompt() {
    const curBranch = this.engine.getCurrentBranch();
    const branchDisplay = curBranch ? `<span class="text-emerald-400">(${curBranch})</span>` : `<span class="text-amber-400">(${this.engine.HEAD.id || 'no-branch'})</span>`;
    this.termPrompt.innerHTML = `<span class="text-cyan-400 font-bold">${this.engine.config.userName.toLowerCase()}@github</span>:<span class="text-blue-400">~/proje</span> ${branchDisplay}$`;
  }

  handleAutocomplete() {
    const current = this.termInput.value.trim();
    const common = [
      'git config --global user.name ""',
      'git config --list',
      'git init',
      'git clone',
      'git status',
      'git add .',
      'git rm',
      'git rm --cached',
      'git commit -m ""',
      'git diff',
      'git diff --staged',
      'git branch',
      'git checkout -b',
      'git switch',
      'git merge',
      'git log --oneline',
      'git remote add origin',
      'git push -u origin main',
      'git pull origin main',
      'git fetch'
    ];

    const match = common.find(cmd => cmd.startsWith(current));
    if (match) {
      this.termInput.value = match;
    }
  }

  executeCommand(cmdStr) {
    if (!cmdStr.trim()) return;

    const curBranch = this.engine.getCurrentBranch() || 'detached';
    this.printTerminalLine(`
      <div class="flex items-center gap-2 text-slate-400 font-mono text-xs">
        <span class="text-cyan-400">${this.engine.config.userName.toLowerCase()}@github</span>:<span class="text-blue-400">~/proje</span> <span>(${curBranch})$</span>
        <span class="text-white font-semibold">${cmdStr}</span>
      </div>
    `);

    const res = this.engine.execute(cmdStr);

    if (res.type === 'clear') {
      this.termOutput.innerHTML = '';
      return;
    }

    if (res.output) {
      this.printTerminalLine(`<div class="font-mono text-xs whitespace-pre-wrap leading-relaxed mt-1 mb-2">${res.output}</div>`);
    }

    this.termOutput.scrollTop = this.termOutput.scrollHeight;
    this.checkLevelGoals(cmdStr);
  }

  printTerminalLine(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.termOutput.appendChild(div);
  }

  switchMode(mode) {
    this.currentMode = mode;
    const tabPractice = document.getElementById('tab-practice');
    const tabLearn = document.getElementById('tab-learn');
    const tabGuide = document.getElementById('tab-guide');
    const tabSandbox = document.getElementById('tab-sandbox');

    const panelPractice = document.getElementById('panel-practice');
    const panelLearn = document.getElementById('panel-learn');
    const panelGuide = document.getElementById('panel-guide');

    [tabPractice, tabLearn, tabGuide, tabSandbox].forEach(btn => {
      if (btn) btn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white";
    });

    panelPractice.classList.add('hidden');
    panelLearn.classList.add('hidden');
    if (panelGuide) panelGuide.classList.add('hidden');

    if (mode === 'practice') {
      tabPractice.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      panelPractice.classList.remove('hidden');
    } else if (mode === 'learn') {
      tabLearn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
      panelLearn.classList.remove('hidden');
    } else if (mode === 'guide') {
      if (tabGuide) tabGuide.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
      if (panelGuide) panelGuide.classList.remove('hidden');
    } else if (mode === 'sandbox') {
      tabSandbox.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30";
      panelPractice.classList.remove('hidden');
      this.startSandboxMode();
    }
  }

  startSandboxMode() {
    this.challengeTitle.innerText = "Serbest Çalışma Laboratuvarı (Sandbox)";
    this.challengeBadge.innerText = "Serbest Mod";
    this.challengeBadge.className = "px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30";
    this.challengeStory.innerHTML = `
      Bu modda hiçbir müfredat kısıtlaması yoktur! Dilediğiniz gibi dallar (<code class="text-purple-300">git branch</code>) açabilir, commitler atabilir, birleştirmeler (<code class="text-purple-300">git merge</code>) yapabilir ve yukarıdaki canlı commit ağacının nasıl tepki verdiğini özgürce deneyimleyebilirsiniz.
    `;
    this.challengeGoals.innerHTML = `
      <div class="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl text-xs text-purple-200">
        ✨ <strong>Öneri Denemeler:</strong><br>
        • <code class="text-white">git checkout -b feature</code> ile yeni dal açın ve commit atın.<br>
        • <code class="text-white">git checkout main</code> ile geri dönüp <code class="text-white">git merge feature</code> deneyin.
      </div>
    `;
    this.printTerminalLine(`<span class="text-purple-400 font-bold">★ Serbest Çalışma Moduna geçildi. İstediğiniz Git komutunu deneyebilirsiniz!</span>`);
  }

  initLevel(index) {
    if (index < 0 || index >= GIT_CHALLENGES.length) return;
    this.currentChallengeIndex = index;
    const ch = GIT_CHALLENGES[index];

    ch.setup(this.engine);
    this.visualizer.render(this.engine);
    this.updatePrompt();

    this.challengeTitle.innerText = `${ch.levelNumber}. ${ch.title}`;
    this.challengeBadge.innerText = ch.badge;
    this.challengeStory.innerText = ch.story;

    this.renderLevelList();
    this.renderGoals(ch);

    this.printTerminalLine(`
      <div class="border-t border-b border-slate-800 py-2 my-2 text-xs">
        <span class="text-emerald-400 font-bold">--- SEVİYE ${ch.levelNumber} [${ch.curriculumCode}]: ${ch.title} ---</span><br>
        <span class="text-slate-400">${ch.story}</span>
      </div>
    `);
  }

  renderLevelList() {
    this.levelsContainer.innerHTML = '';
    GIT_CHALLENGES.forEach((ch, idx) => {
      const isCurrent = idx === this.currentChallengeIndex;
      const isDone = this.completedChallenges.has(ch.id);

      const btn = document.createElement('button');
      btn.className = `w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
        isCurrent 
          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold shadow-lg shadow-emerald-500/5' 
          : isDone
            ? 'bg-slate-900/60 border-emerald-500/20 text-slate-300 hover:bg-slate-800/80'
            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/60'
      }`;

      btn.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-md ${isDone ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-[10px]">
            ${isDone ? '✓' : ch.levelNumber}
          </span>
          <span class="truncate max-w-[170px]">${ch.title}</span>
        </div>
        <span class="text-[9.5px] uppercase font-bold px-1.5 py-0.5 rounded ${
          isDone ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-500'
        }">${ch.badge}</span>
      `;

      btn.addEventListener('click', () => {
        this.switchMode('practice');
        this.initLevel(idx);
      });

      this.levelsContainer.appendChild(btn);
    });
  }

  renderGoals(ch) {
    this.challengeGoals.innerHTML = '';
    ch.goals.forEach(g => {
      const isPassed = g.check(this.engine);
      const div = document.createElement('div');
      div.id = `goal-box-${g.id}`;
      div.className = `p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
        isPassed 
          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
          : 'bg-slate-900/80 border-slate-800 text-slate-400'
      }`;

      div.innerHTML = `
        <span class="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
          isPassed ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700 bg-slate-800 text-transparent'
        }">✓</span>
        <div class="text-xs font-medium leading-relaxed">${g.label}</div>
      `;
      this.challengeGoals.appendChild(div);
    });
  }

  checkLevelGoals(lastCmd = '') {
    if (this.currentMode !== 'practice') return;
    const ch = GIT_CHALLENGES[this.currentChallengeIndex];
    if (!ch) return;

    let allPassed = true;
    ch.goals.forEach(g => {
      const passed = g.check(this.engine, lastCmd);
      const el = document.getElementById(`goal-box-${g.id}`);
      if (el) {
        if (passed) {
          el.className = "p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 bg-emerald-950/20 border-emerald-500/40 text-emerald-300";
          el.querySelector('span').className = "w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 bg-emerald-500 text-slate-950";
        }
      }
      if (!passed) allPassed = false;
    });

    if (allPassed && !this.completedChallenges.has(ch.id)) {
      this.completedChallenges.add(ch.id);
      this.saveProgress();
      this.updateProgressUI();
      this.renderLevelList();
      this.triggerCelebration(ch);
    }
  }

  updateProgressUI() {
    const total = GIT_CHALLENGES.length;
    const completed = this.completedChallenges.size;
    const pct = Math.round((completed / total) * 100);

    this.progressBar.style.width = `${pct}%`;
    this.progressText.innerText = `%${pct} Tamamlandı (${completed}/${total})`;
  }

  triggerCelebration(ch) {
    this.launchConfetti();

    const modal = document.getElementById('level-complete-modal');
    document.getElementById('complete-level-title').innerText = `Tebrikler! Seviye ${ch.levelNumber} Tamamlandı!`;
    document.getElementById('complete-level-desc').innerText = `"${ch.title}" [${ch.curriculumCode}] görevini başarıyla tamamladınız.`;

    const nextBtn = document.getElementById('btn-next-level');
    nextBtn.onclick = () => {
      modal.classList.add('hidden');
      if (this.currentChallengeIndex < GIT_CHALLENGES.length - 1) {
        this.initLevel(this.currentChallengeIndex + 1);
      } else {
        alert("🎉 TEBRİKLER! 3.3. Version Control Systems müfredatındaki tüm 11 seviyeyi başarıyla tamamladınız!");
      }
    };

    document.getElementById('btn-replay-level').onclick = () => {
      modal.classList.add('hidden');
      this.initLevel(this.currentChallengeIndex);
    };

    modal.classList.remove('hidden');
  }

  showHintModal() {
    const ch = GIT_CHALLENGES[this.currentChallengeIndex];
    if (!ch) return;

    const modal = document.getElementById('info-modal');
    document.getElementById('info-modal-title').innerHTML = `💡 İpuçları: Seviye ${ch.levelNumber} [${ch.curriculumCode}]`;
    document.getElementById('info-modal-content').innerHTML = `
      <ul class="space-y-2.5 text-xs text-slate-300">
        ${ch.hints.map(h => `<li class="flex items-start gap-2 bg-slate-900/90 p-3 rounded-lg border border-slate-800"><span class="text-amber-400">⚡</span><span>${h}</span></li>`).join('')}
      </ul>
    `;
    modal.classList.remove('hidden');
    document.getElementById('close-info-modal').onclick = () => modal.classList.add('hidden');
  }

  showSolutionModal() {
    const ch = GIT_CHALLENGES[this.currentChallengeIndex];
    if (!ch) return;

    const modal = document.getElementById('info-modal');
    document.getElementById('info-modal-title').innerHTML = `🎯 Çözüm Komutları [${ch.curriculumCode}]`;
    document.getElementById('info-modal-content').innerHTML = `
      <p class="text-xs text-slate-400 mb-3">Bu seviyeyi tamamlamak için terminale sırasıyla şu komutları girebilirsiniz:</p>
      <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-emerald-400 text-xs whitespace-pre-wrap">${ch.solution}</div>
      <button id="btn-auto-solve" class="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all">
        Komutları Benim İçin Çalıştır
      </button>
    `;
    modal.classList.remove('hidden');
    document.getElementById('close-info-modal').onclick = () => modal.classList.add('hidden');

    document.getElementById('btn-auto-solve').onclick = () => {
      modal.classList.add('hidden');
      const cmds = ch.solution.split('\n');
      cmds.forEach(c => this.executeCommand(c));
    };
  }

  showCommitDetails(commitId) {
    const c = this.engine.commits[commitId];
    if (!c) return;

    const modal = document.getElementById('info-modal');
    document.getElementById('info-modal-title').innerHTML = `Commit Detayı: <span class="font-mono text-cyan-400">${c.id}</span>`;
    document.getElementById('info-modal-content').innerHTML = `
      <div class="space-y-3 text-xs">
        <div class="flex justify-between border-b border-slate-800 pb-2">
          <span class="text-slate-400">Mesaj:</span>
          <span class="text-white font-semibold">${c.msg}</span>
        </div>
        <div class="flex justify-between border-b border-slate-800 pb-2">
          <span class="text-slate-400">Yazar:</span>
          <span class="text-emerald-400 font-mono">${c.author || this.engine.config.userName}</span>
        </div>
        <div class="flex justify-between border-b border-slate-800 pb-2">
          <span class="text-slate-400">Oluşturulduğu Dal:</span>
          <span class="text-purple-400 font-mono">${c.branch}</span>
        </div>
        <div class="flex justify-between border-b border-slate-800 pb-2">
          <span class="text-slate-400">Ebeveynler (Parents):</span>
          <span class="text-amber-400 font-mono">${c.parents.length > 0 ? c.parents.join(', ') : 'Root commit'}</span>
        </div>
        <div class="flex justify-between border-b border-slate-800 pb-2">
          <span class="text-slate-400">Zaman:</span>
          <span class="text-slate-300 font-mono">${c.timestamp}</span>
        </div>
        <div>
          <span class="text-slate-400 block mb-1">Dahil Edilen Dosyalar:</span>
          <div class="flex flex-wrap gap-1.5">
            ${c.files.map(f => `<span class="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono text-[11px] text-slate-300">${f}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
    document.getElementById('close-info-modal').onclick = () => modal.classList.add('hidden');
  }

  renderTopicsMenu() {
    const list = document.getElementById('topics-menu-list');
    list.innerHTML = '';
    GIT_TOPICS.forEach((topic, idx) => {
      const isCur = idx === this.currentTopicIndex;
      const btn = document.createElement('button');
      btn.className = `w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
        isCur 
          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-bold' 
          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
      }`;

      btn.innerHTML = `
        <div class="flex items-center gap-1.5">
          <span class="text-cyan-400 text-[10px] font-mono font-bold">${topic.curriculumCode}</span>
          <span class="truncate max-w-[155px]">${topic.title.replace(topic.curriculumCode, '').trim()}</span>
        </div>
        <span class="text-[9.5px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-semibold">${topic.badge}</span>
      `;

      btn.addEventListener('click', () => {
        this.currentTopicIndex = idx;
        this.renderTopicsMenu();
        this.renderTopicsContent(idx);
      });

      list.appendChild(btn);
    });
  }

  renderTopicsContent(idx) {
    const topic = GIT_TOPICS[idx];
    if (!topic) return;

    const container = document.getElementById('topic-detail-area');
    container.innerHTML = `
      <div class="mb-4 pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/30">
            ${topic.curriculumCode} • ${topic.badge}
          </span>
          <h2 class="text-xl font-bold text-white mt-2">${topic.title}</h2>
          <p class="text-xs text-slate-400 mt-1">${topic.summary}</p>
        </div>
        ${topic.relatedChallengeId ? `
          <button id="btn-go-to-challenge" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-600/20">
            <span>Pratiğini Yap</span>
            <span>→</span>
          </button>
        ` : ''}
      </div>

      <div class="topic-body">
        ${topic.content}
      </div>
    `;

    const practiceBtn = document.getElementById('btn-go-to-challenge');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', () => {
        const targetIdx = GIT_CHALLENGES.findIndex(c => c.id === topic.relatedChallengeId);
        if (targetIdx !== -1) {
          this.switchMode('practice');
          this.initLevel(targetIdx);
        }
      });
    }

    const capstoneBtn = document.getElementById('btn-start-capstone-lab');
    if (capstoneBtn) {
      capstoneBtn.addEventListener('click', () => {
        const targetIdx = GIT_CHALLENGES.findIndex(c => c.id === 'c11');
        if (targetIdx !== -1) {
          this.switchMode('practice');
          this.initLevel(targetIdx);
        }
      });
    }
  }

  renderGuideMenu() {
    const list = document.getElementById('guide-menu-list');
    if (!list || typeof GIT_GUIDE_CHAPTERS === 'undefined') return;
    list.innerHTML = '';
    GIT_GUIDE_CHAPTERS.forEach((ch, idx) => {
      const isCur = idx === this.currentGuideIndex;
      const btn = document.createElement('button');
      btn.className = `w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
        isCur 
          ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300 font-bold' 
          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
      }`;

      btn.innerHTML = `
        <span class="truncate max-w-[190px]">${ch.title}</span>
        <span class="text-[9.5px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono">Bölüm ${idx + 1}</span>
      `;

      btn.addEventListener('click', () => {
        this.currentGuideIndex = idx;
        this.renderGuideMenu();
        this.renderGuideContent(idx);
      });

      list.appendChild(btn);
    });
  }

  renderGuideContent(idx) {
    const container = document.getElementById('guide-detail-area');
    if (!container || typeof GIT_GUIDE_CHAPTERS === 'undefined') return;
    const ch = GIT_GUIDE_CHAPTERS[idx];
    if (!ch) return;

    container.innerHTML = `
      <div class="mb-4 pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-500/30">
            Kapsamlı Rehber • Bölüm ${idx + 1}
          </span>
          <h2 class="text-xl font-bold text-white mt-2">${ch.title}</h2>
          <p class="text-xs text-slate-400 mt-1">${ch.summary}</p>
        </div>
      </div>

      <div class="guide-body">
        ${ch.html}
      </div>
    `;
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#10b981', '#38bdf8', '#a855f7', '#f59e0b', '#ec4899', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frames = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.rotation += p.vr;
        p.alpha -= 0.012;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frames++;
      if (frames < 90) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.gitApp = new App();
});
