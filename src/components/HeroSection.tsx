
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const coinRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Advanced 3D coin animation with trajectory
    if (!coinRef.current) return;
    
    const coin = coinRef.current;
    let time = 0;
    let animationFrameId: number;
    
    const animate = () => {
      time += 0.01;
      
      // Complex trajectory movement using sine and cosine
      const x = Math.sin(time * 0.7) * 30;
      const y = Math.cos(time * 0.5) * 15 - 10;
      const z = Math.sin(time * 0.3) * 20;
      
      // Rotate coin in 3D space
      const rotateX = Math.sin(time * 0.5) * 5;
      const rotateY = time * 2; // Main rotation
      const rotateZ = Math.sin(time * 0.3) * 10;
      
      coin.style.transform = `
        translate3d(${x}px, ${y}px, ${z}px)
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        rotateZ(${rotateZ}deg)
      `;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative space-bg overflow-hidden pt-16">
      {/* Animated stars/particles */}
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-white opacity-80 animate-star-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 2}s`,
          }}
        />
      ))}

      {/* Nebula effects */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-10 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(51,195,240,0) 70%)',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(51,195,240,0.8) 0%, rgba(139,92,246,0) 70%)',
          bottom: '10%',
          left: '30%',
          filter: 'blur(50px)',
          animationDelay: '1.5s',
          animationDuration: '7s',
        }}
      />

      {/* Shooting stars */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-white opacity-80 rounded-full animate-shooting-star"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 50}%`,
            animationDelay: `${index * 3}s`,
            animationDuration: '4s',
          }}
        />
      ))}

      <div className="container mx-auto px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-white to-space-accent">
            Токен образовательной экосистемы
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Покупайте, используйте, участвуйте
          </p>

          <div className="flex justify-center mb-16">
            <Link
              to="/buy"
              className="crypto-button group flex items-center gap-2"
            >
              Купить сейчас
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
