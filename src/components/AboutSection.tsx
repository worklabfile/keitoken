
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
          <div className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-space-accent/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-space-purple rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Оплата 100+ курсов</h3>
            <p className="text-gray-300">
              Используйте токены КЭИ для оплаты более 100 образовательных курсов и получайте доступ к качественному обучению в сфере IT и экономики.
            </p>
          </div>

          <div className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-space-accent/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-space-purple rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Доступ к эксклюзивным NFT</h3>
            <p className="text-gray-300">
              Владельцы токенов могут получить доступ к эксклюзивным коллекциям NFT, которые открывают дополнительные возможности в образовательной экосистеме.
            </p>
          </div>

          <div className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-space-accent/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-space-purple rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Участие в DAO</h3>
            <p className="text-gray-300">
              Владение токенами даёт право голоса в децентрализованной автономной организации, позволяя участвовать в принятии решений о развитии образовательной экосистемы.
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
