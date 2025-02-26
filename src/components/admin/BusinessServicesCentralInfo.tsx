"use client";
import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "@/context/admin/AdminContext";
import { ContainerInstanceDto } from "@/types";
import MultiGauge from "@/components/admin/AdminGauge";
import { useNetworkThroughput } from "@/utils/hooks";

const useSmoothValue = (target: number, smoothingFactor = 0.1) => {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let animationFrameId: number;
    const update = () => {
      setValue((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.1) return target;
        return prev + diff * smoothingFactor;
      });
      animationFrameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, smoothingFactor]);

  return value;
};

interface BusinessServicesCentralInfoProps {
  instances: ContainerInstanceDto[];
  onClose?: () => void;
}

const quickTimeFilters = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "15 min", seconds: 900 },
  { label: "30 min", seconds: 1800 },
  { label: "60 min", seconds: 3600 },
  { label: "12 hrs", seconds: 43200 },
  { label: "24 hrs", seconds: 86400 },
];

export const BusinessServicesCentralInfo: React.FC<BusinessServicesCentralInfoProps> = ({
  instances,
  onClose,
}) => {
  const {
    logs,
    loadLogs,
    loadStats,
    startInstance,
    stopInstance,
    removeInstance,
    createInstance,
    instances: allInstances,
    stats,
  } = useContext(AdminContext);

  const [selectedInstance, setSelectedInstance] = useState<ContainerInstanceDto | null>(
    instances[0] || null
  );
  const [activeQuickFilter, setActiveQuickFilter] = useState<number | null>(1800);
  const [customSince, setCustomSince] = useState("");
  const [customUntil, setCustomUntil] = useState("");

  useEffect(() => {
    if (instances.length > 0) {
      setSelectedInstance(instances[0]);
      const service = instances[0].Labels["com.docker.compose.service"];
      loadLogs({ service, since: 1800 });
      loadStats(instances[0].Id);
    } else {
      setSelectedInstance(null);
    }
  }, [instances]);

  useEffect(() => {
    if (!selectedInstance) return;
    const service = selectedInstance.Labels["com.docker.compose.service"];
    const since = customSince
      ? Math.floor(new Date(customSince).getTime() / 1000) + new Date(customSince).getTimezoneOffset() * 60
      : activeQuickFilter || 1800;
    const until = customUntil
      ? (
          Math.floor(new Date(customUntil).getTime() / 1000) +
          new Date(customUntil).getTimezoneOffset() * 60
        ).toString()
      : undefined;

    const intervalId = setInterval(() => {
      loadLogs({ service, since, until });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedInstance, activeQuickFilter, customSince, customUntil, loadLogs]);

  useEffect(() => {
    if (selectedInstance) loadStats(selectedInstance.Id);
  }, [selectedInstance, loadStats]);

  let cpuPercent = 0;
  let memoryPercent = 0;
  let networkPercent = 0;

  if (selectedInstance && stats[selectedInstance.Id]) {
    const containerStats = stats[selectedInstance.Id];
    const cpuDelta =
      containerStats.cpu_stats.cpu_usage.total_usage -
      containerStats.precpu_stats.cpu_usage.total_usage;
    const systemDelta =
      containerStats.cpu_stats.system_cpu_usage -
      containerStats.precpu_stats.system_cpu_usage;
    const onlineCpus = containerStats.cpu_stats.online_cpus || 1;
    cpuPercent = systemDelta > 0 ? (cpuDelta / systemDelta) * onlineCpus * 100 : 0;

    memoryPercent =
      containerStats.memory_stats.limit > 0
        ? (containerStats.memory_stats.usage / containerStats.memory_stats.limit) * 100
        : 0;
  }

  const rawNetworkData =
    selectedInstance &&
    stats &&
    stats[selectedInstance.Id] &&
    stats[selectedInstance.Id].networks &&
    Object.keys(stats[selectedInstance.Id].networks).length > 0
      ? Object.values(stats[selectedInstance.Id].networks)[0]
      : undefined;
  const currentThroughput = useNetworkThroughput(rawNetworkData);
  const maxThroughput = 1000000;
  const safeThroughput = Math.max(currentThroughput, 0);
  networkPercent = Math.min((safeThroughput / maxThroughput) * 100, 100);

  const smoothedCpu = useSmoothValue(cpuPercent);
  const smoothedMemory = useSmoothValue(memoryPercent);
  const smoothedNetwork = useSmoothValue(networkPercent);

  const handleInstanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "create") {
      handleCreate();
      return;
    }
    const inst = instances.find((i) => i.Id === value);
    if (inst) {
      setSelectedInstance(inst);
      const service = inst.Labels["com.docker.compose.service"];
      loadLogs({ service, since: activeQuickFilter || undefined });
      loadStats(inst.Id);
    }
  };

  const handleQuickFilter = (seconds: number) => {
    setActiveQuickFilter(seconds);
    if (selectedInstance) {
      const service = selectedInstance.Labels["com.docker.compose.service"];
      loadLogs({ service, since: seconds });
    }
  };

  const handleLoadCustomLogs = () => {
    if (selectedInstance) {
      const service = selectedInstance.Labels["com.docker.compose.service"];
      const sinceTimestamp = customSince
        ? Math.floor(new Date(customSince).getTime() / 1000) + new Date(customSince).getTimezoneOffset() * 60
        : undefined;
      const untilTimestamp = customUntil
        ? Math.floor(new Date(customUntil).getTime() / 1000) + new Date(customUntil).getTimezoneOffset() * 60
        : undefined;
      loadLogs({
        service,
        since: sinceTimestamp,
        until: untilTimestamp !== undefined ? untilTimestamp.toString() : undefined,
      });
      setActiveQuickFilter(null);
    }
  };

  const handleStartStop = () => {
    if (!selectedInstance) return;
    if (selectedInstance.State === "running") {
      stopInstance(selectedInstance.Id);
    } else {
      startInstance(selectedInstance.Id);
    }
  };

  const handleRemove = () => {
    if (!selectedInstance) return;
    removeInstance(selectedInstance.Id);
  };

  const handleCreate = () => {
    if (!selectedInstance) return;
    const originalName = selectedInstance.Names[0].replace(/^\//, "");
    const count = allInstances.filter((inst) => inst.Names[0].includes(originalName)).length;
    const newName = `${originalName}-instance-${count + 1}`;
    const port = selectedInstance.Ports[0]?.PrivatePort.toString() || "";
    createInstance(selectedInstance.Image, newName, port);
  };

  const getDisplayLogs = () => {
    if (selectedInstance && logs[selectedInstance.Id]) {
      return logs[selectedInstance.Id]
        .split("\n")
        .filter((line) => line.trim() !== "")
        .reverse()
        .join("\n");
    }
    return "No logs disponibles";
  };

  return (
    <div
      className="p-4 rounded shadow mt-4 h-full relative"
      style={{
        background: "rgba(50, 50, 50, 0.8)",
        boxShadow: "0 0 10px rgba(0,0,0,0.8)",
        borderRadius: "1rem",
        maxHeight: "calc(100vh - 31rem)",
      }}
    >
    {onClose && (
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white bg-transparent border-none text-xl font-bold hover:text-gray-300 focus:outline-none"
      >
        &times;
      </button>
    )}
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 p-4 flex flex-col h-full border-r border-gray-500">
          <div>
            <select
              value={selectedInstance ? selectedInstance.Id : ""}
              onChange={handleInstanceChange}
              className="border rounded p-2 w-full mb-4 bg-gray-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {instances.map((inst) => (
                <option key={inst.Id} value={inst.Id}>
                  {inst.Names.join(", ")} ({inst.State})
                </option>
              ))}
              <option value="create">Create a new instance</option>
            </select>

            {selectedInstance && (
              <div
                className="mb-4 text-sm bg-gray-800 text-green-300 p-3 rounded shadow-inner"
                style={{ boxShadow: "0 0 6px rgba(0,0,0,0.5), inset 0 0 10px rgba(44,44,44,0.5)" }}
              >
                <div className="font-semibold">{selectedInstance.Image}</div>
                <div>{new Date(selectedInstance.Created * 1000).toLocaleString()}</div>
                <div>
                  {selectedInstance.State} - {selectedInstance.Status}
                </div>
                <div>
                  {selectedInstance.Ports.map((port, i) => (
                    <span key={i}>
                      {port.IP}:{port.PublicPort} (private: {port.PrivatePort})
                      {i < selectedInstance.Ports.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex">
              <MultiGauge
                cpu={smoothedCpu}
                memory={smoothedMemory}
                network={smoothedNetwork}
              />
            </div>
          </div>
          <div className="mt-auto flex space-x-2">
            <button
              onClick={handleStartStop}
              className="px-3 py-1 mt-2 bg-blue-500 text-white rounded flex-1"
            >
              {selectedInstance?.State === "running" ? "Stop" : "Play"}
            </button>
            <button
              onClick={handleRemove}
              disabled={instances.length <= 1}
              className={`px-3 py-1 mt-2 rounded flex-1 ${
                instances.length <= 1
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="md:w-2/3 p-4 flex flex-col h-full">
          <div className="flex space-x-2 mb-2">
            <input
              type="datetime-local"
              value={customSince}
              onChange={(e) => setCustomSince(e.target.value)}
              placeholder="since"
              className="border rounded p-2 flex-1 bg-gray-700 text-white placeholder:text-white"
            />
            <input
              type="datetime-local"
              value={customUntil}
              onChange={(e) => setCustomUntil(e.target.value)}
              placeholder="until"
              className="border rounded p-2 flex-1 bg-gray-700 text-white placeholder:text-white"
            />
            <button
              onClick={handleLoadCustomLogs}
              className="px-3 py-2 bg-green-500 text-white rounded"
            >
              Load
            </button>
          </div>

          <div className="bg-gray-800 text-green-300 p-2 rounded flex-1 overflow-y-auto overflow-x-hidden font-mono text-xs whitespace-pre-wrap mb-2 custom-scrollbar">
            {getDisplayLogs()}
          </div>

          <div className="flex space-x-1">
            {quickTimeFilters.map((filter) => (
              <button
                key={filter.seconds}
                onClick={() => handleQuickFilter(filter.seconds)}
                className="px-1 py-1 rounded flex-1 text-xs"
                style={{
                  background:
                    activeQuickFilter === filter.seconds
                      ? "rgba(100,100,100, 0.9)"
                      : "rgba(77,77,77, 0.5)",
                  color: "white",
                  boxShadow:
                    activeQuickFilter === filter.seconds
                      ? "2px 2px 10px rgba(0,0,0,0.7), inset 1px 1px 7px rgba(130,130,130,0.9)"
                      : "0 0 6px rgba(0,0,0,0.6)",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessServicesCentralInfo;
