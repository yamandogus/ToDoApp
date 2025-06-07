import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <Card className="border-l-4 border-l-blue-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Toplam Görevler
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Tüm görevler</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">
            {stats.pending}
          </div>
          <p className="text-xs text-muted-foreground">Başlanmamış işler</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">
            {stats.completed}
          </div>
          <p className="text-xs text-muted-foreground">Bitirilen işler</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Geciken</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">
            {stats.cancelled}
          </div>
          <p className="text-xs text-muted-foreground">Geciken görevler</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards; 