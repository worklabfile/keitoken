
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle, X } from 'lucide-react';

const DexScreenerWidget = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <section id="buy" className="py-16 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Купить КЭИ Токен</h2>

        {/* DexScreener Widget */}
        <div className="max-w-5xl mx-auto mb-8">
          <div id="dexscreener-embed">
            <iframe 
              src="https://dexscreener.com/solana/9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2?embed=1&loadChartSettings=0&trades=0&tabs=0&chartLeftToolbar=0&chartTimeframesToolbar=0&loadChartSettings=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
              style={{ height: "650px" }}
            ></iframe>
          </div>
        </div>

        {/* How to Buy Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 crypto-button"
          >
            {showInstructions ? (
              <>
                <X className="w-5 h-5" />
                Скрыть инструкцию
              </>
            ) : (
              <>
                <HelpCircle className="w-5 h-5" />
                Как купить?
              </>
            )}
          </button>
        </div>

        {/* Instructions Panel */}
        <div className={cn(
          "max-w-4xl mx-auto transition-all duration-300 glass p-6 rounded-lg",
          showInstructions ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"
        )}>
          <h3 className="text-xl font-bold mb-4 text-white">Инструкция по покупке</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="glass p-5 rounded-lg flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-space-purple rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">?</span>
              </div>
              <h4 className="text-lg font-bold mb-2">Подключите кошелек, выберите сумму и подтвердите транзакцию</h4>
              <p className="text-gray-300 text-center">Поддерживаются Phantom и Backpack</p>
              <div className="flex gap-4 mt-4">
                <div className="w-10 h-10 rounded-full bg-white p-1"></div>
                <div className="w-10 h-10 rounded-full bg-white p-1"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DexScreenerWidget;
