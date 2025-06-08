# Todo Application - Full Stack Project

Modern, tam işlevsel Todo uygulaması. Express.js backend API'si ve React frontend'i ile birlikte geliştirilmiştir.

## 🏗️ Proje Yapısı

```
TodoApp/
├── backend/          # Express.js + TypeScript + PostgreSQL + Prisma
│   ├── src/         # Backend kaynak kodları
│   ├── prisma/      # Veritabanı şemaları ve migration'lar
│   └── README.md    # Backend dokümantasyonu
├── frontend/        # React + TypeScript + Tailwind CSS + Redux
│   ├── src/         # Frontend kaynak kodları
│   ├── public/      # Statik dosyalar
│   └── README.md    # Frontend dokümantasyonu
└── README.md        # Bu dosya
```

## 🚀 Hızlı Başlangıç

### Önkoşullar
- Node.js (v18 veya üzeri)
- PostgreSQL (v12 veya üzeri)
- npm veya yarn

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd TodoApp
```

### 2. Backend Kurulumu
```bash
cd backend
npm install

# .env dosyası oluşturun
echo 'DATABASE_URL="postgresql://username:password@localhost:5432/todoapp"
JWT_SECRET="your-super-secret-jwt-key"' > .env

# Veritabanı migration'larını çalıştırın
npx prisma migrate dev

# Seed verilerini yükleyin (opsiyonel)
npm run prisma:seed

# Backend'i başlatın
npm run dev
```

### 3. Frontend Kurulumu
```bash
# Yeni terminal açın
cd frontend
npm install

# Frontend'i başlatın
npm run dev
```

### 4. Uygulamayı Kullanın
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api

## 🛠️ Teknoloji Stack'i

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Password**: bcrypt
- **Testing**: Jest, Supertest

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **UI Components**: Radix UI
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📱 Özellikler

### ✅ Tamamlanan Özellikler

#### 🔐 Kimlik Doğrulama
- [x] Kullanıcı kaydı ve girişi
- [x] JWT tabanlı authentication
- [x] Role-based authorization (ADMIN/USER)
- [x] Token yönetimi ve yenileme
- [x] Güvenli şifre hashleme

#### 📝 Todo Yönetimi
- [x] Todo CRUD işlemleri (Oluştur, Oku, Güncelle, Sil)
- [x] Durum yönetimi (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- [x] Öncelik seviyeleri (LOW, MEDIUM, HIGH)
- [x] Bitiş tarihi ayarlama
- [x] Todo arama özelliği
- [x] Filtreleme ve sıralama
- [x] Sayfalama desteği

#### 🏷️ Kategori Sistemi
- [x] Kategori oluşturma ve yönetimi (Admin)
- [x] Todo'lara kategori atama (Many-to-Many)
- [x] Renk kodlama sistemi
- [x] Kategori bazında filtreleme

#### 👥 Kullanıcı Yönetimi
- [x] Profil bilgileri görüntüleme ve güncelleme
- [x] Parola değiştirme
- [x] Kullanıcı rolleri (ADMIN/USER)
- [x] Admin panel (kullanıcı yönetimi)

#### 📊 İstatistikler ve Analytics
- [x] Todo durum istatistikleri
- [x] Öncelik bazında dağılım
- [x] Kullanıcı bazında metrиkler
- [x] Dashboard görünümü

#### 🎨 UI/UX
- [x] Responsive tasarım (Mobile, Tablet, Desktop)
- [x] Dark/Light tema desteği
- [x] Modern ve clean interface
- [x] Loading states ve error handling
- [x] Toast notifications
- [x] Form validasyonu

#### 🔒 Güvenlik
- [x] Input validation ve sanitization
- [x] Rate limiting
- [x] CORS protection
- [x] Security headers (Helmet)
- [x] SQL injection koruması (Prisma ORM)
- [x] XSS koruması

### 🎯 Case Çalışması Uyumluluğu

Bu proje, .cursorrules dosyasındaki Todo App Case Çalışması gereksinimlerini karşılar:

#### ✅ Backend Gereksinimleri
- [x] **Veritabanı**: PostgreSQL + Prisma ORM
- [x] **API Design**: RESTful API with proper HTTP status codes
- [x] **Authentication**: JWT implementation
- [x] **Validation**: Zod schema validation
- [x] **Security**: Helmet, CORS, Rate limiting
- [x] **Architecture**: MVC pattern with services and repositories
- [x] **Testing**: Jest test suite
- [x] **Error Handling**: Centralized error management

#### ✅ Frontend Gereksinimleri
- [x] **React**: React 18 with hooks
- [x] **State Management**: Redux Toolkit
- [x] **Routing**: React Router v6
- [x] **Forms**: React Hook Form with validation
- [x] **Styling**: Tailwind CSS
- [x] **TypeScript**: Full type safety
- [x] **HTTP Client**: Axios
- [x] **UI Library**: Radix UI components

#### ✅ Bonus Özellikler
- [x] **Role-based Authorization**: ADMIN/USER roles
- [x] **Advanced UI**: Modern component library
- [x] **Performance**: Code splitting and optimization
- [x] **Responsive Design**: Mobile-first approach

## 📚 API Dokümantasyonu

### Authentication Endpoints
```
POST /api/auth/signup    # Kullanıcı kaydı
POST /api/auth/login     # Kullanıcı girişi
```

### Todo Endpoints
```
GET    /api/todos           # Todo listesi (paginated)
POST   /api/todos           # Yeni todo oluştur
GET    /api/todos/:id       # Tekil todo getir
PUT    /api/todos/:id       # Todo güncelle
DELETE /api/todos/:id       # Todo sil
PATCH  /api/todos/:id/status # Todo durumunu güncelle
GET    /api/todos/search    # Todo ara
```

### Category Endpoints
```
GET    /api/categories      # Kategori listesi
POST   /api/categories      # Kategori oluştur (Admin)
GET    /api/categories/:id  # Tekil kategori
PUT    /api/categories/:id  # Kategori güncelle (Admin)
DELETE /api/categories/:id  # Kategori sil (Admin)
```

### Stats Endpoints
```
GET /api/stats/todos        # Todo istatistikleri
GET /api/stats/priorities   # Öncelik istatistikleri
```

Detaylı API dokümantasyonu için [Backend README](./backend/README.md) dosyasına bakın.

## 🗄️ Veritabanı Şeması

```sql
-- Users
User {
  id: UUID (PK)
  name: String
  username: String (Unique)
  password: String (Hashed)
  role: Enum (ADMIN, USER)
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt: DateTime?
}

-- Todos
Todo {
  id: UUID (PK)
  userId: UUID (FK)
  title: String
  description: String?
  status: Enum (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
  priority: Enum (LOW, MEDIUM, HIGH)
  dueDate: DateTime
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt: DateTime?
}

-- Categories
Category {
  id: UUID (PK)
  name: String (Unique)
  color: String
  createdAt: DateTime
  updatedAt: DateTime
}

-- Todo-Category Relationship (Many-to-Many)
TodoCategory {
  todoId: UUID (FK)
  categoryId: UUID (FK)
}
```

## 🧪 Test

### Backend Tests
```bash
cd backend
npm test                 # Tüm testleri çalıştır
npm run test:watch      # Watch modunda test
npm run test:coverage   # Coverage raporu
```

### Frontend Tests
```bash
cd frontend
npm test                 # Component testleri
npm run test:coverage   # Coverage raporu
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
# dist/ klasörünü static hosting'e yükleyin
```

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/todoapp"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

## 📈 Performans

### Backend
- Prisma ORM ile optimize edilmiş queries
- Rate limiting ile DoS protection
- JWT stateless authentication
- Database indexing
- Efficient pagination

### Frontend
- Code splitting ile bundle optimization
- React.memo ile re-render optimization
- Lazy loading ile initial load optimization
- Tailwind CSS purging
- Vite ile fast HMR

## 🔧 Geliştirme

### Backend Development
```bash
cd backend
npm run dev              # Development server
npx prisma studio       # Database GUI
npx prisma migrate dev  # New migration
```

### Frontend Development
```bash
cd frontend
npm run dev             # Development server
npm run build          # Production build
npm run preview        # Preview build
```

## 🎯 Best Practices

### Code Quality
- TypeScript ile tip güvenliği
- ESLint ve Prettier ile kod standardı
- Consistent naming conventions
- Modular architecture
- Clean code principles

### Security
- Input validation on both sides
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure password hashing
- JWT token security

### Performance
- Database query optimization
- Frontend bundle optimization
- Caching strategies
- Lazy loading
- Code splitting

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasına bakın.

## 📞 Destek

- **Issues**: Hata raporları ve öneriler için GitHub Issues kullanın
- **Discussions**: Genel sorular için GitHub Discussions
- **Email**: Özel konular için doğrudan iletişim

## 🙏 Teşekkürler

Bu proje, modern web geliştirme best practice'lerini ve teknolojilerini showcase etmek amacıyla geliştirilmiştir. Katkıda bulunan herkese teşekkürler!

---

**Not**: Bu proje eğitim ve case study amaçlı geliştirilmiştir. Production kullanımı için ek güvenlik ve optimizasyon çalışmaları yapılması önerilir. 