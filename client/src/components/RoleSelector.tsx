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
      <h2 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-4 font-serif">Select View Perspective</h2>
      <div className="bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 inline-flex flex-col sm:flex-row gap-2">
        {roles.map((role) => {
          const isSelected = currentRole === role.id;
          const Icon = role.icon;
          
          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={cn(
                "relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ease-out text-sm font-medium border border-transparent",
                isSelected 
                  ? "text-primary bg-blue-50/50 dark:bg-blue-900/20 border-primary/20 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="role-bg"
                  className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className={cn("relative z-10 p-1.5 rounded-lg", role.bg, role.color, "dark:bg-opacity-20")}>
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
