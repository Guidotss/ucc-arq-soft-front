"use client";
import React, { useContext } from "react";
import { AdminContext } from "@/context/admin/AdminContext";
import SupportServiceCard from "./SupportServiceCard";
import { ContainerInstanceDto } from "@/types";

export const SupportServicesList: React.FC = () => {
  const { instances, startInstance, stopInstance, removeInstance } = useContext(AdminContext);

  const groups: Record<string, ContainerInstanceDto[]> = {
    nginx: [],
    solr: [],
    redis: [],
    rabbitmq: [],
  };

  instances.forEach((inst) => {
    const imageLower = inst.Image.toLowerCase();
    if (imageLower.includes("nginx")) {
      groups.nginx.push(inst);
    } else if (imageLower.includes("solr")) {
      groups.solr.push(inst);
    } else if (imageLower.includes("redis")) {
      groups.redis.push(inst);
    } else if (imageLower.includes("rabbitmq")) {
      groups.rabbitmq.push(inst);
    }
  });

  const serviceCards = [
    { key: "nginx", title: "Nginx", icon: "/assets/images/nginx_icon.png", instances: groups.nginx },
    { key: "solr", title: "Solr", icon: "/assets/images/solr_icon.png", instances: groups.solr },
    { key: "redis", title: "Redis", icon: "/assets/images/redis_icon.png", instances: groups.redis },
    { key: "rabbitmq", title: "RabbitMQ", icon: "/assets/images/rabbitmq_icon.png", instances: groups.rabbitmq },
  ];

  return (
    <div 
      className="p-4 animate-slideDown" 
      style={{ 
        borderRadius:"20px", 
        background: "rgba(50, 50, 50, 0.8)",
        zIndex: 1,
        width: "100%",
        maxWidth: "300px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
      }}
    >
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
          fontSize: "1.2rem"
        }}
      >
        <h2>Support Services</h2>
      </div>
      <div className="flex flex-col space-y-4">
        {serviceCards.map((card) => (
          <SupportServiceCard
            key={card.key}
            title={card.title}
            icon={card.icon}
            instances={card.instances}
            onStart={startInstance}
            onStop={stopInstance}
            onRemove={removeInstance}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        .animate-slideDown {
          transform-origin: top;
          animation: slideDown 0.5s forwards;
        }
      `}</style>
    </div>
  );
};
