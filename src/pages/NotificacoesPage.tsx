import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { text: "Seu Score está pronto! Confira seu resultado.", time: "2h atrás", unread: true, href: "/resultado", icon: "🔵" },
  { text: "Nova recomendação: Assessoria Tributária", time: "1 dia atrás", unread: false, href: "/recomendacoes", icon: "📋" },
  { text: "Sua OS #OS-2026-0047 mudou para 'Em Execução'", time: "3 dias atrás", unread: false, href: "/meus-servicos/OS-2026-0047", icon: "🔄" },
  { text: "Novo conteúdo: Telemedicina na prática", time: "1 semana atrás", unread: false, href: "/conteudo/telemedicina", icon: "📖" },
  { text: "Bem-vindo ao DocHub! Complete seu Teste Profissional.", time: "2 semanas atrás", unread: false, href: "/teste", icon: "🎉" },
];

export default function NotificacoesPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Notificações</h1>
          <Button variant="ghost" size="sm"><CheckCheck className="mr-2 h-4 w-4" /> Marcar todas como lidas</Button>
        </div>
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <Link key={i} to={n.href} className={`flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-card ${n.unread ? "bg-accent/5 border-accent/20" : "bg-card"}`}>
              <span className="text-xl">{n.icon}</span>
              <div className="flex-1">
                <p className={`text-sm ${n.unread ? "font-semibold text-foreground" : "text-foreground"}`}>{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {n.unread && <div className="mt-1 h-2 w-2 rounded-full bg-accent" />}
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
