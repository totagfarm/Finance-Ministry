import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "/liberia.json";

interface MapProps {
  data?: Record<string, number>;
  dataLabel?: string;
  colorScale?: (val: number) => string;
}

export default function LiberiaInteractiveMap({ data, dataLabel = "Output", colorScale }: MapProps) {
  const [content, setContent] = useState("");
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load map data:", err));
  }, []);

  const getFillColor = (name: string) => {
    if (!data) return "rgba(255,255,255,0.05)";
    const val = data[name] || 0;
    if (colorScale) return colorScale(val);
    
    // Default choropleth logic
    if (val > 100) return "rgba(30, 77, 43, 0.8)"; // Deep Green
    if (val > 50) return "rgba(30, 77, 43, 0.6)";
    if (val > 20) return "rgba(30, 77, 43, 0.4)";
    if (val > 5) return "rgba(30, 77, 43, 0.2)";
    return "rgba(255,255,255,0.05)";
  };

  return (
    <div className="w-full h-full relative" data-tooltip-id="liberia-tooltip">
      {geoData ? (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 3000,
            center: [-9.5, 6.5]
          }}
          width={160}
          height={200}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const countyName = geo.properties.name || "Unknown County";
                const val = data ? (data[countyName] || 0) : 0;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (data) {
                        setContent(`${countyName}: $${val}M ${dataLabel}`);
                      } else {
                        // Original fallback sim logic
                        const hash = countyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        setContent(`${countyName}: $${(hash % 100 + 10.5).toFixed(1)}M Output`);
                      }
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    style={{
                      default: {
                        fill: getFillColor(countyName),
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
