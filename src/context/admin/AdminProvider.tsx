"use client";
import React, { useReducer, FC, useEffect } from "react";
import Cookies from "js-cookie";
import { AdminContext } from "./AdminContext";
import { adminReducer, AdminState } from "./adminReducer";
import { ContainerInstanceDto, ServiceLogsDto , ContainerStatsResponse} from "@/types";

interface AdminProviderProps {
  children: React.ReactNode;
}

const ADMIN_INITIAL_STATE: AdminState = {
  instances: [],
  logs: {},
  stats: {},
};

export const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);

  const loadInstances = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/instances`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data: ContainerInstanceDto[] = await response.json();
        dispatch({ type: "[Admin] - Load Instances", payload: data });
      }
    } catch (error) {
      console.error("Error al cargar instancias:", error);
    }
  };

  const loadLogs = async (params?: { service?: string; since?: number; until?: string }) => {
    try {
      const token = Cookies.get("token");
      let query = "";
      if (params?.since) {
        const t = Math.floor(Date.now() / 1000) - params.since;
        query += `since=${t}&`;
      }
      if (params?.until) {
        query += `until=${params.until}&`;
      }
      if (params?.service) {
        query += `service=${params.service}&`;
      }
      if (query.endsWith("&")) {
        query = query.slice(0, -1);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/logs?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data: ServiceLogsDto = await response.json();
        dispatch({ type: "[Admin] - Load Logs", payload: data });
      }
    } catch (error) {
      console.error("Error al cargar logs:", error);
    }
  };

  const loadStats = async (id?: string) => {
    try {
      const token = Cookies.get("token");
      let url = `${process.env.NEXT_PUBLIC_API_URL}/admin/stats`;
      if (id) {
        url += `?id=${id}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: ContainerStatsResponse = await response.json();
        dispatch({ type: "[Admin] - Load Stats", payload: data });
      }
    } catch (error) {
      console.error("Error al cargar stats:", error);
    }
  };

  const createInstance = async (
    image: string,
    name: string,
    port: string
  ) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/instances`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image, name, port }),
        }
      );
      if (response.ok) {
        await loadInstances();
      }
    } catch (error) {
      console.error("Error al crear instancia:", error);
    }
  };

  const startInstance = async (id: string) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/instances/${id}/start`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch({ type: "[Admin] - Start Instance", payload: { id } });
      }
    } catch (error) {
      console.error("Error al iniciar instancia:", error);
    }
  };

  const stopInstance = async (id: string) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/instances/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch({ type: "[Admin] - Stop Instance", payload: { id } });
      }
    } catch (error) {
      console.error("Error al detener instancia:", error);
    }
  };

  const removeInstance = async (id: string) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/instances/${id}/remove`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch({ type: "[Admin] - Remove Instance", payload: { id } });
      }
    } catch (error) {
      console.error("Error al eliminar instancia:", error);
    }
  };

  useEffect(() => {
    loadInstances();
    loadLogs({ since: 180 });
    loadStats();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        instances: state.instances,
        logs: state.logs,
        stats: state.stats,
        loadInstances,
        loadLogs,
        loadStats,
        createInstance,
        startInstance,
        stopInstance,
        removeInstance,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
