import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Home, BarChart3, FileText, BookOpen, Briefcase, ShoppingBag,
  CreditCard, Bot, User, Bell, Search, Menu, X, ChevronDown, LogOut, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CopilotWidget from "./CopilotWidget";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Meu Score", href: "/resultado", icon: BarChart3 },
  { label: "Recomendações", href: "/recomendacoes", icon: FileText, badge: "3" },
  { label: "Conteúdo", href: "/conteudo", icon: BookOpen },
  { label: "Serviços", href: "/servicos", icon: Briefcase },
  { label: "Meus Serviços", href: "/meus-servicos", icon: ShoppingBag },
  { label: "Financeiro", href: "/assinatura", icon: CreditCard },
  { label: "Copiloto IA", href: "/copiloto", icon: Bot, badge: "Novo" },
  { label: "Perfil", href: "/perfil", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-shrink-0 border-r bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <span className="font-display text-sm font-bold text-sidebar-primary-foreground">D</span>
          </div>
          <span className="font-display text-lg font-bold">DocHub</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map(item => {
              const active = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link to={item.href} className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-semibold text-sidebar-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <Link to="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent">
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-sidebar text-sidebar-foreground">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
              <span className="font-display text-lg font-bold">DocHub</span>
              <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map(item => (
                  <li key={item.href}>
                    <Link to={item.href} onClick={() => setSidebarOpen(false)} className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      location.pathname === item.href ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
                    )}>
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input className="h-9 w-64 rounded-lg border bg-muted/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Buscar..." />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/notificacoes" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
            </Link>
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-muted">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden text-sm font-medium sm:block">Dr. João Silva</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-card p-1 shadow-lg">
                  <Link to="/perfil" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setUserMenuOpen(false)}>
                    <Settings className="h-4 w-4" /> Configurações
                  </Link>
                  <Link to="/login" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted" onClick={() => setUserMenuOpen(false)}>
                    <LogOut className="h-4 w-4" /> Sair
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
      <CopilotWidget />
    </div>
  );
}
