import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Check, MessageCircle, Download, FileText, Star } from "lucide-react";

const steps = ["Aberta", "Em Execução", "Aguardando Evidência", "Em Revisão", "Concluída"];
const currentStep = 1;

const timeline = [
  { date: "22/03/2026 10:30", text: "Ordem aberta via plataforma" },
  { date: "22/03/2026 11:00", text: "Parceiro MedFin notificado" },
  { date: "23/03/2026 09:15", text: "Parceiro aceitou a OS" },
  { date: "25/03/2026 14:00", text: "Documento de planejamento tributário enviado" },
];

const docs = [
  { name: "Planejamento_Tributario_2026.pdf", size: "2.4 MB" },
  { name: "Analise_Regime_PJ.xlsx", size: "340 KB" },
];

export default function MeuServicoDetalhePage() {
  const { id } = useParams();
  const [waOpen, setWaOpen] = useState(false);
  const [waContext, setWaContext] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <p className="text-sm text-muted-foreground">#{id}</p>
          <h1 className="font-display text-2xl font-bold text-foreground">Assessoria Tributária para Médicos</h1>
        </div>

        {/* Stepper */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i <= currentStep ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground text-center max-w-[80px]">{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < currentStep ? "bg-accent" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="rounded-2xl border bg-card p-6 shadow-card grid gap-4 md:grid-cols-2">
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Serviço:</span> <span className="font-medium">Assessoria Tributária</span></p>
            <p><span className="text-muted-foreground">Parceiro:</span> <span className="font-medium">Escritório Contábil MedFin</span></p>
            <p><span className="text-muted-foreground">Valor pago:</span> <span className="font-medium">R$350,00</span></p>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Aberta em:</span> <span className="font-medium">22/03/2026</span></p>
            <p><span className="text-muted-foreground">SLA até:</span> <span className="font-medium">27/03/2026</span></p>
            <p><span className="text-muted-foreground">Status:</span> <span className="rounded-full bg-info/10 px-2 py-0.5 text-xs font-medium text-info">Em Execução</span></p>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Histórico</h2>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                  <p className="text-sm font-medium text-foreground">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Documentos</h2>
          <div className="space-y-3">
            {docs.map(d => (
              <div key={d.name} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm"><Download className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => { setWaContext("Parceiro"); setWaOpen(true); }}>
            <MessageCircle className="mr-2 h-4 w-4" /> Falar com Parceiro
          </Button>
          <Button variant="outline" onClick={() => { setWaContext("Atendimento DocHub"); setWaOpen(true); }}>
            <MessageCircle className="mr-2 h-4 w-4" /> Falar com Atendimento DocHub
          </Button>
        </div>
      </div>
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} message={`Olá! Sobre a OS #${id}, gostaria de mais informações.`} context={`Falar com ${waContext}`} />
    </DashboardLayout>
  );
}
