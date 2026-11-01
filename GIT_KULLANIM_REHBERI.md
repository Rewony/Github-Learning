# 📘 A'dan Z'ye Kapsamlı Git ve GitHub Kullanım Rehberi
> **Cisco DevNet & Endüstri Standardı Pratik El Kitabı (Handbook)**  
> Bu rehber, versiyon kontrol sistemlerinin temellerinden ileri düzey kurtarma operasyonlarına, kurumsal GitHub akışlarından çakışma (conflict) çözümlerine kadar ihtiyaç duyacağınız tüm bilgileri adım adım açıklamaktadır.

---

## 📑 İçindekiler
1. [Bölüm 1: Git Nedir ve Nasıl Çalışır? (Mimarî Temeller)](#bölüm-1-git-nedir-ve-nasıl-çalışır-mimarî-temeller)
2. [Bölüm 2: Kurulum, İlk Ayarlar ve SSH Anahtarları](#bölüm-2-kurulum-ilk-ayarlar-ve-ssh-anahtarları)
3. [Bölüm 3: Git'in 3 Temel Alanı ve Dosya Yaşam Döngüsü](#bölüm-3-gitin-3-temel-alanı-ve-dosya-yaşam-döngüsü)
4. [Bölüm 4: Temel İş Akışı Komutları (Adım Adım)](#bölüm-4-temel-iş-akışı-komutları-adım-adım)
5. [Bölüm 5: Dallanma (Branching) ve HEAD Mekanizması](#bölüm-5-dallanma-branching-ve-head-mekanizması)
6. [Bölüm 6: Birleştirme (Merging) ve Çakışma (Conflict) Çözümü](#bölüm-6-birleştirme-merging-ve-çakışma-conflict-çözümü)
7. [Bölüm 7: Rebase vs. Merge Derinlemesine Analiz](#bölüm-7-rebase-vs-merge-derinlemesine-analiz)
8. [Bölüm 8: Zaman Yolculuğu ve Hata Düzeltme (Reset, Revert, Stash, Reflog)](#bölüm-8-zaman-yolculuğu-ve-hata-düzeltme-reset-revert-stash-reflog)
9. [Bölüm 9: Uzak Depolar (Remote) & Profesyonel GitHub Akışı](#bölüm-9-uzak-depolar-remote--profesyonel-github-akışı)
10. [Bölüm 10: .diff ve Patch Dosyaları ile Çalışma](#bölüm-10-diff-ve-patch-dosyaları-ile-çalışma)
11. [Bölüm 11: Acil Durum & Kurtarma Kılavuzu (Troubleshooting)](#bölüm-11-acil-durum--kurtarma-kılavuzu-troubleshooting)
12. [Bölüm 12: Hızlı Git Komut Tablosu (Cheat Sheet)](#bölüm-12-hızlı-git-komut-tablosu-cheat-sheet)

---

## Bölüm 1: Git Nedir ve Nasıl Çalışır? (Mimarî Temeller)

### 1.1. Versiyon Kontrol Sistemlerinin Evrimi
Versiyon kontrolü üç nesilde gelişmiştir:
1. **Yerel (Local VCS - örn. RCS):** Değişiklikleri yerel diskte tutar. Paylaşım yoktur, disk bozulursa her şey kaybolur.
2. **Merkezi (Centralized VCS - örn. SVN, CVS):** Tek bir merkezi sunucu vardır. İnternet/ağ kesilirse commit atılamaz; sunucu çökerse projenin tek hata noktası (SPOF) olur.
3. **Dağıtık (Distributed VCS - örn. Git):** Her geliştirici, projenin ilk gününden son anına kadar tüm geçmişini, dallarını ve nesnelerini içeren **tam bir kopyayı (mirror)** bilgisayarında taşır.

### 1.2. Delta vs. Snapshot Mantığı
Geleneksel sistemler dosyaların farklarını (delta) saklarken, **Git her commit'te projenin o anki tam bir anlık görüntüsünü (snapshot)** kaydeder:
```
Delta Modeli (SVN):   [Dosya A v1] ➔ [Δ1] ➔ [Δ2] ➔ [Δ3] (Farklar toplanarak okunur)
Snapshot Modeli (Git): [Snapshot 1] ➔ [Snapshot 2] ➔ [Snapshot 3] (Değişmeyen dosyalara referans verilir)
```
Eğer bir dosya değişmediyse Git onu tekrar kopyalamaz; önceki dosyanın SHA-1 hash referansını bağlar. Bu sayede Git inanılmaz hızlı ve hafiftir.

### 1.3. SHA-1 Kriptografik Bütünlüğü
Git'te her dosya (blob), dizin yapısı (tree), commit ve etiket (tag), içeriğinden türetilen 40 karakterlik **SHA-1 hash** koduyla adreslenir:
Örnek: `2a6f8b9c1d4e7f3a8b2c5d1e4f7a8b9c1d2e3f4a`
İçerikten tek bir boşluk dahi değişse hash değişir. Bu nedenle Git tarihçesi asla gizlice bozulamaz veya manipüle edilemez.

---

## Bölüm 2: Kurulum, İlk Ayarlar ve SSH Anahtarları

### 2.1. Kullanıcı Kimliği Tanımlama
Git ile yapılan her işlem yazar bilgisi taşır:
```bash
# Global (Tüm depolar için geçerli)
git config --global user.name "Adiniz Soyadiniz"
git config --global user.email "github-epostaniz@ornek.com"

# Varsayılan dal adını 'main' yapma
git config --global init.defaultBranch main

# Ayarları listeleme
git config --list
```

### 2.2. GitHub İçin SSH Anahtarı Oluşturma
Her push işleminde parola girmemek ve güvenli bağlantı kurmak için SSH anahtarı önerilir:
```bash
# 1. Ed25519 algoritmasıyla yeni SSH anahtarı üret
ssh-keygen -t ed25519 -C "github-epostaniz@ornek.com"

# 2. Üretilen açık anahtarı kopyala (Windows PowerShell)
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# 3. GitHub ➔ Settings ➔ SSH and GPG Keys ➔ "New SSH Key" diyerek yapıştırın.
# 4. Bağlantıyı test edin:
ssh -T git@github.com
```

---

## Bölüm 3: Git'in 3 Temel Alanı ve Dosya Yaşam Döngüsü

Git üzerinde dosyalar 3 alanda bulunur ve 4 farklı durumda olabilir:

```
+---------------------+         git add          +---------------------+
|                     | -----------------------> |                     |
|  Working Directory  |                          |    Staging Area     |
|   (Çalışma Alanı)   | <----------------------- |      (Sahne)        |
+---------------------+       git restore        +---------------------+
          |                                                 |
          |                                                 | git commit
          |                 git checkout / switch           v
          | <----------------------------------- +---------------------+
          |                                      |                     |
          +------------------------------------> |   Repository (.git) |
                                                 |     (Veritabanı)    |
                                                 +---------------------+
```

### Dosya Durumları (File Status Lifecycle):
1. **Untracked (Takip Edilmeyen):** Yeni oluşturulmuş, Git'in henüz izlemediği dosyalar.
2. **Unmodified (Değişmemiş):** Son commit ile birebir aynı olan dosyalar.
3. **Modified (Değiştirilmiş):** Düzenlenmiş ancak henüz sahneye eklenmemiş dosyalar.
4. **Staged (Sahnelenmiş):** Bir sonraki commit'e girecek olan işaretlenmiş dosyalar.

---

## Bölüm 4: Temel İş Akışı Komutları (Adım Adım)

### 4.1. Yeni Depo Başlatma veya Klonlama
```bash
# Sıfırdan yerel depo başlatma
mkdir yeni-projem
cd yeni-projem
git init

# Veya mevcut bir GitHub deposunu klonlama
git clone https://github.com/kullanici/proje.git
```

### 4.2. Durum Kontrolü
```bash
# Ayrıntılı durum
git status

# Kısa özet durum (M: modified, A: added, ??: untracked)
git status -s
```

### 4.3. Dosyaları Sahneye Alma (`git add`)
```bash
# Tek bir dosyayı ekleme
git add index.html

# Tüm değişiklikleri ekleme
git add .

# Parça parça (interaktif yama) ekleme
git add -p
```

### 4.4. Dosya Silme ve Takipten Çıkarma (`git rm`)
```bash
# Hem diskten siler hem Git takibinden kaldırır
git rm gereksiz.log

# Diskte tutar, yalnızca Git takibinden çıkarır (.env, şifre dosyaları için hayati!)
git rm --cached .env
```

### 4.5. Commit Oluşturma (`git commit`)
```bash
# Anlamlı bir mesaj ile commit kaydı
git commit -m "feat: Kullanici giris formu dogrulama kurallari eklendi"

# Sahneye almadan doğrudan değiştirilmiş dosyaları commit'leme (yeni dosyaları kapsamaz)
git commit -am "fix: Form buton rengi duzeltildi"

# Son commit'in mesajını veya içeriğini düzeltme (henüz push edilmediyse)
git commit --amend -m "feat: Kullanici giris formu ve hata mesajlari eklendi"
```

### 4.6. Profesyonel Commit Mesajı Formatı (Conventional Commits)
- `feat:` Yeni bir özellik (feature)
- `fix:` Hata düzeltmesi (bug fix)
- `docs:` Yalnızca dokümantasyon değişikliği
- `style:` Kod mantığını etkilemeyen biçimlendirme (boşluk, noktalı virgül)
- `refactor:` Ne hata çözen ne yeni özellik ekleyen kod sadeleştirmesi
- `perf:` Performans iyileştirmesi
- `test:` Eksik testlerin eklenmesi
- `chore:` Derleme, paket veya konfigürasyon güncellemeleri

---

## Bölüm 5: Dallanma (Branching) ve HEAD Mekanizması

### 5.1. Neden Dal Açarız?
Ana dal (`main`), daima stabil ve üretime hazır (production-ready) kod içermelidir. Yeni bir özellik kodlarken veya hata düzeltirken bağımsız bir paralel geliştirme hattı açarız.

### 5.2. Dalın Fiziksel Yapısı
Git'te bir dal klasör kopyalamaz; `.git/refs/heads/` dizininde ilgili commit'in SHA-1 hash'ini tutan **yalnızca 41 baytlık hafif bir işaretçidir**.

### 5.3. Dal Komutları
```bash
# Tüm yerel dalları listeleme (* aktif olanı gösterir)
git branch

# Uzak dallarla birlikte listeleme
git branch -a

# Yeni dal oluşturma (geçiş yapmaz)
git branch feature-odeme

# Dala geçiş yapma (Eski yol)
git checkout feature-odeme

# Dala geçiş yapma (Modern Git tavsiyesi)
git switch feature-odeme

# Tek komutla hem dal açıp hem o dala geçme (En sık kullanılan!)
git checkout -b feature-odeme
# veya modern:
git switch -c feature-odeme

# İşi biten dalı güvenle silme
git branch -d feature-odeme

# Zorla silme (merge edilmemiş değişiklikler varsa)
git branch -D feature-odeme
```

### 5.4. HEAD ve Detached HEAD Nedir?
- `HEAD`, Git'in sizin şu an projenin neresinde durduğunuzu bildiği sembolik göstergedir. Normalde bir dala işaret eder (`HEAD -> main`).
- Eğer bir dal adı yerine doğrudan bir commit hash'ine geçerseniz (`git checkout 9f4b9e`), **Ayrık HEAD (Detached HEAD)** durumuna düşersiniz.
- Bu durumdayken atılan commit'ler hiçbir dal tarafından sahiplenilmez. Bu durumdan kurtulmak için hemen yeni bir dal açmalısınız:
```bash
git switch -c kurtarilan-calisma
```

---

## Bölüm 6: Birleştirme (Merging) ve Çakışma (Conflict) Çözümü

### 6.1. Altın Kural
> **Nereye birleştirmek istiyorsan, önce o dala geç!**  
> `feature` dalını `main` içine almak istiyorsanız, önce `git checkout main` yapmalısınız.

### 6.2. İki Temel Birleştirme Türü
1. **Fast-Forward Merge:**  
   Siz dalda çalışırken `main` dalında yeni bir commit atılmadıysa, Git hiçbir yeni commit üretmez; yalnızca `main` işaretçisini daldaki en son commite kaydırır.
   ```
   Öncesi:  C1 ➔ C2 (main) ➔ C3 ➔ C4 (feature)
   Sonrası: C1 ➔ C2 ➔ C3 ➔ C4 (main, feature)
   ```

2. **3-Way Merge (Üç Yollu Birleştirme):**  
   Hem `main` hem de `feature` dalında bağımsız commit'ler atıldıysa, Git iki dalın ortak atasını bularak iki ebeveyni (parents) olan özel bir **Merge Commit** üretir.
   ```
            --- C3 (feature) ---
           /                    \
   C1 ➔ C2 (Base)                ➔ C5 (Merge Commit)
           \                    /
            --- C4 (main) ------
   ```

### 6.3. Merge Conflict (Çakışma) Nasıl Çözülür?
İki farklı dalda aynı dosyanın aynı satırları değiştirilmişse Git otomatik birleştiremez ve çakışma bildirir:

```
<<<<<<< HEAD (Sizin şu an üzerinde durduğunuz dal)
const API_URL = "https://api.uretim.com";
=======
const API_URL = "https://api.test.com";
>>>>>>> feature-api (Birleştirilmek istenen daldaki kod)
```

**Adım Adım Çözüm:**
1. Dosyayı VS Code veya herhangi bir metin editöründe açın.
2. Kalmasını istediğiniz doğru kodu seçin.
3. Git'in eklediği `<<<<<<<`, `=======`, `>>>>>>>` işaretçi satırlarını tamamen silin.
4. Çözülen dosyayı sahneye ekleyin:
   ```bash
   git add servisler/api.js
   ```
5. Birleştirmeyi tamamlayın:
   ```bash
   git commit -m "Merge: API adres cakismasi uretim URL'si secilerek cozuldu"
   ```

### 6.4. Panik Anında Hayat Kurtaran: `git merge --abort`
Birleştirme sırasında beklenenden çok fazla dosyada çakışma çıktıysa veya yanlış bir dala merge başlattıysanız:
```bash
git merge --abort
```
Bu komut, çalışma alanınızdaki tüm çakışma etiketlerini temizler ve projenizi merge butonuna basmadan önceki tertemiz haline geri döndürür. Hiçbir kodunuz kaybolmaz!

### 6.5. Kodları Locale Çekme (Fetch vs Pull Farkı)
Pek çok geliştirici `git pull` yapmaktan korkar çünkü çakışma çıkarsa ne yapacağını bilemez. Bunun en profesyonel çözümü iki adımlı akıştır:
1. **Adım 1: Sadece İndir ve İncele (`git fetch`):**
   ```bash
   git fetch origin
   # origin/main dalı bilgisayarınıza iner ancak mevcut çalışma kodunuza dokunmaz!
   # Farkları incelemek için:
   git diff main..origin/main
   ```
2. **Adım 2: Güvenle Birleştir (`git merge`):**
   ```bash
   git merge origin/main
   ```
Doğrudan `git pull origin main` komutu ise bu iki adımı tek seferde otomatik çalıştırır.

---

## Bölüm 7: Rebase vs. Merge Derinlemesine Analiz

| Karşılaştırma | Git Merge | Git Rebase |
| :--- | :--- | :--- |
| **Tarihçe Yapısı** | Dallar ve birleşme kavşakları görünür (Doğrusal değildir) | Tertemiz, dümdüz, tek çizgi halinde tarihçe (Doğrusal) |
| **Commit Değişimi** | Mevcut commit hash'leri asla değişmez | Commit'ler yeni bir temel üzerine yeniden yazılır (Hash'ler değişir!) |
| **İzlenebilirlik** | Hangi özelliğin ne zaman birleştiği açıktır | Özelliğin ne zaman birleştiği merge commit'i olmadığı için gizlenebilir |
| **Güvenlik** | Her zaman güvenlidir | Yanlış kullanılırsa ekip arkadaşlarının geçmişini bozar |

```bash
# Özellik dalınızdayken main'deki yenilikleri dalın altına alma:
git checkout feature-sepet
git rebase main
```

> [!WARNING]
> **Rebase Altın Kuralı:** Başkalarıyla paylaştığınız ortak/uzak ana dallarda (`main`, `master`, `dev`) **asla rebase yapmayın!** Rebase'i sadece kendi yerel, henüz pushlamadığınız özel dallarınızı temizlemek için kullanın.

---

## Bölüm 8: Zaman Yolculuğu ve Hata Düzeltme (Reset, Revert, Stash, Reflog)

### 8.1. Dosya Değişikliğini Geri Alma
```bash
# Henüz sahnelenmemiş (staged olmamış) bir dosyadaki değişiklikleri iptal etme
git restore dosya.txt

# Sahneye alınmış bir dosyayı sahneden geri indirme (unstage)
git restore --staged dosya.txt
```

### 8.2. Git Reset Modları (Son Commit'leri İptal Etme)
```bash
# 1. Soft Reset: Son commit'i iptal eder, dosyalardaki değişiklikleri Sahne'de (Staged) tutar.
# (Commit mesajını veya içeriğini tekrar düzenlemek için idealdir)
git reset --soft HEAD~1

# 2. Mixed Reset (Varsayılan): Son commit'i iptal eder, değişiklikleri Çalışma Alanı'nda (Unstaged) tutar.
git reset HEAD~1

# 3. Hard Reset (DİKKAT!): Son commit'i ve o commit'te yapılan TÜM kod değişikliklerini kalıcı olarak siler!
git reset --hard HEAD~1
```

### 8.3. Git Revert (Ekip Çalışmasında En Güvenli Geri Alma)
`git reset` geçmişi silerken; `git revert` geçmişi silmez, belirtilen hatalı commit'in tam tersini yapan **yeni bir telafi commit'i** oluşturur:
```bash
git revert a1b2c3d
```

### 8.4. Git Stash (Geçici Olarak Çekmeceye Kaldırma)
Üzerinde çalıştığınız iş bitmedi ama acilen başka bir dala geçip hata düzeltmeniz gerekiyorsa:
```bash
# Yarım kalan işleri geçici hafızaya kaldır
git stash

# Başka dala geçip işini yap
git switch main
# ... düzeltmeyi yap ...

# Geri dön ve yarım kalan işleri geri yükle
git switch feature-dal
git stash pop
```

### 8.5. Git Reflog: Hayat Kurtaran Kara Kutu
Git'te hiçbir commit hemen kaybolmaz. `git reset --hard` ile sildiğinizi sandığınız commit'ler veya yanlışlıkla silinen dallar `git reflog` içinde 90 gün boyunca saklanır:
```bash
# HEAD'in geçmişteki tüm adımlarını gör
git reflog

# Örneğin yanlış bir hard reset öncesi adıma geri dön:
git reset --hard HEAD@{2}
```

---

## Bölüm 9: Uzak Depolar (Remote) & Profesyonel GitHub Akışı

### 9.1. Uzak Depo Yönetimi
```bash
# Uzak depo bağlantılarını listeleme
git remote -v

# Yeni uzak depo ekleme (origin standart takma addır)
git remote add origin https://github.com/kullanici/proje.git

# Uzak depo URL'sini değiştirme
git remote set-url origin git@github.com:kullanici/yeni-proje.git
```

### 9.2. Senkronizasyon (Push, Fetch, Pull) & Upstream Mantığı
```bash
# İlk push işleminde upstream bağlantısı kurma (-u / --set-upstream)
git push -u origin main
# veya yeni bir dal için:
git push -u origin test

# Sonraki seferlerde sadece:
git push

# Uzaktaki commit'leri indir ama yerel kodla birleştirme (İnceleme amaçlı)
git fetch origin

# Uzaktaki commit'leri indir ve mevcut dala anında birleştir (fetch + merge)
git pull origin main
```

#### ⚠️ "fatal: The current branch has no upstream branch" Hatası Neden Çıkar?
Yerel bilgisayarınızda `git checkout -b test` diyerek yeni bir dal açtığınızda bu dal **yalnızca sizin bilgisayarınızda** vardır. GitHub'ın bu daldan henüz haberi yoktur!  
Eğer sadece `git push` (veya `git push https://...`) yazarsanız Git sorar: *"Bu dalı GitHub'daki hangi uzak dala bağlayayım (upstream)?"*  
**Çözümler:**
```bash
# 1. Klasik Çözüm: Upstream bağlantısını kurarak gönder (-u parametresi)
git push -u origin test
# (veya açık hali: git push --set-upstream origin test)

# 2. Kalıcı & Modern Çözüm (Bunu bir kere yazın, bu hatayı bir daha asla almayın!):
git config --global push.autoSetupRemote true
# Bu ayar sayesinde yeni açtığınız her dalda doğrudan 'git push' yazsanız bile Git arka planda otomatik upstream kurar!
```

### 9.3. Kurumsal Pull Request (PR) & Feature Branch Akışı
Büyük yazılım şirketlerinde ve açık kaynak projelerde doğrudan `main` dalına push yapılmaz:
1. `git pull origin main` ile en güncel kodu al.
2. `git checkout -b feature/yeni-ozellik` ile yeni dal aç.
3. Kodunu yaz, test et, parça parça commit'le.
4. Dalı GitHub'a yükle: `git push -u origin feature/yeni-ozellik`.
5. GitHub web arayüzüne git, **Compare & Pull Request** butonuna tıkla.
6. PR şablonunu doldur, takım arkadaşlarını **Reviewer** olarak ata.
7. Kod incelemesi (Code Review) tamamlanıp CI/CD testleri yeşil olunca PR ana dala birleştirilir (Merge PR) ve dal silinir.

---

## Bölüm 10: .diff ve Patch Dosyaları ile Çalışma

### 10.1. Farkları İnceleme
```bash
# Çalışma alanı ile sahne arasındaki farklar
git diff

# Sahne (Staging Area) ile son commit arasındaki farklar
git diff --staged

# İki dal arasındaki farklar
git diff main..feature-api

# Tek bir dosyanın iki commit arasındaki farkı
git diff C1 C2 -- dosya.py
```

### 10.2. Unified Diff Formatını Okuma
```diff
diff --git a/ayarlar.py b/ayarlar.py
--- a/ayarlar.py (Eski versiyon)
+++ b/ayarlar.py (Yeni versiyon)
@@ -10,4 +10,5 @@
 def baglan():
-    zaman_asimi = 30     # Kırmızı (-) : Silinen eski satır
+    zaman_asimi = 60     # Yeşil (+)   : Yeni eklenen satır
+    tekrar_dene = 3      # Yeşil (+)   : Yeni eklenen satır
     return True
```

### 10.3. Patch (Yama) Üretme ve Uygulama
İnternet veya uzak sunucu bağlantısı olmayan durumlarda:
```bash
# Değişiklikleri bir patch dosyasına kaydet
git diff > degisiklikler.patch

# Bu dosyayı başka bir bilgisayara taşıyıp uygula
git apply degisiklikler.patch
```

---

## Bölüm 11: Acil Durum & Kurtarma Kılavuzu (Troubleshooting)

### Senaryo 1: "Commit mesajını yanlış yazdım!"
```bash
# Henüz pushlamadıysanız:
git commit --amend -m "Dogru commit mesaji"
```

### Senaryo 2: "Bir dosyayı commit'e eklemeyi unuttum!"
```bash
git add unutulan-dosya.js
git commit --amend --no-edit
# Yeni commit oluşturmaz, son commit'in içine ekler!
```

### Senaryo 3: "Yanlışlıkla main dalına commit attım, dal açmalıydım!"
```bash
# 1. Şu anki durumdan yeni bir dal oluştur
git branch feature-yeni

# 2. Main dalını 1 adım geriye çek
git reset --hard HEAD~1

# 3. Yeni dala geç (tüm commit'lerin orada güvenle duruyor!)
git switch feature-yeni
```

### Senaryo 4: "Yanlışlıkla `git reset --hard` yaptım, kodlarım silindi!"
```bash
# 1. Reflog'u aç ve silinen commit'in hash'ini bul
git reflog
# 2. O anki duruma geri dön
git reset --hard HEAD@{1}
```

### Senaryo 5: "GitHub'a yanlışlıkla .env / API anahtarı pushladım!"
1. İlgili API anahtarını sağlayıcıdan (AWS, OpenAI, Google) **derhal iptal edin (revoke)**.
2. Dosyayı takipten çıkarın ve commit'leyin:
   ```bash
   git rm --cached .env
   echo ".env" >> .gitignore
   git commit -m "security: Hassas dosya takipten cikarildi"
   git push origin main
   ```

---

## Bölüm 12: Hızlı Git Komut Tablosu (Cheat Sheet)

| Komut | Açıklama |
| :--- | :--- |
| `git init` | Yeni bir yerel Git deposu başlatır |
| `git clone <url>` | Uzak depoyu bilgisayara kopyalar |
| `git status` | Değişen, sahnelenen dosyaların durumunu gösterir |
| `git add <dosya>` | Dosyayı Staging Area'ya (sahneye) alır |
| `git add .` | Tüm değişiklikleri sahneye alır |
| `git rm <dosya>` | Dosyayı diskten ve Git'ten siler |
| `git rm --cached <dosya>` | Dosyayı diskte tutar, Git takibinden çıkarır |
| `git commit -m "<mesaj>"` | Sahnedeki dosyaları kalıcı snapshot olarak kaydeder |
| `git branch` | Yerel dalları listeler |
| `git branch <ad>` | Yeni dal oluşturur |
| `git switch <ad>` | Belirtilen dala geçer |
| `git switch -c <ad>` | Yeni dal açıp hemen o dala geçer |
| `git merge <dal>` | Belirtilen dalı mevcut dala birleştirir |
| `git branch -d <dal>` | Birleştirilmiş dalı siler |
| `git log --oneline` | Commit geçmişini tek satırda özetler |
| `git diff` | Sahnelenmemiş değişiklikleri satır satır gösterir |
| `git diff --staged` | Sahnelenen değişiklikleri gösterir |
| `git restore <dosya>` | Değiştirilmiş dosyayı son commite geri döndürür |
| `git reset --soft HEAD~1` | Son commit'i geri alır, dosyaları staged tutar |
| `git reset --hard HEAD~1` | Son commit'i ve değişiklikleri tamamen siler |
| `git revert <hash>` | Eski bir commit'in tersini yapan yeni commit atar |
| `git stash` | Bitmemiş çalışmaları geçici belleğe kaldırır |
| `git stash pop` | Geçici bellekteki çalışmaları geri yükler |
| `git remote add origin <url>` | Uzak GitHub deposu tanımlar |
| `git push -u origin <dal>` | Dalı uzak depoya yükler ve eşler |
| `git pull origin <dal>` | Uzak depodaki yenilikleri çeker ve birleştirir |
| `git reflog` | HEAD'in tüm hareketlerini listeleyen kara kutu |
