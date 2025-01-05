"use client";

import { useEffect, useState } from "react";
import { Audiowide, Roboto_Mono, Inter } from 'next/font/google';

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ['latin'] 
});

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700']
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700']
});

interface Particle {
  width: string;
  height: string;
  top: string;
  left: string;
  animation: string;
  key: number;
}

export default function Home() {
  const title = "QUWERTY";
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const setupPage = async () => {
      const newBackgroundParticles = [...Array(500)].map((_, i) => ({
        width: Math.random() * 4 + 'px',
        height: Math.random() * 4 + 'px',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        animation: `float ${Math.random() * 5 + 3}s linear infinite`,
        key: i,
      }));
      
      setBackgroundParticles(newBackgroundParticles);
      
      requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    };

    setupPage();
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-violet-900 animate-gradient-xy"></div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="relative w-full h-full">
            {backgroundParticles.map((particle) => (
              <div
                key={particle.key}
                className="absolute rounded-full bg-white"
                style={{
                  width: particle.width,
                  height: particle.height,
                  top: particle.top,
                  left: particle.left,
                  animation: particle.animation,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center relative animate-content-move">
          <h1 className={`${audiowide.className} text-6xl sm:text-8xl md:text-9xl font-bold flex tracking-tighter`}>
            {title.split('').map((char, index) => (
              <span 
                key={index}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-300 animate-letter-slide will-change-transform"
                style={{
                  animationDelay: `${0.25 + index * 0.05}s`,
                  display: 'inline-block',
                  textShadow: '0 0 100px rgba(168, 85, 247, 0.5)',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          <div className="h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 rounded mt-2 opacity-0 animate-line-enter" 
            style={{ 
              width: '110%',
              animationDelay: `${0.25 + title.length * 0.05}s`,
              animationDuration: '0.3s'
            }}></div>
          <p className={`${inter.className} text-lg sm:text-2xl text-zinc-100 font-normal opacity-0 animate-subtitle-enter text-center overflow-hidden mt-8 px-4`}
            style={{
              letterSpacing: '0.05em', 
              textShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
              lineHeight: '1.6'
            }}>
            Empowering your workflow, everything you need, in one place.
          </p>
          <h2 
            className={`${robotoMono.className} text-3xl sm:text-5xl md:text-6xl text-purple-100 font-bold mt-6 opacity-0 animate-subtitle-enter tracking-widest`}
            style={{
              animationDelay: '1.5s'
            }}
          >
            COMING SOON
          </h2>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(-100vh); }
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
        @keyframes letterSlide {
          0% {
            opacity: 0;
            transform: translateY(60px) rotate(10deg);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
            filter: blur(0);
          }
        }
        .animate-letter-slide {
          animation: letterSlide 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
          transform-origin: bottom;
        }
        @keyframes lineEnter {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          100% {
            opacity: 0.8;
            transform: scaleX(1);
          }
        }
        .animate-line-enter {
          animation: lineEnter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes subtitleEnter {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(4px);
          }
          100% {
            opacity: 0.9;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-subtitle-enter {
          animation: subtitleEnter 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 1.25s forwards;
        }
        @keyframes contentMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-8vh);
          }
        }
        .animate-content-move {
          animation: contentMove 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.05s forwards;
        }
      `}</style>
    </div>
  );
}
