
import React from 'react';

export const ShootingStars: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
       {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full shooting-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `shoot 5s linear ${Math.random() * 5}s infinite`,
          }}
        ></div>
      ))}
      <div className="relative z-10 text-center text-white p-4">
        <h2 className="text-3xl font-bold">Shooting Stars Effect</h2>
        <p className="text-gray-400 mt-2 max-w-sm">
          A mesmerizing badge/ui effect with customizable mobile shooting stars traversing across the screen
        </p>
      </div>
      {/* FIX: Removed the `jsx` attribute from the `<style>` tag as it's not a standard React attribute and was causing a type error. */}
      <style>{`
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(200px) translateY(150px); opacity: 0; }
        }
        .shooting-star::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(-45deg);
          width: 100px;
          height: 1px;
          background: linear-gradient(to left, transparent 0%, #fff 100%);
        }
      `}</style>
    </div>
  );
};
