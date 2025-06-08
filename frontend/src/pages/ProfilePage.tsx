import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { api } from "@/services/api";

import { useTodos } from "@/hooks/useTodos";
import CreateTodoDialog from "@/components/todo/CreateTodoDialog";
import UserTasksList from "@/components/todo/UserTasksList";

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#181f2a] shadow-xl rounded-2xl p-8 border border-gray-100 flex flex-col gap-4 items-start">
          <h1 className="text-3xl font-extrabold mb-4 text-primary">Profilim</h1>
          <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Kullanıcı Bilgileri</h2>
            <div className="flex flex-col gap-1 text-base text-gray-700 dark:text-gray-300">
              <span><span className="font-medium">Ad:</span> {profileData.name}</span>
              <span><span className="font-medium">Kullanıcı Adı:</span> {profileData.username}</span>
              <span><span className="font-medium">Rol:</span> {profileData.role}</span>
            </div>
          </div>
        </div>
        <div>
          {profileData.todos && profileData.todos.length > 0 && (
            <div className="bg-card shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Görevlerim ({profileData.todos.length})
              </h2>
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
            </div>
          )}
          {profileData.todos && profileData.todos.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">Görev bulunamadı.</p>
              <CreateTodoDialog />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
