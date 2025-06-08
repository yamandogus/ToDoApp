import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import { getPriorityColor, statusMap, getPriorityText } from "@/components/todo/UserTasksList";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  category_ids: string[];
}

interface TodoListItemProps {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <li className="relative p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg text-primary mb-1">{todo.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{todo.description}</p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={onEdit} title="Düzenle" className="rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
            <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-300" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete} title="Sil" className="rounded-full border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
            <Trash className="w-5 h-5 text-red-500 dark:text-red-300" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge className="bg-gray-100 text-gray-700 border-none" variant="secondary">
          Durum: {statusMap[todo.status]?.label || "Bekliyor"}
        </Badge>
        {todo.priority && (
          <Badge className={getPriorityColor(todo.priority) + " bg-red-100 text-red-700 border-none"} variant="secondary">
            Öncelik: {getPriorityText(todo.priority)}
          </Badge>
        )}
        {todo.dueDate && (
          <Badge className="bg-yellow-100 text-yellow-800 border-none" variant="secondary">
            Bitiş: {new Date(todo.dueDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </Badge>
        )}
        <Badge className="bg-blue-100 text-blue-800 border-none" variant="secondary">
          Oluşturulma: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </Badge>
      </div>
    </li>
  );
};

export default TodoListItem; 