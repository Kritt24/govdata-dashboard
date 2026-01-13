import { Link, useLocation } from "wouter";
import { Globe, ShieldCheck, Fingerprint, LogOut, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRoleStore, type Role } from "@/hooks/use-role";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, Shield, Briefcase } from "lucide-react";

import bannerLogo from "@assets/WhatsApp_Image_2026-01-12_at_9.57.13_PM_1768295977407.jpeg";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const { role, setRole } = useRoleStore();

  const perspectives = [
    { id: "Government Official", icon: Briefcase },
    { id: "Citizen", icon: User },
    { id: "Admin (Demo)", icon: Shield },
  ];

  const currentPerspective = perspectives.find(p => p.id === role) || perspectives[0];

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Background Watermark */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.05] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url(${bannerLogo})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          transform: 'scale(0.8)',
        }}
      />

      {/* Official Header Strip */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm relative">
        {/* Top bar with government colors */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Left: Branding */}
            <div className="flex items-center gap-6 py-4">
              <Link href="/">
                <div className="flex items-center gap-4 cursor-pointer group border-r border-gray-100 dark:border-gray-800 pr-6">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                    alt="National Emblem"
                    className="h-12 w-auto dark:invert dark:brightness-200" 
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-0.5">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
                        alt="Indian Flag"
                        className="h-2.5 w-auto" 
                      />
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">Government of India</span>
                    </div>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/c/cf/Aadhaar_Logo.svg" 
                      alt="UIDAI Aadhaar Logo"
                      className="h-7 w-auto dark:invert dark:brightness-200" 
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Center/Right: Horizontal Navigation */}
            <nav className="flex-1 flex items-center justify-end">
              <div className="hidden lg:flex items-center h-full">
                <Link href="/">
                  <div className={cn(
                    "px-6 h-20 flex items-center text-sm font-semibold uppercase tracking-wide border-x border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer",
                    location === "/" ? "text-primary border-x-gray-100 dark:border-x-gray-800 bg-gray-50/50 dark:bg-gray-800/50" : "text-gray-600 dark:text-gray-400"
                  )}>
                    Overview
                  </div>
                </Link>
                <Link href="/reports">
                  <div className="px-6 h-20 flex items-center text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                    Insights
                  </div>
                </Link>
                <Link href="/help">
                  <div className="px-6 h-20 flex items-center text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                    Documentation
                  </div>
                </Link>
                
                <div className="h-20 flex items-center px-6 border-l border-gray-100 dark:border-gray-800">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors h-10 px-4">
                        <currentPerspective.icon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">User Perspective</span>
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-md">
                      {perspectives.map((p) => (
                        <DropdownMenuItem 
                          key={p.id} 
                          onClick={() => setRole(p.id as Role)}
                          className={cn(
                            "flex items-center gap-2 cursor-pointer transition-colors px-3 py-2", 
                            role === p.id 
                              ? "bg-blue-50 dark:bg-blue-900/20 text-primary font-bold" 
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                        >
                          <p.icon className="w-4 h-4" />
                          {p.id}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="h-20 flex items-center px-6 border-l border-gray-100 dark:border-gray-800">
                  <ThemeToggle />
                </div>
              </div>

              {/* Mobile Menu Trigger Placeholder */}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Globe className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50/50">
        <div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-[12px] leading-relaxed text-gray-400">
            {/* Left column */}
            <div className="text-center md:text-left">
              UIDAI Data Hackathon 2026 (Prototype)
            </div>
            
            {/* Center column */}
            <div className="text-center italic">
              Anonymised, aggregated data for analytical demonstration only.
            </div>
            
            {/* Right column */}
            <div className="flex justify-center md:justify-end gap-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="text-gray-200">|</span>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <span className="text-gray-200">|</span>
              <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
