// 3.3. Version Control Systems Müfredatı - Derinlemesine & Detaylı Konu Anlatımı
const GIT_TOPICS = [
  {
    id: "3-3-1",
    curriculumCode: "3.3.1",
    title: "3.3.1 Types of Version Control Systems",
    badge: "Mimarî & Teori",
    icon: "layers",
    summary: "Yerel (Local), Merkezi (Centralized - CVCS) ve Dağıtık (Distributed - DVCS) sistemlerin mimari analizi ve karşılaştırması.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <!-- Giriş -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50"></span>
            Versiyon Kontrol Sistemi (VCS) Nedir ve Neden Hayatidir?
          </h3>
          <p class="text-slate-300">
            Bir <strong class="text-white">Versiyon Kontrol Sistemi (VCS)</strong>; tek bir dosya veya devasa bir yazılım projesindeki binlerce kaynak kod dosyasının zaman içerisindeki tüm değişimlerini kaydeden, istenildiğinde projenin dakikalar veya aylar önceki tam haline geri dönülebilmesini sağlayan, kimin hangi satırı neden değiştirdiğini belgeleyen yazılım altyapısıdır.
          </p>
        </div>

        <!-- 3 Ana VCS Türü Derinlemesine -->
        <div class="space-y-4">
          <!-- 1. Local VCS -->
          <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>1.</span> Yerel Versiyon Kontrolü (Local VCS)
              </h4>
              <span class="text-[10px] font-mono bg-amber-950/50 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">Örn: RCS (1982)</span>
            </div>
            <p class="text-slate-300 mb-3">
              Birçok geliştiricinin ilk refleksi, dosyaları <code class="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">proje_v1</code>, <code class="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">proje_son</code>, <code class="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">proje_gercek_son</code> şeklinde farklı isimlerle kopyalamaktır. Yerel VCS'ler bu süreci otomatikleştirerek yerel diskte basit bir veritabanı tutar ve her değişikliğin fark yamalarını (patch sets) saklar.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div class="p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-emerald-300">
                <strong>✔ Avantaj:</strong> İnternet gerektirmez, kurulumu çok basittir.
              </div>
              <div class="p-2.5 bg-rose-950/20 border border-rose-500/20 rounded-lg text-rose-300">
                <strong>✖ Büyük Tehlike:</strong> Disk arızalandığında veya dosya bozulduğunda tüm geçmiş kalıcı olarak yok olur. Ekip üyeleriyle ortak çalışma yapılamaz.
              </div>
            </div>
          </div>

          <!-- 2. Centralized VCS -->
          <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-bold text-sky-400 flex items-center gap-2">
                <span>2.</span> Merkezi Versiyon Kontrolü (Centralized VCS - CVCS)
              </h4>
              <span class="text-[10px] font-mono bg-sky-950/50 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded">Örn: Subversion (SVN), CVS, Perforce</span>
            </div>
            <p class="text-slate-300 mb-3">
              Farklı sistemlerdeki geliştiricilerin iş birliği yapabilmesi için tek bir merkezi sunucu (central server) ve bu sunucudaki tüm versiyonlanmış dosyaları tutan bir veritabanı kullanılır. Geliştiriciler sunucuya bağlanır ve sadece üzerinde çalışacakları dosyaların anlık kopyasını (working copy) çekerler.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div class="p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-emerald-300">
                <strong>✔ Avantaj:</strong> Yöneticiler kimin hangi dosyayı düzenlediğini merkezi olarak denetleyebilir (dosya kilitleme - file locking mekanizmaları).
              </div>
              <div class="p-2.5 bg-rose-950/20 border border-rose-500/20 rounded-lg text-rose-300">
                <strong>✖ Tek Hata Noktası (SPOF):</strong> Merkezi sunucu çökerse veya ağ kesilirse hiç kimse commit atamaz, geçmişe bakamaz veya dal açamaz. Sunucunun sabit diski bozulursa ve yedek yoksa tüm proje geçmişi silinir!
              </div>
            </div>
          </div>

          <!-- 3. Distributed VCS -->
          <div class="p-4 bg-slate-950/80 rounded-xl border border-emerald-500/40 bg-emerald-950/10">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>3.</span> Dağıtık Versiyon Kontrolü (Distributed VCS - DVCS)
              </h4>
              <span class="text-[10px] font-mono bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">Örn: Git, Mercurial, Bazaar</span>
            </div>
            <p class="text-slate-300 mb-3">
              Dağıtık sistemlerde geliştiriciler sunucudan sadece dosyaların son durumunu çekmez; <strong class="text-white">tüm deponun, tüm dalların ve projenin başlangıcından bu yana atılan tüm commit'lerin tam bir kopyasını (mirror)</strong> kendi bilgisayarlarına klonlarlar.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div class="p-2.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-300">
                <strong>✔ Tam Çevrimdışı (Offline) Güç:</strong> Uçakta, trende, internetsiz ortamda commit atabilir, dal değiştirebilir ve tam geçmişi inceleyebilirsiniz.
              </div>
              <div class="p-2.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-300">
                <strong>✔ Kusursuz Güvenlik & Yedeklilik:</strong> GitHub veya ana sunucu tamamen çökse veya silinse bile, herhangi bir ekip üyesinin bilgisayarındaki yerel kopya sunucuya yüklenerek proje saniyeler içinde kurtarılabilir.
              </div>
            </div>
          </div>
        </div>

        <!-- Mimarî Karşılaştırma Tablosu -->
        <div class="bg-slate-900 rounded-xl border border-slate-800 p-3 overflow-x-auto">
          <h4 class="font-bold text-white text-xs mb-2">Mimarî Karşılaştırma Matrisi</h4>
          <table class="w-full text-left text-[11px]">
            <thead>
              <tr class="border-b border-slate-800 text-slate-400">
                <th class="py-2">Özellik</th>
                <th class="py-2">Merkezi (SVN / CVS)</th>
                <th class="py-2 text-emerald-400">Dağıtık (Git / DVCS)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td class="py-2 font-semibold">Tarihçe Nerede Saklanır?</td>
                <td class="py-2 text-rose-300">Yalnızca Merkezi Sunucuda</td>
                <td class="py-2 text-emerald-300">Her Geliştiricinin Kendi Bilgisayarında</td>
              </tr>
              <tr>
                <td class="py-2 font-semibold">İnternet / Ağ Bağımlılığı</td>
                <td class="py-2 text-rose-300">Her işlemde ağ bağlantısı zorunlu</td>
                <td class="py-2 text-emerald-300">Sadece push/pull sırasında; yerel tüm işlemler internetsiz</td>
              </tr>
              <tr>
                <td class="py-2 font-semibold">İşlem Hızı</td>
                <td class="py-2 text-amber-300">Ağ gecikmesine bağlı (yavaş)</td>
                <td class="py-2 text-emerald-300">Doğrudan yerel diskten okuma/yazma (inanılmaz hızlı)</td>
              </tr>
              <tr>
                <td class="py-2 font-semibold">Dallanma (Branch) Maliyeti</td>
                <td class="py-2 text-amber-300">Ağır (tüm klasörü sunucuda çoğaltır)</td>
                <td class="py-2 text-emerald-300">Hafif (41 baytlık basit işaretçi)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    relatedChallengeId: "c1"
  },
  {
    id: "3-3-2",
    curriculumCode: "3.3.2",
    title: "3.3.2 Git",
    badge: "Çekirdek Mekanizma",
    icon: "git-commit",
    summary: "Git'in doğuşu (2005), Linus Torvalds, Snapshot vs Delta modeli, SHA-1 ve 3 Temel Durum.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <!-- Tarihçe -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-orange-400 inline-block shadow-sm shadow-orange-400/50"></span>
            Git Nasıl Doğdu? (2005 Tarihi Kriz)
          </h3>
          <p class="text-slate-300 mb-2">
            1991-2002 yılları arasında Linux çekirdeği yamalar ve arşivlerle yönetiliyordu. 2002 yılında tescilli bir DVCS olan <strong class="text-white">BitKeeper</strong> kullanılmaya başlandı. 2005 yılında BitKeeper'ın sahibi ile Linux topluluğu arasındaki ilişki kopunca, Linux'un babası <strong class="text-orange-400 font-semibold">Linus Torvalds</strong> şu hedeflerle Git'i sıfırdan tasarladı:
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] font-mono mt-3">
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center text-slate-300">⚡ Muazzam Hız</div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center text-slate-300">🌿 Doğrusal Olmayan Dallanma</div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center text-slate-300">🔒 Kriptografik Bütünlük</div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center text-slate-300">🚀 Milyonlarca Dosyayı Yönetebilme</div>
          </div>
        </div>

        <!-- Snapshot vs Delta -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="text-sm font-bold text-cyan-400 mb-2">Delta (Fark) Tabanlı Sistemler vs. Git'in Snapshot (Anlık Fotoğraf) Modeli</h4>
          <p class="text-slate-300 mb-3">
            Geleneksel VCS sistemleri (CVS, SVN) her versiyonda dosyaların "önceki versiyona göre ne kadar değiştiğini" (deltaları) saklar. Bir dosyanın son haline ulaşmak için ilk sürümden itibaren tüm farkların sırayla toplanması gerekir.
          </p>
          <div class="p-3 bg-slate-900 rounded-lg border border-cyan-500/30 text-slate-300 mb-3">
            <strong class="text-cyan-300 block mb-1">📸 Git'in Yaklaşımı: Dosya Sisteminin Minyatür Anlık Fotoğrafları</strong>
            Git veriyi bir fark tablosu olarak değil, projenin o anki tam resmini gösteren bir <em>Stream of Snapshots</em> olarak düşünür. Her commit attığınızda, Git o anki tüm dosyalarınızın tam görüntüsünü kaydeder. Eğer bir dosya değişmediyse, onu tekrar kaydetmez; önceki commit'teki aynı dosyaya referans veren bir bağlantı kurar. Bu sayede işlem hem anında gerçekleşir hem de diskte minimum yer kaplar!
          </div>
        </div>

        <!-- SHA-1 Kriptografik Bütünlük -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="text-sm font-bold text-amber-400 mb-2">SHA-1 Bütünlüğü: İçerik Adreslemeli Depolama</h4>
          <p class="text-slate-300 mb-2">
            Git'te saklanan her veri (dosya içerikleri, commit mesajları, yazarlar, tarihçeler) 40 karakterlik onaltılık (hexadecimal) bir <strong>SHA-1 hash</strong> değeriyle şifrelenir ve doğrulanır:
          </p>
          <div class="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-amber-300 border border-slate-800 break-all mb-2">
            2a6f8b9c1d4e7f3a8b2c5d1e4f7a8b9c1d2e3f4a
          </div>
          <p class="text-slate-400 text-[11px]">
            Git bu hash kodunu dosya içeriğinin kendisinden türettiği için, tek bir harf veya boşluk bile değişse hash kodu tamamen değişir. Bu nedenle Git geçmişinde hiçbir commit, Git'in haberi olmadan gizlice değiştirilemez veya bozulamaz.
          </p>
        </div>

        <!-- Git'in 3 Durumu ve 3 Bölgesi -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="text-sm font-bold text-white mb-3">Git'in 3 Temel Durumu (Three States) ve Çalışma Alanları</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-950 rounded-lg border border-red-500/30">
              <span class="text-xs font-mono font-bold text-red-400 block mb-1">1. Working Directory</span>
              <p class="text-[11px] text-slate-400 mb-2">Bilgisayarınızda dosya yöneticisiyle gördüğünüz, kodları düzenlediğiniz gerçek çalışma klasörünüz.</p>
              <span class="text-[10px] text-red-300 font-semibold uppercase bg-red-950/40 px-1.5 py-0.5 rounded">Durum: Modified / Untracked</span>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-amber-500/30">
              <span class="text-xs font-mono font-bold text-amber-400 block mb-1">2. Staging Area (Index)</span>
              <p class="text-[11px] text-slate-400 mb-2">Bir sonraki commit paketine dahil edilecek dosyaların hazırlandığı sahneleme alanı.</p>
              <span class="text-[10px] text-amber-300 font-semibold uppercase bg-amber-950/40 px-1.5 py-0.5 rounded">Durum: Staged</span>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-emerald-500/30">
              <span class="text-xs font-mono font-bold text-emerald-400 block mb-1">3. Git Directory (.git)</span>
              <p class="text-[11px] text-slate-400 mb-2">Commit'lenen nesnelerin kalıcı olarak saklandığı projenin veritabanı.</p>
              <span class="text-[10px] text-emerald-300 font-semibold uppercase bg-emerald-950/40 px-1.5 py-0.5 rounded">Durum: Committed</span>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c1"
  },
  {
    id: "3-3-3",
    curriculumCode: "3.3.3",
    title: "3.3.3 Local vs. Remote Repositories",
    badge: "Mimarî & İletişim",
    icon: "globe",
    summary: "Yerel ve Uzak Depoların anatomisi, .git dizini, origin kavramı ve ağ protokolleri.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-blue-400 inline-block shadow-sm shadow-blue-400/50"></span>
            Yerel ve Uzak Depoların Mimarisi (Local vs. Remote)
          </h3>
          <p class="text-slate-300">
            Git dağıtık bir sistem olduğu için projeler tek bir yerde değil, hem yerel geliştirici makinelerinde hem de uzak bulut sunucularında bağımsız ama senkronize depolar olarak var olur.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="text-sm font-bold text-sky-400 mb-2 flex items-center gap-1.5">
              <span>💻</span> Yerel Depo (Local Repository)
            </h4>
            <ul class="space-y-2 text-slate-300">
              <li>• Bilgisayarınızın sabit diskinde gizli bir <code class="text-sky-300 font-mono">.git/</code> dizininde saklanır.</li>
              <li>• Projenin başlangıcından bu yana atılan her bir commit ve tüm dallar yerel disktedir.</li>
              <li>• İnternet bağlantısına hiç ihtiyaç duymadan milisaniyeler içinde commit atabilir, log arayabilir ve dal değiştirebilirsiniz.</li>
            </ul>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="text-sm font-bold text-indigo-400 mb-2 flex items-center gap-1.5">
              <span>☁️</span> Uzak Depo (Remote Repository)
            </h4>
            <ul class="space-y-2 text-slate-300">
              <li>• GitHub, GitLab veya şirket içi bir sunucuda barınan depodur.</li>
              <li>• Genellikle çalışan bir çalışma klasörü (working directory) içermez; doğrudan <code class="text-indigo-300 font-mono">--bare</code> formatında saf Git veritabanı olarak tutulur.</li>
              <li>• Varsayılan ana uzak deponun standart takma adı <strong class="text-white">origin</strong>'dir.</li>
            </ul>
          </div>
        </div>

        <!-- Protokoller -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-2">Uzak Depoya Bağlanırken Kullanılan Ağ Protokolleri</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
            <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <strong class="text-emerald-400 block mb-1">HTTPS Protokolü:</strong>
              <code class="text-[10px] text-slate-400 block mb-1">https://github.com/user/proje.git</code>
              <span>Firewall'lardan kolay geçer, kimlik doğrulama için GitHub Personal Access Token (PAT) kullanır.</span>
            </div>
            <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <strong class="text-purple-400 block mb-1">SSH Protokolü:</strong>
              <code class="text-[10px] text-slate-400 block mb-1">git@github.com:user/proje.git</code>
              <span>Asimetrik açık/özel anahtar (SSH Key pair) ile çalışır. Parola girmeden güvenli ve hızlı iletişim sağlar.</span>
            </div>
            <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <strong class="text-amber-400 block mb-1">Local / File Protokolü:</strong>
              <code class="text-[10px] text-slate-400 block mb-1">/mnt/ortak_surucu/proje.git</code>
              <span>Şirket yerel ağındaki paylaşımlı diskler veya dizinler arası senkronizasyon için kullanılır.</span>
            </div>
          </div>
        </div>

        <!-- 4 Alan Arasındaki Akış -->
        <div class="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl text-xs space-y-2">
          <h4 class="font-bold text-blue-300">Git'in 4 Katmanı Arasındaki Akış Diyagramı</h4>
          <div class="p-3 bg-slate-950 rounded-lg font-mono text-[11px] text-center text-slate-300 space-y-1">
            <span class="text-amber-400">Working Directory</span> ➔ (<code class="text-white">git add</code>) ➔ 
            <span class="text-emerald-400">Staging Area</span> ➔ (<code class="text-white">git commit</code>) ➔ 
            <span class="text-cyan-400">Local Repo</span> ➔ (<code class="text-white">git push</code>) ➔ 
            <span class="text-purple-400">Remote (GitHub)</span>
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c9"
  },
  {
    id: "3-3-4",
    curriculumCode: "3.3.4",
    title: "3.3.4 What is Branching?",
    badge: "Çekirdek Mekanizma",
    icon: "git-branch",
    summary: "Dallanmanın derin mantığı, 41 baytlık göstergeler, HEAD mekanizması ve Detached HEAD tehlikesi.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-purple-400 inline-block shadow-sm shadow-purple-400/50"></span>
            Git'te Dal (Branch) Aslında Nedir?
          </h3>
          <p class="text-slate-300">
            Geleneksel versiyon sistemlerinde yeni bir dal oluşturmak, kaynak klasörün tamamını yeni bir dizine kopyalamak demektir (yavaş, hantal ve disk dolduran bir süreç). Git'te ise bir dal kesinlikle dosya kopyalamaz!
          </p>
        </div>

        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="text-sm font-bold text-purple-400 mb-2">41 Baytlık Mucize: Dal Yalnızca Bir İşaretçidir</h4>
          <p class="text-slate-300 mb-3">
            Git'te bir dal açtığınızda arka planda yalnızca <code class="text-purple-300 font-mono">.git/refs/heads/</code> klasörü altında dal adında 41 baytlık basit bir metin dosyası oluşturulur. Bu dosyanın içinde sadece o dalın baktığı commit'in 40 karakterlik SHA-1 hash kodu yazar!
          </p>
          <div class="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-300 border border-slate-800">
            $ cat .git/refs/heads/main<br>
            <span class="text-emerald-400">e8f2a1b9487c6d5e3f2a1b0c9d8e7f6a5b4c3d2e</span>
          </div>
          <p class="text-slate-400 text-[11px] mt-2">
            Yeni bir commit attığınızda, Git yalnızca bu 41 baytlık dosyadaki hash kodunu yeni commit'in hash'iyle günceller. Bu sayede dal açmak da, dal silmek de, dala geçmek de anında gerçekleşir.
          </p>
        </div>

        <!-- HEAD ve Detached HEAD -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="text-xs font-bold text-cyan-400 mb-2">HEAD İşaretçisi Nedir?</h4>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <code class="text-cyan-300 font-mono">HEAD</code>, Git'in "sen şu anda neredesin?" sorusuna verdiği cevaptır. İşaretçiye bakan bir işaretçidir (symbolic ref). Genellikle çalıştığınız aktif dalı gösterir:
            </p>
            <code class="text-[10px] text-slate-400 bg-slate-900 p-1.5 rounded block mt-2 font-mono">ref: refs/heads/main</code>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
            <h4 class="text-xs font-bold text-rose-400 mb-2">⚠️ Ayrık HEAD (Detached HEAD) Nedir?</h4>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              Eğer bir dal adı yerine doğrudan bir commit hash'ine geçerseniz (<code class="text-rose-300 font-mono">git checkout c1a4</code>), HEAD artık bir dala değil doğrudan commit'e bakar. Bu durumdayken atacağınız yeni commit'ler hiçbir dal tarafından sahiplenilmez ve daha sonra çöp toplayıcı (<code class="font-mono">git gc</code>) tarafından silinebilir!
            </p>
          </div>
        </div>

        <!-- Dallanma Stratejileri -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-2">Sektör Standartı Dallanma Stratejileri</h4>
          <div class="space-y-2 text-[11px] text-slate-300">
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <strong class="text-emerald-400">GitHub Flow (Modern & Çevik):</strong>
              <p class="text-slate-400 mt-0.5">Tek bir stabil <code class="text-slate-300">main</code> dalı vardır. Yeni özellik için kısa ömürlü dal açılır (<code class="text-slate-300">feature/auth</code>), geliştirilir, test edilir, PR ile main'e birleştirilip dal silinir.</p>
            </div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800">
              <strong class="text-purple-400">Git Flow (Geleneksel & Kapsamlı):</strong>
              <p class="text-slate-400 mt-0.5"><code class="text-slate-300">main</code>, <code class="text-slate-300">develop</code>, <code class="text-slate-300">feature/*</code>, <code class="text-slate-300">release/*</code> ve acil düzeltmeler için <code class="text-slate-300">hotfix/*</code> dallarını içeren sıkı kurallı kurumsal model.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c3"
  },
  {
    id: "3-3-5",
    curriculumCode: "3.3.5",
    title: "3.3.5 GitHub and Other Providers",
    badge: "Ekosistem",
    icon: "share-2",
    summary: "GitHub, GitLab, Bitbucket, Azure DevOps analizi, Pull Request, Code Review ve Forking mekanizması.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-violet-400 inline-block shadow-sm shadow-violet-400/50"></span>
            Git Sağlayıcıları ve Bulut Ekosistemi
          </h3>
          <p class="text-slate-300">
            Git bir komut satırı aracıdır. Ancak dünya genelindeki yazılım ekipleri, kodları yedeklemek, kod kalitesini denetlemek ve birlikte çalışabilmek için bulut tabanlı Git barındırma platformlarını kullanır.
          </p>
        </div>

        <!-- 4 Büyük Sağlayıcı Detaylı -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white text-xs mb-1.5 flex items-center gap-2">
              <span class="text-lg">🐙</span> GitHub (Microsoft)
            </h4>
            <p class="text-slate-400 text-[11px] leading-relaxed mb-2">
              100 milyondan fazla geliştiriciyle dünyanın en büyük yazılım platformu. Açık kaynak dünyasının fiili standardıdır.
            </p>
            <div class="text-[10.5px] text-violet-300 space-y-0.5">
              • GitHub Actions: Güçlü CI/CD otomasyonu<br>
              • Pull Request & Discussions: Kod inceleme kültürü<br>
              • Dependabot: Güvenlik açığı olan paketleri otomatik tespit
            </div>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white text-xs mb-1.5 flex items-center gap-2">
              <span class="text-lg">🦊</span> GitLab
            </h4>
            <p class="text-slate-400 text-[11px] leading-relaxed mb-2">
              Özellikle kurum içi (on-premise / self-hosted) kurulumlarda ve DevOps boru hatlarında sektör lideri.
            </p>
            <div class="text-[10.5px] text-amber-300 space-y-0.5">
              • Dahili eksiksiz CI/CD motoru<br>
              • Şirketlerin kendi veri merkezlerinde çalıştırma imkanı<br>
              • Merge Request tabanlı onay hiyerarşisi
            </div>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white text-xs mb-1.5 flex items-center gap-2">
              <span class="text-lg">🔷</span> Bitbucket (Atlassian)
            </h4>
            <p class="text-slate-400 text-[11px] leading-relaxed mb-2">
              Jira, Confluence ve Trello kullanan kurumsal şirketlerin vazgeçilmez Git sağlayıcısı.
            </p>
            <div class="text-[10.5px] text-sky-300 space-y-0.5">
              • Jira görev kartları ile commitlerin otomatik bağlanması<br>
              • Bitbucket Pipelines ile bulut derlemeleri
            </div>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white text-xs mb-1.5 flex items-center gap-2">
              <span class="text-lg">⚡</span> Azure DevOps (Microsoft)
            </h4>
            <p class="text-slate-400 text-[11px] leading-relaxed mb-2">
              Büyük ölçekli kurumsal şirketlerin yazılım yaşam döngüsünü (ALM) baştan sona yönettiği platform.
            </p>
            <div class="text-[10.5px] text-emerald-300 space-y-0.5">
              • Azure Repos (Git) & Azure Pipelines entegrasyonu<br>
              • Gelişmiş test ve yayınlama (Release management)
            </div>
          </div>
        </div>

        <!-- Fork vs Branch Farkı -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-2">Kritik Ayrım: Forking vs. Branching</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong class="text-purple-400 block mb-1">Branching (Dal Açma):</strong>
              <p class="text-slate-400">Aynı depo içinde gerçekleşir. Depoda yazma yetkiniz varsa dal açıp kod gönderirsiniz (Örn: Şirket içi ekip projeleri).</p>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong class="text-cyan-400 block mb-1">Forking (Çatallama):</strong>
              <p class="text-slate-400">Yazma yetkiniz olmayan bir açık kaynak deponun sunucu tarafında kendi GitHub hesabınıza tam bağımsız bir kopyasını üretmektir. Kendi kopyanızda çalışıp orijinal depoya PR gönderirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c9"
  },
  {
    id: "3-3-6",
    curriculumCode: "3.3.6",
    title: "3.3.6 Git Commands",
    badge: "Komut Rehberi",
    icon: "terminal",
    summary: "Komut sözlüğü, flag'ler, parametreler, config seviyeleri ve git reflog hayat kurtarıcısı.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50"></span>
            Kapsamlı Git Komutları Sözlüğü
          </h3>
          <p class="text-slate-300">
            Git komutları basit fiillerden oluşur. Her komutun davranışını özelleştiren parametreler (flags) bulunur.
          </p>
        </div>

        <!-- 1. Yapılandırma -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-emerald-400 text-xs mb-2">1. Kurulum ve Kimlik Yapılandırması</h4>
          <div class="space-y-2 font-mono text-[11px]">
            <div class="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <span class="text-emerald-400">git config --global user.name "Ad Soyad"</span>
              <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Tüm depolar için global commit yazar adını kaydeder (~/.gitconfig).</p>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <span class="text-emerald-400">git config --global user.email "mail@domain.com"</span>
              <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">GitHub hesap e-postanızla eşleşen adresi kaydeder.</p>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <span class="text-emerald-400">git config --list</span>
              <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Tanımlanmış tüm konfigürasyon değişkenlerini listeler.</p>
            </div>
          </div>
        </div>

        <!-- 2. İnceleme ve Durum -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-cyan-400 text-xs mb-2">2. Durum İnceleme ve Tarihçe</h4>
          <div class="space-y-2 font-mono text-[11px]">
            <div class="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <span class="text-cyan-400">git status -s</span>
              <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Kısa ve özet durum raporu verir (M: modified, ??: untracked, A: added).</p>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <span class="text-cyan-400">git log --oneline --graph --all</span>
              <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Tüm dalların commit ağacını renkli ASCII çizgileriyle terminalde çizer.</p>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
              <span class="text-cyan-400">git reflog</span>
              <p class="text-slate-400 font-sans text-[10.5px] mt-0.5">Git'in kara kutusudur! HEAD göstergesinin son 90 gündeki her bir hareketini kaydeder. Yanlışlıkla silinen dallar veya hard reset ile kaybolan commit'ler buradan kurtarılır.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c1"
  },
  {
    id: "3-3-7",
    curriculumCode: "3.3.7",
    title: "3.3.7 Adding and Removing Files",
    badge: "Dosya Yönetimi",
    icon: "file-plus",
    summary: "Staging Area derinliği, git add varyasyonları, git rm vs git rm --cached ve .gitignore kuralları.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm shadow-amber-400/50"></span>
            Dosya Ekleme, Kaldırma ve Takipten Çıkarma
          </h3>
          <p class="text-slate-300">
            Git'te dosya yönetimi yalnızca dosya oluşturmaktan ibaret değildir. Dosyaları güvenle silmek, yeniden adlandırmak veya hassas bilgileri depodan uzak tutmak kritik bir yetenektir.
          </p>
        </div>

        <!-- Staging Area Mantığı -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="text-xs font-bold text-white mb-2">Neden Doğrudan Commit Değil de "Staging Area" (Sahne) Var?</h4>
          <p class="text-slate-300 mb-2">
            SVN gibi sistemlerde commit attığınızda çalışma dizinindeki her şey doğrudan tek pakette gönderilir. Git'teki <strong class="text-amber-400">Staging Area</strong> ise bir seçici filtredir:
          </p>
          <div class="p-2.5 bg-slate-900 rounded text-slate-300 text-[11px] space-y-1">
            <p>• Aynı anda 3 farklı dosya düzenlediyseniz, sadece 1 tanesini sahneye ekleyip (<code class="text-amber-300">git add dosya1</code>) bağımsız ve temiz bir commit oluşturabilirsiniz.</p>
            <p>• Yarım kalmış deneysel kodları commit'e dahil etmeden sadece bitmiş kısımları mühürleyebilirsiniz.</p>
          </div>
        </div>

        <!-- git add Parametreleri -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-emerald-400 text-xs mb-2">git add Parametreleri</h4>
          <div class="space-y-2 font-mono text-[11px]">
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-emerald-400">git add &lt;dosya-adı&gt;</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">Sadece belirtilen dosyayı sahneye alır.</span>
            </div>
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-emerald-400">git add .</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">Bulunulan dizin ve alt klasörlerdeki tüm yeni ve değiştirilmiş dosyaları ekler.</span>
            </div>
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-emerald-400">git add -p</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">İnteraktif yama modu: Bir dosyadaki satır satır değişiklikleri ayrı ayrı seçerek sahnelemenizi sağlar.</span>
            </div>
          </div>
        </div>

        <!-- git rm vs git rm --cached -->
        <div class="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
          <h4 class="font-bold text-rose-400 text-xs mb-2">Kritik Fark: git rm vs. git rm --cached</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <code class="text-rose-400 font-bold block mb-1">git rm app.log</code>
              <p class="text-slate-300">Dosyayı <strong>hem yerel diskinizden siler</strong> hem de Git takibinden çıkarıp silme işlemini sahneye ekler.</p>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <code class="text-amber-400 font-bold block mb-1">git rm --cached .env</code>
              <p class="text-slate-300">Dosyayı <strong>diskinizde kesinlikle silmez</strong>; yalnızca Git'in takibinden (Staging/Repo) çıkarır. Şifre içeren konfigürasyon dosyalarını korumak için hayati önem taşır!</p>
            </div>
          </div>
        </div>

        <!-- .gitignore Rehberi -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-2">.gitignore Sözdizimi ve Kuralları</h4>
          <p class="text-slate-300 mb-2">Depo kök dizininde <code class="text-cyan-300 font-mono">.gitignore</code> dosyası oluşturarak Git'in yok sayacağı desenleri belirlersiniz:</p>
          <pre class="bg-slate-950 p-2.5 rounded border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed">
# Belirli uzantıdaki tüm dosyaları yoksay
*.log
*.tmp

# Belirli bir klasörün tamamını yoksay
node_modules/
dist/
__pycache__/

# Yoksayma kuralından bir dosyayı muaf tut (!)
!production.log

# Sadece ana dizindeki dosyayı yoksay (alt dizinler etkilenmez)
/ana_dizin_dosyasi.txt
          </pre>
        </div>
      </div>
    `,
    relatedChallengeId: "c3"
  },
  {
    id: "3-3-8",
    curriculumCode: "3.3.8",
    title: "3.3.8 Updating Repositories",
    badge: "Senkronizasyon",
    icon: "refresh-cw",
    summary: "Commit anatomisi, Conventional Commits standardı, Push kuralları ve Fetch ile Pull farkı.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400/50"></span>
            Depoları Güncelleme (Updating Repositories)
          </h3>
          <p class="text-slate-300">
            Git depolarını güncellemek iki yönlüdür: Yerel depoyu yeni commit'lerle beslemek ve bu commit'leri uzak sunucuyla senkronize etmek.
          </p>
        </div>

        <!-- İyi Bir Commit Mesajı Standartı -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-cyan-400 text-xs mb-2">Endüstri Standardı: Conventional Commits</h4>
          <p class="text-slate-300 mb-2">
            Profesyonel ekiplerde commit mesajları rastgele yazılmaz; otomatik sürüm takibi ve changelog üretimi için belirli öneklerle başlatılır:
          </p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-[10.5px]">
            <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-emerald-400 font-bold">feat:</span> Yeni bir özellik eklendi</div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-rose-400 font-bold">fix:</span> Bir hata düzeltildi</div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-blue-400 font-bold">docs:</span> Sadece dokümantasyon değişti</div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-purple-400 font-bold">refactor:</span> Kod davranışı değişmeden temizlendi</div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-amber-400 font-bold">test:</span> Test kodları yazıldı</div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800"><span class="text-slate-400 font-bold">chore:</span> Paket veya derleme ayarları</div>
          </div>
        </div>

        <!-- Fetch vs Pull -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-2">Hayati Soru: git fetch ile git pull Arasındaki Fark Nedir?</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-[11px]">
            <div class="p-3 bg-slate-900 rounded-lg border border-sky-500/30">
              <strong class="text-sky-400 block mb-1">git fetch origin:</strong>
              <p class="text-slate-300 mb-2">Uzak depodaki yeni commit'leri indirir ve yerel bilgisayarınızdaki <code class="text-sky-300 font-mono">origin/main</code> işaretçisini günceller.</p>
              <div class="text-[10px] text-emerald-300 bg-emerald-950/30 p-1.5 rounded">
                ✔ Güvenlidir: Çalışma dizinindeki dosyalarınıza dokunmaz. İnceleyip karar vermenize imkan tanır.
              </div>
            </div>

            <div class="p-3 bg-slate-900 rounded-lg border border-purple-500/30">
              <strong class="text-purple-400 block mb-1">git pull origin main:</strong>
              <p class="text-slate-300 mb-2">Arka planda iki komutu peş peşe çalıştırır: <code class="text-purple-300 font-mono">git fetch</code> + <code class="text-purple-300 font-mono">git merge</code>.</p>
              <div class="text-[10px] text-amber-300 bg-amber-950/30 p-1.5 rounded">
                ⚡ Otomatiktir: Yenilikleri anında indirir ve o an bulunduğunuz aktif yerel dalla hemen birleştirir.
              </div>
            </div>
          </div>
        </div>

        <!-- Push ve Upstream -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-1.5">Upstream İzleme: -u / --set-upstream</h4>
          <p class="text-slate-300 text-[11px] mb-2">
            İlk push işleminizde <code class="text-cyan-300 font-mono">git push -u origin main</code> yazdığınızda, yerel <code class="text-slate-300">main</code> dalınız uzak <code class="text-slate-300">origin/main</code> dalına bağlanır. Daha sonraki günlerde yalnızca <code class="text-cyan-300 font-mono">git push</code> veya <code class="text-cyan-300 font-mono">git pull</code> yazmanız yeterli olur!
          </p>
        </div>
      </div>
    `,
    relatedChallengeId: "c10"
  },
  {
    id: "3-3-9",
    curriculumCode: "3.3.9",
    title: "3.3.9 Branching Features",
    badge: "İleri Düzey",
    icon: "git-merge",
    summary: "Fast-Forward vs 3-Way Merge, Rebase felsefesi, Merge Conflict anatomisi ve çözümü.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-purple-400 inline-block shadow-sm shadow-purple-400/50"></span>
            Gelişmiş Dallanma Özellikleri ve Birleştirme
          </h3>
          <p class="text-slate-300">
            Dallarla paralel çalışmanın en kritik anı, bağımsız geliştirilen özelliklerin ana hatta güvenle geri birleştirilmesidir (merging).
          </p>
        </div>

        <!-- 2 Temel Merge Türü -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div class="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
            <h4 class="font-bold text-emerald-400 text-xs mb-1.5 flex items-center gap-1.5">
              <span>⏩</span> Fast-Forward Merge
            </h4>
            <p class="text-slate-300 text-[11px] mb-2">
              Siz özellik dalında çalışırken, ana <code class="text-emerald-300">main</code> dalında hiçbir yeni commit atılmadıysa gerçekleşir.
            </p>
            <div class="p-2.5 bg-slate-900 rounded font-mono text-[10px] text-slate-300 mb-2">
              C0 --- C1 (main) --- C2 --- C3 (feature)<br>
              Merge sonrası:<br>
              C0 --- C1 --- C2 --- C3 (main, feature)
            </div>
            <p class="text-slate-400 text-[10.5px]">Ek bir merge commit üretilmez; <code class="text-emerald-300">main</code> dalı doğrudan en son commite kaydırılır.</p>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
            <h4 class="font-bold text-purple-400 text-xs mb-1.5 flex items-center gap-1.5">
              <span>🔀</span> 3-Way Merge (Üç Yollu Birleştirme)
            </h4>
            <p class="text-slate-300 text-[11px] mb-2">
              Hem ana dalda hem de özellik dalında bağımsız yeni commit'ler atıldıysa gerçekleşir.
            </p>
            <div class="p-2.5 bg-slate-900 rounded font-mono text-[10px] text-slate-300 mb-2">
                     --- C2 (feature) ----<br>
                    /                      \\<br>
              C0 - C1 (Base) ---- C3 (main) - C4 (Merge Commit)
            </div>
            <p class="text-slate-400 text-[10.5px]">Git ortak atayı (C1), main'i (C3) ve feature'ı (C2) harmanlar ve <strong class="text-white">iki ebeveyni (parent) olan özel bir Merge Commit</strong> üretir.</p>
          </div>
        </div>

        <!-- Merge Conflict Çözümü -->
        <div class="p-4 bg-slate-950 rounded-xl border border-rose-500/40">
          <h4 class="font-bold text-rose-400 text-xs mb-2">⚡ Merge Conflict (Birleştirme Çakışması) Adım Adım Çözümü</h4>
          <p class="text-slate-300 text-[11px] mb-3">
            Eğer iki dalda aynı dosyanın aynı satırları farklı şekilde değiştirildiyse Git hangisinin doğru olduğuna karar veremez ve işlemi durdurarak dosyanın içine çakışma etiketleri bırakır:
          </p>
          
          <pre class="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 mb-3">
<span class="text-cyan-400 font-bold">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Sizin şu anki dalınızdaki kod)</span>
port = 8080
<span class="text-slate-500 font-bold">======= (Ayrım çizgisi)</span>
port = 9000
<span class="text-purple-400 font-bold">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-service (Birleştirilmek istenen daldaki kod)</span>
          </pre>

          <div class="space-y-1.5 text-[11px] text-slate-300">
            <div class="flex items-start gap-2">
              <span class="font-bold text-rose-400">1.</span>
              <span>Dosyayı editörde açın, doğru olan satırı (örn: 9000) bırakıp <code class="text-rose-300 font-mono">&lt;&lt;&lt;</code>, <code class="text-slate-400 font-mono">===</code>, <code class="text-purple-300 font-mono">&gt;&gt;&gt;</code> satırlarını tamamen silin.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="font-bold text-rose-400">2.</span>
              <span>Çözülen dosyayı sahneye ekleyin: <code class="text-emerald-400 font-mono">git add dosya.py</code></span>
            </div>
            <div class="flex items-start gap-2">
              <span class="font-bold text-rose-400">3.</span>
              <span>Birleştirmeyi tamamlayın: <code class="text-emerald-400 font-mono">git commit -m "Merge conflict cozuldu"</code></span>
            </div>
          </div>
        </div>

        <!-- Merge vs Rebase -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-1.5">Merge vs. Rebase: Hangisi Ne Zaman?</h4>
          <p class="text-slate-300 text-[11px] mb-2">
            <code class="text-amber-400 font-mono">git rebase main</code> komutu, özellik dalınızdaki tüm commit'leri geçici olarak kenara alır, dalınızın kökünü en güncel main commit'inin ucuna taşır ve commit'lerinizi sırayla yeniden uygular. Böylece geçmiş tamamen doğrusal (linear) kalır.
          </p>
          <div class="p-2 bg-amber-950/20 border border-amber-500/20 rounded text-[10.5px] text-amber-200">
            ⚠️ <strong>Rebase Altın Kuralı:</strong> Herkese açık (public/remote) paylaşılan ana dallarda asla rebase yapmayın! Sadece kendi yerel özel dallarınızda kullanın.
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c8"
  },
  {
    id: "3-3-10",
    curriculumCode: "3.3.10",
    title: "3.3.10 .diff Files",
    badge: "Derinlemesine İnceleme",
    icon: "file-text",
    summary: "Unified Diff formatı, chunk/hunk header'ları @@ okuma, diff flag'leri ve patch dosyaları.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-pink-400 inline-block shadow-sm shadow-pink-400/50"></span>
            .diff ve Yama (Patch) Dosyalarının Anatomisi
          </h3>
          <p class="text-slate-300">
            Versiyon kontrol sistemlerinin temel yapı taşı iki metin arasındaki farklardır. Git bu farkları <strong class="text-white">Unified Diff Formatı</strong> adı verilen endüstri standardı bir dille ifade eder.
          </p>
        </div>

        <!-- Diff Formatının Satır Satır Çözümlemesi -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-pink-400 text-xs mb-2">Unified Diff Formatını Satır Satır Okuma</h4>
          
          <pre class="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 mb-3">
<span class="text-slate-400">1: diff --git a/server.py b/server.py</span>
<span class="text-slate-400">2: index 83a21b..f42c19 100644</span>
<span class="text-rose-400 font-bold">3: --- a/server.py (Değişiklik öncesi eski dosya: 'a')</span>
<span class="text-emerald-400 font-bold">4: +++ b/server.py (Değişiklik sonrası yeni dosya: 'b')</span>
<span class="text-cyan-400 font-bold">5: @@ -15,4 +15,5 @@ (Hunk Header: Satır aralıkları)</span>
<span class="text-slate-400">6:  def start_server():</span>
<span class="text-rose-400 font-bold">7: -    timeout = 30        # Silinen veya güncellenen eski satır (-)</span>
<span class="text-emerald-400 font-bold">8: +    timeout = 60        # Yeni eklenen güncel satır (+)</span>
<span class="text-emerald-400 font-bold">9: +    max_retries = 3     # Yeni eklenen satır (+)</span>
<span class="text-slate-400">10:     return connect()</span>
          </pre>

          <div class="space-y-1.5 text-[11px] text-slate-300">
            <p>• <strong class="text-cyan-400 font-mono">@@ -15,4 +15,5 @@</strong> ifadesi ne anlama gelir?<br>
              Eski dosyada 15. satırdan başlayan 4 satırlık blok alınmış, yeni dosyada 15. satırdan başlayan 5 satırlık bir bloğa dönüştürülmüştür.
            </p>
            <p>• Başında boşluk olan satırlar (6. ve 10. satırlar) değişmeyen çevre bağlam (context) satırlarıdır.</p>
          </div>
        </div>

        <!-- Diff Komut Çeşitleri -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-2">En Çok Kullanılan git diff Komutları</h4>
          <div class="space-y-2 font-mono text-[11px]">
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-pink-400">git diff</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">Çalışma dizini (Working Directory) ile sahne (Staging Area) arasındaki henüz sahnelenmemiş farkları listeler.</span>
            </div>
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-pink-400">git diff --staged (veya --cached)</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">Sahnelenmiş olan dosyalar ile son commit (HEAD) arasındaki farkları gösterir (commit'ten önce son kontrol).</span>
            </div>
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-pink-400">git diff main..feature-api</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">İki dal arasındaki tüm kod farklarını karşılaştırır.</span>
            </div>
            <div class="p-2 bg-slate-900 rounded text-slate-300">
              <span class="text-pink-400">git diff c1a4 e8f2</span>
              <span class="text-slate-400 font-sans block text-[10.5px]">Herhangi iki commit hash'i arasındaki tüm farkları listeler.</span>
            </div>
          </div>
        </div>

        <!-- Patch Dosyası Üretme -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-1.5">Patch (Yama) Dosyaları Nasıl Kullanılır?</h4>
          <p class="text-slate-300 text-[11px] mb-2">
            İnternet veya Git sunucusu olmayan ortamlarda kod değişiklikleri bir <code class="text-pink-300 font-mono">.patch</code> veya <code class="text-pink-300 font-mono">.diff</code> dosyasına aktarılıp e-posta ile gönderilebilir:
          </p>
          <div class="p-2 bg-slate-950 rounded font-mono text-[11px] text-slate-300 space-y-1">
            <div><span class="text-pink-400">git diff > yenilikler.patch</span> <span class="text-slate-500"># Farkları yama dosyasına kaydeder</span></div>
            <div><span class="text-emerald-400">git apply yenilikler.patch</span> <span class="text-slate-500"># Yamayı başka bir bilgisayarda projeye uygular</span></div>
          </div>
        </div>
      </div>
    `,
    relatedChallengeId: "c4"
  },
  {
    id: "3-3-11",
    curriculumCode: "3.3.11",
    title: "3.3.11 Lab - Software Version Control with Git",
    badge: "Uygulamalı Final",
    icon: "flask-conical",
    summary: "Cisco DevNet standardında A'dan Z'ye uçtan uca kapsamlı pratik laboratuvarı.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50"></span>
            3.3.11 Kapsamlı Laboratuvar Görevi (Capstone Lab)
          </h3>
          <p class="text-slate-300">
            Bu laboratuvar, 3.3.1'den 3.3.10'a kadar öğrendiğiniz tüm teorik bilgileri gerçek dünya senaryosunda bir network automation / software mühendisi gibi test etmenizi sağlar.
          </p>
        </div>

        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <h4 class="font-bold text-white text-xs">Laboratuvar İş Akışı ve Başarı Kriterleri:</h4>
          
          <div class="space-y-2.5 text-[11px]">
            <div class="flex items-start gap-2.5 p-2 bg-slate-900 rounded-lg border border-slate-800/80">
              <span class="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong class="text-white">Depo Başlatma:</strong>
                <p class="text-slate-400">Proje dizininde <code class="text-emerald-300 font-mono">git init</code> çalıştırarak versiyon kontrolünü başlatın.</p>
              </div>
            </div>

            <div class="flex items-start gap-2.5 p-2 bg-slate-900 rounded-lg border border-slate-800/80">
              <span class="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong class="text-white">Dosya Sahneleme & İlk Sürüm:</strong>
                <p class="text-slate-400"><code class="text-emerald-300 font-mono">git add .</code> ile dosyaları sahneye alın ve anlamlı bir mesajla ilk commit'i atın.</p>
              </div>
            </div>

            <div class="flex items-start gap-2.5 p-2 bg-slate-900 rounded-lg border border-slate-800/80">
              <span class="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong class="text-white">İzole Özellik Dalı (Branching):</strong>
                <p class="text-slate-400"><code class="text-emerald-300 font-mono">git checkout -b devnet-branch</code> ile yeni dal açın, yeni bir geliştirme commit'leyin.</p>
              </div>
            </div>

            <div class="flex items-start gap-2.5 p-2 bg-slate-900 rounded-lg border border-slate-800/80">
              <span class="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong class="text-white">Geri Dönüş ve Birleştirme (Merging):</strong>
                <p class="text-slate-400"><code class="text-emerald-300 font-mono">git checkout main</code> ile ana dala dönüp özelliği <code class="text-emerald-300 font-mono">git merge devnet-branch</code> ile birleştirin.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center justify-between">
          <div>
            <h5 class="text-white font-bold text-xs">Final Laboratuvarını Başlatmaya Hazır Mısınız?</h5>
            <p class="text-[11px] text-slate-400">Sağdaki terminal ve canlı commit ağacında laboratuvarı tamamlayıp sertifikanızı alın.</p>
          </div>
          <button id="btn-start-capstone-lab" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 shrink-0">
            Laboratuvara Başla →
          </button>
        </div>
      </div>
    `,
    relatedChallengeId: "c11"
  },
  {
    id: "3-3-12",
    curriculumCode: "3.3.12",
    title: "3.3.12 Masterclass: Kodları Locale Çekme & Merge Derinliği",
    badge: "Masterclass",
    icon: "git-pull-request",
    summary: "Neden push kolay ama pull ve merge zordur? Fetch vs Pull farkı, Remote Tracking ve Conflict çözümü.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <!-- Giriş -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400/50"></span>
            Neden "Push" Kolaydır da "Pull & Merge" Kafa Karıştırır?
          </h3>
          <p class="text-slate-300">
            Tek başınıza çalışırken kod yazıp <code class="text-emerald-300 font-mono">git push</code> yapmak basittir; çünkü tek yönlüdür. Ancak gerçek bir şirkete veya açık kaynak bir ekibe girdiğinizde asıl iş; <strong>başkalarının yazdığı kodları kendi bilgisayarınıza çekmek (pull)</strong> ve <strong>kendi kodunuzla çakışmadan harmanlamaktır (merge)</strong>.
          </p>
        </div>

        <!-- Bilgisayarınızda Neden İki Tane Main Vardır? -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-sky-400 text-xs mb-2">1. Zihinde Canlandırma: Bilgisayarınızda Neden İKİ Tane 'main' Vardır?</h4>
          <p class="text-slate-300 mb-3">
            Pek çok geliştiricinin kafasını karıştıran ilk şey şudur: Bilgisayarınızda sadece bir <code class="text-emerald-400 font-mono">main</code> yoktur! İki tane vardır:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 bg-slate-900 rounded-lg border border-emerald-500/30">
              <strong class="text-emerald-400 block mb-1">1. Yerel main (Local main):</strong>
              <p class="text-slate-400">Sizin kod yazdığınız, kendi commit'lerinizi attığınız yerel dalınız.</p>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-sky-500/30">
              <strong class="text-sky-400 block mb-1">2. Uzak Referans (origin/main):</strong>
              <p class="text-slate-400">GitHub'daki en son durumun bilgisayarınızdaki aynası (fotoğrafı). Siz kod yazarken arkadaşınız GitHub'a bir şey atarsa, GitHub'daki main ilerler ama sizin haberiniz olmaz!</p>
            </div>
          </div>
        </div>

        <!-- Fetch vs Pull Farkı -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-amber-400 text-xs mb-2">2. git fetch vs git pull: Ne Zaman Hangisi?</h4>
          <div class="space-y-3 text-[11px]">
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div class="flex items-center gap-2 mb-1">
                <code class="text-amber-400 font-bold font-mono">git fetch origin</code>
                <span class="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Güvenli İnceleme</span>
              </div>
              <p class="text-slate-300">
                GitHub'daki yeni commit'leri indirir ve yerelinizdeki <code class="text-sky-300 font-mono">origin/main</code> etiketini ileri taşır. <strong>Çalışma klasörünüzdeki dosyalara ASLA dokunmaz!</strong> Böylece ne değiştiğini güvenle inceleyebilirsiniz.
              </p>
            </div>

            <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div class="flex items-center gap-2 mb-1">
                <code class="text-cyan-400 font-bold font-mono">git pull origin main</code>
                <span class="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded">Fetch + Merge</span>
              </div>
              <p class="text-slate-300">
                Önce arka planda <code class="text-cyan-300 font-mono">git fetch</code> yapar, hemen ardından o anki dalınızla birleştirmek için <code class="text-cyan-300 font-mono">git merge origin/main</code> komutunu çalıştırır. Eğer aynı satırları değiştirdiyseniz çakışma (conflict) çıkar!
              </p>
            </div>
          </div>
        </div>

        <!-- Uzaktaki Dalı Locale Çekme -->
        <div class="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
          <h4 class="font-bold text-purple-400 text-xs mb-2">3. Arkadaşımın GitHub'da Açtığı Dalı Bilgisayarıma Nasıl Çekerim?</h4>
          <p class="text-slate-300 text-[11px] mb-2">
            Arkadaşınız GitHub'da <code class="text-purple-300 font-mono">feature-odeme</code> diye bir dal açtı. Bilgisayarınızda <code class="text-slate-400 font-mono">git branch</code> yazarsanız bu dalı göremezsiniz. Adımlar:
          </p>
          <div class="p-3 bg-slate-900 rounded-lg font-mono text-[11px] space-y-1.5 text-slate-300">
            <div><span class="text-slate-500"># 1. Uzaktaki yeni dalları bilgisayarına bildir:</span></div>
            <div><span class="text-purple-400">git fetch origin</span></div>
            <div><span class="text-slate-500"># 2. Doğrudan o dala geç (Git otomatik olarak origin/feature-odeme'den yerel dal üretir):</span></div>
            <div><span class="text-emerald-400">git switch feature-odeme</span></div>
          </div>
        </div>

        <!-- Merge Conflict Çözüm Anatomisi -->
        <div class="p-4 bg-slate-950 rounded-xl border border-rose-500/40">
          <h4 class="font-bold text-rose-400 text-xs mb-2">4. Merge Conflict (Çakışma) Çıktığında Korkmalı mıyım?</h4>
          <p class="text-slate-300 text-[11px] mb-2">
            Kesinlikle hayır! Çakışma bir hata değil, <strong>Git'in sizin kodunuzu koruma yöntemidir</strong>. Git iki farklı insanın aynı satırı değiştirdiğini görünce sessizce birini silmek yerine kararı size bırakır:
          </p>
          
          <pre class="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 mb-2">
<span class="text-cyan-400 font-bold">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span>
const port = 3000; <span class="text-slate-500">// Senin bilgisayarındaki kod</span>
<span class="text-slate-500 font-bold">=======</span>
const port = 8080; <span class="text-slate-500">// Arkadaşının GitHub'dan gelen kodu</span>
<span class="text-purple-400 font-bold">&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</span>
          </pre>

          <div class="text-[11px] text-slate-300 space-y-1">
            <p><strong>Çözüm 3 Adımdır:</strong></p>
            <p>1. Editörde dosyayı aç, istemediğin satırı ve <code class="text-rose-400">&lt;&lt;&lt;</code>, <code class="text-slate-400">===</code>, <code class="text-purple-400">&gt;&gt;&gt;</code> işaretlerini sil.</p>
            <p>2. Dosyayı kaydet ve sahneye ekle: <code class="text-emerald-400 font-mono">git add app.js</code></p>
            <p>3. Birleştirmeyi tamamla: <code class="text-emerald-400 font-mono">git commit -m "Merge conflict cozuldu"</code></p>
          </div>
        </div>

        <!-- git merge --abort -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-amber-400 text-xs mb-1.5">⚡ Hayat Kurtaran: git merge --abort</h4>
          <p class="text-slate-300 text-[11px]">
            Birleştirme sırasında çok fazla dosya çakıştı veya yanlış dala merge yaptığınızı fark ettiniz:
            <code class="text-amber-300 font-mono bg-slate-950 px-2 py-0.5 rounded">git merge --abort</code> yazarak tek bir harf dahi kaybetmeden merge öncesi temiz durumunuza dönebilirsiniz.
          </p>
        </div>

        <div class="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl flex items-center justify-between">
          <div>
            <h5 class="text-white font-bold text-xs">Bu Konunun Canlı Pratiğini Yapın</h5>
            <p class="text-[11px] text-slate-400">Seviye 12 - 16 arasındaki interaktif ekip senaryolarıyla çakışma çözmeyi deneyimleyin.</p>
          </div>
          <button id="btn-go-to-advanced-merge" class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-cyan-600/30 shrink-0">
            İleri Seviye Pratiğe Git →
          </button>
        </div>
      </div>
    `,
    relatedChallengeId: "c14"
  },
  {
    id: "3-3-13",
    curriculumCode: "3.3.13",
    title: "3.3.13 Upstream Mantığı & 'No Upstream Branch' Hatası",
    badge: "Kritik Çözüm",
    icon: "alert-circle",
    summary: "fatal: The current branch has no upstream branch hatası, -u / --set-upstream parametresi ve push.autoSetupRemote.",
    content: `
      <div class="space-y-6 text-slate-200 text-xs leading-relaxed">
        <!-- Giriş -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-rose-400 inline-block shadow-sm shadow-rose-400/50"></span>
            "fatal: The current branch test has no upstream branch" Hatası
          </h3>
          <p class="text-slate-300">
            Git kullanırken yeni bir dal (branch) açıp doğrudan <code class="text-rose-300 font-mono">git push</code> yazdığınızda karşınıza çıkan en yaygın ve kafa karıştırıcı hatadır. Bu ders, bu hatanın arkasındaki mantığı ve kalıcı çözümünü öğretir.
          </p>
        </div>

        <!-- Hatayı Görelim -->
        <div class="p-4 bg-slate-950 rounded-xl border border-rose-500/40">
          <h4 class="font-bold text-rose-300 text-xs mb-2">Terminalde Karşılaşılan Tam Hata Mesajı:</h4>
          <pre class="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300">
<span class="text-rose-400 font-bold">fatal: The current branch test has no upstream branch.</span>
<span class="text-slate-400">To push the current branch and set the remote as upstream, use</span>

    <span class="text-cyan-400 font-bold">git push --set-upstream origin test</span>

<span class="text-slate-500">To have this happen automatically for branches without a tracking upstream, see 'push.autoSetupRemote' in 'git help config'.</span>
          </pre>
        </div>

        <!-- Neden Oldu? -->
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 class="font-bold text-amber-400 text-xs mb-2">Bu Hata Neden Çıkar? (Zihinde Canlandırma)</h4>
          <p class="text-slate-300 mb-2">
            Bilgisayarınızda <code class="text-amber-300 font-mono">git checkout -b test</code> dediğinizde, bu dal <strong>yalnızca sizin yerel diskinizde</strong> oluşturulur. GitHub'ın bu daldan henüz haberi yoktur!
          </p>
          <p class="text-slate-300 mb-3">
            Siz doğrudan <code class="text-rose-300 font-mono">git push</code> dediğinizde Git sorar: <em>"Ben bu 'test' dalını GitHub'daki hangi uzak dala göndereyim? Hangi uzak dala bağlayayım?"</em>
          </p>
          <div class="p-2.5 bg-slate-900 rounded border border-amber-500/30 text-amber-200 text-[11px]">
            Git'te yerel bir dalın GitHub'daki karşılığına <strong>Upstream (Akıntı Yukarısı / Hedef Uzak Dal)</strong> denir. Upstream tanımlı olmadığı için Git işlemi durdurur.
          </div>
        </div>

        <!-- İki Çözüm Yolu -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div class="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 bg-emerald-950/10">
            <h5 class="text-xs font-bold text-emerald-400 mb-2">Çözüm 1: Upstream Bağlantısı ile Gönderme (-u)</h5>
            <p class="text-slate-400 text-[11px] mb-2">İlk push sırasında <code class="text-emerald-300 font-mono">-u</code> parametresi verilir:</p>
            <div class="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-emerald-300">
              git push -u origin test
            </div>
            <p class="text-[10.5px] text-slate-400 mt-2">
              <code class="text-emerald-300 font-mono">-u</code> (--set-upstream), Git'e: <em>"GitHub'da 'test' adında dal aç, yerel dalımı ona bağla ve bunu hatırla!"</em> der. Sonraki seferlerde sadece <code class="text-white font-mono">git push</code> yazmanız yeterli olur!
            </p>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-cyan-500/40 bg-cyan-950/10">
            <h5 class="text-xs font-bold text-cyan-400 mb-2">Çözüm 2: Ömür Boyu Kurtulma Ayarı (Modern Git)</h5>
            <p class="text-slate-400 text-[11px] mb-2">Terminalinize bir kere şu komutu yazın:</p>
            <div class="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-cyan-300">
              git config --global push.autoSetupRemote true
            </div>
            <p class="text-[10.5px] text-slate-400 mt-2">
              Bu ayardan sonra açtığınız her yeni dalda <code class="text-white font-mono">-u</code> yazmayı unutsanız bile Git arka planda otomatik olarak upstream bağlantısını kurar ve bu hata bir daha <strong>asla çıkmaz</strong>! 🚀
            </p>
          </div>
        </div>

        <!-- Neden URL Değil origin? -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h4 class="font-bold text-white text-xs mb-1.5">İpucu: Neden Her Seferinde Uzun URL Yazmamalısınız?</h4>
          <p class="text-slate-300 text-[11px] mb-2">
            Komut satırında <code class="text-slate-400 font-mono">git push https://github.com/Rewony/kevgir test</code> yazmak yerine bir kereye mahsus deponuza takma ad tanımlamalısınız:
          </p>
          <div class="p-2.5 bg-slate-950 rounded font-mono text-[11px] text-slate-300 space-y-1">
            <div><span class="text-purple-400">git remote add origin https://github.com/Rewony/kevgir.git</span></div>
            <div><span class="text-emerald-400">git push -u origin test</span></div>
          </div>
        </div>

        <!-- Pratik Butonu -->
        <div class="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl flex items-center justify-between">
          <div>
            <h5 class="text-white font-bold text-xs">Bu Hatanın Canlı Simülasyonunu Deneyin</h5>
            <p class="text-[11px] text-slate-400">Seviye 17 senaryosunda bu hatayı bizzat üretip çözün.</p>
          </div>
          <button id="btn-go-to-upstream-challenge" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-rose-600/30 shrink-0">
            Seviye 17 Pratiğine Git →
          </button>
        </div>
      </div>
    `,
    relatedChallengeId: "c17"
  }
];
