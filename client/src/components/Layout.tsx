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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        {/* Top bar with government colors */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Left: Branding */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                      alt="Emblem"
                      className="w-6 h-6" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Government of India</span>
                    <h1 className="text-lg font-serif font-bold text-secondary leading-none mt-1">
                      UIDAI <span className="text-primary">Analytics</span>
                    </h1>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 mr-6 text-sm font-medium text-gray-600">
                <Link href="/" className={cn("hover:text-primary transition-colors", location === "/" && "text-primary font-bold")}>Overview</Link>
                <Link href="/reports" className="hover:text-primary transition-colors">Insights</Link>
                <Link href="/help" className="hover:text-primary transition-colors">Documentation</Link>
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
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400 font-medium tracking-wide uppercase">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p>This is a prototype developed for UIDAI Data Hackathon 2026.</p>
              <p>Data Source: data.gov.in (Anonymised & Aggregated)</p>
              <p>For demonstration and analytical purposes only.</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50 text-center text-[10px] text-gray-300">
            © 2026 Unique Identification Authority of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
