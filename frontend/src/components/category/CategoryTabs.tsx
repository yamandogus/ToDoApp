import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface Category {
  id: string;
  name: string;
  color: string;
  todoCount?: number;
}

interface CategoryTabsProps {
  categories: Category[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  allTodos: { category_ids: string[] }[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeTabId, setActiveTabId, allTodos }) => {
  return (
    <Tabs value={activeTabId} onValueChange={setActiveTabId} className="w-full">
      <TabsList className="grid w-full grid-cols-3 shadow-lg h-auto p-1">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 min-h-[60px] sm:min-h-[40px]"
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs sm:text-sm font-medium">
                {category.name}
              </span>
            </div>
            <Badge variant="secondary" className="text-xs px-1 py-0">
              {
                allTodos.filter(
                  (todo) =>
                    todo.category_ids &&
                    todo.category_ids.includes(category.id)
                ).length
              }
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs; 