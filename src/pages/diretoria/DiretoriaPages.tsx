import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PortalLayout from "@/components/PortalLayout";
import { Download, TrendingUp, Users, DollarSign, Activity, Bot } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dirNav = [{ label: "Dashboard", href: "/diretoria/dashboard" }];

const mrrData = [
  { month: "Out", value: 12000 }, { month: "Nov", value: 13500 }, { month: "Dez", value: 14800 },
  { month: "Jan", value: 15200 }, { month: "Fev", value: 17100 }, { month: "Mar", value: 18500 },
];
const cadastrosData = [
  { month: "Out", value: 120 }, { month: "Nov", value: 145 }, { month: "Dez", value: 168 },
  { month: "Jan", value: 190 }, { month: "Fev", value: 210 }, { month: "Mar", value: 209 },
];
const pieData = [
  { name: "Free", value: 890, color: "hsl(var(--muted-foreground))" },
  { name: "Básico", value: 98, color: "hsl(var(--info))" },
  { name: "Premium", value: 54, color: "hsl(var(--accent))" },
];

export function DiretoriaLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
            <span className="font-display text-2xl font-bold text-primary-foreground">D</span>
          </div>
          <h1 className="font-display text-2xl font-bold">Visão Executiva</h1>
          <p className="text-sm text-muted-foreground">DocHub</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
          <div><label className="text-sm font-medium">Email</label><input className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" /></div>
          <div><label className="text-sm font-medium">Senha</label><input type="password" className="mt-1.5 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" /></div>
          <Button variant="hero" size="lg" className="w-full" asChild><Link to="/diretoria/dashboard">Entrar</Link></Button>
        </div>
      </div>
    </div>
  );
}

export function DiretoriaDashboardPage() {
  const [period, setPeriod] = useState("Último mês");
  return (
    <PortalLayout portalName="Visão Executiva — DocHub" navItems={dirNav}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Dashboard Executivo</h1>
          <div className="flex gap-2">
            {["Último mês", "3 meses", "6 meses"].map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${period === p ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{p}</button>
            ))}
            <Button variant="outline" size="sm"><Download className="mr-1 h-3 w-3" /> CSV</Button>
          </div>
        </div>

        {/* Adoção */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2"><Users className="h-4 w-4" /> ADOÇÃO</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[["Cadastros","1.042"],["Testes Realizados","876"],["Conversão","18.3%"],["Assinantes","152"]].map(([l,v]) => (
              <div key={l} className="rounded-xl border bg-card p-4 shadow-card"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-bold">{v}</p></div>
            ))}
          </div>
        </div>

        {/* Financeiro */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4" /> FINANCEIRO</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[["MRR","R$18.500"],["LTV","R$1.240"],["Churn","3.2%"],["GMV Serviços","R$42.800"]].map(([l,v]) => (
              <div key={l} className="rounded-xl border bg-card p-4 shadow-card"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-bold">{v}</p></div>
            ))}
          </div>
        </div>

        {/* Operacional */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2"><Activity className="h-4 w-4" /> OPERACIONAL</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[["SLA Cumprido","92%"],["Tempo Médio","4.2d"],["NPS","8.4"],["OS Ativas","25"]].map(([l,v]) => (
              <div key={l} className="rounded-xl border bg-card p-4 shadow-card"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-bold">{v}</p></div>
            ))}
          </div>
        </div>

        {/* IA */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2"><Bot className="h-4 w-4" /> INTELIGÊNCIA ARTIFICIAL</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[["Uso Copiloto","40%"],["Precisão RAG","96%"],["Satisfação","4.3/5"],["Interações/mês","1.234"]].map(([l,v]) => (
              <div key={l} className="rounded-xl border bg-card p-4 shadow-card"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-bold">{v}</p></div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold mb-4">Evolução MRR</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mrrData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))" }} /></LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold mb-4">Cadastros/Mês</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cadastrosData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="hsl(var(--accent))" radius={[4,4,0,0]} /></BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold mb-4">Distribuição por Plano</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
