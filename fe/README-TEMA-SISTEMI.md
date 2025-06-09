# 🎨 Merkezi Tema Sistemi

Bu proje artık **merkezi tema sistemi** kullanarak tüm renkleri, tipografi, spacing ve diğer tasarım değişkenlerini tek bir yerden kontrol ediyor.

## 📁 Dosya Yapısı

```
fe/src/
├── styles/
│   ├── theme.scss      # Ana tema değişkenleri
│   └── components.scss # Component stilleri
└── app/
    └── globals.scss    # Global stilleri (tema import eder)
```

## 🎯 Temel Kullanım

### CSS Variables (Custom Properties)

Tüm tasarım token'ları CSS custom properties olarak tanımlanmış:

```scss
// Renk kullanımı
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

// Spacing kullanımı
.my-element {
  padding: var(--spacing-lg);
  margin: var(--spacing-md);
}

// Typography kullanımı
.my-text {
  font-size: var(--font-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}
```

## 🎨 Renk Paleti

### Ana Renkler
- `--primary-dark`: #0f172a (Koyu mavi-gri)
- `--primary-light`: #f1f5f9 (Açık gri)
- `--accent-orange`: #f59e0b (Vurgu turuncu)

### Arkaplan Renkleri
- `--bg-primary`: Ana arkaplan
- `--bg-secondary`: İkincil arkaplan  
- `--bg-white`: Beyaz arkaplan
- `--bg-glass`: Cam efekti arkaplan

### Metin Renkleri
- `--text-primary`: Ana metin rengi
- `--text-secondary`: İkincil metin rengi
- `--text-accent`: Vurgu metin rengi

### Durum Renkleri
- `--success-color`: #28a745 (Başarı - yeşil)
- `--danger-color`: #dc3545 (Hata - kırmızı)
- `--warning-color`: #fbbf24 (Uyarı - sarı)
- `--info-color`: #007bff (Bilgi - mavi)

## 🧩 Hazır Component Sınıfları

### Butonlar

```html
<!-- Ana buton -->
<button class="btn btn--primary">Kaydet</button>

<!-- Farklı durum butonları -->
<button class="btn btn--success">Başarılı</button>
<button class="btn btn--danger">Sil</button>
<button class="btn btn--warning">Uyarı</button>

<!-- Boyut varyasyonları -->
<button class="btn btn--primary btn--small">Küçük</button>
<button class="btn btn--primary btn--large">Büyük</button>
<button class="btn btn--primary btn--full">Tam genişlik</button>
```

### Formlar

```html
<div class="form-group">
  <label>İsim</label>
  <input type="text" class="form-input" placeholder="İsminizi girin">
</div>

<div class="form-group">
  <label>Açıklama</label>
  <textarea class="form-textarea"></textarea>
</div>
```

### Kartlar

```html
<div class="card">
  <div class="card__header">
    <h3>Başlık</h3>
  </div>
  <div class="card__body">
    <p>İçerik</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Aksiyon</button>
  </div>
</div>
```

### Modaller

```html
<div class="modal">
  <div class="modal__content">
    <div class="modal__header">
      <h2>Modal Başlığı</h2>
      <button class="close-btn">&times;</button>
    </div>
    <div class="modal__body">
      <p>Modal içeriği</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary">İptal</button>
      <button class="btn btn--primary">Kaydet</button>
    </div>
  </div>
</div>
```

### Alertler

```html
<div class="alert alert--success">Başarılı işlem!</div>
<div class="alert alert--danger">Hata oluştu!</div>
<div class="alert alert--warning">Dikkat!</div>
<div class="alert alert--info">Bilgi</div>
```

## 📏 Spacing Sistemi

```scss
// Padding örnekleri
.element {
  padding: var(--spacing-xs);   // 4px
  padding: var(--spacing-sm);   // 8px
  padding: var(--spacing-md);   // 12px
  padding: var(--spacing-lg);   // 16px
  padding: var(--spacing-xl);   // 20px
  padding: var(--spacing-2xl);  // 24px
  padding: var(--spacing-3xl);  // 32px
  padding: var(--spacing-4xl);  // 40px
  padding: var(--spacing-5xl);  // 48px
}
```

## 🔤 Typography Sistemi

```scss
// Font boyutları
.text {
  font-size: var(--font-xs);    // 12px
  font-size: var(--font-sm);    // 14px
  font-size: var(--font-base);  // 16px
  font-size: var(--font-lg);    // 18px
  font-size: var(--font-xl);    // 20px
  font-size: var(--font-2xl);   // 24px
  font-size: var(--font-3xl);   // 30px
  font-size: var(--font-4xl);   // 36px
  font-size: var(--font-5xl);   // 48px
}

// Font ağırlıkları
.text {
  font-weight: var(--font-light);     // 300
  font-weight: var(--font-normal);    // 400
  font-weight: var(--font-medium);    // 500
  font-weight: var(--font-semibold);  // 600
  font-weight: var(--font-bold);      // 700
}
```

## 🎭 Yardımcı Sınıflar

### Metin Hizalama
```html
<div class="text-left">Sola hizalı</div>
<div class="text-center">Orta hizalı</div>
<div class="text-right">Sağa hizalı</div>
```

### Flexbox Yardımcıları
```html
<div class="flex items-center justify-between">
  <span>Sol</span>
  <span>Sağ</span>
</div>
```

### Renk Yardımcıları
```html
<p class="text-success">Başarılı metin</p>
<p class="text-danger">Hata metni</p>
<p class="text-warning">Uyarı metni</p>
```

## 🎨 Tema Özelleştirme

Tema renklerini değiştirmek için `fe/src/styles/theme.scss` dosyasını düzenleyin:

```scss
:root {
  // Ana renkleri değiştirin
  --primary-dark: #your-color;
  --accent-orange: #your-accent;
  
  // Gradient'leri özelleştirin
  --gradient-orange: linear-gradient(135deg, #new-color1 0%, #new-color2 100%);
}
```

## 🌙 Koyu/Açık Tema

```html
<!-- Koyu tema -->
<body data-theme="dark">

<!-- Açık tema -->
<body data-theme="light">
```

## ✨ Avantajlar

1. **Merkezi Kontrol**: Tüm renkler tek yerden yönetiliyor
2. **Tutarlılık**: Tüm componentler aynı tasarım sistemini kullanıyor
3. **Bakım Kolaylığı**: Değişiklikler otomatik olarak her yere yansıyor
4. **Performans**: CSS custom properties tarayıcı tarafından optimize ediliyor
5. **Tema Desteği**: Kolayca farklı temalar oluşturulabilir

## 📚 Geriye Dönük Uyumluluk

Eski CSS sınıfları hala çalışıyor:
- `.btn.primary` → `.btn--primary`'ye yönlendiriliyor
- `.alert.success` → `.alert--success`'e yönlendiriliyor

## 🔧 Geliştirici Notları

1. Yeni componentler oluştururken tema değişkenlerini kullanın
2. Sabit renk değerleri kullanmayın
3. Component'lere özel CSS module dosyalarında da tema değişkenlerini tercih edin
4. Responsive tasarım için önceden tanımlı breakpoint'leri kullanın

---

**💡 İpucu**: Tüm tasarım token'larını görmek için `fe/src/styles/theme.scss` dosyasını inceleyin! 