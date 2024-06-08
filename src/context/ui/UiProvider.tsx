"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, FC, useEffect } from "react";
import { UiContext, uiReducer } from ".";
import { useToast } from "@/utils";
import Cookies from "js-cookie";

interface UiProviderProps {
  children: React.ReactNode;
}

export interface UiState {
    isCreateModalOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isCreateModalOpen: false,
};

export const UiProvider: FC<UiProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const { showToast } = useToast();

    const openCreateModal = () => {
        dispatch({ type: "[Ui] - Open Create Modal" });
    }
    const closeCreateModal = () => {
        dispatch({ type: "[Ui] - Close Create Modal" });
    }

  return <UiContext.Provider value={{
    ...state,
    openCreateModal,
    closeCreateModal,
  }}>{children}</UiContext.Provider>;
};
