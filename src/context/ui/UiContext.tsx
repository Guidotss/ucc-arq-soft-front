"use client";
import { createContext } from "react";


interface UiContextProps {
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

export const UiContext = createContext({} as UiContextProps);