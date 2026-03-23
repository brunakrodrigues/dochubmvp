import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowRight, ThumbsUp, ThumbsDown, Filter, Lock } from "lucide-react";

const tabs = ["Todos", "Serviços", "Conteúdo", "Trilhas"];
const sorts = ["Prioridade", "Preço", "Novidade"];

const recs = [
  { type: "Serviço", badge: "Prioritário", badgeColor: "bg-destructive/10 text-destructive", typeColor: "bg-pink-100 text-pink-700", title: "Assessoria Tributária para Médicos", price: "R$350/mês", reason: "Seu score em Gestão Financeira está em 35/100", href: "/servicos/assessoria-tributaria" },
  { type: "Conteúdo", badge: "Gratuito", badgeColor: "bg-accent/10 text-accent", typeColor: "bg-blue-100 text-blue-700", title: "Tributação para médicos: PJ vs PF", price: "Gratuito", reason: "Complementa sua dimensão financeira", href: "/conteudo/tributacao-pj-pf" },
  { type: "Serviço", badge: "Recomendado", badgeColor: "bg-info/10 text-info", typeColor: "bg-pink-100 text-pink-700", title: "Estratégia de Marketing Digital Médico", price: "R$1.200 pacote", reason: "Seu score em Imagem e Reputação está em 65/100", href: "/servicos/marketing-digital" },
  { type: "Trilha", badge: "Premium", badgeColor: "bg-purple-100 text-purple-700", typeColor: "bg-purple-100 text-purple-700", title: "Trilha: Gestão Financeira para Médicos", price: "7 módulos", reason: "Trilha personalizada para sua dimensão mais fraca", href: "/conteudo/trilha/gestao-financeira", locked: true },
  { type: "Serviço", badge: "Prioritário", badgeColor: "bg-destructive/10 text-destructive", typeColor: "bg-pink-100 text-pink-700", title: "Consultoria de Gestão de Consultório", price: "R$800/mês", reason: "Seu score em Visão Empreendedora está em 42/100", href: "/servicos/gestao-consultorio" },
  { type: "Conteúdo", badge: "Gratuito", badgeColor: "bg-accent/10 text-accent", typeColor: "bg-blue-100 text-blue-700", title: "Como planejar sua carreira médica em 5 passos", price: "Artigo 5min", reason: "Melhore seu Planejamento de Carreira", href: "/conteudo/planejamento-carreira" },
  { type: "Serviço", badge: "Recomendado", badgeColor: "bg-info/10 text-info", typeColor: "bg-pink-100 text-pink-700", title: "Coaching de Liderança Médica", price: "R$300/sessão", reason: "Acelere sua dimensão de Metas Profissionais", href: "/servicos/coaching-lideranca" },
  { type: "Conteúdo", badge: "Premium", badgeColor: "bg-purple-100 text-purple-700", typeColor: "bg-blue-100 text-blue-700", title: "Liderança em equipes de saúde", price: "Artigo 6min", reason: "Aprofunde Metas Profissionais", href: "/conteudo/lideranca-equipes", locked: true },
];

export default function RecomendacoesPage() {
  const [activeTab, setActiveTab] = useState("Todos");

  const filtered = activeTab === "Todos" ? recs : recs.filter(r => r.type === (activeTab === "Trilhas" ? "Trilha" : activeTab.slice(0, -1)));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Recomendações para Você</h1>
          <p className="text-muted-foreground">Baseadas no seu Score de Maturidade Profissional</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === t ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{t}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            {sorts.map(s => <button key={s} className="hover:text-foreground">{s}</button>)}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(r => (
            <div key={r.title} className="rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.typeColor}`}>{r.type}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.badgeColor}`}>
                  {r.locked && <Lock className="inline h-3 w-3 mr-0.5" />}{r.badge}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{r.price}</p>
              <div className="mt-3 rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground"><span className="font-semibold">Por que recomendamos:</span> {r.reason}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button size="sm" asChild>
                  <Link to={r.href}>Ver <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
                <div className="flex gap-1">
                  <button className="rounded-full p-1.5 hover:bg-muted"><ThumbsUp className="h-4 w-4 text-muted-foreground" /></button>
                  <button className="rounded-full p-1.5 hover:bg-muted"><ThumbsDown className="h-4 w-4 text-muted-foreground" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
