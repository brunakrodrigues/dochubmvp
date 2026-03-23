import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowRight, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const mockDimensions = [
  { name: "Planejamento de Carreira", score: 78 },
  { name: "Gestão Financeira", score: 35 },
  { name: "Imagem e Reputação", score: 65 },
  { name: "Metas Profissionais", score: 70 },
  { name: "Qualidade e Resultados", score: 85 },
  { name: "Ética e Conduta", score: 90 },
  { name: "Uso de Tecnologia", score: 58 },
  { name: "Assessorias e Suporte", score: 45 },
  { name: "Visão Empreendedora", score: 42 },
];

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

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [target, duration, count]);

  return (
    <motion.span
      className="font-display text-5xl font-bold text-foreground tabular-nums"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {display}
    </motion.span>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto h-52 w-52">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
        {/* Background track */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
        {/* Animated arc */}
        <motion.circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* Glow effect */}
        <motion.circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference, opacity: 0 }}
          animate={{ strokeDashoffset: offset, opacity: 0.3 }}
          transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
          filter="blur(6px)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter target={score} duration={2} />
        <motion.span
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          /100
        </motion.span>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function ResultadoPage() {
  return (
    <DashboardLayout>
      <motion.div
        className="mx-auto max-w-4xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Score Card */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 text-center shadow-card overflow-hidden relative">
          {/* Background pulse */}
          <motion.div
            className="absolute inset-0 bg-accent/5 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
          <div className="relative">
            <motion.h1
              className="font-display text-3xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Seu Score de Maturidade
            </motion.h1>
            <ScoreGauge score={totalScore} />
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, type: "spring", stiffness: 300 }}
            >
              <span className="inline-block rounded-full bg-warning/10 px-4 py-1.5 text-sm font-semibold text-warning">
                Intermediário
              </span>
            </motion.div>
            <motion.p
              className="mt-4 max-w-lg mx-auto text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              Você está no caminho certo, mas há dimensões importantes que precisam de atenção para alcançar a excelência profissional.
            </motion.p>
          </div>
        </motion.div>

        {/* Dimension Breakdown */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Detalhamento por Dimensão</h2>
          <div className="space-y-4">
            {dimensions.map((dim, i) => (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{dim.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dim.bg}`}>{dim.level}</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">{dim.score}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: dim.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${dim.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scale Legend */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-6 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-3">Escala de Maturidade</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {scaleItems.map((s, i) => (
              <motion.div
                key={s.range}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`h-3 w-3 rounded-full ${s.color}`} />
                <div>
                  <p className="text-xs font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.range}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Attention areas */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <AlertTriangle className="h-5 w-5 text-warning" />
            </motion.div>
            Dimensões que precisam de atenção
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {lowestDims.map((dim, i) => (
              <motion.div
                key={dim.name}
                className="rounded-xl border border-destructive/20 bg-destructive/5 p-5"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px -5px hsla(0, 72%, 51%, 0.15)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">{dim.name}</span>
                  <motion.span
                    className="text-lg font-bold text-destructive tabular-nums"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                  >
                    {dim.score}
                  </motion.span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {dim.score <= 40
                    ? "Área crítica. Recomendamos assessoria especializada imediata."
                    : "Área com espaço significativo para desenvolvimento."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
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
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
