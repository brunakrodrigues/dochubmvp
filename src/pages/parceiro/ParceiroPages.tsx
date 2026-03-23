import { useState } from "react";
import { Link } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Star, Clock, DollarSign, FileText, Check, Upload, MessageCircle, Calendar } from "lucide-react";

const partnerNav = [
  { label: "Dashboard", href: "/parceiro/dashboard" },
  { label: "Minhas OS", href: "/parceiro/dashboard" },
  { label: "Agenda", href: "/parceiro/agenda" },
  { label: "Repasses", href: "/parceiro/repasses" },
  { label: "Perfil", href: "/parceiro/dashboard" },
];

const osData = [
  { id: "OS-2026-0047", servico: "Assessoria Tributária", medico: "Dr. João Silva", status: "Em Execução", sla: "2 dias", statusColor: "bg-info/10 text-info" },
  { id: "OS-2026-0052", servico: "Assessoria Tributária", medico: "Dra. Maria Santos", status: "Nova", sla: "5 dias", statusColor: "bg-accent/10 text-accent" },
  { id: "OS-2026-0045", servico: "Planejamento Financeiro", medico: "Dr. Pedro Lima", status: "Aguardando Revisão", sla: "1 dia", statusColor: "bg-warning/10 text-warning" },
  { id: "OS-2026-0040", servico: "Assessoria Tributária", medico: "Dra. Ana Beatriz", status: "Concluída", sla: "-", statusColor: "bg-success/10 text-success" },
  { id: "OS-2026-0038", servico: "Planejamento Financeiro", medico: "Dr. Roberto Costa", status: "Concluída", sla: "-", statusColor: "bg-success/10 text-success" },
];

export function ParceiroLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
            <span className="font-display text-2xl font-bold text-primary-foreground">D</span>
          </div>
          <h1 className="font-display text-2xl font-bold">Portal do Parceiro</h1>
          <p className="text-sm text-muted-foreground">DocHub</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
          <div><label className="text-sm font-medium">Email</label><input className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" placeholder="parceiro@email.com" /></div>
          <div><label className="text-sm font-medium">Senha</label><input type="password" className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" /></div>
          <Button variant="hero" size="lg" className="w-full" asChild><Link to="/parceiro/dashboard">Entrar</Link></Button>
        </div>
      </div>
    </div>
  );
}

export function ParceiroDashboardPage() {
  const [waOpen, setWaOpen] = useState(false);
  return (
    <PortalLayout portalName="Portal do Parceiro" navItems={partnerNav}>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold">Olá, Escritório MedFin!</h1>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "OS Ativas", value: "5", icon: FileText },
            { label: "SLA Médio", value: "4.2 dias", icon: Clock },
            { label: "Avaliação", value: "★ 4.7", icon: Star },
            { label: "Receita do Mês", value: "R$3.200", icon: DollarSign },
          ].map(k => (
            <div key={k.label} className="rounded-xl border bg-card p-5 shadow-card">
              <k.icon className="h-5 w-5 text-accent mb-2" />
              <p className="text-2xl font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted"><th className="p-3 text-left">Nº OS</th><th className="text-left">Serviço</th><th className="text-left">Médico</th><th className="text-left">Status</th><th className="text-left">SLA</th><th className="text-left">Ações</th></tr></thead>
            <tbody>
              {osData.map(o => (
                <tr key={o.id} className="border-b">
                  <td className="p-3 font-medium">{o.id}</td>
                  <td>{o.servico}</td>
                  <td>{o.medico}</td>
                  <td><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${o.statusColor}`}>{o.status}</span></td>
                  <td>{o.sla}</td>
                  <td><Link to={`/parceiro/os/${o.id}`} className="text-accent hover:underline text-xs">Ver</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} />
    </PortalLayout>
  );
}

export function ParceiroOsDetalhePage() {
  const [waOpen, setWaOpen] = useState(false);
  return (
    <PortalLayout portalName="Portal do Parceiro" navItems={partnerNav}>
      <div className="max-w-3xl space-y-6">
        <h1 className="font-display text-2xl font-bold">OS-2026-0047 — Assessoria Tributária</h1>
        <div className="rounded-xl border bg-card p-6 shadow-card grid gap-4 md:grid-cols-2">
          <div className="text-sm space-y-1"><p><span className="text-muted-foreground">Médico:</span> Dr. João Silva</p><p><span className="text-muted-foreground">Serviço:</span> Assessoria Tributária</p></div>
          <div className="text-sm space-y-1"><p><span className="text-muted-foreground">Status:</span> <span className="rounded-full bg-info/10 px-2 py-0.5 text-xs text-info">Em Execução</span></p><p><span className="text-muted-foreground">SLA até:</span> 27/03/2026</p></div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent"><Upload className="mr-2 h-4 w-4" /> Upload de Evidências</Button>
          <Button variant="outline"><Check className="mr-2 h-4 w-4" /> Marcar como Concluído</Button>
          <Button variant="outline" onClick={() => setWaOpen(true)}><MessageCircle className="mr-2 h-4 w-4" /> Falar com Médico</Button>
        </div>
        <div className="rounded-xl border border-dashed bg-muted/50 p-12 text-center">
          <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Arraste arquivos aqui ou clique para fazer upload</p>
        </div>
      </div>
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} message="Olá Dr. João! Sobre a OS-2026-0047..." context="Falar com Médico" />
    </PortalLayout>
  );
}

export function ParceiroAgendaPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const deadlines: Record<number, string> = { 5: "green", 12: "green", 18: "yellow", 22: "green", 25: "red", 27: "green" };
  return (
    <PortalLayout portalName="Portal do Parceiro" navItems={partnerNav}>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold">Agenda — Março 2026</h1>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => <div key={d} className="font-semibold text-muted-foreground py-2">{d}</div>)}
            {Array(6).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map(d => {
              const color = deadlines[d];
              return (
                <div key={d} className={`rounded-lg p-2 text-sm ${color === "green" ? "bg-success/10 text-success font-semibold" : color === "yellow" ? "bg-warning/10 text-warning font-semibold" : color === "red" ? "bg-destructive/10 text-destructive font-semibold" : "hover:bg-muted"}`}>
                  {d}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-4 text-xs">
            <span className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-success" /> No prazo</span>
            <span className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-warning" /> Próximo do SLA</span>
            <span className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-destructive" /> Atrasado</span>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

export function ParceiroRepassesPage() {
  const [waOpen, setWaOpen] = useState(false);
  return (
    <PortalLayout portalName="Portal do Parceiro" navItems={partnerNav}>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold">Repasses Financeiros</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-xs text-muted-foreground">Recebido</p><p className="text-2xl font-bold text-success">R$3.200</p></div>
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-xs text-muted-foreground">Pendente</p><p className="text-2xl font-bold text-warning">R$800</p></div>
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-xs text-muted-foreground">Total Acumulado</p><p className="text-2xl font-bold">R$18.400</p></div>
        </div>
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted"><th className="p-3 text-left">Data</th><th className="text-left">OS</th><th className="text-left">Serviço</th><th className="text-right">Bruto</th><th className="text-right">Comissão 30%</th><th className="text-right">Líquido</th><th className="text-right">Status</th></tr></thead>
            <tbody>
              {[
                ["20/03","OS-0040","Assessoria","R$350","R$105","R$245","Pago"],
                ["15/03","OS-0038","Planejamento","R$450","R$135","R$315","Pago"],
                ["10/03","OS-0045","Planejamento","R$450","R$135","R$315","Pendente"],
              ].map(([d,os,s,b,c,l,st],i) => (
                <tr key={i} className="border-b"><td className="p-3">{d}</td><td>{os}</td><td>{s}</td><td className="text-right">{b}</td><td className="text-right text-muted-foreground">{c}</td><td className="text-right font-medium">{l}</td><td className="text-right"><span className={`text-xs ${st==="Pago"?"text-success":"text-warning"}`}>{st}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="ghost" onClick={() => setWaOpen(true)}>Dúvidas sobre repasses?</Button>
      </div>
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} message="Olá! Tenho dúvidas sobre meus repasses financeiros." context="Suporte de Repasses" />
    </PortalLayout>
  );
}
