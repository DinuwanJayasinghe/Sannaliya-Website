import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import geoData from "../../assets/sl-districts.json";

const zone1Districts = ["Kalutara", "Colombo", "Gampaha", "Galle", "Matara", "Kegalle"];

const SLMap = ({ selectedDistrict, onDistrictSelect }) => {
  return (
    <div className="border rounded bg-white overflow-hidden" style={{ height: "400px" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 4500,
          center: [80.7, 7.8],
        }}
        width={400}
        height={500}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const districtName = geo.properties.shapeName.replace(" District", "");
              // Map names might differ slightly in GeoJSON
              const isZone1 = zone1Districts.includes(districtName);
              const isSelected = selectedDistrict === districtName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  onClick={() => onDistrictSelect(districtName)}
                  style={{
                    default: {
                      fill: isSelected ? "#FFC107" : (isZone1 ? "#2A9D8F" : "#A8D5BA"),
                      outline: "none",
                      stroke: "#FFF",
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: "#F4A261",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#E76F51",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default SLMap;
