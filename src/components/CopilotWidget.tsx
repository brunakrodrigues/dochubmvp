import { useState } from "react";
import { Brain, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CopilotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-accent text-accent-foreground hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <Brain className="h-6 w-6" />}
      </button>

      {/* Mini chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] rounded-2xl border bg-card shadow-xl overflow-hidden" style={{ height: 500 }}>
          <div className="flex items-center gap-3 bg-gradient-hero p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <Brain className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-foreground">Copiloto DocHub</p>
              <p className="text-xs text-primary-foreground/60">IA assistiva</p>
            </div>
            <Link to="/copiloto" className="ml-auto text-xs text-accent underline" onClick={() => setOpen(false)}>Expandir</Link>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: 370 }}>
            <div className="rounded-lg bg-muted p-3 text-sm">
              Olá, Dr. João! Como posso ajudar com sua carreira hoje?
            </div>
            <div className="flex flex-wrap gap-2">
              {["Analisar meu score", "Serviços recomendados"].map(q => (
                <button key={q} className="rounded-full border px-3 py-1 text-xs hover:bg-muted transition-colors">{q}</button>
              ))}
            </div>
          </div>
          <div className="border-t p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Pergunte algo..."
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="icon" variant="accent"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </>
  );
}
