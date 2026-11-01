# 🚀 3.3. Version Control Systems (Git & GitHub) İnteraktif Akademi & Kapsamlı Rehber

Bu platform; Cisco DevNet **3.3. Version Control Systems** müfredatının **11 alt başlığının tamamını (3.3.1'den 3.3.11'e kadar)** ve **12 Bölümlük A'dan Z'ye Git & GitHub El Kitabı'nı (Handbook)** eksiksiz olarak içerecek şekilde hazırlanmıştır.

📖 **Detaylı Markdown El Kitabı:** Proje dizininde yer alan [GIT_KULLANIM_REHBERI.md](GIT_KULLANIM_REHBERI.md) dosyasını inceleyebilirsiniz.

---

## 📚 12 Bölümlük Detaylı Rehber Modülleri
1. **Git Nedir ve Nasıl Çalışır? (Mimarî Temeller):** 3 VCS Nesli, Delta vs. Snapshot, SHA-1 Bütünlüğü.
2. **Kurulum, İlk Ayarlar ve SSH Anahtarları:** `git config`, Ed25519 SSH üretimi ve GitHub eşleme.
3. **Git'in 3 Temel Alanı:** Working Directory, Staging Area, Repository ve dosya durumları.
4. **Temel İş Akışı Komutları:** `init`, `status`, `add`, `rm`, `rm --cached`, `commit`, Conventional Commits standardı.
5. **Dallanma (Branching) ve HEAD Mekanizması:** 41 baytlık işaretçiler, `checkout`, `switch`, Detached HEAD kurtarma.
6. **Birleştirme (Merging) ve Çakışma (Conflict) Çözümü:** Fast-Forward, 3-Way Merge, çakışma etiketleri temizliği.
7. **Rebase vs. Merge:** Doğrusal tarihçe mantığı ve Rebase Altın Kuralı.
8. **Zaman Yolculuğu ve Hata Düzeltme:** Soft/Mixed/Hard Reset, Revert, Stash ve Reflog hayat kurtarıcısı.
9. **Uzak Depolar (Remote) & Profesyonel GitHub Akışı:** `remote add`, `push`, `pull`, `fetch`, Pull Request (PR) ve Code Review.
10. **.diff ve Patch Dosyaları:** Unified Diff formatı okuma (`@@ -10,3 +10,4 @@`), `.patch` üretme ve uygulama.
11. **Acil Durum & Kurtarma Kılavuzu (Troubleshooting):** Yanlış commit mesajı düzeltme, unutulan dosya, yanlış dala commit atma, silinen commit'i kurtarma.
12. **Hızlı Git Komut Tablosu (Cheat Sheet):** Tüm kritik komutların tek bakışlık başvuru matrisi.

---

## 📋 Müfredat Eşleştirme Tablosu

| Kod | Müfredat Başlığı | Konu Anlatımı | Uygulama & Terminal Görevi |
| :--- | :--- | :---: | :---: |
| **3.3.1** | Types of Version Control Systems | ✅ Yerel, Merkezi (CVCS) ve Dağıtık (DVCS) Karşılaştırması | ✅ Depo Mimari Farkları |
| **3.3.2** | Git | ✅ Linus Torvalds, Snapshot Modeli, SHA-1 Bütünlüğü | ✅ `git config` ve `git init` |
| **3.3.3** | Local vs. Remote Repositories | ✅ Yerel ve Uzak Depo Mimarisi, .git Dizin Yapısı | ✅ `git remote add` ve URL Eşleme |
| **3.3.4** | What is Branching? | ✅ Dallar Nedir? Neden Kullanılır? HEAD Göstergesi | ✅ `git branch`, `git checkout -b` |
| **3.3.5** | GitHub and Other Providers | ✅ GitHub, GitLab, Bitbucket, PR ve Forking Ekosistemi | ✅ GitHub Origin Entegrasyonu |
| **3.3.6** | Git Commands | ✅ Günlük İş Akışı Komutları (config, status, clone, log vb.) | ✅ Terminal Komut Çalıştırma |
| **3.3.7** | Adding and Removing Files | ✅ `git add`, `git rm`, `git rm --cached`, `.gitignore` | ✅ Dosya Sahneleme ve Silme |
| **3.3.8** | Updating Repositories | ✅ Depoları Güncelleme Döngüsü (`commit`, `push`, `pull`, `fetch`) | ✅ Senkronizasyon Akışı |
| **3.3.9** | Branching Features | ✅ Fast-Forward vs 3-Way Merge, Çakışma (Conflict) Çözümü | ✅ Canlı Dal Ağacında Birleştirme |
| **3.3.10** | .diff Files | ✅ Unified Diff Biçimi Okuma (`+` / `-`), Patch Dosyaları | ✅ `git diff` ve `git diff --staged` |
| **3.3.11** | Lab - Software Version Control with Git | ✅ Büyük Final Kapsamlı Laboratuvarı | ✅ A'dan Z'ye Uçtan Uca Capstone Lab |
| **3.3.12 (İleri Düzey)** | **Ekip Çalışması: Fetch vs. Pull** | ✅ `origin/main` vs Yerel `main` Farkı, Güvenli İnceleme | ✅ Seviye 12: `git fetch` ➔ `git merge` |
| **3.3.13 (İleri Düzey)** | **Uzak Dalı Locale Çekme (Tracking)** | ✅ Remote Tracking Branch Mimarisi | ✅ Seviye 13: `git switch <remoteBranch>` |
| **3.3.14 (İleri Düzey)** | **Gerçek Merge Conflict & Çözücü** | ✅ `<<<<<<< HEAD` Anatomisi ve Satır Satır Temizleme | ✅ Seviye 14: Canlı Çakışma Çözücü Kartı |
| **3.3.15 (İleri Düzey)** | **Panik Yok! Merge İptali** | ✅ Temiz Geri Dönüş Protokolü | ✅ Seviye 15: `git merge --abort` |
| **3.3.16 (İleri Düzey)** | **Non-Fast-Forward Push Reddi** | ✅ `[rejected]` Hatasının Tam Çözüm Döngüsü | ✅ Seviye 16: Pull ➔ Resolve ➔ Push |

---

## 🎮 Platform Özellikleri

1. **Canlı Commit & Dal Ağacı**: Komutları yazdığınız anda LearnGitBranching tarzı grafik canlı olarak güncellenir.
2. **Gerçekçi Terminal Simülatörü**: Tab ile otomatik tamamlama, yukarı/aşağı ok tuşları ile geçmiş gezintisi.
3. **Canlı Checklist**: Görevleri yaptıkça anında yeşil onay işaretine döner.
4. **İpucu & Otomatik Çözüm**: İhtiyaç duyduğunuzda anında adım ve çözüm desteği.
5. **Kopya Kağıdı (Cheat Sheet)**: Sağ üstte 3.3 komut sözlüğü modalı.

---

## ⚡ Çalıştırma

- [index.html](file:///C:/Users/goktu/.gemini/antigravity/scratch/git-ogrenme-platformu/index.html) dosyasına çift tıklayarak tarayıcınızda doğrudan açabilirsiniz.
- Windows için [baslat.bat](file:///C:/Users/goktu/.gemini/antigravity/scratch/git-ogrenme-platformu/baslat.bat) kısayolunu kullanabilirsiniz.
