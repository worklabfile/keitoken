
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import DexScreenerWidget from '@/components/DexScreenerWidget';

const Buy = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-16">
        <DexScreenerWidget />
      </div>
      <Footer />
    </div>
  );
};

export default Buy;
