import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTodoDialog from "@/components/todo/CreateTodoDialog";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Todo uygulamanıza hoş geldiniz. Görevlerinizi yönetin ve takip
          edin.
        </p>
      </div>
      <div className="flex justify-end">
        <CreateTodoDialog
          trigger={
            <Button
              size="sm"
              className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Görev
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default DashboardHeader; 