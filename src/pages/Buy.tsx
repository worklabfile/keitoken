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
        <div className="glass rounded-xl p-2 md:p-4 relative overflow-visible">
          <style>{`#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:65%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}`}</style>
          <div id="dexscreener-embed">
            <iframe 
              src="https://dexscreener.com/solana/Er71a5FoU2ZKXTuRbeWtRXrYwcNvrDTxjqA5LurVsJJn?embed=1&loadChartSettings=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
              title="DEX Screener"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="https://dexscreener.com/solana/Er71a5FoU2ZKXTuRbeWtRXrYwcNvrDTxjqA5LurVsJJn"
            target="_blank"
            rel="noopener noreferrer"
            className="crypto-button py-3 px-8 text-lg font-bold"
          >
            Купить
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buy; 