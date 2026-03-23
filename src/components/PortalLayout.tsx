import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PortalLayoutProps {
  children: ReactNode;
  portalName: string;
  navItems: { label: string; href: string }[];
  accentColor?: string;
}

export default function PortalLayout({ children, portalName, navItems }: PortalLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="font-display text-lg font-bold text-primary-foreground">D</span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">{portalName}</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(item => (
              <Link key={item.href} to={item.href} className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.href ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Sair</Link>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
}
