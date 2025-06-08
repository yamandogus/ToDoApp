import { Link, useLocation, useNavigate } from "react-router-dom";
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
import SearchInput from "./SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { username, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    navigate("/");
    logout();
    window.location.reload();

  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              TodoNest
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </Link>
              {username && (
                <>
                  <Link
                    to="/todos"
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                      isActive("/todos")
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Todo Listesi
                  </Link>
                  <Link
                    to="/categories"
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                      isActive("/categories")
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Kategoriler
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchInput />
            </div>

            {/* User Menu */}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className=" transition-all duration-300 w-full flex items-center gap-2"
                >
                  {isAuthenticated ? (
                    <>
                      <User className="h-4 w-4" />
                      <span>{username}</span>
                    </>
                  ) : (
                    "Giriş Yap"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  {isAuthenticated ? (
                    <>
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-black"
                        onClick={() => navigate("/profile")}
                      >
                        Hesap Bilgilerim
                      </Button>
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
                        onClick={handleLogout}
                      >
                        Çıkış Yap
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size={"sm"} variant={"outline"} className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-black">
                        <Link to="/auth/login">Giriş Yap</Link>
                      </Button>
                      <Button size={"sm"} variant={"outline"} className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-black">
                        <Link to="/auth/register">Kayıt Ol</Link>
                      </Button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>

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
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors rounded-md ${
                      isActive("/")
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    Dashboard
                  </Link>
                  {username && (
                    <>
                      <Link
                        to="/todos"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors rounded-md ${
                          isActive("/todos")
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        Todo Liste
                      </Link>
                      <Link
                        to="/categories"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors rounded-md ${
                          isActive("/categories")
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        Kategoriler
                      </Link>
                    </>
                  )}

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
