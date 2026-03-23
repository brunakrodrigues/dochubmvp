import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Filter } from "lucide-react";

const statusTabs = ["Todos", "Em Andamento", "Concluídos", "Cancelados"];

const orders = [
  { id: "OS-2026-0047", name: "Assessoria Tributária", status: "Em Execução", statusColor: "bg-info/10 text-info", partner: "MedFin", sla: "5 dias", progress: 60 },
  { id: "OS-2026-0038", name: "Mentoria de Carreira", status: "Concluído", statusColor: "bg-success/10 text-success", partner: "Dr. Carlos Mendes", sla: "Concluído em 20/03/2026", progress: 100 },
  { id: "OS-2026-0041", name: "Marketing Digital", status: "Aguardando Evidência", statusColor: "bg-warning/10 text-warning", partner: "MedMKT", sla: "2 dias restantes", progress: 75 },
  { id: "OS-2026-0029", name: "Consultoria Jurídica", status: "Cancelado", statusColor: "bg-destructive/10 text-destructive", partner: "JurisMed", sla: "Cancelado em 10/03/2026", progress: 0 },
];

export default function MeusServicosPage() {
  const [activeTab, setActiveTab] = useState("Todos");
  const filtered = activeTab === "Todos" ? orders : orders.filter(o => {
    if (activeTab === "Em Andamento") return ["Em Execução", "Aguardando Evidência"].includes(o.status);
    if (activeTab === "Concluídos") return o.status === "Concluído";
    return o.status === "Cancelado";
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Meus Serviços</h1>
        <div className="flex gap-2">
          {statusTabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === t ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map(o => (
            <Link key={o.id} to={`/meus-servicos/${o.id}`} className="block rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-muted-foreground">#{o.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${o.statusColor}`}>{o.status}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{o.name}</h3>
                  <p className="text-sm text-muted-foreground">Parceiro: {o.partner} · {o.sla}</p>
                </div>
                {o.progress > 0 && o.progress < 100 && (
                  <div className="w-32">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${o.progress}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{o.progress}%</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
