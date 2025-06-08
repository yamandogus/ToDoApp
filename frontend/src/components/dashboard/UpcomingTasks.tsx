import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  status: string;
  priority?: string;
  dueDate?: string;
  description?: string;
  createdAt?: string;
}

interface UpcomingTasksProps {
  todos: Todo[];
}

const UpcomingTasks = ({ todos }: UpcomingTasksProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg lg:text-xl">Yaklaşan Görevler</CardTitle>
            <CardDescription className="text-sm">
              En yakın tarihli görevleriniz
            </CardDescription>
          </div>
          <Link 
            to="/todos" 
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
          >
            Tümünü görüntüle
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 relative bg-white dark:bg-[#181f2a] border-gray-200 dark:border-gray-700"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                    {todo.description}
                  </p>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                <Badge
                  className={
                    todo.status === "PENDING"
                      ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-700"
                      : todo.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700"
                      : todo.status === "COMPLETED"
                      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-800 dark:text-green-200 dark:border-green-700"
                      : todo.status === "CANCELLED"
                      ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
                      : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                  }
                  variant="outline"
                >
                  {todo.status === "PENDING"
                    ? "Bekliyor"
                    : todo.status === "IN_PROGRESS"
                    ? "Devam Ediyor"
                    : todo.status === "COMPLETED"
                    ? "Tamamlandı"
                    : todo.status === "CANCELLED"
                    ? "İptal Edildi"
                    : "Bekliyor"}
                </Badge>
                {todo.priority && (
                  <Badge
                    className={
                      todo.priority === "HIGH"
                        ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
                        : todo.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700"
                        : "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-200 "
                    }
                    variant="outline"
                  >
                    {todo.priority === "HIGH"
                      ? "Yüksek"
                      : todo.priority === "MEDIUM"
                      ? "Orta"
                      : "Düşük"}
                  </Badge>
                )}
                {todo.dueDate && (
                  <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
                    Bitiş:{" "}
                    {typeof todo.dueDate === "string"
                      ? new Date(todo.dueDate).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </Badge>
                )}
                {todo.createdAt && (
                  <Badge className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    Oluşturulma:{" "}
                    {typeof todo.createdAt === "string"
                      ? new Date(todo.createdAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
