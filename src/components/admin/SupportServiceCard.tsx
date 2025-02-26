"use client";
import React, { useEffect, useState } from "react";
import { ContainerInstanceDto } from "@/types";
import PixelCanvasComponent from "@/components/pixelCanvas/PixelCanvasComponent";

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const StopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h12v12H6z" />
  </svg>
);

interface SupportServiceCardProps {
  title: string;
  icon: string;
  instances: ContainerInstanceDto[];
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onRemove: (id: string) => void;
}

const SupportServiceCard: React.FC<SupportServiceCardProps> = ({
  title,
  icon,
  instances,
  onStart,
  onStop,
  onRemove,
}) => {
  const instanceDetail = instances[0];
  const [showPixel, setShowPixel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPixel(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        group relative rounded shadow transition-transform duration-700
        hover:scale-105 cursor-pointer overflow-hidden h-40
      `}
      style={{
        border: "solid 1px rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)",
      }}
    >
      {showPixel && (
        <div className="absolute inset-0 z-2">
          <PixelCanvasComponent colors="#fef08a,#fde047,#eab308" gap="3" speed="65" />
        </div>
      )}

      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-center 
          transition-transform duration-700 ease-in-out
          group-hover:scaleX(0) group-hover:scaleY(0) group-hover:pl-3 group-hover:pt-3 animate-appear
        `}
      >
        <img
          src={icon}
          alt={title}
          className="w-12 h-12 mb-1 transition-all duration-700 ease-in-out group-hover:w-8 group-hover:h-8"
          style={{
            background: "rgba(50, 50, 50, 0.)",
            padding: "2px",
            borderRadius: "5px",
          }}
        />
        <h3 className="text-xl font-bold text-white transition-all duration-700 ease-in-out group-hover:text-base">
          {title}
        </h3>
      </div>

      <div className="absolute top-0 right-0 m-2 text-gray-200 transition-all duration-700 ease-in-out group-hover:text-sm animate-appear">
        {instances.length} {instances.length !== 1 ? "instances" : "instance"}
      </div>

      <div
        className="
          absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-in-out 
          transform scale-0 group-hover:scale-100
        "
      >
        <div className="bg-[rgba(33,33,33,0.7)] text-white p-2 rounded relative w-full h-full flex flex-col">
          <div className="absolute top-1 right-1">
            {instanceDetail && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  instanceDetail.State === "running"
                    ? onStop(instanceDetail.Id)
                    : onStart(instanceDetail.Id);
                }}
                className="p-1 bg-gray-800 rounded transition-colors duration-700 ease-in-out hover:bg-gray-700"
              >
                {instanceDetail.State === "running" ? <StopIcon /> : <PlayIcon />}
              </button>
            )}
          </div>

          <div className="flex flex-col items-center justify-center h-full animate-content">
            {instanceDetail ? (
              <>
                <p className="font-mono text-sm">{instanceDetail.Names.join(", ")}</p>
                <p className="text-xs mt-1">
                  <strong>Image:</strong> {instanceDetail.Image}
                </p>
                <p className="text-xs mt-1">
                  <strong>Status:</strong> {instanceDetail.Status} –{" "}
                  <strong>State:</strong> {instanceDetail.State}
                </p>
              </>
            ) : (
              <p className="text-white">No details</p>
            )}
          </div>
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
        .animate-appear {
          transform: scale(0);
          opacity: 0;
          animation: fadeInScale 0.5s 0.8s forwards;
        }
      `}</style>
    </div>
  );
};

export default SupportServiceCard;
