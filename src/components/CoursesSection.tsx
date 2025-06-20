import React from 'react';

const CoursesSection = () => {
  const courses = [
    {
      title: 'Основы Блокчейна',
      description: 'Узнайте, что такое блокчейн, как он работает, и почему это одна из самых революционных технологий со времен Интернета.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop'
    },
    {
      title: 'Введение в Криптовалюты',
      description: 'Погрузитесь в мир криптовалют. Узнайте о Биткойне, Эфириуме и других альткойнах.',
      image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'DeFi - Децентрализованные Финансы',
      description: 'Исследуйте мир DeFi. Узнайте о кредитовании, заимствовании и доходном фермерстве.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop'
    },
    {
      title: 'NFT и Метавселенные',
      description: 'Что такое NFT и как они меняют мир цифрового искусства и игр.',
      image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Безопасность и Хранение',
      description: 'Научитесь безопасно хранить ваши криптовалютные активы. Обзор кошельков и лучших практик.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2940&auto=format&fit=crop'
    }
  ];

  return (
    <section id="courses" className="py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Обучение криптовалюте</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-space-dark-blue p-6 rounded-lg border border-space-accent/20 flex flex-col">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-bold mb-4 mt-auto">{course.title}</h3>
              <p className="text-gray-400">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection; 