import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const scrollToUsage = () => {
    const element = document.getElementById('usage');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">О проекте</h2>
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16">
          КЭИ токен — это криптовалюта образовательной экосистемы Колледжа экономики и информатики имени А. Н. Афанасьева
          Ульяновского государственного технического университета.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-space-accent/20 transition-all duration-300 flex flex-col">
            <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2940&auto=format&fit=crop" alt="Образовательная экосистема" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-3 mt-auto">Образовательная экосистема</h3>
            <p className="text-gray-300">
              Получайте доступ к эксклюзивным курсам, вебинарам и образовательным материалам, узнавая больше о криптовалютах
            </p>
          </div>

          <div className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-space-accent/20 transition-all duration-300 flex flex-col">
            <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop" alt="Доступ к эксклюзивным NFT" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-3 mt-auto">Доступ к эксклюзивным NFT</h3>
            <p className="text-gray-300">
              Владельцы токенов могут получить доступ к эксклюзивным коллекциям NFT, которые открывают дополнительные возможности.
            </p>
          </div>

          <div className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-space-accent/20 transition-all duration-300 flex flex-col">
            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2940&auto=format&fit=crop" alt="Участие в DAO" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-3 mt-auto">Участие в DAO</h3>
            <p className="text-gray-300">
              Владение токенами даёт право голоса в децентрализованной автономной организации для принятия решений о развитии экосистемы.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button onClick={scrollToUsage} className="crypto-button group flex items-center gap-2">
            Примеры использования
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
