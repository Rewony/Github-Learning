// 3.3. Version Control Systems Müfredatı ile Birebir Uyumlu 11 Seviye
const GIT_CHALLENGES = [
  {
    id: "c1",
    levelNumber: 1,
    curriculumCode: "3.3.1 - 3.3.2",
    title: "Kimlik Yapılandırma & Depo Başlatma",
    badge: "3.3.2 Git",
    badgeColor: "emerald",
    story: "Yeni bir yazılım projesine başlıyorsun. Linus Torvalds'ın geliştirdiği Git ile çalışmaya başlamadan önce geliştirici kimliğini (adını/e-postanı) yapılandırmalı ve yerel depoyu (.git) başlatmalısın.",
    setup: (engine) => {
      engine.reset();
      engine.workingDir = [
        { name: 'app.py', status: 'untracked' },
        { name: 'requirements.txt', status: 'untracked' },
        { name: 'README.md', status: 'untracked' }
      ];
    },
    goals: [
      {
        id: "g1_1",
        label: "Geliştirici adını yapılandır: git config --global user.name \"Geliştirici\"",
        check: (engine, cmd) => engine.config.userName !== 'Developer' || (cmd && cmd.toLowerCase().includes('user.name'))
      },
      {
        id: "g1_2",
        label: "Git deposunu başlat: git init",
        check: (engine) => engine.isInitialized
      }
    ],
    hints: [
      "1. Adım: git config --global user.name \"Adınız\"",
      "2. Adım: git init"
    ],
    solution: "git config --global user.name \"Ahmet Yilmaz\"\ngit init"
  },
  {
    id: "c2",
    levelNumber: 2,
    curriculumCode: "3.3.6 - 3.3.7",
    title: "Dosya Sahneleme & İlk Snapshot (Commit)",
    badge: "3.3.7 Adding Files",
    badgeColor: "cyan",
    story: "Çalışma dizinindeki dosyaların anlık durumunu incele (status), dosyaları sahneye (Staging Area) taşı ve ilk kalıcı snapshot'ını (initial commit) oluştur.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      engine.branches['main'] = null;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.workingDir = [
        { name: 'app.py', status: 'untracked' },
        { name: 'requirements.txt', status: 'untracked' },
        { name: 'README.md', status: 'untracked' }
      ];
    },
    goals: [
      {
        id: "g2_1",
        label: "Tüm dosyaları sahneye ekle: git add .",
        check: (engine) => engine.stagingArea.length > 0 || Object.keys(engine.commits).length > 0
      },
      {
        id: "g2_2",
        label: "Açıklamalı ilk commit'ini oluştur: git commit -m \"Initial project setup\"",
        check: (engine) => Object.keys(engine.commits).length >= 1
      }
    ],
    hints: [
      "1. git add .",
      "2. git commit -m \"Initial project setup\""
    ],
    solution: "git add .\ngit commit -m \"Initial project setup\""
  },
  {
    id: "c3",
    levelNumber: 3,
    curriculumCode: "3.3.7",
    title: "Dosya Kaldırma (Removing Files & Untracking)",
    badge: "3.3.7 Removing Files",
    badgeColor: "rose",
    story: "Yanlışlıkla 'temp_cache.log' dosyası depoya dahil edilmiş. Bu dosyayı diskten ve Git takibinden kaldırmak için 'git rm' komutunu kullanmalısın.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      engine.commits[c1] = {
        id: c1,
        parents: [],
        msg: "Initial setup",
        timestamp: "10:00",
        branch: "main",
        files: ['app.py', 'temp_cache.log']
      };
      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.workingDir = [{ name: 'temp_cache.log', status: 'clean' }];
    },
    goals: [
      {
        id: "g3_1",
        label: "Gereksiz dosyayı kaldır: git rm temp_cache.log",
        check: (engine) => engine.stagedDeletions.includes('temp_cache.log') || Object.keys(engine.commits).length >= 2
      },
      {
        id: "g3_2",
        label: "Silme işlemini commit'le: git commit -m \"Gereksiz log dosyasi silindi\"",
        check: (engine) => Object.keys(engine.commits).length >= 2
      }
    ],
    hints: [
      "1. git rm temp_cache.log",
      "2. git commit -m \"Gereksiz log dosyasi silindi\""
    ],
    solution: "git rm temp_cache.log\ngit commit -m \"Gereksiz log dosyasi silindi\""
  },
  {
    id: "c4",
    levelNumber: 4,
    curriculumCode: "3.3.10",
    title: ".diff Dosyaları & Farkları İnceleme",
    badge: "3.3.10 .diff Files",
    badgeColor: "pink",
    story: "Bir dosyada değişiklik yapıldı. Bu değişikliği commit etmeden önce 'git diff' komutu ile unified diff (+ / -) satırlarını incele.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      engine.commits[c1] = { id: c1, parents: [], msg: "Base commit", timestamp: "09:00", branch: "main", files: ['app.py'] };
      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
    },
    goals: [
      {
        id: "g4_1",
        label: "Dosya değişiklik farklarını incele: git diff",
        check: (engine, cmd) => cmd && cmd.toLowerCase().includes('diff')
      }
    ],
    hints: [
      "Terminal alanına 'git diff' yazıp Enter'a bas.",
      "Unified diff formatında '+' yeşil satırların eklenenleri, '-' kırmızı satırların silinenleri gösterdiğine dikkat et."
    ],
    solution: "git diff"
  },
  {
    id: "c5",
    levelNumber: 5,
    curriculumCode: "3.3.4",
    title: "Dallanma (What is Branching?)",
    badge: "3.3.4 Branching",
    badgeColor: "purple",
    story: "Ana 'main' dalındaki kodu korumak amacıyla yeni bir servis geliştirmek için 'feature-service' adında bağımsız bir dal aç ve o dala geç.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      engine.commits[c1] = { id: c1, parents: [], msg: "Stable main version", timestamp: "10:00", branch: "main", files: ['app.py'] };
      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
    },
    goals: [
      {
        id: "g5_1",
        label: "'feature-service' adında yeni bir dal oluştur",
        check: (engine) => engine.branches['feature-service'] !== undefined
      },
      {
        id: "g5_2",
        label: "'feature-service' dalına geçiş yap (HEAD -> feature-service)",
        check: (engine) => engine.getCurrentBranch() === 'feature-service'
      }
    ],
    hints: [
      "Tek adımda oluşturup geçmek için: git checkout -b feature-service",
      "Veya: git branch feature-service ardından git switch feature-service"
    ],
    solution: "git checkout -b feature-service"
  },
  {
    id: "c6",
    levelNumber: 6,
    curriculumCode: "3.3.8",
    title: "Depoyu Güncelleme (Updating on Branch)",
    badge: "3.3.8 Updating",
    badgeColor: "purple",
    story: "'feature-service' dalındasın. Geliştirdiğin yeni servis kodlarını sahnele ve commit'le.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      engine.commits[c1] = { id: c1, parents: [], msg: "Stable main version", timestamp: "10:00", branch: "main", files: ['app.py'] };
      engine.branches['main'] = c1;
      engine.branches['feature-service'] = c1;
      engine.HEAD = { type: 'branch', name: 'feature-service' };
      engine.workingDir = [{ name: 'service.py', status: 'untracked' }];
    },
    goals: [
      {
        id: "g6_1",
        label: "Yeni dosyaları sahneye al: git add .",
        check: (engine) => engine.stagingArea.length > 0 || Object.keys(engine.commits).length >= 2
      },
      {
        id: "g6_2",
        label: "'feature-service' dalında commit oluştur: git commit -m \"Microservice kodlandi\"",
        check: (engine) => engine.getCurrentBranch() === 'feature-service' && Object.keys(engine.commits).length >= 2
      }
    ],
    hints: [
      "1. git add .",
      "2. git commit -m \"Microservice kodlandi\""
    ],
    solution: "git add .\ngit commit -m \"Microservice kodlandi\""
  },
  {
    id: "c7",
    levelNumber: 7,
    curriculumCode: "3.3.9",
    title: "Dallanma Özellikleri: Fast-Forward Merge",
    badge: "3.3.9 Branching Features",
    badgeColor: "orange",
    story: "Özellik dalı başarıyla tamamlandı. Ana 'main' dalına geri dön ve 'feature-service' dalını hızlı birleştirme (Fast-forward) ile dahil et.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2 = engine.generateHash();
      engine.commits[c1] = { id: c1, parents: [], msg: "Stable main", timestamp: "10:00", branch: "main", files: ['app.py'] };
      engine.commits[c2] = { id: c2, parents: [c1], msg: "Microservice kodlandi", timestamp: "10:30", branch: "feature-service", files: ['service.py'] };
      engine.branches['main'] = c1;
      engine.branches['feature-service'] = c2;
      engine.HEAD = { type: 'branch', name: 'feature-service' };
    },
    goals: [
      {
        id: "g7_1",
        label: "Önce 'main' dalına dön: git checkout main",
        check: (engine) => engine.getCurrentBranch() === 'main'
      },
      {
        id: "g7_2",
        label: "Özellik dalını birleştir: git merge feature-service",
        check: (engine) => engine.getCurrentBranch() === 'main' && engine.branches['main'] === engine.branches['feature-service']
      }
    ],
    hints: [
      "1. git checkout main",
      "2. git merge feature-service"
    ],
    solution: "git checkout main\ngit merge feature-service"
  },
  {
    id: "c8",
    levelNumber: 8,
    curriculumCode: "3.3.9",
    title: "Dallanma Özellikleri: 3-Way Merge (Çift Ebeveyn)",
    badge: "3.3.9 3-Way Merge",
    badgeColor: "amber",
    story: "Hem ana dalda hem de 'feature-api' dalında bağımsız commit'ler atıldı. İki dalı birleştirerek yeni bir Merge Commit üret.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2 = engine.generateHash();
      const c3 = engine.generateHash();

      engine.commits[c1] = { id: c1, parents: [], msg: "Ortak ata (Common ancestor)", timestamp: "08:00", branch: "main", files: ['app.py'] };
      engine.commits[c2] = { id: c2, parents: [c1], msg: "Main dalinda acil bugfix", timestamp: "08:30", branch: "main", files: ['patch.py'] };
      engine.commits[c3] = { id: c3, parents: [c1], msg: "API entegrasyonu tamamlandi", timestamp: "08:45", branch: "feature-api", files: ['api.py'] };

      engine.branches['main'] = c2;
      engine.branches['feature-api'] = c3;
      engine.HEAD = { type: 'branch', name: 'main' };
    },
    goals: [
      {
        id: "g8_1",
        label: "'feature-api' dalını birleştir: git merge feature-api",
        check: (engine) => {
          const curId = engine.getCurrentCommitId();
          if (!curId) return false;
          const c = engine.commits[curId];
          return c && c.parents && c.parents.length === 2;
        }
      }
    ],
    hints: [
      "Şu an zaten main dalındasınız.",
      "git merge feature-api komutunu çalıştırın."
    ],
    solution: "git merge feature-api"
  },
  {
    id: "c9",
    levelNumber: 9,
    curriculumCode: "3.3.3 - 3.3.5",
    title: "GitHub Uzak Depo (Remote) & Push",
    badge: "3.3.5 GitHub",
    badgeColor: "blue",
    story: "Yerel projen hazır. Şimdi projeyi GitHub bulut sunucusuna bağlayıp 'origin' adıyla push et.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      engine.commits[c1] = { id: c1, parents: [], msg: "Production ready v1.0", timestamp: "11:00", branch: "main", files: ['app.py'] };
      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
    },
    goals: [
      {
        id: "g9_1",
        label: "'origin' uzak deposunu ekle: git remote add origin https://github.com/cisco-devnet/lab.git",
        check: (engine) => engine.remotes['origin'] !== undefined
      },
      {
        id: "g9_2",
        label: "Kodları GitHub'a gönder: git push -u origin main",
        check: (engine) => engine.remotes['origin'] && engine.remotes['origin'].branches['main'] !== undefined
      }
    ],
    hints: [
      "1. git remote add origin https://github.com/cisco-devnet/lab.git",
      "2. git push -u origin main"
    ],
    solution: "git remote add origin https://github.com/cisco-devnet/lab.git\ngit push -u origin main"
  },
  {
    id: "c10",
    levelNumber: 10,
    curriculumCode: "3.3.8",
    title: "Depo Güncelleme: Fetch & Pull",
    badge: "3.3.8 Pulling",
    badgeColor: "cyan",
    story: "Ekip arkadaşların uzak depoda (GitHub) yeni commit'ler paylaştı. Yerel depoyu güncellemek için yenilikleri çek (pull).",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      engine.commits[c1] = { id: c1, parents: [], msg: "Initial", timestamp: "12:00", branch: "main", files: ['app.py'] };
      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.remotes['origin'] = {
        url: 'https://github.com/cisco-devnet/lab.git',
        branches: { main: c1 }
      };
    },
    goals: [
      {
        id: "g10_1",
        label: "GitHub değişikliklerini çek: git pull origin main",
        check: (engine, cmd) => cmd && cmd.toLowerCase().includes('pull')
      }
    ],
    hints: [
      "git pull origin main komutunu çalıştırın."
    ],
    solution: "git pull origin main"
  },
  {
    id: "c11",
    levelNumber: 11,
    curriculumCode: "3.3.11",
    title: "3.3.11 Lab - Software Version Control with Git (Capstone)",
    badge: "3.3.11 Lab",
    badgeColor: "emerald",
    story: "Tebrikler! 3.3 modülünün büyük final laboratuvarındasınız. Bu laboratuvarda sıfırdan bir depo başlatacak, dosya ekleyip commitleyecek, özellik dalı açacak, birleştirecek ve uzak depoya push edeceksiniz.",
    setup: (engine) => {
      engine.reset();
      engine.workingDir = [
        { name: 'main.py', status: 'untracked' },
        { name: 'test_devnet.py', status: 'untracked' }
      ];
    },
    goals: [
      {
        id: "g11_1",
        label: "Depoyu başlat: git init",
        check: (engine) => engine.isInitialized
      },
      {
        id: "g11_2",
        label: "Dosyaları ekleyip ilk commit'i at: git add . && git commit -m \"Lab baslangic\"",
        check: (engine) => Object.keys(engine.commits).length >= 1
      },
      {
        id: "g11_3",
        label: "Yeni bir dal açıp commit at: git checkout -b devnet-branch",
        check: (engine) => engine.branches['devnet-branch'] !== undefined
      },
      {
        id: "g11_4",
        label: "Main dalına dön ve birleştir: git checkout main && git merge devnet-branch",
        check: (engine) => engine.getCurrentBranch() === 'main' && engine.branches['main'] === engine.branches['devnet-branch']
      }
    ],
    hints: [
      "1. git init",
      "2. git add .",
      "3. git commit -m \"Lab baslangic\"",
      "4. git checkout -b devnet-branch",
      "5. git commit -m \"Lab gelistirme\"",
      "6. git checkout main",
      "7. git merge devnet-branch"
    ],
    solution: "git init\ngit add .\ngit commit -m \"Lab baslangic\"\ngit checkout -b devnet-branch\ngit commit -m \"Lab gelistirme\"\ngit checkout main\ngit merge devnet-branch"
  },
  {
    id: "c12",
    levelNumber: 12,
    curriculumCode: "İleri Seviye: Çekme & İnceleme",
    title: "Kodları Locale Çekme 1: git fetch vs git pull",
    badge: "Fetch vs Pull",
    badgeColor: "sky",
    story: "Takım arkadaşın Ali, GitHub üzerindeki 'main' dalına yeni bir commit pushladı (canlı ağaçta görünüyor). Kendi çalışma alanını bozmadan önce sadece referansları incelemek için 'git fetch origin' yapmalı, ardından 'git merge origin/main' (veya doğrudan 'git pull') ile kodları yerel main dalına çekmelisin.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2_ali = engine.generateHash();

      // Yerel durum (c1)
      engine.commits[c1] = { id: c1, parents: [], msg: "Ortak başlangıç sürümü", timestamp: "09:00", branch: "main", files: ['app.py'] };
      // Ali'nin GitHub'a attığı yeni commit (c2_ali)
      engine.commits[c2_ali] = { id: c2_ali, parents: [c1], msg: "Ali: Veritabanı bağlantı havuzu eklendi", timestamp: "09:30", branch: "main", files: ['db.py'] };

      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.remotes['origin'] = {
        url: 'https://github.com/sirket/proje.git',
        branches: { main: c2_ali }
      };
      engine.pendingRemoteCommit = c2_ali;
      engine.pendingRemoteBranch = 'main';
      engine.shouldTriggerConflict = false;
    },
    goals: [
      {
        id: "g12_1",
        label: "Uzak referansları indir ve canlı ağaçta origin/main'in geldiğini gör: git fetch origin",
        check: (engine, cmd) => cmd && cmd.toLowerCase().includes('fetch')
      },
      {
        id: "g12_2",
        label: "İndirilen yenilikleri yerel main dalınla birleştir: git merge origin/main (veya git pull)",
        check: (engine) => {
          const curId = engine.getCurrentCommitId();
          return curId && engine.commits[curId] && engine.commits[curId].msg.includes("Ali");
        }
      }
    ],
    hints: [
      "1. Adım: 'git fetch origin' çalıştır. Dikkat et: grafikte 'origin/main' etiketinin Ali'nin commitine oturduğunu ama senin yerel 'main' dalının henüz eski yerde durduğunu göreceksin!",
      "2. Adım: 'git merge origin/main' (veya doğrudan 'git pull') çalıştırarak yerel dalını Fast-Forward ile ileri sar."
    ],
    solution: "git fetch origin\ngit merge origin/main"
  },
  {
    id: "c13",
    levelNumber: 13,
    curriculumCode: "İleri Seviye: Uzak Dal Takibi",
    title: "Kodları Locale Çekme 2: Uzaktaki Dalı Bilgisayara İndirme",
    badge: "Remote Tracking",
    badgeColor: "purple",
    story: "Takım arkadaşın Ayşe, GitHub üzerinde 'feature-odeme' adında yeni bir dal açtı ve kodlarını oraya pushladı. Sen bu dalı test etmek istiyorsun ama kendi bilgisayarında 'git branch' yazdığında bu dal görünmüyor! Uzaktaki bu dalı yereline çekip o dala geçmelisin.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2 = engine.generateHash();

      engine.commits[c1] = { id: c1, parents: [], msg: "Ana sürüm", timestamp: "10:00", branch: "main", files: ['index.html'] };
      engine.commits[c2] = { id: c2, parents: [c1], msg: "Ayşe: Kredi kartı ödeme formu", timestamp: "10:45", branch: "feature-odeme", files: ['odeme.js'] };

      engine.branches['main'] = c1;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.remotes['origin'] = {
        url: 'https://github.com/sirket/proje.git',
        branches: { main: c1, 'feature-odeme': c2 }
      };
      engine.pendingRemoteCommit = c2;
      engine.pendingRemoteBranch = 'feature-odeme';
      engine.shouldTriggerConflict = false;
    },
    goals: [
      {
        id: "g13_1",
        label: "Uzaktaki dalların listesini yenile: git fetch origin",
        check: (engine, cmd) => cmd && cmd.toLowerCase().includes('fetch')
      },
      {
        id: "g13_2",
        label: "Uzaktaki 'feature-odeme' dalını locale çekip o dala geç: git switch feature-odeme",
        check: (engine) => engine.getCurrentBranch() === 'feature-odeme'
      }
    ],
    hints: [
      "1. git fetch origin",
      "2. git switch feature-odeme (veya git checkout feature-odeme)",
      "Git, uzaktaki 'origin/feature-odeme' dalını otomatik algılayıp aynı isimde yerel bir takip dalı (tracking branch) oluşturacaktır!"
    ],
    solution: "git fetch origin\ngit switch feature-odeme"
  },
  {
    id: "c14",
    levelNumber: 14,
    curriculumCode: "İleri Seviye: Çakışma Yönetimi",
    title: "Merge İşlemi 1: Gerçek Bir Merge Conflict (Çakışma) Çözümü",
    badge: "Conflict Çözümü",
    badgeColor: "rose",
    story: "Korkulan an geldi! Takım arkadaşın GitHub'daki app.js dosyasında API URL'sini değiştirdi. Sen de aynı dosyada kendi yerelinde API URL'sini değiştirdin ve commit attın. Şimdi 'git pull origin main' yapacaksın ve Git çakışma (conflict) fırlatacak! Çakışmayı çözüp merge commit'ini tamamla.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2_senin = engine.generateHash();
      const c2_arkadas = engine.generateHash();

      engine.commits[c1] = { id: c1, parents: [], msg: "Ortak temel kod", timestamp: "11:00", branch: "main", files: ['app.js'] };
      engine.commits[c2_senin] = { id: c2_senin, parents: [c1], msg: "Senin yerel commitin: Yerel test API tanımlandı", timestamp: "11:15", branch: "main", files: ['app.js'] };
      engine.commits[c2_arkadas] = { id: c2_arkadas, parents: [c1], msg: "Arkadaşının commiti: Canlı API URL güncellendi", timestamp: "11:20", branch: "main", files: ['app.js'] };

      engine.branches['main'] = c2_senin;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.remotes['origin'] = {
        url: 'https://github.com/sirket/proje.git',
        branches: { main: c2_arkadas }
      };
      engine.pendingRemoteCommit = c2_arkadas;
      engine.pendingRemoteBranch = 'main';
      engine.shouldTriggerConflict = true; // İlk merge denemesinde çatışma fırlat
    },
    goals: [
      {
        id: "g14_1",
        label: "GitHub yeniliklerini çekmeye çalış ve çakışmayı (CONFLICT) gör: git pull origin main",
        check: (engine) => engine.conflictState !== null || engine.branches['main'] !== undefined
      },
      {
        id: "g14_2",
        label: "Çakışmayı çöz, sahneye ekle ve merge commit'ini oluştur: git add app.js && git commit -m \"...\"",
        check: (engine) => {
          const curId = engine.getCurrentCommitId();
          if (!curId) return false;
          const c = engine.commits[curId];
          return c && c.parents && c.parents.length >= 2;
        }
      }
    ],
    hints: [
      "1. git pull origin main yaz ve Enter'a bas. Terminalde 'CONFLICT (content): Merge conflict in app.js' uyarısını göreceksin.",
      "2. Ekrandaki Çakışma Çözücü kartından veya doğrudan 'git add app.js' yazarak çözümü sahnele.",
      "3. Son olarak 'git commit -m \"Merge conflict app.js cozuldu\"' komutuyla birleştirmeyi mühürle!"
    ],
    solution: "git pull origin main\ngit add app.js\ngit commit -m \"Merge conflict app.js cozuldu\""
  },
  {
    id: "c15",
    levelNumber: 15,
    curriculumCode: "İleri Seviye: Kurtarma",
    title: "Merge İşlemi 2: Panik Yok! Merge'i Güvenle İptal Etme (git merge --abort)",
    badge: "Merge Abort",
    badgeColor: "amber",
    story: "Büyük bir birleştirme sırasında birden fazla dosyada devasa çakışmalar çıktı. O an çözmek için vaktin yok veya yanlış bir dala birleştirdiğini fark ettin. Tek bir dosya dahi kaybetmeden her şeyi merge öncesi temiz haline döndürmek için 'git merge --abort' kullanmalısın.",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2 = engine.generateHash();
      const c3 = engine.generateHash();

      engine.commits[c1] = { id: c1, parents: [], msg: "Stabil sürüm", timestamp: "12:00", branch: "main", files: ['app.py'] };
      engine.commits[c2] = { id: c2, parents: [c1], msg: "Senin yerel calisman", timestamp: "12:10", branch: "main", files: ['app.py'] };
      engine.commits[c3] = { id: c3, parents: [c1], msg: "Karmasik daldaki degisiklikler", timestamp: "12:20", branch: "feature-karisik", files: ['app.py'] };

      engine.branches['main'] = c2;
      engine.branches['feature-karisik'] = c3;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.shouldTriggerConflict = true;
      engine.preMergeState = c2;
    },
    goals: [
      {
        id: "g15_1",
        label: "Birleştirmeyi başlat ve çakışma durumuna gir: git merge feature-karisik",
        check: (engine) => engine.conflictState !== null
      },
      {
        id: "g15_2",
        label: "Merge'i tamamen iptal et ve temiz haline dön: git merge --abort",
        check: (engine, cmd) => engine.conflictState === null && cmd && cmd.includes('--abort')
      }
    ],
    hints: [
      "1. git merge feature-karisik komutu ile birleştirmeyi başlat (çakışma çıkacak).",
      "2. git merge --abort yazarak merge işlemini güvenle geri al."
    ],
    solution: "git merge feature-karisik\ngit merge --abort"
  },
  {
    id: "c16",
    levelNumber: 16,
    curriculumCode: "İleri Seviye: Push Çözümü",
    title: "Non-Fast-Forward Hatası: [rejected] Push Çözüm Döngüsü",
    badge: "Non-Fast-Forward",
    badgeColor: "rose",
    story: "Yerel kodunu doğrudan 'git push origin main' yapmaya çalıştın ama GitHub reddetti: '[rejected - non-fast-forward] Updates were rejected because the remote contains work that you do not have locally.' Bu klasik hatanın tam çözüm döngüsünü uygula: Önce pull et, birleştir, sonra pushla!",
    setup: (engine) => {
      engine.reset();
      engine.isInitialized = true;
      const c1 = engine.generateHash();
      const c2_senin = engine.generateHash();
      const c2_uzak = engine.generateHash();

      engine.commits[c1] = { id: c1, parents: [], msg: "Ortak taban", timestamp: "13:00", branch: "main", files: ['index.html'] };
      engine.commits[c2_senin] = { id: c2_senin, parents: [c1], msg: "Senin yerel committin", timestamp: "13:10", branch: "main", files: ['style.css'] };
      engine.commits[c2_uzak] = { id: c2_uzak, parents: [c1], msg: "GitHub'daki yeni commit", timestamp: "13:15", branch: "main", files: ['readme.txt'] };

      engine.branches['main'] = c2_senin;
      engine.HEAD = { type: 'branch', name: 'main' };
      engine.remotes['origin'] = {
        url: 'https://github.com/sirket/proje.git',
        branches: { main: c2_uzak }
      };
      engine.pendingRemoteCommit = c2_uzak;
      engine.pendingRemoteBranch = 'main';
      engine.shouldTriggerConflict = false;
    },
    goals: [
      {
        id: "g16_1",
        label: "Önce uzaktaki yenilikleri yereline çekip birleştir: git pull origin main",
        check: (engine) => {
          const curId = engine.getCurrentCommitId();
          if (!curId) return false;
          const c = engine.commits[curId];
          return c && c.parents && c.parents.length >= 2;
        }
      },
      {
        id: "g16_2",
        label: "Birleşmiş kodu başarıyla GitHub'a gönder: git push origin main",
        check: (engine) => {
          const curId = engine.getCurrentCommitId();
          return engine.remotes['origin'] && engine.remotes['origin'].branches['main'] === curId;
        }
      }
    ],
    hints: [
      "1. git pull origin main çalıştır. Git otomatik 3-way merge yapacak.",
      "2. git push origin main çalıştır. Artık yerel kodun uzaktakini kapsadığı için push kabul edilecek!"
    ],
    solution: "git pull origin main\ngit push origin main"
  }
];
