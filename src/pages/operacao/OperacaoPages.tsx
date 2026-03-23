import { useState } from "react";
import { Link } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, FileText, Users, Settings, BarChart3, Plus } from "lucide-react";

const opNav = [
  { label: "Painel", href: "/operacao/painel" },
  { label: "Parceiros", href: "/operacao/parceiros" },
  { label: "Exceções", href: "/operacao/excecoes" },
  { label: "Conteúdo", href: "/operacao/conteudo" },
  { label: "Planos", href: "/operacao/planos" },
];

export function OperacaoLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
            <span className="font-display text-2xl font-bold text-primary-foreground">D</span>
          </div>
          <h1 className="font-display text-2xl font-bold">Painel Operacional</h1>
          <p className="text-sm text-muted-foreground">DocHub</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
          <div><label className="text-sm font-medium">Email</label><input className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" /></div>
          <div><label className="text-sm font-medium">Senha</label><input type="password" className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" /></div>
          <Button variant="hero" size="lg" className="w-full" asChild><Link to="/operacao/painel">Entrar</Link></Button>
        </div>
      </div>
    </div>
  );
}

export function OperacaoPainelPage() {
  return (
    <PortalLayout portalName="Operação DocHub" navItems={opNav}>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold">Painel Operacional</h1>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { label: "OS Abertas", value: "12", color: "" },
            { label: "Em Andamento", value: "8", color: "" },
            { label: "Atrasadas", value: "2", color: "text-destructive" },
            { label: "Concluídas Hoje", value: "5", color: "text-success" },
            { label: "SLA Cumprido", value: "92%", color: "text-accent" },
          ].map(k => (
            <div key={k.label} className="rounded-xl border bg-card p-4 shadow-card">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border bg-card shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted"><th className="p-3 text-left">Nº OS</th><th className="text-left">Serviço</th><th className="text-left">Médico</th><th className="text-left">Parceiro</th><th className="text-left">Status</th><th className="text-left">SLA</th><th className="text-left">Ações</th></tr></thead>
            <tbody>
              {[
                ["OS-0053","Assessoria Tributária","Dr. Paulo","MedFin","Triagem","5d","Atribuir"],
                ["OS-0047","Assessoria Tributária","Dr. João","MedFin","Em Execução","2d","Acompanhar"],
                ["OS-0041","Marketing Digital","Dra. Carla","MedMKT","Aguardando","1d","Escalonar"],
              ].map(([id,s,m,p,st,sla,act],i) => (
                <tr key={i} className="border-b"><td className="p-3 font-medium">{id}</td><td>{s}</td><td>{m}</td><td>{p}</td><td><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{st}</span></td><td>{sla}</td><td><button className="text-accent text-xs hover:underline">{act}</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}

export function OperacaoParceirosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <PortalLayout portalName="Operação DocHub" navItems={opNav}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Parceiros</h1>
          <Button onClick={() => setModalOpen(true)}><Plus className="mr-2 h-4 w-4" /> Cadastrar Parceiro</Button>
        </div>
        <div className="rounded-xl border bg-card shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted"><th className="p-3 text-left">Nome</th><th className="text-left">Categoria</th><th className="text-left">OS Ativas</th><th className="text-left">SLA</th><th className="text-left">Avaliação</th><th className="text-left">Status</th></tr></thead>
            <tbody>
              {[
                ["MedFin","Contábil","5","4.2d","★ 4.7","Ativo"],
                ["JurisMed","Jurídico","2","3.8d","★ 4.5","Ativo"],
                ["MedMKT","Comunicação","3","5.1d","★ 4.3","Ativo"],
              ].map(([n,c,os,sla,av,st],i) => (
                <tr key={i} className="border-b"><td className="p-3 font-medium">{n}</td><td>{c}</td><td>{os}</td><td>{sla}</td><td>{av}</td><td><span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">{st}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent><DialogHeader><DialogTitle>Cadastrar Parceiro</DialogTitle></DialogHeader>
          <div className="space-y-3"><Input placeholder="Nome do parceiro" /><Input placeholder="Categoria" /><Input placeholder="Email" /><Button className="w-full" onClick={() => setModalOpen(false)}>Cadastrar</Button></div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}

export function OperacaoExcecoesPage() {
  return (
    <PortalLayout portalName="Operação DocHub" navItems={opNav}>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-warning" /> Exceções</h1>
        <div className="space-y-4">
          {[
            { type: "SLA Excedido", os: "OS-0041", desc: "Marketing Digital — SLA excedido em 1 dia", severity: "bg-destructive/10 text-destructive" },
            { type: "Reclamação", os: "OS-0035", desc: "Médico reportou atraso na entrega de documentos", severity: "bg-warning/10 text-warning" },
            { type: "Chargeback", os: "OS-0032", desc: "Contestação de cobrança pelo cartão", severity: "bg-destructive/10 text-destructive" },
          ].map((e, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${e.severity}`}>{e.type}</span>
                <span className="text-sm font-medium">{e.os}</span>
              </div>
              <p className="text-sm text-muted-foreground">{e.desc}</p>
              <div className="mt-3 flex gap-2">
                <select className="rounded-lg border bg-background px-3 py-1.5 text-sm"><option>Selecionar resolução...</option><option>Reembolso</option><option>Extensão SLA</option><option>Encerramento</option></select>
                <Input placeholder="Notas..." className="flex-1" />
                <Button size="sm">Resolver</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}

export function OperacaoConteudoPage() {
  return (
    <PortalLayout portalName="Operação DocHub" navItems={opNav}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Gestão de Conteúdo</h1>
          <Button><Plus className="mr-2 h-4 w-4" /> Novo Conteúdo</Button>
        </div>
        <div className="rounded-xl border bg-card shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted"><th className="p-3 text-left">Título</th><th className="text-left">Tipo</th><th className="text-left">Categoria</th><th className="text-left">Status</th><th className="text-left">Data</th><th className="text-left">Ações</th></tr></thead>
            <tbody>
              {[
                ["Como planejar sua carreira","Artigo","Carreira","Publicado","15/03"],
                ["Tributação PJ vs PF","Vídeo","Finanças","Publicado","10/03"],
                ["IA na medicina","Artigo","Tecnologia","Rascunho","22/03"],
              ].map(([t,tp,c,st,d],i) => (
                <tr key={i} className="border-b"><td className="p-3 font-medium">{t}</td><td>{tp}</td><td>{c}</td><td><span className={`rounded-full px-2 py-0.5 text-xs ${st==="Publicado"?"bg-success/10 text-success":"bg-muted text-muted-foreground"}`}>{st}</span></td><td>{d}</td><td><button className="text-accent text-xs hover:underline">Editar</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}

export function OperacaoPlanosPage() {
  return (
    <PortalLayout portalName="Operação DocHub" navItems={opNav}>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold">Gestão de Planos</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-xs text-muted-foreground">Assinaturas Ativas</p><p className="text-2xl font-bold">150</p></div>
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-xs text-muted-foreground">MRR</p><p className="text-2xl font-bold text-accent">R$18.500</p></div>
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-xs text-muted-foreground">Churn</p><p className="text-2xl font-bold text-warning">3.2%</p></div>
        </div>
        <div className="rounded-xl border bg-card shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted"><th className="p-3 text-left">Nome</th><th className="text-left">Plano</th><th className="text-left">Status</th><th className="text-left">Início</th><th className="text-left">Próx. Cobrança</th></tr></thead>
            <tbody>
              {[
                ["Dr. João Silva","Premium","Ativo","01/01/2026","22/04/2026"],
                ["Dra. Maria Santos","Básico","Ativo","15/02/2026","15/04/2026"],
                ["Dr. Pedro Lima","Premium","Cancelado","10/12/2025","—"],
              ].map(([n,p,st,i,nc],idx) => (
                <tr key={idx} className="border-b"><td className="p-3 font-medium">{n}</td><td>{p}</td><td><span className={`rounded-full px-2 py-0.5 text-xs ${st==="Ativo"?"bg-success/10 text-success":"bg-destructive/10 text-destructive"}`}>{st}</span></td><td>{i}</td><td>{nc}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
