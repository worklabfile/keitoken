
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <HeroSection />
      <div className="container mx-auto px-4 py-16">
        <div className="glass rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Добро пожаловать в экосистему КЭИ</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Образовательная криптоэкосистема Колледжа экономики и информатики имени А. Н. Афанасьева УлГТУ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Link to="/about" className="glass hover:border-space-accent hover:bg-space-dark/80 transition-all p-6 rounded-lg text-center border border-space-accent/20">
              <h3 className="font-bold text-xl mb-2 text-space-accent">О проекте</h3>
              <p className="text-gray-300">Узнайте больше о токене КЭИ и его применении в образовательной экосистеме</p>
            </Link>
            
            <Link to="/buy" className="glass hover:border-space-accent hover:bg-space-dark/80 transition-all p-6 rounded-lg text-center border border-space-accent/20">
              <h3 className="font-bold text-xl mb-2 text-space-accent">Купить токен</h3>
              <p className="text-gray-300">Приобретите токены КЭИ для участия в экосистеме и получения преимуществ</p>
            </Link>
            
            <Link to="/game" className="glass hover:border-space-accent hover:bg-space-dark/80 transition-all p-6 rounded-lg text-center border border-space-accent/20">
              <h3 className="font-bold text-xl mb-2 text-space-accent">Играть и зарабатывать</h3>
              <p className="text-gray-300">Играйте в мини-игру и накапливайте токены КЭИ перед выходом на биржу</p>
            </Link>
          </div>
          
          <div className="text-center">
            <Link to="/buy" className="crypto-button inline-flex items-center gap-2">
              Начать сейчас
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
