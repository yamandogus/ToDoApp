import { Button } from "@/components/ui/button";
import { CheckCircle, Plus } from "lucide-react";
import CreateTodoDialog from "@/components/todo/CreateTodoDialog";
import { Card, CardTitle, CardHeader } from "../ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DashboardHeader = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <Card className="border-l-4 border-l-blue-500 shadow-lg mb-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-lg font-bold flex flex-row items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" /> Toplam Görevler:{" "}
              <span className="text-blue-600">{todos.length}</span>
            </CardTitle>
          </CardHeader>
        </Card>
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
