import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, LogIn, UserPlus, Globe, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/onyxia-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NavigationProps {
  cartItemsCount?: number;
  onCartClick: () => void;
  wishlistCount?: number;
  onLoginClick?: () => void;
}

export const Navigation = ({ cartItemsCount = 0, onCartClick, wishlistCount = 0, onLoginClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth state
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/#collection" },
    { label: "About", href: "/about" },
    { label: "Profile", href: "/profile" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img 
                src={logo} 
                alt="ONYXIA Logo" 
                className="h-14 w-auto" 
              />
            </Link>

            {/* Right: Search, Wishlist & Cart */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              {searchOpen ? (
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-40 sm:w-52 h-9 bg-card/50 backdrop-blur border-border focus:border-primary text-sm"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={() => navigate("/wishlist")}
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-pink-600 text-white">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={onCartClick}
              >
                <ShoppingBag className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <img src={logo} alt="ONYXIA" className="h-12 w-auto" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="space-y-1 px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Separator className="my-6" />

            {/* My Account Section */}
            <div className="px-3 space-y-3">
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <User className="h-4 w-4" />
                My Account
              </div>
              
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-background hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      toast.success("Signed out successfully");
                      setSidebarOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-background hover:bg-primary/10 hover:text-primary hover:border-primary"
                    onClick={() => {
                      setSidebarOpen(false);
                      onLoginClick?.();
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Button>
                  <Button
                    variant="default"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSidebarOpen(false);
                      onLoginClick?.();
                    }}
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Language Selector */}
          <div className="p-5 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              English
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
