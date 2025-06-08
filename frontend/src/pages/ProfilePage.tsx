import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { api } from "@/services/api";

import { useTodos } from "@/hooks/useTodos";
import CreateTodoDialog from "@/components/todo/CreateTodoDialog";
import UserTasksList from "@/components/todo/UserTasksList";
import { User } from "lucide-react";

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

  useEffect(() => {
    const fetchProfileData = async () => {
      const localStorageToken = localStorage.getItem("token");
      if (!token && !localStorageToken) {
        setError("Yetkilendirme tokenı bulunamadı.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get<ApiResponse>("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.status === "success") {
          setProfileData(response.data.data);
        } else {
          setError("Profil verileri alınamadı.");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">Yükleniyor...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Hata: {error}
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mx-auto p-4 text-center">
        Profil bilgileri bulunamadı.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-start justify-center py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Profilim */}
        <div className="flex-1 max-w-md">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 sm:p-10">
            <div className="flex flex-row items-center gap-3 mb-4">
              <User className="w-10 h-10 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Bilgileri</h2>
            </div>
            <div className="flex flex-col gap-3 text-base text-gray-700">
              <span>
                <span className="font-semibold text-gray-800">Ad:</span> {profileData.name}
              </span>
              <span>
                <span className="font-semibold text-gray-800">Kullanıcı Adı:</span> {profileData.username}
              </span>
              <span>
                <span className="font-semibold text-gray-800">Rol:</span> {profileData.role}
              </span>
            </div>
          </div>
        </div>
        {/* Görevlerim */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex-1 flex flex-col">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Görevlerim ({profileData.todos.length})
            </h2>
            {profileData.todos && profileData.todos.length > 0 ? (
              <UserTasksList
                todos={profileData.todos}
                onUpdate={async (id, data) => {
                  await updateTodo(id, data, token || undefined);
                  setProfileData((prev) =>
                    prev
                      ? {
                          ...prev,
                          todos: prev.todos.map((todo) =>
                            todo.id === id ? { ...todo, ...data } : todo
                          ),
                        }
                      : prev
                  );
                }}
                onDelete={async (id) => {
                  await deleteTodo(id, token || undefined);
                  setProfileData((prev) =>
                    prev
                      ? {
                          ...prev,
                          todos: prev.todos.filter((todo) => todo.id !== id),
                        }
                      : prev
                  );
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 flex-1">
                <p className="text-sm text-muted-foreground">
                  Görev bulunamadı.
                </p>
                <CreateTodoDialog />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
