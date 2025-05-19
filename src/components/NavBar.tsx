
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из системы",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-space-accent to-space-purple flex items-center justify-center mr-2">
              
            </div>
            <span className="hidden md:inline">КЭИ Токен</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-white hover:text-space-accent transition-colors">
            О проекте
          </Link>
          <Link to="/usage" className="text-white hover:text-space-accent transition-colors">
            Использование
          </Link>
          <Link to="/roadmap" className="text-white hover:text-space-accent transition-colors">
            Дорожная карта
          </Link>
          <Link to="/faq" className="text-white hover:text-space-accent transition-colors">
            FAQ
          </Link>
          <Link to="/buy" className="text-white hover:text-space-accent transition-colors">
            Купить
          </Link>
          <Link to="/game" className="text-white hover:text-space-accent transition-colors">
            Игра
          </Link>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center ml-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-space-accent transition-colors">
                <div className="w-8 h-8 rounded-full bg-space-accent/30 flex items-center justify-center">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-space-accent/20">
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link 
              to="/auth" 
              className="crypto-button py-2 px-4 text-sm"
            >
              Войти
            </Link>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="mr-4 flex items-center text-white hover:text-space-accent transition-colors">
                <div className="w-8 h-8 rounded-full bg-space-accent/30 flex items-center justify-center">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-space-accent/20">
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Drawer for mobile menu */}
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <button className="text-white focus:outline-none">
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-space-dark border-t border-space-accent/20 h-[80vh]">
              <div className="p-6">
                <div className="flex justify-end mb-6">
                  <DrawerClose className="text-white hover:text-space-accent">
                    <X size={24} />
                  </DrawerClose>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Link 
                    to="/about" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    О проекте
                  </Link>
                  <Link 
                    to="/usage" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Использование
                  </Link>
                  <Link 
                    to="/roadmap" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Дорожная карта
                  </Link>
                  <Link 
                    to="/faq" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link 
                    to="/buy" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Купить
                  </Link>
                  <Link 
                    to="/game" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Игра
                  </Link>
                  {!user && (
                    <Link 
                      to="/auth" 
                      className="crypto-button py-2 px-6 mt-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Войти
                    </Link>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Remove old Mobile Navigation Menu since we're using Drawer now */}
    </nav>
  );
};

export default NavBar;
