import { ContainerInstanceDto, ServiceLogsDto , ContainerStatsResponse} from "@/types";

export interface AdminState {
  instances: ContainerInstanceDto[];
  logs: ServiceLogsDto;
  stats: ContainerStatsResponse;
}

export type AdminAction =
  | { type: "[Admin] - Load Instances"; payload: ContainerInstanceDto[] }
  | { type: "[Admin] - Create Instance"; payload: ContainerInstanceDto }
  | { type: "[Admin] - Start Instance"; payload: { id: string } }
  | { type: "[Admin] - Stop Instance"; payload: { id: string } }
  | { type: "[Admin] - Remove Instance"; payload: { id: string } }
  | { type: "[Admin] - Load Logs"; payload: ServiceLogsDto }
  | { type: "[Admin] - Load Stats"; payload: ContainerStatsResponse };

export const adminReducer = (
  state: AdminState,
  action: AdminAction
): AdminState => {
  switch (action.type) {
    case "[Admin] - Load Instances":
      return { ...state, instances: action.payload };
    case "[Admin] - Create Instance":
      return { ...state, instances: [...state.instances, action.payload] };
    case "[Admin] - Start Instance":
      return {
        ...state,
        instances: state.instances.map((inst) =>
          inst.Id === action.payload.id ? { ...inst, State: "running" } : inst
        ),
      };
    case "[Admin] - Stop Instance":
      return {
        ...state,
        instances: state.instances.map((inst) =>
          inst.Id === action.payload.id ? { ...inst, State: "stopped" } : inst
        ),
      };
    case "[Admin] - Remove Instance":
      return {
        ...state,
        instances: state.instances.filter((inst) => inst.Id !== action.payload.id),
      };
    case "[Admin] - Load Logs":
      return { ...state, logs: action.payload };
    case "[Admin] - Load Stats":
      return { ...state, stats: action.payload };
    default:
      return state;
  }
};
