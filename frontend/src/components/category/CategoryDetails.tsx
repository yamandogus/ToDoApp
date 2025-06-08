import React from "react";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryDetailsProps {
  category: Category;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  return (
    <div className="border-t pt-4 mt-6">
      <h3 className="font-semibold mb-3 text-sm sm:text-base">Kategori Detayları</h3>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Kategori ID:</span>
          <span className="font-mono text-xs sm:text-sm">{category.id.slice(0, 8)}...</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Durum:</span>
          <Badge variant="outline" style={{ borderColor: category.color, color: category.color }}>Aktif</Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Son Güncelleme:</span>
          <span className="text-xs sm:text-sm">{new Date(category.updatedAt).toLocaleDateString("tr-TR")}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails; 