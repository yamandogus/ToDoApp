import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  createdAt?: string;
}

const TodoDetailPage = () => {
  const { id } = useParams();
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem('token');
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/todos/${id}/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodo(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id, token]);

  const handleStatusChange = async (newStatus: string) => {
    if (!todo) return;
    setUpdating(true);
    try {
      await api.patch(`/api/todos/${todo.id}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodo({ ...todo, status: newStatus });
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Durum güncellenemedi.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container mx-auto p-6">Yükleniyor...</div>;
  if (error) return <div className="container mx-auto p-6 text-red-500">Hata: {error}</div>;
  if (!todo) return <div className="container mx-auto p-6">Todo bulunamadı.</div>;

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Todo Detayı</h1>
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">{todo.title}</h2>
        {todo.description && <p className="mb-2 text-muted-foreground">{todo.description}</p>}
        <div className="mb-2 flex flex-wrap gap-2 text-sm">
          <span className="px-2 py-0.5 rounded-full">Durum: {todo.status}</span>
          {todo.priority && <span className="px-2 py-0.5 rounded-full">Öncelik: {todo.priority}</span>}
          {todo.dueDate && <span className="px-2 py-0.5 rounded-full">Bitiş: {new Date(todo.dueDate).toLocaleDateString('tr-TR')}</span>}
          {todo.createdAt && <span className="px-2 py-0.5 rounded-full">Oluşturulma: {new Date(todo.createdAt).toLocaleDateString('tr-TR')}</span>}
        </div>
        <div className="mt-4 flex gap-2">
          <button 
            className="px-4 py-2 rounded bg-yellow-500 text-white disabled:opacity-50"
            disabled={updating || todo.status === 'PENDING'}
            onClick={() => handleStatusChange('PENDING')}
          >Beklemede</button>
          <button 
            className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
            disabled={updating || todo.status === 'COMPLETED'}
            onClick={() => handleStatusChange('COMPLETED')}
          >Tamamlandı</button>
        </div>
      </div>
    </div>
  )
}

export default TodoDetailPage 