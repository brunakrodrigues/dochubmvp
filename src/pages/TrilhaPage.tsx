import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Check, Lock, Play, ExternalLink, ArrowLeft } from "lucide-react";

const modules = [
  { title: "Entendendo seus rendimentos médicos", time: "15min", status: "done" },
  { title: "PJ ou PF: qual escolher?", time: "20min", status: "done" },
  { title: "Planejamento tributário na prática", time: "25min", status: "current" },
  { title: "Investimentos para médicos", time: "20min", status: "locked" },
  { title: "Aposentadoria e previdência", time: "15min", status: "locked" },
  { title: "Proteção patrimonial", time: "20min", status: "locked" },
  { title: "Criando seu plano financeiro", time: "30min", status: "locked" },
];

export default function TrilhaPage() {
  const { slug } = useParams();
  const [lmsOpen, setLmsOpen] = useState(false);
  const completed = modules.filter(m => m.status === "done").length;
  const progress = (completed / modules.length) * 100;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Trilha: Gestão Financeira para Médicos</h1>
          <p className="mt-2 text-muted-foreground">Domine os fundamentos da gestão financeira para transformar sua prática médica em um negócio sustentável e rentável.</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{completed} de {modules.length} módulos concluídos — {Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          {modules.map((m, i) => (
            <div key={i} className={`rounded-xl border p-5 transition-all ${
              m.status === "current" ? "border-accent bg-accent/5 shadow-accent" : m.status === "done" ? "bg-card" : "bg-muted/50 opacity-75"
            }`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  m.status === "done" ? "bg-success text-success-foreground" : m.status === "current" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {m.status === "done" ? <Check className="h-5 w-5" /> : m.status === "current" ? <Play className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{m.title}</h3>
                  <p className="text-xs text-muted-foreground">{m.time}</p>
                </div>
                <span className="text-xs font-medium">
                  {m.status === "done" ? "✅ Concluído" : m.status === "current" ? "▶️ Em andamento" : "🔒 Bloqueado"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="hero" size="lg" className="w-full" onClick={() => setLmsOpen(true)}>
          Continuar Trilha <ExternalLink className="ml-2 h-4 w-4" />
        </Button>

        <Dialog open={lmsOpen} onOpenChange={setLmsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-accent" />
                Redirecionamento
              </DialogTitle>
              <DialogDescription>Você será redirecionado para aprenda.dochub.com.br</DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Nossa plataforma de aprendizado é hospedada externamente. Seu login DocHub será reconhecido automaticamente.</p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setLmsOpen(false)}>Voltar</Button>
              <Button variant="hero" className="flex-1" onClick={() => setLmsOpen(false)}>Continuar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
