
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Какой контракт?',
      answer: 'Контракт КЭИ токена размещен на блокчейне Solana. Адрес контракта: 9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2. Вы можете проверить его на Solana Explorer.',
    },
    {
      question: 'Где хранить?',
      answer: 'КЭИ токен можно хранить в любом кошельке, который поддерживает токены Solana. Мы рекомендуем использовать Phantom или Backpack для наилучшего опыта взаимодействия с экосистемой.',
    },
    {
      question: 'Как участвовать в DAO?',
      answer: 'Для участия в DAO необходимо иметь минимум 100 КЭИ токенов. После этого вы получите доступ к разделу управления на нашем сайте и сможете принимать участие в голосованиях.',
    },
    {
      question: 'Планы листинга?',
      answer: 'В настоящее время КЭИ токен доступен на децентрализованных биржах. Мы ведем переговоры о листинге на централизованных площадках и планируем расширение присутствия в ближайшие кварталы.',
    },
    {
      question: 'Как верифицировать контракт?',
      answer: 'Исходный код смарт-контракта КЭИ токена открыт и доступен для проверки. Верификацию можно провести через Solana Explorer, сравнив опубликованный код с кодом контракта в блокчейне.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Часто задаваемые вопросы</h2>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="mb-4 last:mb-0"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={cn(
                  "w-full text-left p-6 rounded-lg glass flex justify-between items-center transition-all duration-300",
                  openIndex === index ? "bg-opacity-80" : "hover:bg-opacity-60"
                )}
              >
                <span className="text-xl font-bold">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 flex-shrink-0" />
                )}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 glass rounded-b-lg mt-px",
                  openIndex === index ? "max-h-96 p-6" : "max-h-0"
                )}
              >
                <p className="text-gray-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
