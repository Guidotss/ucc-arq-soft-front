"use client";
import React, { useState, useEffect, useContext } from "react";
import { AdminLoader, SupportServicesList, BusinessServicesList, BusinessServicesCentralInfo } from "@/components";
import { ContainerInstanceDto } from "@/types";
import { AdminContext } from "@/context/admin/AdminContext";

export default function AdminPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [animateClose, setAnimateClose] = useState(false);
  const [selectedServiceInstances, setSelectedServiceInstances] = useState<ContainerInstanceDto[] | null>(null);

  const { instances: allInstances } = useContext(AdminContext);

  const handleCloseClick = () => {
    setAnimateClose(true);
  };

  const handleAnimationEnd = () => {
    setShowLoader(false);
  };

  const handleServiceSelect = (instances: ContainerInstanceDto[]) => {
    setSelectedServiceInstances(instances);
  };

  useEffect(() => {
    if (selectedServiceInstances && selectedServiceInstances.length > 0) {
      const serviceName = selectedServiceInstances[0].Labels["com.docker.compose.service"];
      const updatedInstances = allInstances.filter(
        inst => inst.Labels["com.docker.compose.service"] === serviceName
      );
      setSelectedServiceInstances(updatedInstances);
    }
  }, [allInstances]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseClick();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="w-full bg-violet-50 relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover rounded-b-lg"
          src="/assets/fondo_admin.mp4"
        />

        <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="tracking-widest">
            {showLoader && (
              <AdminLoader close={animateClose} onClose={handleAnimationEnd} />
            )}
          </div>
        </div>

        {!showLoader && (
          <div
            className="absolute top-32 left-5 right-5 p-4 overflow-y-auto"
            style={{
              background: "rgba(50, 50, 50, 0.8)",
              borderRadius: "1rem",
              height: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="w-full mr-6 flex flex-col space-y-4">
              <BusinessServicesList onSelect={handleServiceSelect} />
              {selectedServiceInstances && (
                <BusinessServicesCentralInfo 
                  instances={selectedServiceInstances} 
                  onClose={() => setSelectedServiceInstances(null)}
                  />
              )}
            </div>
            <SupportServicesList />
          </div>
        )}
      </section>
    </>
  );
}
