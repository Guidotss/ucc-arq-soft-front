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
  isEdit: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isCreateModalOpen: false,
  isEdit: false,
};

export const UiProvider: FC<UiProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const { showToast } = useToast();

  const openCreateModal = (isEdit?: boolean) => {
    !!isEdit
      ? dispatch({ type: "[Ui] - Open Edit Modal" })
      : dispatch({ type: "[Ui] - Open Create Modal" });
  };
  const closeCreateModal = (isEdit?: boolean) => {
    !!isEdit
      ? dispatch({ type: "[Ui] - Close Edit Modal" })
      : dispatch({ type: "[Ui] - Close Create Modal" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        openCreateModal,
        closeCreateModal,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
