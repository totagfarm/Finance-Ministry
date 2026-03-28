import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "/liberia.json";

// Simulate some economic output for demo purposes
const generateOutput = (name: string) => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 100 + 10.5).toFixed(1);
};

export default function LiberiaInteractiveMap() {
  const [content, setContent] = useState("");
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load map data:", err));
  }, []);

  return (
    <div className="w-full h-full relative" data-tooltip-id="liberia-tooltip">
      {geoData ? (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 3000,
            center: [-9.5, 6.5] // Rough center of Liberia
          }}
          width={160}
          height={200}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const countyName = geo.properties.name || "Unknown County";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setContent(`${countyName}: $${generateOutput(countyName)}M`);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    style={{
                      default: {
                        fill: "rgba(255,255,255,0.05)",
                        stroke: "rgba(212,175,55,0.4)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "rgba(212,175,55,0.4)",
                        stroke: "#D4AF37",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 250ms"
                      },
                      pressed: {
                        fill: "rgba(212,175,55,0.6)",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-brand-gold/50 text-xs">
          Loading map...
        </div>
      )}
      <Tooltip 
        id="liberia-tooltip" 
        content={content} 
        isOpen={content !== ""}
        place="top"
        positionStrategy="fixed"
        className="!fixed !bg-background/95 !backdrop-blur-md !border !border-brand-gold/50 !text-brand-gold !rounded-lg !px-3 !py-2 !text-xs !font-bold !z-[200] !shadow-[0_4px_30px_rgba(212,175,55,0.4)]"
      />
    </div>
  );
}
