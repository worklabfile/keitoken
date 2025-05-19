
import React from 'react';
import { Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 glass border-t border-space-accent/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold text-white flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-space-accent to-space-purple flex items-center justify-center mr-2">
                
              </div>
              КЭИ Токен
            </div>
            <p className="text-gray-300 max-w-md">
              Образовательная криптоэкосистема Колледжа экономики и информатики имени А. Н. Афанасьева УлГТУ
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-space-accent/20 transition-colors"
              >
                <MessageCircle size={24} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-space-accent/20 transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
            <div className="text-sm text-gray-300 text-center md:text-right">
              <p className="mb-2">Контракт: <span className="text-space-accent">9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2</span></p>
              <p className="mb-2">
                <a href="#" className="text-space-accent hover:underline">Аудит безопасности</a>
              </p>
              <p>
                <small>
                  Disclaimer: Инвестиции в криптовалюты сопряжены с высоким риском. 
                  Не инвестируйте средства, которые вы не готовы потерять.
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-white/10 text-center text-sm text-gray-400">
          <p>© 2025 КЭИ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
