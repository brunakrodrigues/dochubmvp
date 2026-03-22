import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Layout";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Check, X, Lock, Shield } from "lucide-react";

const features = [
  { label: '12 perguntas de diagnóstico', free: true, complete: true },
  { label: 'Score de maturidade profissional', free: true, complete: true },
  { label: 'Mini-relatório por nível', free: true, complete: true },
  { label: '13 perguntas adicionais aprofundadas', free: false, complete: true },
  { label: 'Gráfico radar detalhado (9 eixos)', free: false, complete: true },
  { label: 'Score por categoria com análise', free: false, complete: true },
  { label: 'Dados do mercado médico (CFM 2025)', free: false, complete: true },
  { label: 'Salário médio da sua região', free: false, complete: true },
  { label: 'Evolução do número de médicos', free: false, complete: true },
  { label: 'Impacto tributário estimado', free: false, complete: true },
  { label: 'Relatório personalizado por categoria', free: false, complete: true },
];

export default function PaywallPage() {
  const navigate = useNavigate();
  const { setTestType } = useApp();

  const handleBuy = () => {
    setTestType('complete');
    navigate('/teste');
  };

  const handleFree = () => {
    setTestType('free');
    navigate('/teste');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Escolha sua versão</h1>
            <p className="mt-2 text-muted-foreground">Compare os benefícios e decida o melhor para sua carreira</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border bg-card p-8 shadow-card">
              <h3 className="font-display text-xl font-bold text-foreground">Teste Free</h3>
              <p className="mt-1 text-3xl font-bold text-foreground">Grátis</p>
              <p className="text-sm text-muted-foreground">12 perguntas · ~5 min</p>
              <ul className="mt-6 space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {f.free ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-muted-foreground/30" />}
                    <span className={f.free ? 'text-foreground' : 'text-muted-foreground/50'}>{f.label}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="mt-8 w-full" onClick={handleFree}>
                Continuar Grátis
              </Button>
            </div>

            {/* Complete */}
            <div className="relative rounded-2xl border-2 border-accent bg-card p-8 shadow-card-hover">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
                RECOMENDADO
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">Teste Completo</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-3xl font-bold text-foreground">R$ 49,90</p>
                <span className="text-sm text-muted-foreground">pagamento único</span>
              </div>
              <p className="text-sm text-muted-foreground">25 perguntas · ~10 min</p>
              <ul className="mt-6 space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-foreground">{f.label}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" className="mt-8 w-full" onClick={handleBuy}>
                Comprar Teste Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Pagamento seguro</span>
                <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Satisfação garantida</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
