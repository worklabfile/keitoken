
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MiniGame from '@/components/MiniGame';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu } from 'lucide-react';

const Game = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-16">
        <MiniGame />
      </div>
      <Footer />
    </div>
  );
};

export default Game;
