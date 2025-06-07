import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProgressCardProps {
  stats: {
    total: number;
    completed: number;
    in_progress: number;
  };
}

const ProgressCard = ({ stats }: ProgressCardProps) => {
  const completionRate = Math.round((stats.completed / stats.total) * 100);
  const inProgressRate = Math.round((stats.in_progress / stats.total) * 100);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">İlerleme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Tamamlanan</span>
            <span>{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Devam Eden</span>
            <span>{inProgressRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${inProgressRate}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard; 