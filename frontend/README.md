# Todo App Frontend

Modern ve responsive Todo uygulaması frontend'i. React 18, TypeScript, Tailwind CSS ve Redux Toolkit kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Modern React 18**: En son React özelliklerini kullanır
- **TypeScript**: Tam tip güvenliği ve gelişmiş geliştirici deneyimi
- **Responsive Tasarım**: Mobil, tablet ve desktop için optimize edilmiş
- **Dark/Light Theme**: Kullanıcı tercihine göre tema değiştirme
- **Redux Toolkit**: Merkezi state yönetimi
- **React Hook Form**: Performanslı form yönetimi
- **React Router v6**: Modern routing sistemi
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Erişilebilir UI bileşenleri
- **Real-time Search**: Anlık todo arama özelliği
- **Toast Notifications**: Kullanıcı dostu bildirimler
- **Loading States**: Gelişmiş yükleme durumları
- **Error Handling**: Kapsamlı hata yönetimi

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Modern web tarayıcısı

## 🛠️ Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd frontend
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarlayın
`.env` dosyası oluşturun (gerekirse):
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Uygulamayı Başlatın
```bash
# Development modu
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### 5. Tarayıcıda Açın
```
http://localhost:5173
```

## 🎨 Tasarım ve UI

### Tema Sistemi
- **Light Theme**: Aydınlık ve temiz arayüz
- **Dark Theme**: Göz dostu karanlık mod
- **Sistem Tercihi**: Otomatik tema seçimi

### Responsive Breakpoints
- **Mobile**: 640px ve altı
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px ve üzeri

### Renk Paleti
- **Primary**: Mavi tonları (#3B82F6)
- **Success**: Yeşil tonları (#10B981)
- **Warning**: Sarı tonları (#F59E0B)
- **Error**: Kırmızı tonları (#EF4444)

## 📱 Sayfalar ve Özellikler

### 🏠 Dashboard
- **Genel Bakış**: Todo istatistikleri ve özet bilgiler
- **Yaklaşan Görevler**: Bitiş tarihi yaklaşan todo'lar
- **Durum Dağılımı**: Pasta grafiği ile görsel analiz
- **Hızlı Eylemler**: Yeni todo ekleme ve durum güncelleme

### 📝 Todo Yönetimi
- **Todo Listesi**: Sayfalanmış todo listesi
- **Filtreleme**: Durum, öncelik ve kategoriye göre filtreleme
- **Arama**: Başlık ve açıklamada anlık arama
- **Sıralama**: Tarih, öncelik ve alfabetik sıralama
- **CRUD İşlemleri**: Oluştur, oku, güncelle, sil
- **Durum Yönetimi**: Drag & drop ile durum değiştirme
- **Kategori Atama**: Todo'lara kategori ekleme/çıkarma

### 🏷️ Kategori Yönetimi
- **Kategori Listesi**: Tüm kategorileri görüntüleme
- **Renk Seçimi**: Her kategori için özel renk
- **Kategori CRUD**: Admin kullanıcılar için kategori yönetimi
- **İstatistikler**: Kategori başına todo sayıları

### 👤 Kullanıcı Profili
- **Profil Bilgileri**: Kullanıcı detayları
- **Parola Değiştirme**: Güvenli parola güncelleme
- **Hesap Ayarları**: Tercih yönetimi
- **Kullanıcı İstatistikleri**: Kişisel performans metrikleri

### 🔐 Kimlik Doğrulama
- **Giriş Sayfası**: Kullanıcı adı/parola ile giriş
- **Kayıt Sayfası**: Yeni hesap oluşturma
- **Form Validasyonu**: Gerçek zamanlı doğrulama
- **Hata Yönetimi**: Kullanıcı dostu hata mesajları

## 🧩 Bileşen Mimarisi

### Layout Bileşenleri
- **Navbar**: Ana navigasyon menüsü
- **Sidebar**: Yan menu (mobile için)
- **Footer**: Alt bilgi alanı
- **Container**: Responsive content wrapper

### UI Bileşenleri
- **Button**: Çeşitli varyantlarda buton
- **Input**: Form input alanları
- **Modal**: Dialog pencereler
- **Toast**: Bildirim mesajları
- **Badge**: Durum ve etiket göstergeler
- **Card**: İçerik kartları
- **Dropdown**: Açılır menüler
- **Checkbox**: Seçim kutuları
- **Radio**: Radyo butonları
- **Switch**: Toggle butonları

### Todo Bileşenleri
- **TodoList**: Todo listesi container
- **TodoItem**: Tekil todo kartı
- **TodoForm**: Todo oluştur/güncelle formu
- **TodoFilter**: Filtreleme kontrolleri
- **CreateTodoDialog**: Yeni todo modal'ı
- **TodoStats**: İstatistik gösterimi

### Form Bileşenleri
- **LoginForm**: Giriş formu
- **RegisterForm**: Kayıt formu
- **ProfileForm**: Profil güncelleme formu
- **CategoryForm**: Kategori formu

## 🗂️ Dosya Yapısı

```
src/
├── components/           # Yeniden kullanılabilir bileşenler
│   ├── ui/              # Temel UI bileşenleri
│   ├── layout/          # Layout bileşenleri
│   ├── todo/            # Todo ile ilgili bileşenler
│   ├── category/        # Kategori bileşenleri
│   ├── common/          # Ortak bileşenler
│   └── dashboard/       # Dashboard bileşenleri
├── pages/               # Sayfa bileşenleri
│   ├── auth/           # Kimlik doğrulama sayfaları
│   ├── Dashboard.tsx   # Ana sayfa
│   ├── CategoryPage.tsx # Kategori yönetimi
│   └── ProfilePage.tsx # Profil sayfası
├── store/              # Redux store
│   ├── slices/         # Redux slice'ları
│   └── store.ts        # Store konfigürasyonu
├── services/           # API servisleri
│   ├── api.ts          # Axios instance
│   ├── authService.ts  # Kimlik doğrulama
│   ├── todoService.ts  # Todo işlemleri
│   └── categoryService.ts # Kategori işlemleri
├── hooks/              # Custom hook'lar
├── types/              # TypeScript tip tanımları
├── lib/                # Utility fonksiyonları
├── assets/             # Statik dosyalar
├── App.tsx             # Ana uygulama
└── main.tsx            # Entry point
```

## 🔧 State Yönetimi

### Redux Store
```typescript
// Store Yapısı
{
  auth: {
    token: string | null,
    username: string | null,
    userId: string | null,
    name: string | null,
    role: string | null,
    isAuthenticated: boolean
  },
  todos: {
    items: Todo[],
    loading: boolean,
    error: string | null
  }
}
```

### Auth Slice
- `setCredentials`: Token ve kullanıcı bilgilerini kaydet
- `setUser`: Detaylı kullanıcı bilgilerini kaydet  
- `logout`: Oturumu sonlandır

### Todo Slice
- `setTodos`: Todo listesini güncelle
- `addTodo`: Yeni todo ekle
- `updateTodo`: Todo güncelle
- `removeTodo`: Todo sil
- `setLoading`: Yükleme durumunu ayarla

## 🌐 API Entegrasyonu

### Base Configuration
```typescript
// api.ts
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Authentication Service
```typescript
// authService.ts
export const authService = {
  login: (data: LoginData) => Promise<AuthResponse>,
  register: (data: RegisterData) => Promise<AuthResponse>,
  logout: () => void,
  isAuthenticated: () => boolean
}
```

### Todo Service
```typescript
// todoService.ts
export const todoService = {
  createTodo: (payload: TodoPayload, token?: string) => Promise<Todo>,
  updateTodo: (id: string, payload: Partial<TodoPayload>, token?: string) => Promise<Todo>,
  deleteTodo: (id: string, token?: string) => Promise<void>
}
```

## 📱 Responsive Tasarım

### Mobile First Approach
- Mobil öncelikli tasarım yaklaşımı
- Progressive enhancement stratejisi
- Touch-friendly interface

### Breakpoint Kullanımı
```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Tablet */
md: 768px   /* Small Desktop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

### Layout Adaptasyonu
- **Mobile**: Single column, collapsible navigation
- **Tablet**: Two column, sidebar navigation
- **Desktop**: Multi-column, full navigation

## 🎯 Performans Optimizasyonları

### Code Splitting
```typescript
// Lazy loading ile sayfa bölme
const Dashboard = lazy(() => import('./pages/Dashboard'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
```

### React Optimizations
- `React.memo` ile gereksiz render'ları önleme
- `useCallback` ile fonksiyon memoization
- `useMemo` ile hesaplama cache'leme

### Bundle Optimization
- Tree shaking ile kullanılmayan kodları temizleme
- Vendor chunks ile kütüphane ayrımı
- Gzip compression desteği

## 🧪 Test Stratejisi

### Unit Tests
```bash
# Component testleri
npm run test

# Coverage raporu
npm run test:coverage
```

### Testing Tools
- **Jest**: Test framework
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Cypress**: E2E testing (opsiyonel)

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Build dosyalarını preview
npm run preview
```

### Environment Variables
```env
# Production
VITE_API_BASE_URL=https://api.todoapp.com

# Development  
VITE_API_BASE_URL=http://localhost:3000
```

### Deployment Platforms
- **Vercel**: Otomatik deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting
- **Firebase Hosting**: Google cloud hosting

## 🎨 Styling Guide

### Tailwind CSS Conventions
```css
/* Spacing */
p-4    /* padding: 1rem */
m-2    /* margin: 0.5rem */
gap-6  /* gap: 1.5rem */

/* Colors */
bg-blue-500     /* Primary blue */
text-gray-900   /* Dark text */
border-gray-200 /* Light border */

/* Layout */
flex items-center justify-between
grid grid-cols-1 md:grid-cols-2
```

### Component Styling
- Consistent spacing: 4px grid system
- Color harmony: Predetermined color palette
- Typography: Readable font sizes and weights
- Shadows: Subtle depth with shadows

## 🔍 Debugging

### Development Tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State debugging
- **Network Tab**: API call monitoring
- **Console Logs**: Error tracking

### Common Issues
- **CORS Errors**: Backend configuration
- **Token Expiry**: Authentication renewal
- **State Updates**: Redux debugging
- **Route Issues**: Router configuration

## 📈 Analytics ve Monitoring

### User Experience Metrics
- Page load times
- User interaction tracking
- Error rate monitoring
- Performance benchmarks

### Tools Integration
- Google Analytics (opsiyonel)
- Sentry error tracking (opsiyonel)
- Lighthouse performance audits

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

## 🔗 Faydalı Linkler

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/) 