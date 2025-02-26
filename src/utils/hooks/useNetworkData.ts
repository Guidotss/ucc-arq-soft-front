import { useState, useEffect, useRef } from "react";

interface NetworkData {
  rx_bytes: number;
  tx_bytes: number;
}

export function useNetworkThroughput(currentData: NetworkData | undefined) {
  const [throughput, setThroughput] = useState(0);
  const prevDataRef = useRef<{ totalBytes: number; timestamp: number } | null>(null);

  useEffect(() => {
    if (!currentData) return;
    const currentTotal = currentData.rx_bytes + currentData.tx_bytes;
    const now = Date.now();

    if (prevDataRef.current) {
      const deltaBytes = currentTotal - prevDataRef.current.totalBytes;
      const deltaTime = (now - prevDataRef.current.timestamp) / 1000; // en segundos
      if (deltaTime > 0) {
        setThroughput(deltaBytes / deltaTime);
      }
    }
    prevDataRef.current = { totalBytes: currentTotal, timestamp: now };
  }, [currentData]);

  return throughput;
}
