import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    username: string;
}

interface SessionState {
    user: User | null;
    isAuthenticated: boolean;
    setSession: (user: User | null) => void;
    clearSession: () => void;
}

const useSessionStore = create<SessionState>()(
    persist((set) => ({
        user: null,
        isAuthenticated: false,
        setSession: (user: User | null) => set({ user, isAuthenticated: true }),
        clearSession: () => set({ user: null, isAuthenticated: false })
    }), {
        name: "tests-user-session"
    })
)

export default useSessionStore