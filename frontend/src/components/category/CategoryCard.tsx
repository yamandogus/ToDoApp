import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CategoryInfo from "./CategoryInfo";
import CategoryTodosList from "./CategoryTodosList";
import CategoryDetails from "./CategoryDetails";
import CreateTodoDialog from "../todo/CreateTodoDialog";

interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
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

interface CategoryCardProps {
  category: Category;
  allTodos: Todo[];
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  allTodos,
  onEditTodo,
  onDeleteTodo,
}) => {
  return (
    <Card className="shadow-lg mt-4">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-20 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <CategoryInfo category={category} allTodos={allTodos} />
          </div>
          <div>
            <CreateTodoDialog/>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CategoryTodosList
          category={category}
          allTodos={allTodos}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
        />
        <CategoryDetails category={category} />
      </CardContent>
    </Card>
  );
};

export default CategoryCard; 