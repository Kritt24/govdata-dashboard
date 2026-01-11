import { User, Shield, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RoleSelectorProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const roles = [
    { id: "Government Official", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "Citizen", icon: User, color: "text-green-600", bg: "bg-green-50" },
    { id: "Admin (Demo)", icon: Shield, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <h2 className="text-lg font-medium text-gray-600 mb-4 font-serif">Select View Perspective</h2>
      <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex flex-col sm:flex-row gap-2">
        {roles.map((role) => {
          const isSelected = currentRole === role.id;
          const Icon = role.icon;
          
          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={cn(
                "relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ease-out text-sm font-medium",
                isSelected 
                  ? "text-gray-900 shadow-md ring-1 ring-black/5" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="role-bg"
                  className="absolute inset-0 bg-white rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className={cn("relative z-10 p-1.5 rounded-lg", role.bg, role.color)}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="relative z-10">{role.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
