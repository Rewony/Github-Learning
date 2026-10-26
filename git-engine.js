// GitEngine: Tarayıcı İçinde Çalışan Sanal Git Motoru (Genişletilmiş 3.3 Müfredat Destekli)
class GitEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.isInitialized = false;
    this.config = {
      userName: 'Developer',
      userEmail: 'dev@example.com'
    };
    this.commits = {}; // hash -> { id, parents: [], msg, timestamp, branch, files: [] }
    this.branches = {}; // name -> commitHash
    this.HEAD = { type: 'branch', name: 'main' }; // or { type: 'detached', id: hash }
    this.stagingArea = [];
    this.stagedDeletions = [];
    this.workingDir = [
      { name: 'index.html', status: 'untracked' },
      { name: 'style.css', status: 'untracked' },
      { name: 'app.py', status: 'untracked' },
      { name: 'README.md', status: 'untracked' }
    ];
    this.remotes = {}; // origin -> { url: '', branches: {} }
    this.commitCounter = 0;
    this.history = [];
    this.listeners = [];
  }

  onChange(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  generateHash() {
    this.commitCounter++;
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 4; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return `c${this.commitCounter}_${hash}`;
  }

  getCurrentBranch() {
    if (this.HEAD.type === 'branch') {
      return this.HEAD.name;
    }
    return null;
  }

  getCurrentCommitId() {
    if (this.HEAD.type === 'branch') {
      return this.branches[this.HEAD.name] || null;
    }
    return this.HEAD.id || null;
  }

  // Komut çalıştırma merkezi
  execute(cmdStr) {
    const raw = cmdStr.trim();
    if (!raw) return { output: '', type: 'empty' };

    this.history.push(raw);
    const parts = raw.split(/\s+/);
    const base = parts[0].toLowerCase();

    if (base === 'clear') {
      return { output: '', type: 'clear' };
    }

    if (base === 'help') {
      return { output: this.getHelpText(), type: 'info' };
    }

    if (base !== 'git') {
      return {
        output: `<span class="text-rose-400">Komut bulunamadı: '${base}'. Git komutları 'git' ile başlar. Yardım için: 'help'</span>`,
        type: 'error'
      };
    }

    const sub = parts[1] ? parts[1].toLowerCase() : '';
    const args = parts.slice(2);

    if (!sub) {
      return {
        output: `<span class="text-amber-300">Kullanım: git &lt;komut&gt; [seçenekler]\nTemel komutlar: config, init, clone, status, add, rm, commit, branch, checkout, switch, merge, diff, log, remote, push, pull</span>`,
        type: 'warning'
      };
    }

    // git config ve git clone init olmadan da çalışabilir
    if (sub === 'config') {
      return this.handleConfig(raw, args);
    }

    if (sub === 'clone') {
      return this.handleClone(args);
    }

    if (sub === 'init') {
      return this.handleInit(args);
    }

    if (!this.isInitialized) {
      return {
        output: `<span class="text-rose-400">fatal: not a git repository (veya üst dizinlerin hiçbiri): .git bulunamadı\nİpucu: Önce 'git init' komutu ile depo başlatın.</span>`,
        type: 'error'
      };
    }

    switch (sub) {
      case 'status':
        return this.handleStatus(args);
      case 'add':
        return this.handleAdd(args);
      case 'rm':
        return this.handleRm(args);
      case 'commit':
        return this.handleCommit(raw, args);
      case 'branch':
        return this.handleBranch(args);
      case 'checkout':
        return this.handleCheckout(args);
      case 'switch':
        return this.handleSwitch(args);
      case 'merge':
        return this.handleMerge(args);
      case 'diff':
        return this.handleDiff(args);
      case 'log':
        return this.handleLog(args);
      case 'remote':
        return this.handleRemote(args);
      case 'push':
        return this.handlePush(args);
      case 'pull':
        return this.handlePull(args);
      case 'fetch':
        return this.handleFetch(args);
      case 'reset':
        return this.handleReset(args);
      default:
        return {
          output: `<span class="text-rose-400">git: '${sub}' geçerli bir git komutu değil. 'help' yazarak kullanabileceğiniz komutları görebilirsiniz.</span>`,
          type: 'error'
        };
    }
  }

  handleConfig(rawStr, args) {
    if (rawStr.includes('user.name')) {
      const match = rawStr.match(/user\.name\s+["']?([^"']+)["']?/i);
      if (match) {
        this.config.userName = match[1].trim();
        return { output: `<span class="text-emerald-400">Kullanıcı adı yapılandırıldı: ${this.config.userName}</span>`, type: 'success' };
      }
    }
    if (rawStr.includes('user.email')) {
      const match = rawStr.match(/user\.email\s+["']?([^"']+)["']?/i);
      if (match) {
        this.config.userEmail = match[1].trim();
        return { output: `<span class="text-emerald-400">Kullanıcı e-postası yapılandırıldı: ${this.config.userEmail}</span>`, type: 'success' };
      }
    }
    if (rawStr.includes('--list') || rawStr.includes('-l')) {
      return {
        output: `<span class="text-slate-300 font-mono">user.name=${this.config.userName}\nuser.email=${this.config.userEmail}\ncore.repositoryformatversion=0\ncore.filemode=false\ncore.bare=false</span>`,
        type: 'info'
      };
    }
    return {
      output: `<span class="text-slate-300 font-mono">user.name=${this.config.userName}\nuser.email=${this.config.userEmail}</span>`,
      type: 'info'
    };
  }

  handleClone(args) {
    const url = args[0] || 'https://github.com/ornek/proje.git';
    this.reset();
    this.isInitialized = true;
    const c1 = this.generateHash();
    this.commits[c1] = {
      id: c1,
      parents: [],
      msg: "Initial commit from remote repository",
      timestamp: new Date().toLocaleTimeString(),
      branch: "main",
      files: ['index.html', 'README.md', 'app.py']
    };
    this.branches['main'] = c1;
    this.HEAD = { type: 'branch', name: 'main' };
    this.remotes['origin'] = { url: url, branches: { main: c1 } };
    this.notify();

    return {
      output: `<span class="text-emerald-400">Cloning into 'proje'...\nremote: Enumerating objects: 3, done.\nremote: Total 3 (delta 0), reused 3\nReceiving objects: 100% (3/3), done.\nUzak depo başarıyla klonlandı!</span>`,
      type: 'success'
    };
  }

  handleInit(args) {
    if (this.isInitialized) {
      return {
        output: `<span class="text-amber-300">Mevcut Git deposu yeniden başlatıldı. (.git/ dizini zaten mevcut)</span>`,
        type: 'info'
      };
    }
    this.isInitialized = true;
    this.branches['main'] = null;
    this.HEAD = { type: 'branch', name: 'main' };
    this.notify();
    return {
      output: `<span class="text-emerald-400">Boş bir Git deposu başlatıldı: ~/proje/.git/</span>\n<span class="text-slate-400">Varsayılan dal: <strong>main</strong></span>`,
      type: 'success'
    };
  }

  handleStatus(args) {
    let out = [];
    const curBranch = this.getCurrentBranch();
    if (curBranch) {
      out.push(`Dal üzerinde: <span class="text-emerald-400 font-bold">${curBranch}</span>`);
    } else {
      out.push(`HEAD ayrık konumda (detached): <span class="text-amber-400 font-bold">${this.HEAD.id}</span>`);
    }

    const curCommitId = this.getCurrentCommitId();
    if (!curCommitId) {
      out.push(`<span class="text-slate-500">Henüz hiçbir commit yok (Initial commit bekleniyor)</span>`);
    }

    // Sahnelenen eklemeler
    if (this.stagingArea.length > 0 || this.stagedDeletions.length > 0) {
      out.push(`\n<span class="text-emerald-400 font-semibold">Commit'lenecek değişiklikler (Staging Area):</span>`);
      out.push(`<span class="text-slate-500 text-xs">  (sahneden çıkarmak için "git restore --staged &lt;dosya&gt;...")</span>`);
      this.stagingArea.forEach(f => {
        out.push(`\t<span class="text-emerald-400">yeni dosya:   ${f}</span>`);
      });
      this.stagedDeletions.forEach(f => {
        out.push(`\t<span class="text-rose-400">silindi:      ${f}</span>`);
      });
    }

    const unstaged = this.workingDir.filter(f => f.status === 'untracked' && !this.stagingArea.includes(f.name));
    if (unstaged.length > 0) {
      out.push(`\n<span class="text-rose-400 font-semibold">İzlenmeyen dosyalar (Untracked files):</span>`);
      out.push(`<span class="text-slate-500 text-xs">  (commit'e dahil etmek için "git add &lt;dosya&gt;..." kullanın)</span>`);
      unstaged.forEach(f => {
        out.push(`\t<span class="text-rose-400">${f.name}</span>`);
      });
    }

    if (this.stagingArea.length === 0 && this.stagedDeletions.length === 0 && unstaged.length === 0) {
      out.push(`\n<span class="text-slate-400">Çalışma ağacı temiz (Working tree clean), commit edilecek bir şey yok.</span>`);
    }

    return { output: out.join('\n'), type: 'info' };
  }

  handleAdd(args) {
    if (!args || args.length === 0) {
      return {
        output: `<span class="text-rose-400">Hiçbir dosya belirtilmedi. Örnek: 'git add .' veya 'git add index.html'</span>`,
        type: 'error'
      };
    }

    const target = args[0];
    let addedCount = 0;

    if (target === '.' || target === '-A' || target === '*') {
      this.workingDir.forEach(f => {
        if (!this.stagingArea.includes(f.name)) {
          this.stagingArea.push(f.name);
          addedCount++;
        }
      });
    } else {
      const found = this.workingDir.find(f => f.name.toLowerCase() === target.toLowerCase());
      if (found) {
        if (!this.stagingArea.includes(found.name)) {
          this.stagingArea.push(found.name);
          addedCount++;
        }
      } else {
        this.workingDir.push({ name: target, status: 'untracked' });
        this.stagingArea.push(target);
        addedCount++;
      }
    }

    this.notify();
    return {
      output: `<span class="text-emerald-400">${addedCount} dosya sahneye (Staging Area) eklendi.</span>\n<span class="text-slate-400 text-xs">Durumu incelemek için 'git status' çalıştırabilirsiniz.</span>`,
      type: 'success'
    };
  }

  handleRm(args) {
    if (!args || args.length === 0) {
      return { output: `<span class="text-rose-400">Silinecek dosya belirtilmedi. Örnek: 'git rm dosya.txt' veya 'git rm --cached dosya.txt'</span>`, type: 'error' };
    }

    const isCached = args[0] === '--cached';
    const targetFile = isCached ? args[1] : args[0];

    if (!targetFile) {
      return { output: `<span class="text-rose-400">Hedef dosya belirtilmedi.</span>`, type: 'error' };
    }

    // Staging'den çıkar
    this.stagingArea = this.stagingArea.filter(f => f !== targetFile);

    if (isCached) {
      // Sadece git takibinden çıkar, diskte bırak
      return {
        output: `<span class="text-amber-400">rm '${targetFile}' (yalnızca Git sahne/takip alanından kaldırıldı, yerel diskte korundu).</span>`,
        type: 'warning'
      };
    } else {
      // Hem diskten hem takipten kaldır
      this.workingDir = this.workingDir.filter(f => f.name !== targetFile);
      this.stagedDeletions.push(targetFile);
      this.notify();
      return {
        output: `<span class="text-rose-400">rm '${targetFile}' (dosya diskten silindi ve silme işlemi sahnelendi).</span>`,
        type: 'success'
      };
    }
  }

  handleCommit(rawStr, args) {
    if (this.stagingArea.length === 0 && this.stagedDeletions.length === 0) {
      return {
        output: `<span class="text-rose-400">Değişiklik commit'lenemedi: Sahnelenmiş (staged) dosya yok.\nİpucu: Önce 'git add &lt;dosya&gt;' veya 'git add .' çalıştırın.</span>`,
        type: 'error'
      };
    }

    let msg = '';
    const matchQuote = rawStr.match(/-m\s+["']([^"']+)["']/i);
    const matchSimple = rawStr.match(/-m\s+([^\s]+)/i);

    if (matchQuote) {
      msg = matchQuote[1];
    } else if (matchSimple) {
      msg = matchSimple[1];
    } else {
      return {
        output: `<span class="text-rose-400">Hata: Commit mesajı zorunludur.\nKullanım: git commit -m "Anlamlı commit mesajı"</span>`,
        type: 'error'
      };
    }

    const parentId = this.getCurrentCommitId();
    const commitId = this.generateHash();
    const curBranch = this.getCurrentBranch();

    const commitObj = {
      id: commitId,
      parents: parentId ? [parentId] : [],
      msg: msg,
      author: `${this.config.userName} <${this.config.userEmail}>`,
      timestamp: new Date().toLocaleTimeString(),
      branch: curBranch || 'detached',
      files: [...this.stagingArea]
    };

    this.commits[commitId] = commitObj;

    if (curBranch) {
      this.branches[curBranch] = commitId;
    } else {
      this.HEAD.id = commitId;
    }

    const stagedCount = this.stagingArea.length + this.stagedDeletions.length;
    this.stagingArea = [];
    this.stagedDeletions = [];
    this.notify();

    return {
      output: `<span class="text-emerald-400">[${curBranch || 'detached'} ${commitId}] ${msg}</span>\n<span class="text-slate-400 text-xs"> ${stagedCount} dosya değişti, 1 commit oluşturuldu. (Author: ${this.config.userName})</span>`,
      type: 'success'
    };
  }

  handleBranch(args) {
    if (!args || args.length === 0) {
      const branchNames = Object.keys(this.branches);
      if (branchNames.length === 0) {
        return { output: `<span class="text-slate-400">Henüz hiçbir dal oluşturulmadı.</span>`, type: 'info' };
      }
      const cur = this.getCurrentBranch();
      const lines = branchNames.map(b => {
        if (b === cur) {
          return `<span class="text-emerald-400 font-bold">* ${b}</span>`;
        }
        return `  <span class="text-slate-300">${b}</span>`;
      });
      return { output: lines.join('\n'), type: 'info' };
    }

    if (args[0] === '-d' || args[0] === '-D') {
      const targetBranch = args[1];
      if (!targetBranch) {
        return { output: `<span class="text-rose-400">Silinecek dal adı belirtilmedi. Örnek: git branch -d feature</span>`, type: 'error' };
      }
      if (targetBranch === this.getCurrentBranch()) {
        return { output: `<span class="text-rose-400">Hata: Şu an üzerinde bulunduğunuz '${targetBranch}' dalını silemezsiniz! Önce başka dala geçin.</span>`, type: 'error' };
      }
      if (!this.branches[targetBranch]) {
        return { output: `<span class="text-rose-400">Hata: '${targetBranch}' isimli dal bulunamadı.</span>`, type: 'error' };
      }

      delete this.branches[targetBranch];
      this.notify();
      return { output: `<span class="text-emerald-400">Dal silindi: ${targetBranch}</span>`, type: 'success' };
    }

    const newBranch = args[0];
    if (this.branches[newBranch] !== undefined) {
      return { output: `<span class="text-rose-400">fatal: '${newBranch}' adında bir dal zaten mevcut.</span>`, type: 'error' };
    }

    const curCommit = this.getCurrentCommitId();
    this.branches[newBranch] = curCommit;
    this.notify();

    return {
      output: `<span class="text-emerald-400">'${newBranch}' dalı oluşturuldu.</span>\n<span class="text-slate-400 text-xs">Bu dala geçmek için: 'git checkout ${newBranch}' veya 'git switch ${newBranch}'</span>`,
      type: 'success'
    };
  }

  handleCheckout(args) {
    if (!args || args.length === 0) {
      return { output: `<span class="text-rose-400">Hedef dal veya commit belirtilmedi. Örnek: git checkout main</span>`, type: 'error' };
    }

    if (args[0] === '-b') {
      const newBranch = args[1];
      if (!newBranch) {
        return { output: `<span class="text-rose-400">Dal adı belirtilmedi. Örnek: git checkout -b feature-api</span>`, type: 'error' };
      }
      const curCommit = this.getCurrentCommitId();
      this.branches[newBranch] = curCommit;
      this.HEAD = { type: 'branch', name: newBranch };
      this.notify();
      return {
        output: `<span class="text-emerald-400">'${newBranch}' isimli yeni bir dala geçildi.</span>`,
        type: 'success'
      };
    }

    const target = args[0];

    if (this.branches[target] !== undefined) {
      this.HEAD = { type: 'branch', name: target };
      this.notify();
      return {
        output: `<span class="text-emerald-400">'${target}' dalına geçildi.</span>`,
        type: 'success'
      };
    }

    if (this.commits[target]) {
      this.HEAD = { type: 'detached', id: target };
      this.notify();
      return {
        output: `<span class="text-amber-400">Dikkat: '${target}' commit'ine detached HEAD konumunda geçildi.</span>`,
        type: 'warning'
      };
    }

    return {
      output: `<span class="text-rose-400">error: pathspec '${target}' eşleşen bir dal veya commit bulunamadı.</span>`,
      type: 'error'
    };
  }

  handleSwitch(args) {
    if (!args || args.length === 0) {
      return { output: `<span class="text-rose-400">Hedef dal belirtilmedi. Örnek: git switch main</span>`, type: 'error' };
    }

    if (args[0] === '-c') {
      return this.handleCheckout(['-b', args[1]]);
    }

    return this.handleCheckout(args);
  }

  handleMerge(args) {
    if (!args || args.length === 0) {
      return { output: `<span class="text-rose-400">Birleştirilecek dal belirtilmedi. Örnek: git merge feature-login</span>`, type: 'error' };
    }

    const sourceBranch = args[0];
    const curBranch = this.getCurrentBranch();

    if (!curBranch) {
      return { output: `<span class="text-rose-400">fatal: detached HEAD konumundayken merge yapılamaz. Önce bir dala geçin.</span>`, type: 'error' };
    }

    if (sourceBranch === curBranch) {
      return { output: `<span class="text-amber-400">Zaten '${curBranch}' dalındasınız. Bir dal kendi kendine birleştirilemez.</span>`, type: 'warning' };
    }

    const sourceCommitId = this.branches[sourceBranch];
    if (sourceCommitId === undefined) {
      return { output: `<span class="text-rose-400">merge: '${sourceBranch}' - böyle bir dal yok.</span>`, type: 'error' };
    }

    const curCommitId = this.branches[curBranch];

    if (!sourceCommitId) {
      return { output: `<span class="text-slate-400">'${sourceBranch}' dalında henüz hiçbir commit yok.</span>`, type: 'info' };
    }

    if (sourceCommitId === curCommitId) {
      return { output: `<span class="text-emerald-400">Already up to date. (Dallar zaten senkronize)</span>`, type: 'info' };
    }

    const isAncestor = this.isCommitAncestor(curCommitId, sourceCommitId);

    if (isAncestor) {
      // Fast-forward merge!
      this.branches[curBranch] = sourceCommitId;
      this.notify();
      return {
        output: `<span class="text-emerald-400">Updating ${curCommitId || '0000'}..${sourceCommitId}\nFast-forward merge başarılı!</span>\n<span class="text-slate-300 text-xs">${curBranch} dalı doğrudan en son commite ilerletildi.</span>`,
        type: 'success'
      };
    }

    // 3-Way Merge
    const mergeCommitId = this.generateHash();
    const mergeCommitObj = {
      id: mergeCommitId,
      parents: [curCommitId, sourceCommitId],
      msg: `Merge branch '${sourceBranch}' into ${curBranch}`,
      author: `${this.config.userName} <${this.config.userEmail}>`,
      timestamp: new Date().toLocaleTimeString(),
      branch: curBranch,
      files: ['merge-result']
    };

    this.commits[mergeCommitId] = mergeCommitObj;
    this.branches[curBranch] = mergeCommitId;
    this.notify();

    return {
      output: `<span class="text-emerald-400">Merge yapıldı: '${sourceBranch}' dalı '${curBranch}' içine birleştirildi.</span>\n<span class="text-cyan-300 text-xs">[${curBranch} ${mergeCommitId}] Merge branch '${sourceBranch}' into ${curBranch}</span>`,
      type: 'success'
    };
  }

  isCommitAncestor(possibleAncestor, targetCommit) {
    if (!possibleAncestor) return true;
    if (!targetCommit) return false;
    if (possibleAncestor === targetCommit) return true;

    let queue = [targetCommit];
    let visited = new Set();

    while (queue.length > 0) {
      const cId = queue.shift();
      if (visited.has(cId)) continue;
      visited.add(cId);

      const commit = this.commits[cId];
      if (!commit) continue;

      for (const p of commit.parents) {
        if (p === possibleAncestor) return true;
        queue.push(p);
      }
    }
    return false;
  }

  handleDiff(args) {
    const isStaged = args && (args.includes('--staged') || args.includes('--cached'));
    
    if (isStaged) {
      return {
        output: `<span class="text-slate-400 font-mono text-xs">diff --git a/app.py b/app.py
--- a/app.py
+++ b/app.py
<span class="text-cyan-400 font-bold">@@ -1,5 +1,6 @@</span>
 def run_service():
<span class="text-rose-400 font-bold">-    timeout = 30</span>
<span class="text-emerald-400 font-bold">+    timeout = 60</span>
<span class="text-emerald-400 font-bold">+    retries = 3</span>
     return True</span>`,
        type: 'info'
      };
    }

    return {
      output: `<span class="text-slate-400 font-mono text-xs">diff --git a/index.html b/index.html
index 83a21b..f42c19 100644
--- a/index.html
+++ b/index.html
<span class="text-cyan-400 font-bold">@@ -14,3 +14,5 @@</span>
 &lt;body&gt;
<span class="text-emerald-400 font-bold">+    &lt;h1&gt;DevNet Version Control Platformu&lt;/h1&gt;</span>
<span class="text-emerald-400 font-bold">+    &lt;p&gt;3.3 Modülü Başarıyla Yüklendi.&lt;/p&gt;</span>
 &lt;/body&gt;</span>`,
      type: 'info'
    };
  }

  handleLog(args) {
    const curCommitId = this.getCurrentCommitId();
    if (!curCommitId) {
      return { output: `<span class="text-slate-400">Henüz hiçbir commit geçmişi bulunmuyor.</span>`, type: 'info' };
    }

    let logs = [];
    let visited = new Set();
    let queue = [curCommitId];

    while (queue.length > 0) {
      const cId = queue.shift();
      if (!cId || visited.has(cId)) continue;
      visited.add(cId);

      const c = this.commits[cId];
      if (!c) continue;

      const branchPointers = [];
      for (const [bName, bCommit] of Object.entries(this.branches)) {
        if (bCommit === cId) {
          if (this.HEAD.type === 'branch' && this.HEAD.name === bName) {
            branchPointers.push(`<span class="text-cyan-400 font-bold">HEAD -> ${bName}</span>`);
          } else {
            branchPointers.push(`<span class="text-emerald-400">${bName}</span>`);
          }
        }
      }

      for (const [rName, rObj] of Object.entries(this.remotes)) {
        for (const [rbName, rbCommit] of Object.entries(rObj.branches)) {
          if (rbCommit === cId) {
            branchPointers.push(`<span class="text-rose-400">${rName}/${rbName}</span>`);
          }
        }
      }

      const pointersStr = branchPointers.length > 0 ? ` <span class="text-amber-300">(${branchPointers.join(', ')})</span>` : '';
      logs.push(`* <span class="text-amber-400 font-mono">${c.id}</span>${pointersStr} - <span class="text-white">${c.msg}</span> <span class="text-slate-500 text-xs">(${c.timestamp} - ${c.author || 'dev'})</span>`);

      if (c.parents) {
        c.parents.forEach(p => queue.push(p));
      }
    }

    return { output: logs.join('\n'), type: 'info' };
  }

  handleRemote(args) {
    if (!args || args.length === 0 || args[0] === '-v') {
      const keys = Object.keys(this.remotes);
      if (keys.length === 0) {
        return { output: `<span class="text-slate-400">Henüz hiçbir uzak depo (remote) yapılandırılmadı.</span>`, type: 'info' };
      }
      let lines = [];
      keys.forEach(k => {
        lines.push(`${k}\t${this.remotes[k].url} (fetch)`);
        lines.push(`${k}\t${this.remotes[k].url} (push)`);
      });
      return { output: lines.join('\n'), type: 'info' };
    }

    if (args[0] === 'add') {
      const remoteName = args[1];
      const remoteUrl = args[2];
      if (!remoteName || !remoteUrl) {
        return { output: `<span class="text-rose-400">Kullanım: git remote add &lt;isim&gt; &lt;url&gt;\nÖrnek: git remote add origin https://github.com/user/proje.git</span>`, type: 'error' };
      }
      this.remotes[remoteName] = { url: remoteUrl, branches: {} };
      this.notify();
      return { output: `<span class="text-emerald-400">Uzak depo eklendi: '${remoteName}' -> ${remoteUrl}</span>`, type: 'success' };
    }

    return { output: `<span class="text-rose-400">Bilinmeyen remote komutu. 'git remote add ...' veya 'git remote -v' kullanın.</span>`, type: 'error' };
  }

  handlePush(args) {
    const curBranch = this.getCurrentBranch();
    let remoteName = 'origin';
    let targetBranch = curBranch;

    const cleanArgs = args ? args.filter(a => a !== '-u') : [];
    if (cleanArgs.length >= 1) remoteName = cleanArgs[0];
    if (cleanArgs.length >= 2) targetBranch = cleanArgs[1];

    if (!this.remotes[remoteName]) {
      return { output: `<span class="text-rose-400">fatal: '${remoteName}' adında bir uzak depo yapılandırılmamış.\nİpucu: Önce 'git remote add origin https://github.com/...' komutunu çalıştırın.</span>`, type: 'error' };
    }

    const curCommitId = this.branches[targetBranch];
    if (!curCommitId) {
      return { output: `<span class="text-rose-400">Hata: '${targetBranch}' dalında henüz push edilecek bir commit yok.</span>`, type: 'error' };
    }

    this.remotes[remoteName].branches[targetBranch] = curCommitId;
    this.notify();

    return {
      output: `<span class="text-emerald-400">Yükleniyor -> ${this.remotes[remoteName].url}\n* [yeni dal]        ${targetBranch} -> ${targetBranch}\n'${targetBranch}' dalı başarıyla '${remoteName}' uzak deposuna gönderildi!</span>`,
      type: 'success'
    };
  }

  handlePull(args) {
    const remoteName = (args && args[0]) ? args[0] : 'origin';
    const curBranch = this.getCurrentBranch() || 'main';

    if (!this.remotes[remoteName]) {
      return { output: `<span class="text-rose-400">fatal: '${remoteName}' uzak deposu bulunamadı.</span>`, type: 'error' };
    }

    return {
      output: `<span class="text-emerald-400">${this.remotes[remoteName].url} adresinden güncel değişiklikler çekildi.\nUpdating... Already up to date.</span>`,
      type: 'info'
    };
  }

  handleFetch(args) {
    return {
      output: `<span class="text-emerald-400">remote: Enumerating objects: 4, done.\nremote: Total 4, reused 4\nTüm uzak dal referansları güncellendi.</span>`,
      type: 'info'
    };
  }

  handleReset(args) {
    if (!args || args.length === 0) {
      return { output: `<span class="text-rose-400">Kullanım: git reset [--soft|--hard] &lt;commit|HEAD~1&gt;</span>`, type: 'error' };
    }

    const mode = args[0] === '--hard' ? 'hard' : (args[0] === '--soft' ? 'soft' : 'mixed');
    const target = args[args.length - 1];
    const curBranch = this.getCurrentBranch();
    const curCommitId = this.getCurrentCommitId();

    if (!curCommitId) {
      return { output: `<span class="text-rose-400">Reset yapılabilecek bir commit yok.</span>`, type: 'error' };
    }

    let targetId = null;
    if (target === 'HEAD~1' || target === 'HEAD^') {
      const curObj = this.commits[curCommitId];
      if (curObj && curObj.parents && curObj.parents.length > 0) {
        targetId = curObj.parents[0];
      }
    } else if (this.commits[target]) {
      targetId = target;
    }

    if (!targetId) {
      return { output: `<span class="text-rose-400">Hedef commit bulunamadı.</span>`, type: 'error' };
    }

    if (curBranch) {
      this.branches[curBranch] = targetId;
    } else {
      this.HEAD.id = targetId;
    }

    if (mode === 'soft') {
      this.stagingArea = ['uncommitted-changes.js'];
    }

    this.notify();
    return {
      output: `<span class="text-amber-400">HEAD konumu ${targetId} commit'ine geri çekildi (${mode} mod).</span>`,
      type: 'warning'
    };
  }

  getHelpText() {
    return `
<span class="text-cyan-400 font-bold">Kullanılabilir Git Komutları (3.3 Modülü):</span>
  <span class="text-emerald-400">git config --global user.name "..."</span> : Kimlik yapılandırır
  <span class="text-emerald-400">git init</span>                            : Yeni yerel depo başlatır
  <span class="text-emerald-400">git clone &lt;url&gt;</span>                    : Uzak depoyu klonlar
  <span class="text-emerald-400">git status</span>                          : Durumu listeler
  <span class="text-emerald-400">git add &lt;dosya|. &gt;</span>                   : Dosyaları sahneye (Staging) ekler
  <span class="text-emerald-400">git rm &lt;dosya&gt; / git rm --cached</span>  : Dosyayı kaldırır / takipten çıkarır
  <span class="text-emerald-400">git commit -m "&lt;mesaj&gt;"</span>             : Sahnedeki dosyaları commit yapar
  <span class="text-emerald-400">git branch</span>                          : Dalları listeler
  <span class="text-emerald-400">git branch &lt;dal-adı&gt;</span>                : Yeni dal oluşturur
  <span class="text-emerald-400">git branch -d &lt;dal-adı&gt;</span>             : Dalı siler
  <span class="text-emerald-400">git checkout &lt;dal-adı&gt;</span>              : Belirtilen dala geçer
  <span class="text-emerald-400">git checkout -b &lt;dal&gt;</span>               : Yeni dal oluşturup hemen ona geçer
  <span class="text-emerald-400">git switch &lt;dal-adı&gt;</span>                : Dala geçer (Modern Git)
  <span class="text-emerald-400">git merge &lt;dal-adı&gt;</span>                 : Dalı birleştirir (Fast-forward / 3-way)
  <span class="text-emerald-400">git diff / git diff --staged</span>        : Değişiklik farklarını gösterir
  <span class="text-emerald-400">git log</span>                             : Commit geçmişini listeler
  <span class="text-emerald-400">git remote add origin &lt;url&gt;</span>         : Uzak GitHub deposu tanımlar
  <span class="text-emerald-400">git push -u origin &lt;dal&gt;</span>            : Uzak depoya gönderir
  <span class="text-emerald-400">git pull / git fetch</span>                : Uzak depodaki yenilikleri çeker
  <span class="text-emerald-400">git reset --soft/--hard</span>             : Geri alma işlemi
  <span class="text-emerald-400">clear</span>                               : Ekranı temizler
`;
  }
}
