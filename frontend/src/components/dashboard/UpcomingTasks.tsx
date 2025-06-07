import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  status: string;
  priority: string;
  due_date: string;
  description?: string;
}

interface UpcomingTasksProps {
  todos: Todo[];
}

const UpcomingTasks = ({ todos }: UpcomingTasksProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Yüksek";
      case "medium":
        return "Orta";
      case "low":
        return "Düşük";
      default:
        return priority;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg lg:text-xl">
            Yaklaşan Görevler
          </CardTitle>
          <CardDescription className="text-sm">
            En yakın tarihleri olan görevleriniz
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors shadow-md hover:shadow-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <h3 className="font-medium text-sm sm:text-base">
                    {todo.title}
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                  <span>Bitiş: {todo.due_date}</span>
                  <Badge className={getPriorityColor(todo.priority)}>
                    {getPriorityText(todo.priority)}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                Düzenle
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks; 