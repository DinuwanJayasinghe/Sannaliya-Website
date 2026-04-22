import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageZoom = ({ src, alt }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [bgPos, setBgPos] = useState('0% 0%');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBgPos(`${x}% ${y}%`);
    setZoomStyle({ display: 'block' });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
    setIsHovered(false);
  };

  return (
    <div
      className="relative cursor-zoom-in overflow-hidden rounded-[32px] shadow-premium bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto block transition-transform duration-500"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-primary/20 rounded-[28px]"
            style={{
              ...zoomStyle,
              backgroundImage: `url(${src})`,
              backgroundPosition: bgPos,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white uppercase font-bold tracking-widest border border-white/30">
        Hover to Zoom
      </div>
    </div>
  );
};

export default ImageZoom;
