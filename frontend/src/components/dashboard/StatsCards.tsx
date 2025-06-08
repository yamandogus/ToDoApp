import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const StatsCards = () => {
  const { todos } = useSelector((state: RootState) => state.todos);

  const statsNumbers = {
    total: todos.length,
    pending: todos.filter((t) => t.status === "PENDING").length,
    in_progress: todos.filter((t) => t.status === "IN_PROGRESS").length,
    completed: todos.filter((t) => t.status === "COMPLETED").length,
    overdue: todos.filter((t) => t.status === "OVERDUE").length,
    cancelled: todos.filter((t) => t.status === "CANCELLED").length,
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        <Card className="border-l-4 border-l-yellow-500 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {statsNumbers.pending}
            </div>
            <p className="text-xs text-muted-foreground">Başlanmamış işler</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devam Ediyor</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {statsNumbers.in_progress}
            </div>
            <p className="text-xs text-muted-foreground">Devam eden işler</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {statsNumbers.completed}
            </div>
            <p className="text-xs text-muted-foreground">Bitirilen işler</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İptal Edilen</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {statsNumbers.cancelled}
            </div>
            <p className="text-xs text-muted-foreground">
              İptal edilen görevler
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsCards;
