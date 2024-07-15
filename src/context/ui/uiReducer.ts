import { UiState } from ".";


type UiAction =
    | { type: "[Ui] - Open Create Modal" }
    | { type: "[Ui] - Close Create Modal" }
    | { type: "[Ui] - Open Edit Modal" }
    | { type: "[Ui] - Close Edit Modal" };

export const uiReducer = (
    state: UiState,
    action: UiAction
): UiState => {
    switch (action.type) {
        case "[Ui] - Open Create Modal":
            return {
                ...state,
                isCreateModalOpen: true,
                isEdit: false,
            };
        case "[Ui] - Close Create Modal":
            return {
                ...state,
                isCreateModalOpen: false,
                isEdit: false,
            };
        case "[Ui] - Open Edit Modal":
            return {
                ...state,
                isEdit: true,
                isCreateModalOpen: true,
            };
        case "[Ui] - Close Edit Modal":
            return {
                ...state,
                isEdit: false,
                isCreateModalOpen: false,
            };
        default:
            return state;
    }
};

