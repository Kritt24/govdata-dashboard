import { Link, useLocation } from "wouter";
import { Globe, ShieldCheck, Fingerprint, LogOut, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Official Header Strip */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        {/* Top bar with government colors */}
        <div className="h-1 w-full bg-gradient-to-r from-[hsl(25,95%,53%)] via-white to-[hsl(142,76%,36%)] opacity-80" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Left: Branding */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 bg-[hsl(25,95%,53%)] rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                      alt="Emblem"
                      className="w-8 h-8 filter invert brightness-0" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Government of India</span>
                    <h1 className="text-xl font-serif font-black text-secondary leading-none mt-0.5">
                      UIDAI <span className="text-primary font-normal">Analytics</span>
                    </h1>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 mr-6 text-sm font-medium text-gray-600">
                <Link href="/" className={cn("hover:text-primary transition-colors", location === "/" && "text-primary font-bold")}>Dashboard</Link>
                <Link href="/reports" className="hover:text-primary transition-colors">Reports</Link>
                <Link href="/help" className="hover:text-primary transition-colors">Help & Support</Link>
              </div>
              
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary hover:bg-blue-50">
                <Bell className="w-5 h-5" />
              </Button>
              
              <div className="h-8 w-[1px] bg-gray-200 mx-2" />
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  JS
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Unique Identification Authority of India. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Use</a>
            <a href="#" className="hover:text-primary">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
