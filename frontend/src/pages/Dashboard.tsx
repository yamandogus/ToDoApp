import { useEffect } from "react";
import {
  DashboardHeader,
  StatsCards,
  UpcomingTasks,
  QuickActions,
} from "@/components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTodos } from "@/store/slices/todoSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos(token));
    }
  }, [token, dispatch]);

  const stats = {
    total: todos.length,
    pending: todos.filter((t) => t.status === "pending").length,
    in_progress: todos.filter((t) => t.status === "in_progress").length,
    completed: todos.filter((t) => t.status === "completed").length,
    cancelled: todos.filter((t) => t.status === "cancelled").length,
  };

  const recentTodos = todos.slice(0, 5).map((todo) => ({
    id: todo.id.toString(),
    title: todo.title,
    status: todo.status,
    priority: todo.priority,
    dueDate: todo.dueDate || '',
    createdAt: todo.created_at || '',
    description: todo.description,
  }));

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Hata: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
      <div className="flex-1 space-y-6 lg:space-y-8">
        <DashboardHeader />
        <StatsCards stats={stats} />
        <UpcomingTasks todos={recentTodos} />
      </div>
      <div className="w-full lg:w-80 lg:ml-6 space-y-6">
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
