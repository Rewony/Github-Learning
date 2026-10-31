// A'dan Z'ye Detaylı Git & GitHub El Kitabı (Handbook) Verisi
const GIT_GUIDE_CHAPTERS = [
  {
    id: "g1",
    title: "1. Git Nedir & Mimarî Temeller",
    icon: "layers",
    summary: "Versiyon kontrolünün evrimi, Local vs Centralized vs Distributed, Delta vs Snapshot ve SHA-1.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          1. Versiyon Kontrolünün 3 Nesli
        </h3>
        <p>
          Versiyon Kontrol Sistemi (VCS), dosyalarınızın zaman içindeki değişim geçmişini kaydederek istenildiğinde geriye dönebilmenizi, kimin neyi neden değiştirdiğini takip etmenizi sağlayan sistemdir.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <strong class="text-amber-400 block mb-1">Yerel VCS (Local)</strong>
            <p class="text-[11px] text-slate-400">Değişiklikleri yalnızca yerel diskteki basit bir veritabanında tutar (örn. RCS). Paylaşım yoktur, disk çökerse tüm geçmiş silinir.</p>
          </div>
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <strong class="text-sky-400 block mb-1">Merkezi VCS (CVCS)</strong>
            <p class="text-[11px] text-slate-400">Tek bir merkezi sunucu vardır (SVN, CVS). Ağ kesilirse commit atılamaz; sunucu arızalanırsa projenin tek hata noktası (SPOF) olur.</p>
          </div>
          <div class="p-3 bg-slate-900 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
            <strong class="text-emerald-400 block mb-1">Dağıtık VCS (DVCS - Git)</strong>
            <p class="text-[11px] text-slate-400">Her geliştirici, projenin ilk gününden son anına kadar tüm dallarını ve nesnelerini içeren tam bir kopyayı (mirror) kendi bilgisayarında taşır.</p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-white mt-4 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          2. Delta Değil Snapshot (Anlık Fotoğraf)
        </h3>
        <p>
          Eski sistemler dosyaların farklarını (delta) saklar; bir dosyayı açmak için baştan sona farkları toplar. <strong>Git ise her commit'te dosya sisteminin o anki minyatür tam bir resmini (snapshot) kaydeder.</strong> Değişmeyen dosyalar yeniden kopyalanmaz, önceki commit'e referans bağlanır. Bu sayede Git inanılmaz hızlı çalışır.
        </p>

        <h3 class="text-sm font-bold text-white mt-4 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
          3. SHA-1 Kriptografik Bütünlüğü
        </h3>
        <p>
          Git'te her nesne (dosya, dizin, commit) 40 karakterlik benzersiz bir SHA-1 hash'i ile adreslenir (örn: <code class="text-amber-300 font-mono">2a6f8b9c...</code>). Dosyada tek bir boşluk değişse hash tamamen değişir. Bu nedenle Git geçmişinde hiçbir şey sessizce manipüle edilemez.
        </p>
      </div>
    `
  },
  {
    id: "g2",
    title: "2. Kurulum & SSH Anahtarları",
    icon: "key",
    summary: "git config (global/local), varsayılan dal ayarı ve GitHub SSH Key yapılandırması.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          Kullanıcı Kimliği Belirleme (Config)
        </h3>
        <div class="p-3 bg-slate-950 rounded-xl font-mono text-[11px] space-y-1.5 border border-slate-800 text-slate-200">
          <div><span class="text-emerald-400">git config --global user.name</span> "Adiniz Soyadiniz"</div>
          <div><span class="text-emerald-400">git config --global user.email</span> "epostaniz@github.com"</div>
          <div><span class="text-emerald-400">git config --global init.defaultBranch</span> main</div>
          <div><span class="text-slate-500"># Tüm ayarları listeleme:</span></div>
          <div><span class="text-cyan-400">git config --list</span></div>
        </div>

        <h3 class="text-sm font-bold text-white mt-4 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          GitHub İçin Güvenli SSH Anahtarı Üretme
        </h3>
        <p class="text-slate-400">Parola girmeden GitHub'a güvenli ve şifreli push yapabilmek için Ed25519 SSH anahtarı oluşturun:</p>
        <div class="p-3 bg-slate-950 rounded-xl font-mono text-[11px] space-y-2 border border-slate-800 text-slate-200">
          <div><span class="text-slate-500"># 1. Anahtar üret:</span></div>
          <div><span class="text-amber-400">ssh-keygen -t ed25519 -C</span> "epostaniz@github.com"</div>
          <div><span class="text-slate-500"># 2. Windows'ta panoya kopyala:</span></div>
          <div>Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard</div>
          <div><span class="text-slate-500"># 3. GitHub -> Settings -> SSH Keys -> New SSH Key diyerek ekleyin.</span></div>
          <div><span class="text-slate-500"># 4. Test et:</span></div>
          <div><span class="text-cyan-400">ssh -T git@github.com</span></div>
        </div>
      </div>
    `
  },
  {
    id: "g3",
    title: "3. 3 Temel Alan & Dosya Yaşam Döngüsü",
    icon: "refresh-cw",
    summary: "Working Directory, Staging Area, Local Repository ve Untracked/Modified/Staged/Committed durumları.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-[11px]">
          <span class="text-amber-400">Working Directory</span> (Çalışma Klasörü) ➔ 
          <code class="text-white">git add</code> ➔ 
          <span class="text-cyan-400">Staging Area</span> (Sahne) ➔ 
          <code class="text-white">git commit</code> ➔ 
          <span class="text-emerald-400">Repository</span> (.git Veritabanı)
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <h4 class="font-bold text-amber-400 mb-1">Untracked & Modified</h4>
            <p class="text-[11px] text-slate-400">
              <strong>Untracked:</strong> Yeni eklenen ve Git'in henüz izlemediği dosyalar.<br>
              <strong>Modified:</strong> Takip edilen fakat son commit'ten sonra içeriği değiştirilmiş, henüz sahnelenmemiş dosyalar.
            </p>
          </div>
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <h4 class="font-bold text-emerald-400 mb-1">Staged & Committed</h4>
            <p class="text-[11px] text-slate-400">
              <strong>Staged:</strong> Bir sonraki commit paketine dahil edilecek dosyaların bekletildiği ön hazırlık alanı.<br>
              <strong>Committed:</strong> Verilerin yerel .git veritabanında mühürlendiği kalıcı durum.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "g4",
    title: "4. Günlük İş Akışı Komutları",
    icon: "terminal",
    summary: "init, status, add, rm, rm --cached, commit ve Conventional Commits standardı.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <div class="space-y-2 font-mono text-[11px]">
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-emerald-400 font-bold">git status / git status -s</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Değişikliklerin durumunu ayrıntılı veya kısa özet (M, A, ??) olarak listeler.</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-emerald-400 font-bold">git add . / git add dosya.txt / git add -p</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Dosyaları sahneye (Staging Area) alır. <code class="text-cyan-300 font-mono">-p</code> ile satır satır interaktif sahneleme yapılır.</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-rose-400 font-bold">git rm dosya.txt vs. git rm --cached .env</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5"><code class="text-rose-300 font-mono">git rm</code> hem diskten hem Git'ten siler. <code class="text-amber-300 font-mono">git rm --cached</code> ise dosyayı diskte tutar, yalnızca Git takibinden çıkarır!</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-cyan-400 font-bold">git commit -m "feat: Açıklama" / git commit --amend</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Sahnedeki dosyaları kalıcı snapshot yapar. <code class="text-cyan-300 font-mono">--amend</code> son commit mesajını veya unutulan dosyaları güncellemenizi sağlar.</p>
          </div>
        </div>

        <h4 class="font-bold text-white text-xs mt-3">Conventional Commits Standartları:</h4>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-[10px]">
          <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-emerald-400 font-bold">feat:</span> Yeni özellik</div>
          <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-rose-400 font-bold">fix:</span> Hata çözümü</div>
          <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-blue-400 font-bold">docs:</span> Dokümantasyon</div>
          <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-purple-400 font-bold">refactor:</span> Kod sadeleştirme</div>
          <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-amber-400 font-bold">test:</span> Test yazımı</div>
          <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-slate-400 font-bold">chore:</span> Altyapı / paket ayarı</div>
        </div>
      </div>
    `
  },
  {
    id: "g5",
    title: "5. Dallanma (Branching) & HEAD",
    icon: "git-branch",
    summary: "Dalların 41 baytlık gösterge yapısı, checkout vs switch, HEAD ve Detached HEAD.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <p>
          Git'te bir dal klasör kopyalamaz! Yalnızca <code class="text-purple-300 font-mono">.git/refs/heads/</code> altında 40 karakterlik commit hash'ini tutan <strong>41 baytlık minik bir işaretçidir</strong>. Bu yüzden Git'te dal açmak milisaniyeler sürer.
        </p>

        <div class="space-y-2 font-mono text-[11px]">
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-purple-400 font-bold">git checkout -b feature-odeme / git switch -c feature-odeme</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Tek komutta yeni dal açar ve hemen o dala geçer (HEAD o dala yönelir).</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-purple-400 font-bold">git switch main / git checkout main</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Mevcut dallar arasında geçiş yapar.</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-rose-400 font-bold">git branch -d feature / git branch -D feature</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">İşi bitmiş dalı güvenle siler. <code class="text-rose-300 font-mono">-D</code> zorla siler.</p>
          </div>
        </div>

        <div class="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl">
          <strong class="text-rose-400 text-xs block mb-1">⚠️ Ayrık HEAD (Detached HEAD) Uyarısı:</strong>
          <p class="text-[11px] text-slate-300">
            Bir dal adı yerine doğrudan commit hash'ine geçerseniz (<code class="text-rose-300 font-mono">git checkout a1b2c3</code>), HEAD doğrudan commite bakar. Bu durumdayken atacağınız commit'ler sahipsiz kalır. Kurtulmak için hemen: <code class="text-emerald-400 font-mono">git switch -c kurtarma-dali</code> komutunu çalıştırın.
          </p>
        </div>
      </div>
    `
  },
  {
    id: "g6",
    title: "6. Birleştirme (Merge) & Conflict Çözümü",
    icon: "git-merge",
    summary: "Fast-Forward vs 3-Way Merge ve çakışma (conflict) etiketlerini temizleme adımları.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <div class="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-200">
          <strong>Altın Kural:</strong> Nereye birleştirmek istiyorsan, önce o dala geç! (Örn: <code class="text-white font-mono">git checkout main</code> ardından <code class="text-white font-mono">git merge feature</code>).
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <strong class="text-emerald-400 block mb-1">1. Fast-Forward Merge</strong>
            <p class="text-[11px] text-slate-400">Siz dalda çalışırken main'de hiç commit atılmadıysa gerçekleşir. Yeni commit üretilmez, main etiketi ileri sarılır.</p>
          </div>
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <strong class="text-purple-400 block mb-1">2. 3-Way Merge</strong>
            <p class="text-[11px] text-slate-400">Her iki dalda da bağımsız commit'ler varsa iki ebeveynli özel bir "Merge Commit" oluşturulur.</p>
          </div>
        </div>

        <h4 class="font-bold text-white text-xs mt-3">⚡ Merge Conflict (Çakışma) Çözümü:</h4>
        <pre class="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[10.5px] leading-relaxed text-slate-300">
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Bizim dalımız)
const API = "https://uretim.com";
=======
const API = "https://test.com";
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-api (Gelen dal)
        </pre>
        <p class="text-[11px] text-slate-400">
          <strong>Adımlar:</strong> Doğru satırı seçin, <code class="text-rose-300">&lt;&lt;&lt;</code>, <code class="text-slate-400">===</code>, <code class="text-purple-300">&gt;&gt;&gt;</code> satırlarını silin ➔ <code class="text-emerald-400 font-mono">git add .</code> ➔ <code class="text-emerald-400 font-mono">git commit -m "Merge conflict cozuldu"</code>
        </p>
      </div>
    `
  },
  {
    id: "g7",
    title: "7. Rebase vs. Merge Derin Analiz",
    icon: "git-commit",
    summary: "Tarihçeyi doğrusal tutma, git rebase mantığı ve Rebase Altın Kuralı.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <p>
          <code class="text-amber-400 font-mono">git rebase main</code>; daldaki commit'lerinizi geçici olarak kaldırır, dalınızın başlangıç noktasını en güncel main commit'inin ucuna taşır ve commit'lerinizi sırayla tekrar uygular.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <strong class="text-cyan-400 block mb-1">Git Merge</strong>
            <p class="text-[11px] text-slate-400">Gerçek tarihçeyi korur, kavşaklar görünür. Hash'ler asla değişmez. Güvenlidir.</p>
          </div>
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <strong class="text-amber-400 block mb-1">Git Rebase</strong>
            <p class="text-[11px] text-slate-400">Tertemiz, dümdüz, tek çizgi (doğrusal) bir tarihçe sağlar. Ancak commit hash'lerini yeniden yazar!</p>
          </div>
        </div>

        <div class="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl text-rose-200 text-[11px]">
          ⚠️ <strong>Rebase Altın Kuralı:</strong> GitHub'da herkesle paylaşılan ortak ana dallarda (<code class="text-white">main</code>, <code class="text-white">master</code>) ASLA rebase yapmayın! Yalnızca henüz pushlamadığınız kendi yerel özel dallarınızda kullanın.
        </div>
      </div>
    `
  },
  {
    id: "g8",
    title: "8. Geri Alma: Reset, Revert, Stash & Reflog",
    icon: "history",
    summary: "Soft/Mixed/Hard Reset, Revert ile güvenli geri alma, Stash çekmecesi ve Reflog kara kutusu.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <div class="space-y-2 font-mono text-[11px]">
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-emerald-400 font-bold">git reset --soft HEAD~1</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Son commit'i iptal eder ancak dosyalardaki değişiklikleri Sahne'de (Staging Area) korur.</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-rose-400 font-bold">git reset --hard HEAD~1</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">⚠️ DİKKAT: Son commit'i ve o commit'te yapılan tüm kod değişikliklerini tamamen siler!</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-cyan-400 font-bold">git revert &lt;commit-hash&gt;</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Tarihçeyi silmeden, belirtilen commit'in tam tersini yapan yeni bir telafi commit'i oluşturur (En güvenli ekip yöntemi).</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-amber-400 font-bold">git stash / git stash pop</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Yarım kalan işleri geçici hafıza çekmecesine kaldırır ve sonra geri yükler.</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-purple-400 font-bold">git reflog</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Git'in kara kutusu! Yanlışlıkla silinen dallar ve hard reset'ler dahil HEAD'in son 90 gündeki tüm adımlarını gösterir. <code class="text-purple-300">git reset --hard HEAD@{1}</code> ile geri dönebilirsiniz.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "g9",
    title: "9. GitHub & Uzak Depo (Remote) Akışı",
    icon: "globe",
    summary: "origin ekleme, push -u, fetch vs pull farkı ve Pull Request (PR) süreci.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <div class="space-y-2 font-mono text-[11px]">
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-sky-400 font-bold">git remote add origin https://github.com/user/proje.git</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">GitHub üzerindeki deponuzu 'origin' takma adıyla yerel projenize bağlar.</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-sky-400 font-bold">git push -u origin main</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Dalı GitHub'a yükler ve upstream eşlemesini kurar (sonraki seferlerde sadece 'git push' yazmanız yeterli olur).</p>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span class="text-sky-400 font-bold">git fetch origin vs. git pull origin main</span>
            <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Fetch sadece indirir, çalışma alanınıza dokunmaz. Pull ise indirir ve aktif dalınızla anında birleştirir (fetch + merge).</p>
          </div>
        </div>

        <h4 class="font-bold text-white text-xs mt-3">Kurumsal Pull Request (PR) Akışı:</h4>
        <ol class="space-y-1.5 text-[11px] text-slate-300 list-decimal list-inside">
          <li>En güncel main'i çek: <code class="text-cyan-300 font-mono">git pull origin main</code></li>
          <li>Yeni özellik dalı aç: <code class="text-cyan-300 font-mono">git checkout -b feature/sepet</code></li>
          <li>Kodla ve commit'le, sonra GitHub'a pushla: <code class="text-cyan-300 font-mono">git push -u origin feature/sepet</code></li>
          <li>GitHub'da <strong>Pull Request</strong> aç, takım arkadaşların kod incelemesi (Code Review) yapsın, testler geçince main'e birleştirilsin!</li>
        </ol>
      </div>
    `
  },
  {
    id: "g10",
    title: "10. .diff Dosyaları & Yama (Patch)",
    icon: "file-text",
    summary: "Unified diff formatı okuma, hunk header @@, git diff flagleri ve patch oluşturma.",
    html: `
      <div class="space-y-4 text-slate-300 text-xs leading-relaxed">
        <pre class="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[10.5px] leading-relaxed text-slate-300">
<span class="text-slate-500">diff --git a/app.py b/app.py</span>
<span class="text-rose-400 font-bold">--- a/app.py (Değişiklik öncesi eski dosya)</span>
<span class="text-emerald-400 font-bold">+++ b/app.py (Değişiklik sonrası yeni dosya)</span>
<span class="text-cyan-400 font-bold">@@ -10,3 +10,4 @@ (10. satırdan itibaren satır farkları)</span>
 def baslat():
<span class="text-rose-400 font-bold">-    port = 8080      # Silinen eski satır (-)</span>
<span class="text-emerald-400 font-bold">+    port = 9000      # Eklenen yeni satır (+)</span>
<span class="text-emerald-400 font-bold">+    debug = True     # Eklenen yeni satır (+)</span>
        </pre>

        <div class="space-y-1.5 font-mono text-[11px]">
          <div><span class="text-pink-400">git diff</span>: Sahnelenmemiş (untracked/unstaged) farkları listeler.</div>
          <div><span class="text-pink-400">git diff --staged</span>: Sahnelenmiş farkları listeler.</div>
          <div><span class="text-pink-400">git diff > yama.patch</span>: Farkları patch dosyasına kaydeder.</div>
          <div><span class="text-emerald-400">git apply yama.patch</span>: Yamayı başka bilgisayarda uygular.</div>
        </div>
      </div>
    `
  },
  {
    id: "g11",
    title: "11. Acil Durum & Kurtarma Kılavuzu",
    icon: "alert-triangle",
    summary: "Commit mesajını düzeltme, dosyayı unutma, yanlış dala commit atma ve silinen veriyi kurtarma.",
    html: `
      <div class="space-y-3 text-slate-300 text-xs leading-relaxed">
        <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
          <strong class="text-amber-400 block mb-0.5">1. Commit mesajını yanlış yazdım:</strong>
          <code class="text-slate-300 font-mono text-[11px]">git commit --amend -m "Doğru mesaj"</code>
        </div>

        <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
          <strong class="text-amber-400 block mb-0.5">2. Bir dosyayı commite eklemeyi unuttum:</strong>
          <code class="text-slate-300 font-mono text-[11px]">git add unutulan.js && git commit --amend --no-edit</code>
        </div>

        <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
          <strong class="text-amber-400 block mb-0.5">3. Yanlışlıkla main dalına commit attım (dal açmalıydım):</strong>
          <div class="font-mono text-[10.5px] text-slate-300 mt-1 space-y-0.5">
            <div>git branch feature-yeni <span class="text-slate-500"># Şu anki noktadan dal üret</span></div>
            <div>git reset --hard HEAD~1 <span class="text-slate-500"># Main'i 1 adım geri al</span></div>
            <div>git switch feature-yeni <span class="text-slate-500"># Yeni dala geç (kodlar orada duruyor!)</span></div>
          </div>
        </div>

        <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
          <strong class="text-rose-400 block mb-0.5">4. Yanlışlıkla git reset --hard yaptım, kodlarım silindi:</strong>
          <code class="text-slate-300 font-mono text-[11px]">git reflog</code> ile silinen commit hash'ini bul ➔ <code class="text-emerald-400 font-mono text-[11px]">git reset --hard HEAD@{1}</code> ile anında geri getir!
        </div>

        <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
          <strong class="text-rose-400 block mb-0.5">5. GitHub'a yanlışlıkla .env / API anahtarı pushladım:</strong>
          <div class="text-[11px] text-slate-400 mt-1">
            Önce anahtarı derhal iptal edin (revoke) ➔ <code class="text-cyan-300 font-mono">git rm --cached .env</code> ➔ <code class="text-cyan-300 font-mono">git commit -m "security: dosya takipten cikarildi"</code> ➔ <code class="text-cyan-300 font-mono">git push</code>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "g12",
    title: "12. Hızlı Komut Referans Tablosu",
    icon: "bookmark",
    summary: "Günlük hayatta en çok ihtiyaç duyulan tüm Git komutlarının tek bakışlık tablosu.",
    html: `
      <div class="overflow-x-auto text-xs">
        <table class="w-full text-left text-[11px] divide-y divide-slate-800">
          <thead>
            <tr class="text-slate-400 font-bold">
              <th class="py-1.5">Komut</th>
              <th class="py-1.5">İşlev</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 font-mono text-slate-300">
            <tr><td class="py-1.5 text-emerald-400">git init</td><td class="font-sans text-slate-400">Yeni yerel depo başlatır</td></tr>
            <tr><td class="py-1.5 text-emerald-400">git clone &lt;url&gt;</td><td class="font-sans text-slate-400">Uzak depoyu klonlar</td></tr>
            <tr><td class="py-1.5 text-emerald-400">git status</td><td class="font-sans text-slate-400">Durum raporu verir</td></tr>
            <tr><td class="py-1.5 text-emerald-400">git add .</td><td class="font-sans text-slate-400">Tüm dosyaları sahneler</td></tr>
            <tr><td class="py-1.5 text-emerald-400">git commit -m ""</td><td class="font-sans text-slate-400">Kalıcı snapshot kaydeder</td></tr>
            <tr><td class="py-1.5 text-purple-400">git branch</td><td class="font-sans text-slate-400">Dalları listeler</td></tr>
            <tr><td class="py-1.5 text-purple-400">git switch -c &lt;dal&gt;</td><td class="font-sans text-slate-400">Dal açıp hemen geçer</td></tr>
            <tr><td class="py-1.5 text-purple-400">git merge &lt;dal&gt;</td><td class="font-sans text-slate-400">Dalı mevcut dala birleştirir</td></tr>
            <tr><td class="py-1.5 text-cyan-400">git log --oneline</td><td class="font-sans text-slate-400">Tek satırlık geçmiş listesi</td></tr>
            <tr><td class="py-1.5 text-pink-400">git diff</td><td class="font-sans text-slate-400">Değişiklik farklarını gösterir</td></tr>
            <tr><td class="py-1.5 text-rose-400">git reset --soft HEAD~1</td><td class="font-sans text-slate-400">Son commit'i geri alır</td></tr>
            <tr><td class="py-1.5 text-sky-400">git remote add origin</td><td class="font-sans text-slate-400">Uzak GitHub deposu bağlar</td></tr>
            <tr><td class="py-1.5 text-sky-400">git push -u origin main</td><td class="font-sans text-slate-400">GitHub'a yükler</td></tr>
            <tr><td class="py-1.5 text-sky-400">git pull origin main</td><td class="font-sans text-slate-400">Yenilikleri indirip birleştirir</td></tr>
          </tbody>
        </table>
      </div>
    `
  }
];
