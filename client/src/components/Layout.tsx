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
            <div className="flex items-center gap-4 py-2">
              <Link href="/">
                <div className="flex flex-col gap-1.5 cursor-pointer group">
                  {/* Top Line: Flag and text */}
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
                      alt="Indian Flag"
                      className="h-3 w-auto" 
                    />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 font-bold whitespace-nowrap">Government of India</span>
                  </div>
                  
                  {/* Bottom Line: National Emblem and UIDAI Logo */}
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                      alt="National Emblem"
                      className="h-9 w-auto dark:invert dark:brightness-200" 
                    />
                    <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800" />
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/c/cf/Aadhaar_Logo.svg" 
                      alt="UIDAI Aadhaar Logo"
                      className="h-8 w-auto dark:invert dark:brightness-200" 
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 mr-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                <Link href="/" className={cn("hover:text-primary transition-colors", location === "/" && "text-primary font-bold")}>Overview</Link>
                <Link href="/reports" className="hover:text-primary transition-colors">Insights</Link>
                <Link href="/help" className="hover:text-primary transition-colors">Documentation</Link>
              </div>
              
              <ThemeToggle />
              
              <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    <currentPerspective.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">User Perspective</span>
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
              
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary hover:bg-blue-50 dark:hover:bg-gray-800">
                <Bell className="w-5 h-5" />
              </Button>
              
              <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2" />
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  JS
                </div>
              </div>
            </div>
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
