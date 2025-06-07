import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTodos } from '@/hooks/useTodos';
import CreateTodoDialog from '@/components/todo/CreateTodoDialog';

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  createdAt?: string;
}

interface ProfileData {
  id: string;
  name: string;
  username: string;
  role: string;
  todos: Todo[];
}

interface ApiResponse {
  status: string;
  data: ProfileData;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const { updateTodo, deleteTodo } = useTodos();
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const localStorageToken = localStorage.getItem('token');
      if (!token && !localStorageToken) {
        setError('Yetkilendirme tokenı bulunamadı.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get<ApiResponse>('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.status === 'success') {
          setProfileData(response.data.data);
        } else {
          setError('Profil verileri alınamadı.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  // Düzenle butonuna basınca dialogu aç
  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditForm({
      title: todo.title,
      description: todo.description || '',
    });
  };

  // Düzenleme formunu gönder
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTodo) return;
    try {
      await updateTodo(editTodo.id, {
        title: editForm.title,
        description: editForm.description,
      }, token || undefined);
      setEditTodo(null);
      // Profil verisini tekrar çek
      setLoading(true);
      const response = await api.get<ApiResponse>('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.status === 'success') {
        setProfileData(response.data.data);
      }
    } catch (err) {
      alert('Güncelleme başarısız.');
    } finally {
      setLoading(false);
    }
  };

  // Silme işlemi
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTodo(deleteId, token || undefined);
      setDeleteId(null);
      // Profil verisini tekrar çek
      setLoading(true);
      const response = await api.get<ApiResponse>('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.status === 'success') {
        setProfileData(response.data.data);
      }
    } catch (err) {
      alert('Silme başarısız.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Hata: {error}</div>;
  }

  if (!profileData) {
    return <div className="container mx-auto p-4 text-center">Profil bilgileri bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profilim</h1>
      <div className="bg-card shadow-lg rounded-2xl p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-2">Kullanıcı Bilgileri</h2>
        <p className="mb-1"><span className="font-medium">Ad:</span> {profileData.name}</p>
        <p><span className="font-medium">Kullanıcı Adı:</span> {profileData.username}</p>
        <p><span className="font-medium">Rol:</span> {profileData.role}</p>
      </div>

      {profileData.todos && profileData.todos.length > 0 && (
        <div className="bg-card shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Görevlerim ({profileData.todos.length})</h2>
          <ul className="space-y-6">
            {profileData.todos.map((todo) => (
              <li key={todo.id} className="p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 relative bg-white dark:bg-[#181f2a] border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{todo.title}</h3>
                    {todo.description && <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{todo.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEditClick(todo)} title="Düzenle"
                      className="rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                      <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteId(todo.id)} title="Sil"
                      className="rounded-full border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                      <Trash className="w-5 h-5 text-red-500 dark:text-red-300" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                  <span className="px-2 py-0.5 rounded-full font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">{todo.status}</span>
                  {todo.priority && <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700">{todo.priority}</span>}
                  {todo.dueDate && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
                      Bitiş: {typeof todo.dueDate === 'string' ? new Date(todo.dueDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </span>
                  )}
                  {todo.createdAt && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      Oluşturulma: {typeof todo.createdAt === 'string' ? new Date(todo.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {profileData.todos && profileData.todos.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">Görev bulunamadı.</p>
          <CreateTodoDialog/>
        </div>
      )}

      <Dialog open={!!editTodo} onOpenChange={(open) => !open && setEditTodo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Görev Düzenle</DialogTitle>
            <DialogDescription>Görev bilgilerini güncelleyin.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              value={editForm.title}
              onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Başlık"
              required
            />
            <Textarea
              value={editForm.description}
              onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Açıklama"
            />
            <DialogFooter>
              <Button type="submit">Kaydet</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">İptal</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Görevi Sil</DialogTitle>
            <DialogDescription>Bu görevi silmek istediğinize emin misiniz?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>Sil</Button>
            <DialogClose asChild>
              <Button variant="outline">Vazgeç</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;