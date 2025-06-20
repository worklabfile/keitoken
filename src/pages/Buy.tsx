import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Buy = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Купить КЭИ Токен</h1>
          <p className="text-lg text-gray-300 mt-4">
            Вы можете отслеживать график и совершать операции на децентрализованных биржах.
          </p>
        </div>
        <div className="glass rounded-xl p-2 md:p-4">
          <div style={{ height: '70vh', minHeight: '500px' }}>
            <iframe 
              src="https://dexscreener.com/solana/9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2?embed=1&theme=dark&info=0"
              style={{ height: "100%", width: "100%", borderRadius: '12px' }}
              title="DEX Screener"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buy; 