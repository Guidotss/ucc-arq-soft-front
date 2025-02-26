"use client";
import React, { useContext } from "react";
import BusinessServicesCard from "./BusinessServicesCard";
import { AdminContext } from "@/context/admin/AdminContext";
import { ContainerInstanceDto } from "@/types";

interface BusinessServicesListProps {
  onSelect?: (instances: ContainerInstanceDto[]) => void;
}

export const BusinessServicesList: React.FC<BusinessServicesListProps> = ({ onSelect }) => {
  const { instances, startInstance, stopInstance, removeInstance } = useContext(AdminContext);

  const businessKeys = [
    "users-api",
    "api-gateway",
    "courses-api",
    "search-api",
    "inscription-api",
  ];

  const businessGroups: Record<string, ContainerInstanceDto[]> = {
    "users-api": [],
    "api-gateway": [],
    "courses-api": [],
    "search-api": [],
    "inscription-api": [],
  };

  instances.forEach((inst) => {
    const imageLower = inst.Image.toLowerCase();
    businessKeys.forEach((key) => {
      if (imageLower.includes(key)) {
        businessGroups[key].push(inst);
      }
    });
  });

  const serviceCards = [
    {
      key: "users-api",
      title: "Users API",
      icon: "/assets/images/users_api_icon.png",
      instances: businessGroups["users-api"],
    },
    {
      key: "api-gateway",
      title: "API Gateway",
      icon: "/assets/images/api_gateway_icon.png",
      instances: businessGroups["api-gateway"],
    },
    {
      key: "courses-api",
      title: "Courses API",
      icon: "/assets/images/courses_api_icon.png",
      instances: businessGroups["courses-api"],
    },
    {
      key: "search-api",
      title: "Search API",
      icon: "/assets/images/search_api_icon.png",
      instances: businessGroups["search-api"],
    },
    {
      key: "inscription-api",
      title: "Inscription API",
      icon: "/assets/images/inscription_api_icon.png",
      instances: businessGroups["inscription-api"],
    },
  ];

  return (
    <div className="p-4 flex flex-col w-full animate-slideIn" style={{
      background: "rgba(50, 50, 50, 0.8)",
      borderRadius: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    }}>
      <div
        className="text-center"
        style={{
          color: "white",
          borderBottom: "1px solid #999",
          marginBottom: "1rem",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "0.3rem",
          fontSize: "1.2rem",
        }}
      >
        <h2>Business Services</h2>
      </div>
      <div className="flex flex-row space-x-4 justify-center">
        {serviceCards.map((card) => (
          <BusinessServicesCard
            key={card.key}
            title={card.title}
            icon={card.icon}
            instances={card.instances}
            onStart={startInstance}
            onStop={stopInstance}
            onRemove={removeInstance}
            onSelect={onSelect}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        .animate-slideIn {
          transform-origin: left;
          animation: slideIn 0.5s forwards;
        }
      `}</style>
    </div>
  );
};
