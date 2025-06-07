import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';

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
      <div className="bg-card shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Kullanıcı Bilgileri</h2>
        <p className="mb-1"><span className="font-medium">Ad:</span> {profileData.name}</p>
        <p><span className="font-medium">Kullanıcı Adı:</span> {profileData.username}</p>
        <p><span className="font-medium">Rol:</span> {profileData.role}</p>
      </div>

      {profileData.todos && profileData.todos.length > 0 && (
        <div className="bg-card shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Görevlerim ({profileData.todos.length})</h2>
          <ul className="space-y-3">
            {profileData.todos.map((todo) => (
              <li key={todo.id} className="p-3 bg-muted rounded-md shadow-sm">
                <h3 className="text-lg font-medium text-card-foreground">{todo.title}</h3>
                {todo.description && <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>}
                <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${todo.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : todo.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{todo.status}</span>
                  {todo.priority && <span className={`px-2 py-0.5 rounded-full ${todo.priority === 'HIGH' ? 'bg-red-100 text-red-700' : todo.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{todo.priority}</span>}
                  {todo.dueDate && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">
                      Bitiş: {new Date(todo.dueDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}
                  {todo.createdAt && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-800">
                      Oluşturulma: {new Date(todo.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button className="mt-4 px-4 py-2">Düzenle</Button>
                  <Button className="mt-4 px-4 py-2">Sil</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {profileData.todos && profileData.todos.length === 0 && (
        <div className="bg-card shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Görevlerim (0)</h2>
          <p className="text-sm text-muted-foreground">Görev bulunamadı.</p>
          <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Yeni Görev Oluştur</button>
          
        </div>
      )}
      
    </div>
  );
};

export default ProfilePage;