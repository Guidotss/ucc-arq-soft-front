"use client";
import { createContext } from "react";


interface UiContextProps {
  isEdit: any | boolean;
  isCreateModalOpen: boolean;
  openCreateModal: (isEdit?:boolean) => void;
  closeCreateModal: (isEdit?:boolean) => void;
  
}

export const UiContext = createContext({} as UiContextProps);