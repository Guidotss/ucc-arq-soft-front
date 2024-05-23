import toast from "react-hot-toast"

export const useToast = () => {
    const showToast = (message: string, type: "success" | "error" | "loading" | "blank" = "success") => {
        toast(message, {
            icon: type === "success" ? "🎉" : type === "error" ? "😢" : type === "loading" ? "⏳" : "",
            style: {
                borderRadius: "10px",
                background: type === "success" ? "#4caf50" : type === "error" ? "#f44336" : type === "loading" ? "#2196f3" : "#333",
                color: "#fff",
            },
        });
    }

    return {
        showToast
    }
}