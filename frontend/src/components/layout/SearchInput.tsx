import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {Search } from "lucide-react";
import { api } from "@/services/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Badge } from "../ui/badge";


interface TodoItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  categoryId?: string[];
}


function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING": return "Bekliyor";
    case "IN_PROGRESS": return "Devam Ediyor";
    case "COMPLETED": return "Tamamlandı";
    case "CANCELLED": return "İptal Edildi";
    default: return status;
  }
}

 function getPriorityLabel(priority: string) {
  switch (priority) {
    case "LOW": return "Düşük";
    case "MEDIUM": return "Orta";
    case "HIGH": return "Yüksek";
    default: return "Bekliyor";
  }
}

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<TodoItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const timeout = setTimeout(async () => {
      try {
        const response = await api.get('/api/todos/search', {
          params: { q: searchTerm },
          headers: { Authorization: `Bearer ${token}` },
        });
        const todos = response.data?.data?.data || [];
        setResults(todos);
        setShowDropdown(true);
      } catch (err) {
        setError("Arama sırasında bir hata oluştu.");
        setResults([]);
        setShowDropdown(true);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm, token]);


  return (
    <div className="relative w-full md:w-64">
      <Input
        type="text"
        placeholder="Görevlerde ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 w-full md:w-64"
        onFocus={() => searchTerm && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-[380px] bg-white border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto top-full">
          {loading && (
            <div className="p-2 text-sm text-muted-foreground">Aranıyor...</div>
          )}
          {error && <div className="p-2 text-sm text-destructive">{error}</div>}
          {!loading && !error && results.length === 0 && (
            <div className="p-2 text-sm text-muted-foreground">
              Sonuç bulunamadı.
            </div>
          )}
          {!loading &&
            !error &&
            results.map((todo) => (
              <div
                key={todo.id}
                className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-blue-50 transition"
              >
                <div className="text-base font-semibold text-gray-900 mb-1">
                  {todo.title}
                </div>
                {todo.description && (
                  <div className="text-base text-gray-600 mb-2">
                    {todo.description}
                  </div>
                )}
                <div className="flex flex-col gap-1 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Durum:</span>
                    <Badge className={todo.status === "PENDING" ? "bg-blue-500" : todo.status === "IN_PROGRESS" ? "bg-yellow-500" : todo.status === "COMPLETED" ? "bg-green-500" : todo.status === "CANCELLED" ? "bg-red-500" : "bg-gray-500"}>
                      {getStatusLabel(todo.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Öncelik:</span>
                    <Badge className={todo.priority === "LOW" ? "bg-green-500" : todo.priority === "MEDIUM" ? "bg-yellow-500" : todo.priority === "HIGH" ? "bg-red-500" : "bg-gray-500"}>
                      {getPriorityLabel(todo.priority || "")}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-semibold">Bitiş Tarihi: </span>
                    {new Date(todo.dueDate || "").toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div>
                    <span className="font-semibold">Oluşturulma Tarihi: </span>
                    {new Date(todo.createdAt || "").toLocaleDateString(
                      "tr-TR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
