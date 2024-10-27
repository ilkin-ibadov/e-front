import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuth = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      authenticate: () => set((state) => ({
        isAuthenticated: true
      })),
      logout: () => set((state) => ({
        isAuthenticated: false
      })),
    }),
    {
      name: "auth-store",
      // skipHydration: true
    }
  )
)

export default useAuth