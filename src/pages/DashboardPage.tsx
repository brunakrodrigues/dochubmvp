import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import {
  BarChart3, ArrowRight, FileText, RefreshCw, Bot, User, Activity, Briefcase,
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const radarData = [
  { dim: "Planejamento", value: 78 },
  { dim: "Financeiro", value: 35 },
  { dim: "Imagem", value: 65 },
  { dim: "Metas", value: 70 },
  { dim: "Qualidade", value: 85 },
  { dim: "Ética", value: 90 },
  { dim: "Tecnologia", value: 58 },
  { dim: "Assessorias", value: 45 },
  { dim: "Negócios", value: 42 },
];

const recommendations = [
  { badge: "Prioritário", title: "Assessoria Tributária para Médicos", reason: "Seu score em Gestão Financeira está em 35/100", href: "/servicos/assessoria-tributaria" },
  { badge: "Novo", title: "Consultoria de Gestão de Consultório", reason: "Seu score em Visão Empreendedora está em 42/100", href: "/servicos/gestao-consultorio" },
  { badge: "Prioritário", title: "Coaching de Liderança Médica", reason: "Seu score em Assessorias está em 45/100", href: "/servicos/coaching-lideranca" },
];

const activeServices = [
  { id: "OS-2026-0047", name: "Assessoria Tributária", status: "Em Execução", statusColor: "bg-info/10 text-info" },
  { id: "OS-2026-0041", name: "Marketing Digital", status: "Aguardando Evidência", statusColor: "bg-warning/10 text-warning" },
];

const contentHighlights = [
  { title: "Como planejar sua carreira médica em 5 passos", type: "Artigo", time: "5 min" },
  { title: "Tributação para médicos: PJ vs PF", type: "Vídeo", time: "15 min" },
  { title: "Telemedicina: regulamentação e boas práticas", type: "Artigo", time: "8 min" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground">Olá, Dr. João Silva!</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu painel de desenvolvimento profissional.</p>
        </motion.div>

        {/* Score + Radar */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-card text-center">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Seu Score</h2>
            <div className="relative mx-auto h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--accent))" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`} strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.72)}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold">72</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>
            <span className="mt-2 inline-block rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">Intermediário</span>
            <div className="mt-3">
              <Link to="/resultado" className="text-sm text-accent hover:underline">Ver detalhes →</Link>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Radar de Competências</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Suas Recomendações</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map(r => (
              <div key={r.title} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${r.badge === "Prioritário" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"}`}>{r.badge}</span>
                <h3 className="mt-2 font-semibold text-foreground text-sm">{r.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Por que recomendamos: {r.reason}</p>
                <Button variant="ghost" size="sm" className="mt-3" asChild>
                  <Link to={r.href}>Ver <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Services */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Meus Serviços Ativos</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activeServices.map(s => (
              <Link key={s.id} to={`/meus-servicos/${s.id}`} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">#{s.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.statusColor}`}>{s.status}</span>
                </div>
                <h3 className="mt-2 font-semibold text-foreground text-sm">{s.name}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Content highlights */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Conteúdo em Destaque</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {contentHighlights.map(c => (
              <Link key={c.title} to="/conteudo/planejamento-carreira" className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
                <span className="text-xs font-medium text-accent">{c.type} · {c.time}</span>
                <h3 className="mt-1 font-semibold text-foreground text-sm">{c.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild><Link to="/teste"><RefreshCw className="mr-2 h-4 w-4" /> Refazer Teste</Link></Button>
          <Button variant="outline" asChild><Link to="/resultado"><BarChart3 className="mr-2 h-4 w-4" /> Ver Relatório</Link></Button>
          <Button variant="outline" asChild><Link to="/copiloto"><Bot className="mr-2 h-4 w-4" /> Falar com Copiloto</Link></Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
