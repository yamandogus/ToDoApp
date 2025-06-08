# Todo App Backend API

Modern Todo uygulaması için Express.js ve TypeScript kullanılarak geliştirilmiş RESTful API. PostgreSQL veritabanı ve Prisma ORM ile güçlendirilmiştir.

## 🚀 Özellikler

- **JWT Tabanlı Kimlik Doğrulama**: Güvenli kullanıcı girişi ve yetkilendirme
- **Todo CRUD İşlemleri**: Eksiksiz görev yönetimi sistemi
- **Kategori Yönetimi**: Todo'ları kategorilere ayırma imkanı
- **Kullanıcı Rolleri**: ADMIN ve USER rolleri ile yetki yönetimi
- **İstatistik ve Analiz**: Todo durumları ve öncelikler için analitik veriler
- **Rate Limiting**: API güvenliği için istek sınırlandırması
- **Güvenlik Önlemleri**: Helmet, CORS, bcrypt şifreleme
- **TypeScript**: Tip güvenliği ve gelişmiş geliştirici deneyimi
- **Jest Testing**: Kapsamlı test suite'i
- **Prisma ORM**: Modern veritabanı erişimi

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- PostgreSQL (v12 veya üzeri)
- npm veya yarn

## 🛠️ Kurulum

### Geleneksel Kurulum

#### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd backend
```

#### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

#### 3. Çevre Değişkenlerini Ayarlayın
`env.example` dosyasını `.env` olarak kopyalayın ve düzenleyin:
```bash
cp env.example .env
```

#### 4. Veritabanını Kurun
```bash
# Prisma migration'larını çalıştırın
npx prisma migrate dev

# Seed verilerini yükleyin (opsiyonel)
npm run prisma:seed
```

#### 5. Sunucuyu Başlatın
```bash
# Development modu
npm run dev

# Production build
npm run build
npm start
```

### 🐳 Docker ile Kurulum (Önerilen)

#### Development Ortamı
```bash
# Tüm servisleri başlat (PostgreSQL, Test DB, API)
docker-compose up --build

# Sadece veritabanı servislerini başlat
docker-compose up postgres postgres-test -d

# API'yi ayrı olarak çalıştır
npm run dev
```

#### Production Ortamı
```bash
# Production ortamını başlat
docker-compose -f docker-compose.prod.yml up --build -d
```

#### Docker Komutları
```bash
# Servisleri durdur ve volume'ları temizle
npm run docker:down

# Sadece build
npm run docker:build

# Test çalıştır (Docker içinde)
npm run docker:test
```

## 📚 API Dokümantasyonu

### Base URL
```
http://localhost:3000/api
```

### 🔐 Kimlik Doğrulama

#### Kayıt Ol
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "verifyPassword": "password123"
}
```

**Validasyon Kuralları:**
- `name`: 1-100 karakter arası
- `username`: 1-100 karakter arası, benzersiz olmalı
- `password`: 8-16 karakter arası
- `verifyPassword`: password ile eşleşmeli

#### Giriş Yap
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Başarılı Yanıt:**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "username": "johndoe",
      "role": "USER"
    }
  }
}
```

### 📝 Todo İşlemleri

> **Not**: Tüm todo endpoint'leri `Authorization: Bearer <token>` header'ı gerektirir.

#### Todo Listele
```http
GET /api/todos
Authorization: Bearer <token>
```

**Query Parametreleri:**
- `page`: Sayfa numarası (varsayılan: 1)
- `limit`: Sayfa başına kayıt (varsayılan: 10, maksimum: 50)
- `status`: Duruma göre filtrele (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- `priority`: Önceliğe göre filtrele (LOW, MEDIUM, HIGH)

#### Todo Oluştur
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Proje toplantısı",
  "description": "Haftalık proje durumu toplantısı",
  "priority": "HIGH",
  "dueDate": "2024-12-31T18:00:00.000Z"
}
```

**Validasyon Kuralları:**
- `title`: 1-100 karakter, zorunlu
- `description`: 0-500 karakter, opsiyonel
- `priority`: LOW, MEDIUM, HIGH (varsayılan: MEDIUM)
- `dueDate`: Gelecek bir tarih olmalı

#### Todo Güncelle
```http
PUT /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Güncellenmiş başlık",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```

#### Todo Durumunu Güncelle
```http
PATCH /api/todos/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

#### Todo Sil
```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

#### Todo'larda Arama
```http
GET /api/todos/search?q=toplantı
Authorization: Bearer <token>
```

### 🏷️ Kategori İşlemleri

#### Kategori Listele
```http
GET /api/categories
Authorization: Bearer <token>
```

#### Kategori Oluştur (Admin)
```http
POST /api/categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "İş",
  "color": "#FF6B6B"
}
```

#### Todo'ya Kategori Ekle
```http
POST /api/todos/:id/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "category-uuid"
}
```

### 📊 İstatistikler

#### Todo İstatistikleri
```http
GET /api/stats/todos
Authorization: Bearer <token>
```

**Yanıt:**
```json
{
  "status": "success",
  "data": {
    "total": 25,
    "completed": 10,
    "pending": 8,
    "inProgress": 5,
    "cancelled": 2,
    "byPriority": {
      "HIGH": 8,
      "MEDIUM": 12,
      "LOW": 5
    }
  }
}
```

#### Öncelik İstatistikleri
```http
GET /api/stats/priorities
Authorization: Bearer <token>
```

### 👥 Kullanıcı İşlemleri

#### Profil Bilgilerini Getir
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Tüm Kullanıcıları Listele (Admin)
```http
GET /api/users
Authorization: Bearer <admin-token>
```

#### Profil Güncelle
```http
PATCH /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Yeni İsim",
  "password": "yeniparola123"
}
```

## 🗄️ Veritabanı Şeması

### User
- `id`: UUID (Primary Key)
- `name`: String
- `username`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum (ADMIN, USER)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `deletedAt`: DateTime (Soft Delete)

### Todo
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `title`: String
- `description`: String (Optional)
- `status`: Enum (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- `priority`: Enum (LOW, MEDIUM, HIGH)
- `dueDate`: DateTime
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `deletedAt`: DateTime (Soft Delete)

### Category
- `id`: UUID (Primary Key)
- `name`: String (Unique)
- `color`: String (Hex Color)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### TodoCategory (Many-to-Many Junction)
- `todoId`: UUID (Foreign Key)
- `categoryId`: UUID (Foreign Key)
- Unique constraint: [todoId, categoryId]

## 🔒 Güvenlik

- **JWT Authentication**: 24 saat geçerli token'lar
- **Rate Limiting**: 
  - Auth routes: 20 istek/15 dakika
  - Global: 100 istek/15 dakika
- **Password Hashing**: bcrypt ile güvenli şifreleme
- **Helmet**: Güvenlik header'ları
- **CORS**: Cross-Origin Resource Sharing koruması
- **Input Validation**: Zod ile veri doğrulama

## 🧪 Test

### Test Ortamı Kurulumu

#### Docker ile Test (Önerilen)
```bash
# Test veritabanını başlat
docker-compose up postgres-test -d

# Test ortamını hazırla
npm run test:setup

# Testleri çalıştır
npm test
```

#### Manuel Test Kurulumu
```bash
# Test veritabanını oluştur
createdb todoapp_test

# Test environment değişkenini ayarla
export DATABASE_TEST_URL="postgresql://username:password@localhost:5432/todoapp_test"

# Test migration'larını çalıştır
DATABASE_URL=$DATABASE_TEST_URL npx prisma migrate dev
```

### Test Komutları
```bash
# Tüm testleri çalıştır
npm test

# Test watch modu
npm run test:watch

# Coverage raporu
npm run test:coverage

# CI için testler (watch olmadan)
npm run test:ci

# Docker içinde test çalıştır
npm run docker:test
```

### Test Yapısı
```
src/__tests__/
├── setup.ts           # Test setup ve teardown
├── todo.test.ts       # Todo API testleri
├── category.test.ts   # Kategori API testleri
├── stats.test.ts      # İstatistik API testleri
└── auth.test.ts       # Kimlik doğrulama testleri
```

### Test Özellikleri
- **Kapsamlı API Testleri**: Tüm endpoint'ler için test coverage
- **Ayrı Test Veritabanı**: Production verilerini etkilemez
- **Otomatik Cleanup**: Her testten sonra veriler temizlenir
- **Mocking**: Dış servislerin mocklanması
- **Coverage Reports**: HTML ve LCOV formatlarında rapor

## 📁 Proje Yapısı

```
src/
├── config/          # Uygulama konfigürasyonları
├── controllers/     # HTTP request handler'ları
├── middlewares/     # Custom middleware'ler
├── model/          # Prisma modelleri
├── repositories/   # Veri erişim katmanı
├── routes/         # API route tanımları
├── services/       # İş mantığı katmanı
├── types/          # TypeScript tip tanımları
├── utils/          # Yardımcı fonksiyonlar
├── validations/    # Zod şema validasyonları
├── app.ts          # Express app konfigürasyonu
└── server.ts       # Sunucu başlatma
```

## 🚀 Geliştirme

### Yeni Migration Oluşturma
```bash
npx prisma migrate dev --name migration_ismi
```

### Prisma Client Güncelleme
```bash
npx prisma generate
```

### Seed Verisi Ekleme
```bash
npm run prisma:seed
```

## 📈 Performans

- Prisma ile optimize edilmiş veritabanı sorguları
- Rate limiting ile DoS saldırı koruması
- JWT token tabanlı stateless authentication
- Soft delete ile veri bütünlüğü koruması

## 🛠️ Hata Kodları

- `200`: Başarılı
- `201`: Oluşturuldu
- `400`: Geçersiz istek (Validasyon hatası)
- `401`: Kimlik doğrulama gerekli
- `403`: Yetkisiz erişim
- `404`: Kaynak bulunamadı
- `429`: Çok fazla istek (Rate limit)
- `500`: Sunucu hatası

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📞 Destek

Herhangi bir sorun yaşarsanız veya önerileriniz varsa issue açabilirsiniz. 