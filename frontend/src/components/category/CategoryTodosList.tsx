import React from "react";
import TodoListItem from "./TodoListItem";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  category_ids: string[];
}

interface CategoryTodosListProps {
  category: Category;
  allTodos: Todo[];
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

const CategoryTodosList: React.FC<CategoryTodosListProps> = ({ category, allTodos, onEditTodo, onDeleteTodo }) => {
  const todos = allTodos.filter(todo => todo.category_ids && todo.category_ids.includes(category.id));
  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-semibold mb-3 text-sm sm:text-base">
        Bu Kategoriye Ait Todolar ({todos.length})
      </h3>
      {todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map(todo => (
            <TodoListItem key={todo.id} todo={todo} onEdit={() => onEditTodo(todo)} onDelete={() => onDeleteTodo(todo.id)} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground italic">Bu kategoride henüz todo bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default CategoryTodosList; 