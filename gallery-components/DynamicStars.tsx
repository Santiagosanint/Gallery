
import React, { useEffect, useRef } from 'react';

export const DynamicStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    window.onresize = function() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    
    const stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      twinkle: Math.random() > 0.5
    }));

    function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        
        stars.forEach(star => {
            if (star.twinkle) {
                star.alpha += Math.random() * 0.1 - 0.05;
                if(star.alpha > 1) star.alpha = 1;
                if(star.alpha < 0) star.alpha = 0;
            }

            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fill();
            
            star.y -= 0.1;
            if (star.y < 0) star.y = h;
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    
    draw();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center p-4">
        <h2 className="text-3xl font-bold">Dynamic Stars Background</h2>
        <p className="text-gray-400 mt-2">A customizable canvas-based starry night effect with twinkling stars.</p>
      </div>
      <div className="relative z-10 mt-4 bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 w-full max-w-xs space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <label htmlFor="density">Star Density</label>
          <span className="text-gray-400">0.0002</span>
        </div>
        <input type="range" id="density" min="0" max="1" step="0.01" defaultValue="0.2" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
        
        <div className="flex justify-between items-center">
          <label htmlFor="speed">Min Twinkle Speed</label>
           <span className="text-gray-400">0.5</span>
        </div>
        <input type="range" id="speed" min="0" max="1" step="0.01" defaultValue="0.5" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
        
         <div className="flex justify-between items-center">
          <label htmlFor="max-twinkle">Max Twinkle Speed</label>
           <span className="text-gray-400">1.5</span>
        </div>
        <input type="range" id="max-twinkle" min="0" max="2" step="0.01" defaultValue="1.5" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />

        <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="all-stars-twinkle" className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500" defaultChecked/>
            <label htmlFor="all-stars-twinkle">All Stars Twinkle</label>
        </div>
      </div>
    </div>
  );
};