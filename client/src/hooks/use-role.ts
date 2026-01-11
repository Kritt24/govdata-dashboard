import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = "Government Official" | "Citizen" | "Admin (Demo)";

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: "Government Official",
      setRole: (role) => set({ role }),
    }),
    {
      name: 'role-storage',
    }
  )
);
