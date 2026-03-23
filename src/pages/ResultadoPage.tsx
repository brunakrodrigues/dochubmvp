import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowRight, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const mockDimensions = [
  { name: "Planejamento de Carreira", score: 78, level: "Avançado", color: "hsl(199 89% 48%)" },
  { name: "Gestão Financeira", score: 35, level: "Em Desenvolvimento", color: "hsl(0 72% 51%)" },
  { name: "Imagem e Reputação", score: 65, level: "Intermediário", color: "hsl(38 92% 50%)" },
  { name: "Metas Profissionais", score: 70, level: "Avançado", color: "hsl(199 89% 48%)" },
  { name: "Qualidade e Resultados", score: 85, level: "Referência", color: "hsl(160 60% 45%)" },
  { name: "Ética e Conduta", score: 90, level: "Referência", color: "hsl(160 60% 45%)" },
  { name: "Uso de Tecnologia", score: 58, level: "Intermediário", color: "hsl(38 92% 50%)" },
  { name: "Assessorias e Suporte", score: 45, level: "Em Desenvolvimento", color: "hsl(0 72% 51%)" },  // CHANGED: was red (fixing)
  { name: "Visão Empreendedora", score: 42, level: "Em Desenvolvimento", color: "hsl(0 72% 51%)" },    // CHANGED: was red too close
];

// Fix: Assessorias 45 is > 40, so Intermediário. Let me recategorize:
// 0-40 = Em Desenvolvimento (red), 41-65 = Intermediário (yellow), 66-85 = Avançado (blue), 86-100 = Referência (green)
const getDimLevel = (score: number) => {
  if (score <= 40) return { level: "Em Desenvolvimento", color: "hsl(0 72% 51%)", bg: "bg-destructive/10 text-destructive" };
  if (score <= 65) return { level: "Intermediário", color: "hsl(38 92% 50%)", bg: "bg-warning/10 text-warning" };
  if (score <= 85) return { level: "Avançado", color: "hsl(199 89% 48%)", bg: "bg-info/10 text-info" };
  return { level: "Referência", color: "hsl(160 60% 45%)", bg: "bg-success/10 text-success" };
};

const dimensions = mockDimensions.map(d => ({ ...d, ...getDimLevel(d.score) }));
const totalScore = 72;
const lowestDims = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 3);

const scaleItems = [
  { range: "0-40", label: "Em Desenvolvimento", color: "bg-destructive" },
  { range: "41-65", label: "Intermediário", color: "bg-warning" },
  { range: "66-85", label: "Avançado", color: "bg-info" },
  { range: "86-100", label: "Referência", color: "bg-success" },
];

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto h-52 w-52">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
        <motion.circle
          cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--accent))" strokeWidth="12"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-display text-5xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >{score}</motion.span>
        <span className="text-sm text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

export default function ResultadoPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-8 text-center shadow-card">
          <h1 className="font-display text-3xl font-bold text-foreground mb-6">Seu Score de Maturidade</h1>
          <ScoreGauge score={totalScore} />
          <div className="mt-4">
            <span className="inline-block rounded-full bg-warning/10 px-4 py-1.5 text-sm font-semibold text-warning">
              Intermediário
            </span>
          </div>
          <p className="mt-4 max-w-lg mx-auto text-muted-foreground">
            Você está no caminho certo, mas há dimensões importantes que precisam de atenção para alcançar a excelência profissional.
          </p>
        </motion.div>

        {/* Dimension Breakdown */}
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Detalhamento por Dimensão</h2>
          <div className="space-y-4">
            {dimensions.map((dim, i) => (
              <motion.div key={dim.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{dim.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dim.bg}`}>{dim.level}</span>
                    <span className="text-sm font-bold text-foreground">{dim.score}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: dim.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scale Legend */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-3">Escala de Maturidade</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {scaleItems.map(s => (
              <div key={s.range} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${s.color}`} />
                <div>
                  <p className="text-xs font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attention areas */}
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Dimensões que precisam de atenção
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {lowestDims.map(dim => (
              <div key={dim.name} className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">{dim.name}</span>
                  <span className="text-lg font-bold text-destructive">{dim.score}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {dim.score <= 40
                    ? "Área crítica. Recomendamos assessoria especializada imediata."
                    : "Área com espaço significativo para desenvolvimento."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/recomendacoes">
              Ver Minhas Recomendações <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" /> Baixar Relatório PDF
          </Button>
          <Button variant="ghost" size="lg">
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar Resultado
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
