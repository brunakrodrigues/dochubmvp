import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  FileText,
  BookOpen,
  Briefcase,
  CreditCard,
  BarChart3,
  Bot,
  Settings,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const publicNavItems: NavItem[] = [
  { label: "Início", href: "/", icon: Home },
  { label: "Sobre", href: "/sobre", icon: FileText },
  { label: "Conteúdo", href: "/conteudo", icon: BookOpen },
  { label: "Serviços", href: "/servicos", icon: Briefcase },
];

const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Meu Score", href: "/score", icon: BarChart3 },
  { label: "Recomendações", href: "/recomendacoes", icon: FileText, badge: "3" },
  { label: "Conteúdo", href: "/conteudo", icon: BookOpen },
  { label: "Serviços", href: "/servicos", icon: Briefcase },
  { label: "Copiloto IA", href: "/copiloto", icon: Bot, badge: "Novo" },
  { label: "Financeiro", href: "/financeiro", icon: CreditCard },
];

interface HeaderProps {
  variant?: "public" | "dashboard";
  isAuthenticated?: boolean;
}

export function Header({ variant = "public", isAuthenticated = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = variant === "dashboard" ? dashboardNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <span className="font-display text-lg font-bold text-primary-foreground">D</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">DocHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge && (
                  <span className="ml-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Dr. Silva</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button variant="accent" asChild>
                <Link to="/cadastro">Começar Agora</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
        className="overflow-hidden border-t md:hidden"
      >
        <nav className="container flex flex-col gap-1 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-display text-xl font-bold text-foreground">DocHub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Plataforma digital de apoio à carreira médica com inteligência artificial integrada.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Plataforma</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="hover:text-accent">Sobre o DocHub</Link></li>
              <li><Link to="/teste" className="hover:text-accent">Teste Profissional</Link></li>
              <li><Link to="/servicos" className="hover:text-accent">Serviços</Link></li>
              <li><Link to="/planos" className="hover:text-accent">Planos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/conteudo" className="hover:text-accent">Conteúdo</Link></li>
              <li><Link to="/copiloto" className="hover:text-accent">Copiloto IA</Link></li>
              <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link to="/suporte" className="hover:text-accent">Suporte</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacidade" className="hover:text-accent">Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-accent">Termos de Uso</Link></li>
              <li><Link to="/cookies" className="hover:text-accent">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocHub. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Qual é o Valor da Saúde?
          </p>
        </div>
      </div>
    </footer>
  );
}
