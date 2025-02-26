// MultiGauge.tsx
"use client";
import React from 'react';

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = angleInDegrees * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians)
  };
}

function getGaugePath(cx: number, cy: number, r: number, progress: number) {
  const base = 90;
  const angle0   = base;
  const angle33  = base + 90;
  const angle66  = base + 180;
  const angle100 = base + 270;
  const rot = 180;
  const a0   = angle0 + rot;
  const a33  = angle33 + rot;
  const a66  = angle66 + rot;
  const a100 = angle100 + rot;
  
  let d = "";
  if (progress <= 33) {
    const normalized = progress / 33;
    const endAngle = a0 + normalized * (a33 - a0);
    const start = polarToCartesian(cx, cy, r, a0);
    const end = polarToCartesian(cx, cy, r, endAngle);
    d = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
  } else if (progress <= 66) {
    const start = polarToCartesian(cx, cy, r, a0);
    const mid1 = polarToCartesian(cx, cy, r, a33);
    const d1 = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${mid1.x} ${mid1.y}`;
    const normalized = (progress - 33) / 33;
    const endAngle = a33 + normalized * (a66 - a33);
    const mid2 = polarToCartesian(cx, cy, r, endAngle);
    const d2 = ` A ${r} ${r} 0 0 1 ${mid2.x} ${mid2.y}`;
    d = d1 + d2;
  } else {
    const start = polarToCartesian(cx, cy, r, a0);
    const mid1 = polarToCartesian(cx, cy, r, a33);
    const d1 = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${mid1.x} ${mid1.y}`;
    const mid2 = polarToCartesian(cx, cy, r, a66);
    const d2 = ` A ${r} ${r} 0 0 1 ${mid2.x} ${mid2.y}`;
    const normalized = (progress - 66) / (100 - 66);
    const endAngle = a66 + normalized * (a100 - a66);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const d3 = ` A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
    d = d1 + d2 + d3;
  }
  return d;
}

interface MultiGaugeProps {
  cpu: number;
  memory: number;
  network: number;
}

const MultiGauge: React.FC<MultiGaugeProps> = ({ cpu, memory, network }) => {
  const size = 250;
  const center = size / 2;

  const gaugeConfigs = [
    { value: memory, radius: 35, strokeWidth: 15, label: "Memoria" },
    { value: cpu, radius: 85, strokeWidth: 15, label: "CPU" },
    { value: network, radius: 60, strokeWidth: 15, label: "Red" },
  ];

  const getGaugeColor = (value: number) => {
    const hue = (140 * (100 - value)) / 100;
    return `hsl(${hue}, 60%, 45%)`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: 'inline-block',
          borderRadius: '5% 50% 50% 50%',
          background: 'rgba(44,44,44,0.7)',
          boxShadow: '0 0 10px rgba(77,77,77,0.5), inset 0px 0px 10px rgba(0,0,0,0.5)',
          padding: '2px'
        }}
      >
        <svg width={size} height={size}>
          <defs>
            <filter
              id="bevelProgress"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
              <feSpecularLighting
                in="blur"
                surfaceScale="5"
                specularConstant="1.7"
                specularExponent="45"
                lightingColor="#ffffff"
                result="specOut"
              >
                <fePointLight x="-100" y="-100" z="200" />
              </feSpecularLighting>
              <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2" />
              <feMerge>
                <feMergeNode in="specOut2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id="bevelTrack"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
              <feSpecularLighting
                in="blur"
                surfaceScale="2.5"
                specularConstant="0.9"
                specularExponent="18"
                lightingColor="#ffffff"
                result="specOut"
              >
                <fePointLight x="-80" y="-80" z="150" />
              </feSpecularLighting>
              <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2" />
              <feMerge>
                <feMergeNode in="specOut2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {gaugeConfigs.map((gauge, index) => (
            <g key={`gauge-${index}`}>
              <path
                d={getGaugePath(center, center, gauge.radius, 100)}
                fill="none"
                stroke="rgba(66,66,66,0.5)"
                strokeWidth={gauge.strokeWidth}
                strokeLinecap="round"
                filter="url(#bevelTrack)"
              />
              <path
                d={getGaugePath(center, center, gauge.radius, gauge.value)}
                fill="none"
                stroke={getGaugeColor(gauge.value)}
                strokeWidth={gauge.strokeWidth}
                strokeLinecap="round"
                filter="url(#bevelProgress)"
              />
              {(() => {
                const start = polarToCartesian(center, center, gauge.radius, 270);
                return (
                  <text
                    x={start.x - 15}
                    y={start.y + 5}
                    fill="#fff"
                    fontSize="12"
                    textAnchor="end"
                  >
                    {gauge.label} ({gauge.value.toFixed(1)}%)
                  </text>
                );
              })()}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default MultiGauge;
