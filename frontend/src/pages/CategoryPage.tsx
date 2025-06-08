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
import { getCategories } from "@/services/categoryService";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "@/store/slices/todoSlice";

interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  todoCount?: number; 
}

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  category_ids: string[];
}
const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tokenFromStore = useSelector((state: RootState) => state.user.token);
  const token = tokenFromStore || localStorage.getItem("token");
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("");
  const allTodos = useSelector((state: RootState) => state.todos.todos as Todo[]);

  useEffect(() => {
    const fetchPageData = async () => {
      if (token) {
        try {
          const fetchedCategories = await getCategories(token);
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            setActiveTabId(fetchedCategories[0].id);
          } else {
            setActiveTabId("");
          }
          dispatch(fetchTodos(token));
        } catch (error) {
          console.error("Kategori ve todo verileri getirilirken hata oluştu:", error);
        }
      }
    };
    fetchPageData();
  }, [token, dispatch]);

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Kategori Yönetimi</h1>
      </div>

      <Tabs value={activeTabId} onValueChange={setActiveTabId} className="w-full">
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
                {allTodos.filter(todo => todo.category_ids && todo.category_ids.includes(category.id)).length}
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
                        {new Date(category.createdAt).toLocaleDateString(
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3" style={{backgroundColor:'#23293a', borderRadius:'0.5rem'}}>
                        <div className="text-sm" style={{color:'#bfc8e6'}}>
                          Toplam Todo
                        </div>
                        <div
                          className="text-xl sm:text-2xl font-bold"
                          style={{ color: category.color }}
                        >
                          {allTodos.filter(todo => todo.category_ids && todo.category_ids.includes(category.id)).length}
                        </div>
                      </div>
                      <div className="p-3" style={{backgroundColor:'#23293a', borderRadius:'0.5rem'}}>
                        <div className="text-sm" style={{color:'#bfc8e6'}}>
                          Kategori Rengi
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-4 h-4 rounded border flex-shrink-0"
                            style={{ backgroundColor: category.color, opacity:0.7 }}
                          />
                          <span className="font-mono text-sm" style={{color:'#bfc8e6'}}>
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

                  {/* Bu Kategoriye Ait Todolar Bölümü */}
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold mb-3 text-sm sm:text-base">
                      Bu Kategoriye Ait Todolar ({allTodos.filter(todo => todo.category_ids && todo.category_ids.includes(category.id)).length})
                    </h3>
                    {(() => {
                      const categoryTodos = allTodos.filter(
                        (todo) => todo.category_ids && todo.category_ids.includes(category.id)
                      );
                      if (categoryTodos.length > 0) {
                        return (
                          <ul className="space-y-3">
                            {categoryTodos.map((todo) => (
                              <li key={todo.id} className="p-3 rounded-md border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-medium text-base text-primary">{todo.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                  <Badge variant={todo.status === 'COMPLETED' ? 'default' : 'secondary'}>{todo.status}</Badge>
                                  <Badge variant="outline">Öncelik: {todo.priority}</Badge>
                                  {todo.dueDate && (
                                    <Badge variant="outline">
                                      Bitiş: {new Date(todo.dueDate).toLocaleDateString("tr-TR")}
                                    </Badge>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        );
                      } else {
                        return (
                          <p className="text-sm text-muted-foreground italic">
                            Bu kategoride henüz todo bulunmamaktadır.
                          </p>
                        );
                      }
                    })()}
                  </div>

                  <div className="border-t pt-4 mt-6">
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
