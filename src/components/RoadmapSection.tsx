
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const RoadmapSection = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const roadmapPoints = [
    {
      quarter: 'Q3 2024',
      title: 'Запуск токена',
      description: 'Первичное размещение токена на Solana и интеграция в образовательную платформу КЭИ.',
      milestones: [
        'Выпуск токена',
        'Листинг на DEX',
        'Базовая интеграция в платформу КЭИ'
      ]
    },
    {
      quarter: 'Q4 2024',
      title: 'Образовательная экосистема',
      description: 'Интеграция токена во все образовательные курсы и открытие доступа к эксклюзивному контенту.',
      milestones: [
        'Оплата курсов токенами',
        'Запуск NFT коллекции',
        'Расширение партнерской сети'
      ]
    },
    {
      quarter: 'Q1 2025',
      title: 'DAO и самоуправление',
      description: 'Внедрение децентрализованного управления и расширение возможностей для держателей токенов.',
      milestones: [
        'Запуск DAO',
        'Система голосования',
        'Делегирование управления развитием'
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Дорожная карта</h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-space-accent to-space-purple transform -translate-x-1/2"></div>

          {/* Timeline points */}
          {roadmapPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                "relative mb-16 last:mb-0",
                index % 2 === 0 ? "text-right pr-10 md:pr-0" : "text-left pl-10 md:pl-0 md:text-right"
              )}
            >
              {/* Desktop layout */}
              <div className="hidden md:block">
                <div
                  className={cn(
                    "flex items-center",
                    index % 2 === 0 ? "justify-end" : "justify-start flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-1/2 pr-10",
                    index % 2 === 0 ? "text-right" : "text-left"
                  )}>
                    <div className="mb-2 inline-block px-4 py-1 rounded-full bg-gradient-to-r from-space-accent to-space-purple text-white font-bold">
                      {point.quarter}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                    <p className="text-gray-300">{point.description}</p>

                    {activePoint === index && (
                      <div className="mt-4 glass p-3 rounded-lg">
                        <h4 className="text-sm font-bold mb-2">Ключевые этапы:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-300">
                          {point.milestones.map((milestone, i) => (
                            <li key={i}>{milestone}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full bg-space-dark border-4 border-space-accent z-10 relative cursor-pointer transition-all duration-300",
                        activePoint === index ? "scale-110 shadow-lg shadow-space-accent/30" : "hover:scale-105"
                      )}
                      onMouseEnter={() => setActivePoint(index)}
                      onMouseLeave={() => setActivePoint(null)}
                    ></div>
                  </div>

                  <div className="w-1/2 pl-10"></div>
                </div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden">
                <div className="flex">
                  <div className="w-1/2 flex justify-end">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full bg-space-dark border-4 border-space-accent z-10 relative cursor-pointer transition-all duration-300",
                        activePoint === index ? "scale-110 shadow-lg shadow-space-accent/30" : ""
                      )}
                      onClick={() => setActivePoint(activePoint === index ? null : index)}
                    ></div>
                  </div>
                  <div className="w-1/2 pl-10">
                    <div className="mb-2 inline-block px-4 py-1 rounded-full bg-gradient-to-r from-space-accent to-space-purple text-white font-bold">
                      {point.quarter}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                    <p className="text-gray-300">{point.description}</p>

                    {activePoint === index && (
                      <div className="mt-4 glass p-3 rounded-lg">
                        <h4 className="text-sm font-bold mb-2">Ключевые этапы:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-300">
                          {point.milestones.map((milestone, i) => (
                            <li key={i}>{milestone}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
