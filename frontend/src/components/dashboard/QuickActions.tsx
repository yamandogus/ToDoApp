import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";

const QuickActions = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {}}
        >
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Tüm Görevleri Gör
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {}}
        >
          <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
          Geciken Görevler
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions; 