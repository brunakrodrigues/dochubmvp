import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Play, FileText, Lock, Layers } from "lucide-react";

const typeTabs = ["Todos", "Artigos", "Vídeos", "PDFs", "Trilhas"];
const categoryChips = ["Carreira", "Finanças", "Gestão", "Ética", "Tecnologia", "Empreendedorismo"];
const accessFilters = ["Todos", "Gratuito", "Assinantes"];

const typeIcons: Record<string, React.ElementType> = { Artigo: BookOpen, Vídeo: Play, PDF: FileText, Trilha: Layers };
const typeColors: Record<string, string> = { Artigo: "bg-success/10 text-success", Vídeo: "bg-destructive/10 text-destructive", PDF: "bg-info/10 text-info", Trilha: "bg-purple-100 text-purple-700" };

const content = [
  { slug: "planejamento-carreira", title: "Como planejar sua carreira médica em 5 passos", type: "Artigo", access: "Gratuito", time: "5 min", category: "Carreira" },
  { slug: "tributacao-pj-pf", title: "Tributação para médicos: PJ vs PF", type: "Vídeo", access: "Premium", time: "15 min", category: "Finanças" },
  { slug: "marketing-digital-guia", title: "Guia: Marketing Digital para Médicos", type: "PDF", access: "Gratuito", time: "20 páginas", category: "Gestão" },
  { slug: "trilha/gestao-financeira", title: "Trilha: Gestão Financeira para Médicos", type: "Trilha", access: "Premium", time: "7 módulos", category: "Finanças" },
  { slug: "telemedicina", title: "Telemedicina: regulamentação e boas práticas", type: "Artigo", access: "Gratuito", time: "8 min", category: "Tecnologia" },
  { slug: "cnpj-medico", title: "Abrindo seu CNPJ médico: passo a passo", type: "Vídeo", access: "Gratuito", time: "12 min", category: "Finanças" },
  { slug: "lideranca-equipes", title: "Liderança em equipes de saúde", type: "Artigo", access: "Premium", time: "6 min", category: "Gestão" },
  { slug: "trilha/reputacao-digital", title: "Trilha: Reputação Digital", type: "Trilha", access: "Premium", time: "5 módulos", category: "Carreira" },
  { slug: "etica-redes-sociais", title: "Ética médica e redes sociais", type: "Artigo", access: "Gratuito", time: "4 min", category: "Ética" },
];

export default function ConteudoPage() {
  const [activeType, setActiveType] = useState("Todos");
  const filtered = activeType === "Todos" ? content : content.filter(c => c.type === activeType.slice(0, -1) || (activeType === "Trilhas" && c.type === "Trilha"));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Biblioteca de Conteúdo</h1>

        <div className="flex flex-wrap gap-2">
          {typeTabs.map(t => (
            <button key={t} onClick={() => setActiveType(t)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeType === t ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryChips.map(c => (
            <span key={c} className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted cursor-pointer">{c}</span>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => {
            const Icon = typeIcons[c.type] || BookOpen;
            const colorClass = typeColors[c.type] || "";
            const href = c.type === "Trilha" ? `/conteudo/${c.slug}` : `/conteudo/${c.slug}`;
            return (
              <Link key={c.slug} to={href} className="group rounded-xl border bg-card shadow-card hover:shadow-card-hover transition-all overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Icon className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}>{c.type}</span>
                    {c.access === "Premium" ? (
                      <span className="flex items-center gap-0.5 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700"><Lock className="h-3 w-3" /> Premium</span>
                    ) : (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">Gratuito</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors text-sm">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.time}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
