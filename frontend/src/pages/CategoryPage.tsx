import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const categories = [
    {
      id: "backend",
      name: "Backend",
      color: "#4A90E2",
      todoCount: 5,
      description:
        "Backend geliştirme görevleri - API, veritabanı, sunucu işlemleri",
      created_at: "2025-05-01T10:00:00.000Z",
    },
    {
      id: "frontend",
      name: "Frontend",
      color: "#50E3C2",
      todoCount: 3,
      description:
        "Frontend geliştirme görevleri - React, UI/UX, kullanıcı arayüzü",
      created_at: "2025-05-01T11:00:00.000Z",
    },
    {
      id: "database",
      name: "Database",
      color: "#F5A623",
      todoCount: 2,
      description:
        "Veritabanı görevleri - Şema tasarımı, migrasyon, optimizasyon",
      created_at: "2025-05-01T12:00:00.000Z",
    },
  ];

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Kategori Yönetimi</h1>
      </div>

      <Tabs defaultValue="backend" className="w-full">
        <TabsList className="grid w-full grid-cols-3 shadow-lg h-auto p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 min-h-[60px] sm:min-h-[40px]"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs sm:text-sm font-medium">
                  {category.name}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs px-1 py-0">
                {category.todoCount}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="mt-4 sm:mt-6"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <div>
                      <CardTitle className="text-xl sm:text-2xl">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        Oluşturulma:{" "}
                        {new Date(category.created_at).toLocaleDateString(
                          "tr-TR"
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full lg:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 lg:flex-none"
                    >
                      <span className="hidden sm:inline">✏️ </span>Düzenle
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 lg:flex-none"
                    >
                      <span className="hidden sm:inline">🗑️ </span>Sil
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">
                      Kategori Bilgileri
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {category.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Toplam Todo
                        </div>
                        <div
                          className="text-xl sm:text-2xl font-bold"
                          style={{ color: category.color }}
                        >
                          {category.todoCount}
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Kategori Rengi
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-4 h-4 rounded border flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-mono text-sm">
                            {category.color}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3 text-sm sm:text-base">
                      Hızlı İşlemler
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-sm"
                        style={{
                          borderColor: category.color,
                          color: category.color,
                        }}
                      >
                        + Todo Ekle
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-sm"
                      >
                        📊 İstatistikler
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-sm"
                      >
                        📋 Todo Listesi
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3 text-sm sm:text-base">
                      Kategori Detayları
                    </h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Kategori ID:
                        </span>
                        <span className="font-mono text-xs sm:text-sm">
                          {category.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durum:</span>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: category.color,
                            color: category.color,
                          }}
                        >
                          Aktif
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Son Güncelleme:
                        </span>
                        <span className="text-xs sm:text-sm">
                          {new Date().toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryPage;
