import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const TodoListPage = () => {
  const navigate = useNavigate();
  const categories = [
    { id: "backend", name: "Backend", color: "#4A90E2", count: 5 },
    { id: "frontend", name: "Frontend", color: "#50E3C2", count: 3 },
    { id: "database", name: "Database", color: "#F5A623", count: 2 }
  ]
  const todosByCategory = {
    backend: [
      {
        id: "1",
        title: "API Dokümantasyonunu Hazırla",
        description: "Swagger veya Postman ile API dokümantasyonu oluştur",
        status: "pending",
        priority: "high",
        due_date: "2025-05-10T18:00:00.000Z"
      },
      {
        id: "2", 
        title: "Veritabanı Şemasını Tasarla",
        description: "Todo uygulaması için gerekli tabloları ve ilişkileri tasarla",
        status: "in_progress",
        priority: "high",
        due_date: "2025-05-05T18:00:00.000Z"
      }
    ],
    frontend: [
      {
        id: "3",
        title: "React Komponentlerini Oluştur", 
        description: "Todo ve form komponentlerini geliştir",
        status: "pending",
        priority: "medium",
        due_date: "2025-05-11T18:00:00.000Z"
      }
    ],
    database: [
      {
        id: "4",
        title: "Migrasyon Dosyalarını Hazırla",
        description: "Veritabanı şeması için migrasyon dosyaları oluştur",
        status: "pending", 
        priority: "medium",
        due_date: "2025-05-08T18:00:00.000Z"
      }
    ]
  }
  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Beklemede", variant: "secondary" as const },
      in_progress: { label: "Devam Ediyor", variant: "default" as const },
      completed: { label: "Tamamlandı", variant: "destructive" as const },
      cancelled: { label: "İptal Edildi", variant: "outline" as const }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { label: "Düşük", className: "bg-green-100 text-green-800" },
      medium: { label: "Orta", className: "bg-yellow-100 text-yellow-800" },
      high: { label: "Yüksek", className: "bg-red-100 text-red-800" }
    }
    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium
  }

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Todo Listesi</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            API geliştirme, veritabanı işlemleri ve sunucu yapılandırması görevleri
          </p>
        </div>
      </div>

      <Tabs defaultValue="backend" className="w-full">
        <TabsList className="grid w-full grid-cols-3 shadow-lg h-auto md:p-1">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 min-h-[60px] sm:min-h-[40px]"
              style={{
                '--category-color': category.color
              } as React.CSSProperties}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs sm:text-sm font-medium">{category.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs px-1 font-bold py-0 bg-green-500 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4 sm:mt-6">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {category.name === 'Backend' && 'Backend geliştirme görevleri - API, veritabanı, sunucu işlemleri'}
                {category.name === 'Frontend' && 'Frontend geliştirme görevleri - React, UI/UX, kullanıcı arayüzü'} 
                {category.name === 'Database' && 'Veritabanı görevleri - Şema tasarımı, migrasyon, optimizasyon'}
              </p>
            </div>

            <div className="grid gap-4">
              {todosByCategory[category.id as keyof typeof todosByCategory]?.map((todo) => (
                <Card 
                  key={todo.id} 
                  className="hover:shadow-xl transition-shadow shadow-lg cursor-pointer"
                  onClick={() => navigate(`/todos/${todo.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <CardTitle className="text-base sm:text-lg">{todo.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant={getStatusBadge(todo.status).variant}
                          className="text-xs"
                        >
                          {getStatusBadge(todo.status).label}
                        </Badge>
                        <Badge 
                          className={`${getPriorityBadge(todo.priority).className} text-xs`}
                        >
                          {getPriorityBadge(todo.priority).label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3 text-sm">
                      {todo.description}
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm text-muted-foreground">
                      <span>Bitiş Tarihi: {new Date(todo.due_date).toLocaleDateString('tr-TR')}</span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:underline text-sm" onClick={e => e.stopPropagation()}>Düzenle</button>
                        <button className="text-red-600 hover:underline text-sm" onClick={e => e.stopPropagation()}>Sil</button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {(!todosByCategory[category.id as keyof typeof todosByCategory] || 
                todosByCategory[category.id as keyof typeof todosByCategory].length === 0) && (
                <Card className="border-dashed shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4 text-center text-sm sm:text-base">
                      {category.name} kategorisinde henüz todo bulunmuyor
                    </p>
                    <button 
                      className="text-blue-600 hover:underline text-sm"
                      style={{ color: category.color }}
                    >
                      + Yeni Todo Ekle
                    </button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TodoListPage 