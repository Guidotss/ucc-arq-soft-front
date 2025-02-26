"use client";
import { createContext } from "react";
import { ContainerInstanceDto, ServiceLogsDto , ContainerStatsResponse} from "@/types";


export interface AdminContextProps {
  instances: ContainerInstanceDto[];
  logs: ServiceLogsDto;
  stats: ContainerStatsResponse;
  loadInstances: () => Promise<void>;
  loadLogs: (params?: { service?: string; since?: number; until?: string }) => Promise<void>;
  loadStats: (service?: string) => Promise<void>;
  createInstance: (image: string, name: string, port: string) => Promise<void>;
  startInstance: (id: string) => Promise<void>;
  stopInstance: (id: string) => Promise<void>;
  removeInstance: (id: string) => Promise<void>;
}

export const AdminContext = createContext<AdminContextProps>(
  {} as AdminContextProps
);
