import React, { useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import districtsData from '../assets/sl-districts.json';

const SLMap = ({ onDistrictSelect, selectedDistrict }) => {
  const [hovered, setHovered] = useState(null);

  // SVG dimensions
  const width = 600;
  const height = 800;

  // Sri Lanka: ~79.8 to 81.9 E, ~5.9 to 9.8 N
  const projection = geoMercator()
    .center([80.77, 7.87]) // Longitude, Latitude
    .scale(9000)
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath().projection(projection);

  const zone1Districts = ['Kaluthara', 'Colombo', 'Gampaha', 'Galle', 'Mathara', 'Kegalle'];

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100 p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ background: '#f8fafc' }}
      >
        <g>
          {districtsData.features.map((feature, idx) => {
            const name = feature.properties.name;
            const isZone1 = zone1Districts.includes(name);
            const isSelected = selectedDistrict === name;
            const isHovered = hovered === name;

            return (
              <path
                key={idx}
                d={pathGenerator(feature)}
                fill={isSelected ? '#0F6B6E' : isHovered ? '#1FA2A6' : isZone1 ? '#e0f2f1' : '#f1f5f9'}
                stroke={isSelected ? '#fff' : '#94a3b8'}
                strokeWidth={isSelected ? 2 : 0.5}
                className="transition-colors duration-200 cursor-pointer"
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onDistrictSelect && onDistrictSelect(name)}
              >
                <title>{name}</title>
              </path>
            );
          })}
        </g>
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#e0f2f1] rounded-sm border border-teal-200"></span>
          <span className="text-gray-600 font-medium">Zone 1 (LKR 450)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#f1f5f9] rounded-sm border border-slate-200"></span>
          <span className="text-gray-600 font-medium">Zone 2 (LKR 500)</span>
        </div>
      </div>
    </div>
  );
};

export default SLMap;
