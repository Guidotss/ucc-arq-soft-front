"use client";
import React, { useEffect, useState } from "react";
import { ContainerInstanceDto } from "@/types";
import PixelCanvasComponent from "@/components/pixelCanvas/PixelCanvasComponent";

interface BusinessServicesCardProps {
  title: string;
  icon: string;
  instances: ContainerInstanceDto[];
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onRemove: (id: string) => void;
  onSelect?: (instances: ContainerInstanceDto[]) => void;
}

const BusinessServicesCard: React.FC<BusinessServicesCardProps> = ({
  title,
  icon,
  instances,
  onStart,
  onStop,
  onRemove,
  onSelect,
}) => {
  const [showPixel, setShowPixel] = useState(false);

  // Espera a que la tarjeta se expanda (delay de 700ms, ajustar según convenga)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPixel(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (onSelect && instances.length > 0) {
      onSelect(instances);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative rounded shadow transition-transform duration-700 hover:scale-105 cursor-pointer overflow-hidden
        flex flex-col items-center justify-center h-40 w-full
      `}
      style={{
        border: "solid 1px rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)",
        maxWidth: "180px",
      }}
    >
      {/* Fondo animado: se renderiza solo después del delay */}
      {showPixel && (
        <div className="absolute inset-0">
          <PixelCanvasComponent colors="#FF47BB,#ED8EEB,#804D93" gap="3" speed="65" />
        </div>
      )}

      {/* Contenido interno animado: logo, nombre e instancias */}
      <div className="z-10 flex flex-col items-center justify-center p-2 animate-content">
        <img
          src={icon}
          alt={title}
          className="w-12 h-12 mb-2 transition-all duration-700 ease-in-out"
          style={{
            background: "rgba(50, 50, 50, 0.8)",
            padding: "2px",
            borderRadius: "5px",
          }}
        />
        <h3 className="text-lg font-bold text-white text-center">{title}</h3>
        <div className="mt-2 text-gray-200">
          {instances.length} {instances.length !== 1 ? "instances" : "instance"}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-content {
          transform: scale(0);
          opacity: 0;
          animation: fadeInScale 0.5s 1s forwards;
        }
      `}</style>
    </div>
  );
};

export default BusinessServicesCard;
