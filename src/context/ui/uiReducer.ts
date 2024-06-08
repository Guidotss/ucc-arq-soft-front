import { UiState } from ".";


type UiAction =
    | { type: "[Ui] - Open Create Modal" }
    | { type: "[Ui] - Close Create Modal" };

export const uiReducer = (
    state: UiState,
    action: UiAction
): UiState => {
    switch (action.type) {
        case "[Ui] - Open Create Modal":
            return {
                ...state,
                isCreateModalOpen: true,
            };
        case "[Ui] - Close Create Modal":
            return {
                ...state,
                isCreateModalOpen: false,
            };
        default:
            return state;
    }
};
