import React from "react";

interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryInfoProps {
  category: Category;
  allTodos: { category_ids: string[] }[];
}

const CategoryInfo: React.FC<CategoryInfoProps> = ({ category, allTodos }) => {
  return (
    <div>
      <div className="text-xl sm:text-2xl font-bold">{category.name}</div>
      <div className="mt-1 text-sm">Oluşturulma: {new Date(category.createdAt).toLocaleDateString("tr-TR")}</div>
      <div className="text-xs mt-1">Toplam Todo: {allTodos.filter(todo => todo.category_ids && todo.category_ids.includes(category.id)).length}</div>
    </div>
  );
};

export default CategoryInfo; 