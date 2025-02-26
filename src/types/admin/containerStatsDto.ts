// /types/containerStatsDto.ts

export interface CpuUsage {
    total_usage: number;
    percpu_usage: number[];
    usage_in_kernelmode: number;
    usage_in_usermode: number;
  }
  
  export interface ThrottlingData {
    periods: number;
    throttled_periods: number;
    throttled_time: number;
  }
  
  export interface CpuStats {
    cpu_usage: CpuUsage;
    system_cpu_usage: number;
    online_cpus: number;
    throttling_data: ThrottlingData;
  }
  
  export interface MemoryStatsStats {
    active_anon: number;
    active_file: number;
    cache: number;
    dirty: number;
    hierarchical_memory_limit: number;
    hierarchical_memsw_limit: number;
    inactive_anon: number;
    inactive_file: number;
    mapped_file: number;
    pgfault: number;
    pgmajfault: number;
    pgpgin: number;
    pgpgout: number;
    rss: number;
    rss_huge: number;
    total_active_anon: number;
    total_active_file: number;
    total_cache: number;
    total_dirty: number;
    total_inactive_anon: number;
    total_inactive_file: number;
    total_mapped_file: number;
    total_pgfault: number;
    total_pgmajfault: number;
    total_pgpgin: number;
    total_pgpgout: number;
    total_rss: number;
    total_rss_huge: number;
    total_unevictable: number;
    total_writeback: number;
    unevictable: number;
    writeback: number;
  }
  
  export interface MemoryStats {
    usage: number;
    max_usage: number;
    stats: MemoryStatsStats;
    limit: number;
  }
  
  export interface NetworksStats {
    rx_bytes: number;
    rx_packets: number;
    rx_errors: number;
    rx_dropped: number;
    tx_bytes: number;
    tx_packets: number;
    tx_errors: number;
    tx_dropped: number;
  }
  
  export interface ContainerStatsDto {
    read: string;
    preread: string;
    pids_stats: {
      current: number;
    };
    blkio_stats: {
      io_service_bytes_recursive: number[];
      io_serviced_recursive: number[];
      io_queue_recursive: number[];
      io_service_time_recursive: number[];
      io_wait_time_recursive: number[];
      io_merged_recursive: number[];
      io_time_recursive: number[];
      sectors_recursive: number[];
    };
    num_procs: number;
    storage_stats: any;
    cpu_stats: CpuStats;
    precpu_stats: CpuStats;
    memory_stats: MemoryStats;
    name: string;
    id: string;
    networks: {
      [key: string]: NetworksStats;
    };
  }
  
  export interface ContainerStatsResponse {
    [containerId: string]: ContainerStatsDto;
  }
  