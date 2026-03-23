import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/Layout";
import { Check, X, Star } from "lucide-react";

const features = [
  { name: "Teste profissional", free: "12 questões", basico: "25 questões", premium: "25 questões" },
  { name: "Score geral", free: true, basico: true, premium: true },
  { name: "Score por dimensão (9 eixos)", free: false, basico: true, premium: true },
  { name: "Recomendações personalizadas", free: false, basico: true, premium: true },
  { name: "Conteúdo gratuito", free: true, basico: true, premium: true },
  { name: "Conteúdo premium", free: false, basico: true, premium: true },
  { name: "Relatório PDF", free: false, basico: true, premium: true },
  { name: "Copiloto IA", free: false, basico: "5 interações/mês", premium: "Ilimitado" },
  { name: "Desconto em serviços", free: false, basico: false, premium: "20%" },
  { name: "Trilhas exclusivas", free: false, basico: false, premium: true },
  { name: "Prioridade no atendimento", free: false, basico: false, premium: true },
];

export default function PlanosPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    { name: "Free", price: "R$0", annual: "R$0", desc: "Para conhecer a plataforma", current: true, highlight: false, cta: "Plano Atual" },
    { name: "Básico", price: "R$49", annual: "R$470", annualMonthly: "R$39", desc: "Para quem quer evoluir", current: false, highlight: false, cta: "Assinar Básico" },
    { name: "Premium", price: "R$149", annual: "R$1.430", annualMonthly: "R$119", desc: "Para quem quer excelência", current: false, highlight: true, cta: "Assinar Premium" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Escolha seu Plano</h1>
          <p className="mt-3 text-muted-foreground">Invista no seu desenvolvimento profissional</p>
          <div className="mt-6 inline-flex items-center rounded-full bg-muted p-1">
            <button onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!annual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Mensal</button>
            <button onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${annual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              Anual <span className="ml-1 text-xs text-accent">Economize 20%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map(p => (
            <div key={p.name} className={`rounded-2xl border p-8 relative ${p.highlight ? "border-accent bg-accent/5 shadow-accent" : "bg-card shadow-card"}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground flex items-center gap-1">
                  <Star className="h-3 w-3" /> Mais popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4">
                <span className="font-display text-4xl font-bold text-foreground">{annual && p.annualMonthly ? p.annualMonthly : p.price}</span>
                {p.price !== "R$0" && <span className="text-muted-foreground">/mês</span>}
              </div>
              {annual && p.annual !== "R$0" && <p className="text-xs text-muted-foreground mt-1">cobrado {p.annual}/ano</p>}
              <Button variant={p.highlight ? "hero" : p.current ? "outline" : "default"} className="w-full mt-6" disabled={p.current}>
                {p.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Feature Table */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="font-display text-xl font-bold text-foreground text-center mb-8">Comparação de recursos</h2>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-muted font-semibold text-sm">
              <div>Recurso</div>
              <div className="text-center">Free</div>
              <div className="text-center">Básico</div>
              <div className="text-center">Premium</div>
            </div>
            {features.map((f, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 border-t text-sm">
                <div className="text-foreground">{f.name}</div>
                {[f.free, f.basico, f.premium].map((val, j) => (
                  <div key={j} className="text-center">
                    {val === true ? <Check className="mx-auto h-4 w-4 text-accent" /> : val === false ? <X className="mx-auto h-4 w-4 text-muted-foreground/40" /> : <span className="text-muted-foreground">{val}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
