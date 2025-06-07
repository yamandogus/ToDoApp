import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    verifyPassword: "",
    terms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }

    if (!formData.terms) {
      toast.error("Kullanım şartlarını kabul etmelisiniz!");
      return;
    }

    setIsLoading(true);

    try {
      await authService.register(formData);
      navigate('/');
    } catch (error) {
      // Hata durumu authService içinde ele alınıyor
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = [
    { label: "En az 8 karakter", check: formData.password.length >= 8 },
    { label: "En fazla 16 karakter", check: formData.password.length <= 16 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Hesap Oluştur</CardTitle>
          <CardDescription>
            Yeni hesap oluşturmak için aşağıdaki bilgileri doldurun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Kullanıcı adı"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="space-y-1 mt-2">
                  {passwordChecks.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <Check
                        size={14}
                        className={
                          item.check ? "text-green-500" : "text-gray-300"
                        }
                      />
                      <span
                        className={
                          item.check ? "text-green-600" : "text-gray-500"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="verifyPassword">Şifre Tekrar</Label>
              <div className="relative">
                <Input
                  id="verifyPassword"
                  name="verifyPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.verifyPassword}
                  onChange={handleInputChange}
                  required
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.verifyPassword &&
                formData.password !== formData.verifyPassword && (
                  <p className="text-sm text-red-500">Şifreler eşleşmiyor</p>
                )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleInputChange}
                className="rounded border-gray-300"
                required
              />
              <Label htmlFor="terms" className="text-sm">
                <Link
                  to="/terms"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Kullanım şartlarını
                </Link>{" "}
                kabul ediyorum
              </Label>
            </div>

            <Button type="submit" className="w-full h-10" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Hesap oluşturuluyor...
                </>
              ) : (
                "Hesap Oluştur"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Zaten hesabınız var mı?{" "}
              <Link
                to="/auth/login"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Giriş yapın
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
