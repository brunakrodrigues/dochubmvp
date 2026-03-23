import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Brain, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const suggestions = ["Quais serviços fazem sentido pro meu score?", "Me explica meu resultado na dimensão financeira", "Como melhorar minha presença digital?"];

export default function CopilotoPage() {
  const [input, setInput] = useState("");

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl flex flex-col" style={{ height: "calc(100vh - 130px)" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent"><Brain className="h-5 w-5 text-accent-foreground" /></div>
          <div><h1 className="font-display text-xl font-bold">Copiloto DocHub</h1><p className="text-xs text-muted-foreground">IA assistiva para sua carreira</p></div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => <button key={s} className="rounded-full border px-3 py-1.5 text-xs hover:bg-muted transition-colors">{s}</button>)}
          </div>

          {/* User */}
          <div className="flex justify-end"><div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground p-4 max-w-md text-sm">Quais serviços fazem sentido pro meu score?</div></div>

          {/* Bot */}
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent"><Brain className="h-4 w-4 text-accent-foreground" /></div>
            <div className="rounded-2xl rounded-bl-sm bg-muted p-4 max-w-lg text-sm space-y-3">
              <p>Com base no seu Score de Maturidade (72/100), identifiquei 3 dimensões prioritárias:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Gestão Financeira (35/100)</strong> — Recomendo a Assessoria Tributária para Médicos (R$350/mês). Inclui planejamento PJ/PF e declaração de IR.</li>
                <li><strong>Visão Empreendedora (42/100)</strong> — A Consultoria de Gestão de Consultório (R$800/mês) vai ajudar a profissionalizar sua operação.</li>
                <li><strong>Assessorias e Suporte (45/100)</strong> — Considere o Coaching de Liderança (R$300/sessão) para acelerar seu desenvolvimento.</li>
              </ol>
              <p className="text-xs text-muted-foreground">📚 Fontes: Catálogo de Serviços DocHub, Seu Score de Maturidade (22/03/2026)</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button size="sm" variant="outline" asChild><Link to="/servicos/assessoria-tributaria">Ver Assessoria Tributária <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
                <Button size="sm" variant="outline" asChild><Link to="/servicos/gestao-consultorio">Ver Gestão de Consultório <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Pergunte algo sobre sua carreira..." className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <Button size="icon" variant="accent" className="h-12 w-12 rounded-xl"><Send className="h-5 w-5" /></Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">O Copiloto pode cometer erros. Verifique informações importantes.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
