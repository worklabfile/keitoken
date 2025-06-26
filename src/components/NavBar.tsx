import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-space-accent to-space-purple flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
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
          <Link to="/courses" className="text-white hover:text-space-accent transition-colors">
            Обучения
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
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
                    to="/courses" 
                    className="text-2xl text-white hover:text-space-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Обучения
                  </Link>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
