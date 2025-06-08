import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const QuickActions = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => state.auth);
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
       {username ? (
         <Button
         variant="outline"
         className="w-full justify-start"
         onClick={() => {
           navigate("/profile");
         }}
       >
         <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
         Profili Görüntüle
       </Button>
       ) : (
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Giriş Yap
        </Button>
       )}
      </CardContent>
    </Card>
  );
};

export default QuickActions; 