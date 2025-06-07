import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchInput from './SearchInput'; 
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { username, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };


  const navigationLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/todos", label: "Görevler" },
    { path: "/categories", label: "Kategoriler" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              TodoNest
            </Link>
            <div className="hidden md:flex space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchInput />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-primary transition-all duration-300 w-full flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <User className="h-4 w-4" />
                    <span>{username}</span>
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col justify-center items-center text-center w-full">
                <DropdownMenuSeparator />
                {isAuthenticated ? (
                  <>
                  <DropdownMenuItem 
                    
                    className="hover:text-primary transition-all duration-300 cursor-pointer"
                    onClick={() => navigate('/profile')}
                  >
                    Hesap Bilgilerim    
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="hover:text-primary transition-all duration-300 cursor-pointer"
                    onClick={logout}
                  >
                    Çıkış Yap
                  </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="hover:text-primary transition-all duration-300 w-full">
                      <Link to="/auth/login">Giriş Yap</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-primary transition-all duration-300 w-full">
                      <Link to="/auth/register">Kayıt Ol</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 md:hidden"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] shadow-lg"
              >
                <SheetHeader>
                  <SheetTitle>Menü</SheetTitle>
                  <SheetDescription>
                    Todo uygulaması navigasyonu
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors rounded-md ${
                        isActive(link.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm font-medium">Tema</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="h-8 w-8"
                      >
                        {isDark ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
