import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const UsageSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slides = [
    {
      id: 1,
      title: 'Голосования в DAO',
      description: 'Участвуйте в голосованиях DAO и влияйте на развитие образовательной платформы, предлагая и выбирая новые курсы и направления.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Доступ к эксклюзивному контенту',
      description: 'Держатели токенов получают доступ к закрытым аналитическим статьям, исследованиям и вебинарам от ведущих экспертов.',
      image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Получение уникальных NFT',
      description: 'Владельцы токенов могут получать эксклюзивные NFT за достижения и участие в жизни сообщества.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <section id="usage" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Примеры использования</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden relative h-[500px] rounded-xl">
            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out",
                  activeSlide === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                )}
              >
                <div className="glass rounded-xl p-8 h-full flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                      <img src={slide.image} alt={slide.title} className="aspect-video w-full h-full object-cover rounded-lg bg-gradient-to-br from-space-accent to-space-purple" />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-gray-300 mb-6">{slide.description}</p>
                      
                      {index === 0 && (
                        <div className="p-4 glass bg-opacity-50 rounded-lg">
                          <div className="mb-2">Текущее голосование:</div>
                          <div className="font-bold">Новое направление обучения 2025</div>
                          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-space-accent" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      )}
                      
                      {index === 1 && (
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-12 h-12 bg-white rounded-full"></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-space-dark/70 text-white p-2 rounded-full hover:bg-space-accent transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-space-dark/70 text-white p-2 rounded-full hover:bg-space-accent transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  activeSlide === index ? "bg-space-accent w-6" : "bg-gray-500"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsageSection;
