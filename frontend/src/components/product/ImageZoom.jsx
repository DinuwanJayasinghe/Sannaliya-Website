import React, { useState } from 'react';

const ImageZoom = ({ src, alt }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [bgPos, setBgPos] = useState('0% 0%');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBgPos(`${x}% ${y}%`);
    setZoomStyle({ display: 'block' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  return (
    <div
      className="relative cursor-zoom-in overflow-hidden rounded-2xl shadow-lg bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={alt} className="w-full h-auto block" />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-200"
        style={{
          ...zoomStyle,
          backgroundImage: `url(${src})`,
          backgroundPosition: bgPos,
          backgroundSize: '250%',
          backgroundRepeat: 'no-repeat',
          opacity: zoomStyle.display === 'block' ? 1 : 0
        }}
      />
    </div>
  );
};

export default ImageZoom;
