// Visualizer: SVG Tabanlı Canlı Git Dal & Commit Ağacı Görselleştirici
class GitVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.colors = {
      main: '#10b981',       // Emerald
      feature: '#a855f7',    // Purple
      bugfix: '#f59e0b',     // Amber
      remote: '#38bdf8',     // Sky blue
      default: '#ec4899',    // Pink
      head: '#06b6d4',       // Cyan
      line: '#334155',       // Slate 700
      lineActive: '#64748b'  // Slate 500
    };
  }

  getBranchColor(branchName) {
    if (!branchName) return this.colors.default;
    const lower = branchName.toLowerCase();
    if (lower.includes('main') || lower.includes('master')) return this.colors.main;
    if (lower.includes('feat')) return this.colors.feature;
    if (lower.includes('bug') || lower.includes('fix')) return this.colors.bugfix;
    if (lower.includes('origin')) return this.colors.remote;
    return this.colors.default;
  }

  render(gitEngine) {
    if (!this.container) return;

    if (!gitEngine.isInitialized) {
      this.container.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center select-none">
          <div class="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-4 text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <p class="font-semibold text-slate-300 text-sm">Henüz Git Deposu Başlatılmadı</p>
          <p class="text-xs text-slate-500 mt-1 max-w-xs">Aşağıdaki terminale <code class="text-emerald-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">git init</code> yazarak deponuzu oluşturun.</p>
        </div>
      `;
      return;
    }

    const commitKeys = Object.keys(gitEngine.commits);
    if (commitKeys.length === 0) {
      this.container.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center select-none">
          <div class="w-16 h-16 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 animate-pulse">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" stroke-width="2"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v6m0 8v6"/>
            </svg>
          </div>
          <p class="font-semibold text-slate-300 text-sm">Depo Başlatıldı: Henüz Commit Yok</p>
          <p class="text-xs text-slate-500 mt-1 max-w-xs"><code class="text-emerald-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">git add .</code> ve <code class="text-emerald-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">git commit -m "ilk commit"</code> yazarak ilk düğümünüzü oluşturun!</p>
        </div>
      `;
      return;
    }

    // Graph Layout Hesaplama
    // Commitleri topological / chronological sıraya dizelim
    const sortedCommits = Object.values(gitEngine.commits);
    
    // Her commit'e bir sütun (X) ve satır (Y) atayalım
    // Ana dal Y=70, diğer dallar sırayla Y=130, Y=190, Y=250
    const branchLanes = {};
    let nextLane = 1;
    branchLanes['main'] = 0;

    // Dal isimleri ve satırları
    Object.keys(gitEngine.branches).forEach(b => {
      if (b !== 'main' && branchLanes[b] === undefined) {
        branchLanes[b] = nextLane++;
      }
    });

    const nodeCoords = {}; // commitId -> { x, y, color }
    const startX = 60;
    const stepX = 110;
    const laneHeight = 70;
    const baseLaneY = 65;

    sortedCommits.forEach((commit, index) => {
      const lane = branchLanes[commit.branch] !== undefined ? branchLanes[commit.branch] : 0;
      nodeCoords[commit.id] = {
        x: startX + index * stepX,
        y: baseLaneY + lane * laneHeight,
        color: this.getBranchColor(commit.branch)
      };
    });

    const totalWidth = Math.max(this.container.clientWidth || 600, startX + sortedCommits.length * stepX + 100);
    const totalHeight = Math.max(220, baseLaneY + (nextLane + 1) * laneHeight);

    // SVG Elementleri oluşturma
    let svgEdges = '';
    let svgNodes = '';
    let svgLabels = '';

    // Kenarları (Parent Bağlantılarını) Çiz
    sortedCommits.forEach(commit => {
      const childCoord = nodeCoords[commit.id];
      if (!childCoord) return;

      commit.parents.forEach(pId => {
        const parentCoord = nodeCoords[pId];
        if (!parentCoord) return;

        if (parentCoord.y === childCoord.y) {
          // Düz yatay çizgi
          svgEdges += `
            <line x1="${parentCoord.x}" y1="${parentCoord.y}" x2="${childCoord.x}" y2="${childCoord.y}" 
                  stroke="${childCoord.color}" stroke-width="3" stroke-linecap="round" opacity="0.8" />
          `;
        } else {
          // Yumuşak Bezier Eğrisi (Dal ayrılması veya merge birleşmesi)
          const midX = (parentCoord.x + childCoord.x) / 2;
          svgEdges += `
            <path d="M ${parentCoord.x} ${parentCoord.y} C ${midX} ${parentCoord.y}, ${midX} ${childCoord.y}, ${childCoord.x} ${childCoord.y}" 
                  fill="none" stroke="${childCoord.color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="none" opacity="0.85" />
          `;
        }
      });
    });

    // Düğümleri (Commit Çemberleri) Çiz
    sortedCommits.forEach(commit => {
      const coord = nodeCoords[commit.id];
      const isHeadCommit = (gitEngine.getCurrentCommitId() === commit.id);
      const isMerge = commit.parents && commit.parents.length > 1;

      // Glow ve dış halka
      const pulseRing = isHeadCommit ? `
        <circle cx="${coord.x}" cy="${coord.y}" r="22" fill="none" stroke="${this.colors.head}" stroke-width="2" opacity="0.6">
          <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
      ` : '';

      svgNodes += `
        <g class="cursor-pointer group" onclick="window.inspectCommit('${commit.id}')">
          ${pulseRing}
          <!-- Dış halka -->
          <circle cx="${coord.x}" cy="${coord.y}" r="16" fill="#0f172a" stroke="${coord.color}" stroke-width="${isHeadCommit ? '3.5' : '2.5'}" 
                  class="transition-all duration-200 group-hover:scale-110" />
          <!-- İç çekirdek -->
          <circle cx="${coord.x}" cy="${coord.y}" r="7" fill="${coord.color}" />
          ${isMerge ? `<circle cx="${coord.x}" cy="${coord.y}" r="3" fill="#ffffff" />` : ''}

          <!-- Hash Yazısı -->
          <text x="${coord.x}" y="${coord.y + 32}" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="monospace" font-weight="600">
            ${commit.id}
          </text>

          <!-- Hover Tooltip (SVG tabanlı) -->
          <title>${commit.id}: ${commit.msg} (${commit.timestamp})</title>
        </g>
      `;
    });

    // Dal Etiketleri & HEAD İşaretçilerini Çiz
    // Her commit'e bakan branch'leri gruplayalım
    const commitBadges = {}; // commitId -> array of badges

    // Yerel dallar
    for (const [bName, bCommit] of Object.entries(gitEngine.branches)) {
      if (!bCommit) continue;
      if (!commitBadges[bCommit]) commitBadges[bCommit] = [];
      const isHead = (gitEngine.HEAD.type === 'branch' && gitEngine.HEAD.name === bName);
      commitBadges[bCommit].push({
        text: bName,
        isHead: isHead,
        color: this.getBranchColor(bName),
        type: 'branch'
      });
    }

    // Detached HEAD
    if (gitEngine.HEAD.type === 'detached' && gitEngine.HEAD.id) {
      if (!commitBadges[gitEngine.HEAD.id]) commitBadges[gitEngine.HEAD.id] = [];
      commitBadges[gitEngine.HEAD.id].push({
        text: 'HEAD (detached)',
        isHead: true,
        color: '#f43f5e',
        type: 'head'
      });
    }

    // Remote dallar
    for (const [rName, rObj] of Object.entries(gitEngine.remotes)) {
      for (const [rbName, rbCommit] of Object.entries(rObj.branches)) {
        if (!rbCommit) continue;
        if (!commitBadges[rbCommit]) commitBadges[rbCommit] = [];
        commitBadges[rbCommit].push({
          text: `${rName}/${rbName}`,
          isHead: false,
          color: this.colors.remote,
          type: 'remote'
        });
      }
    }

    // Badge'leri çiz
    for (const [cId, badges] of Object.entries(commitBadges)) {
      const coord = nodeCoords[cId];
      if (!coord) continue;

      badges.forEach((badge, idx) => {
        const badgeY = coord.y - 28 - (idx * 22);
        const textWidth = Math.max(50, badge.text.length * 7.5 + 16);
        const badgeX = coord.x - textWidth / 2;

        const borderStyle = badge.isHead ? `stroke="${this.colors.head}" stroke-width="1.5"` : '';

        svgLabels += `
          <g>
            <!-- Badge Arkaplanı -->
            <rect x="${badgeX}" y="${badgeY - 14}" width="${textWidth}" height="19" rx="5" 
                  fill="#1e293b" ${borderStyle} />
            <rect x="${badgeX}" y="${badgeY - 14}" width="4" height="19" rx="2" 
                  fill="${badge.color}" />

            <!-- HEAD göstergesi nokta -->
            ${badge.isHead ? `<circle cx="${badgeX + 10}" cy="${badgeY - 4.5}" r="3" fill="${this.colors.head}" />` : ''}

            <!-- Yazı -->
            <text x="${badgeX + (badge.isHead ? 18 : 10)}" y="${badgeY}" fill="#f1f5f9" font-size="10.5" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="600">
              ${badge.text}
            </text>
          </g>
        `;
      });
    }

    this.container.innerHTML = `
      <div class="relative w-full h-full overflow-x-auto overflow-y-hidden p-2 select-none scrollbar-thin">
        <svg width="${totalWidth}" height="${totalHeight}" class="min-w-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          ${svgEdges}
          ${svgNodes}
          ${svgLabels}
        </svg>
      </div>
    `;

    // Otomatik en sağa kaydır (en son commit'i göstermek için)
    setTimeout(() => {
      const scrollable = this.container.querySelector('.overflow-x-auto');
      if (scrollable) {
        scrollable.scrollLeft = scrollable.scrollWidth;
      }
    }, 50);
  }
}
