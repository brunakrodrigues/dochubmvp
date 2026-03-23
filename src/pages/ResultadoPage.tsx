import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowRight, AlertTriangle, Lock, Star, BarChart3, Lightbulb, FileText, Layers } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { categories, calculateScores } from "@/data/questions";
import { freeReportTexts, completeReportTexts, getLevel } from "@/data/reportTexts";

// ── Helpers ──────────────────────────────────────────────

const getDimLevel = (score: number) => {
  if (score <= 40) return { level: "Em Desenvolvimento", color: "hsl(0 72% 51%)", bg: "bg-destructive/10 text-destructive" };
  if (score <= 65) return { level: "Intermediário", color: "hsl(38 92% 50%)", bg: "bg-warning/10 text-warning" };
  if (score <= 85) return { level: "Avançado", color: "hsl(199 89% 48%)", bg: "bg-info/10 text-info" };
  return { level: "Referência", color: "hsl(160 60% 45%)", bg: "bg-success/10 text-success" };
};

const scaleItems = [
  { range: "0-40", label: "Em Desenvolvimento", color: "bg-destructive" },
  { range: "41-65", label: "Intermediário", color: "bg-warning" },
  { range: "66-85", label: "Avançado", color: "bg-info" },
  { range: "86-100", label: "Referência", color: "bg-success" },
];

const dimensionInterpretations: Record<string, Record<string, string>> = {
  planejamento: {
    low: "Sua carreira precisa de um plano estruturado. Sem direcionamento, você corre o risco de estagnar.",
    mid: "Você tem noções de planejamento, mas falta estrutura formal. Documente suas metas.",
    high: "Bom planejamento de carreira. Continue revisando periodicamente para manter o foco.",
  },
  financeiro: {
    low: "Gestão financeira é crítica. Sem controle tributário e de investimentos, você perde dinheiro.",
    mid: "Você tem o básico, mas pode otimizar muito com planejamento tributário profissional.",
    high: "Excelente gestão financeira. Mantenha o acompanhamento e diversifique investimentos.",
  },
  imagem: {
    low: "Sua presença profissional é invisível. No cenário atual, isso limita oportunidades.",
    mid: "Presença em construção. Uma estratégia consistente pode acelerar seu posicionamento.",
    high: "Forte presença profissional. Continue investindo em conteúdo e networking estratégico.",
  },
  metas: {
    low: "Sem metas mensuráveis, é impossível avaliar progresso. Comece definindo indicadores.",
    mid: "Suas metas existem mas faltam métricas. Torne-as SMART para maior efetividade.",
    high: "Metas bem definidas e acompanhadas. Continue o ciclo de revisão e ajuste.",
  },
  qualidade: {
    low: "Mensurar resultados é essencial para evolução clínica. Comece com indicadores simples.",
    mid: "Você acompanha alguns resultados. Estruture um sistema de indicadores contínuo.",
    high: "Excelente compromisso com qualidade. Considere certificações e acreditações.",
  },
  etica: {
    low: "Ética profissional requer protocolos formais, não apenas boa intenção.",
    mid: "Base ética sólida. Formalize seus protocolos e busque referências do CRM.",
    high: "Conduta exemplar. Considere participar de comitês de ética e ser referência.",
  },
  tecnologia: {
    low: "A tecnologia é uma aliada indispensável. Comece integrando ferramentas digitais básicas.",
    mid: "Uso intermediário de tecnologia. Explore IA e automação para ganhar produtividade.",
    high: "Stack tecnológico avançado. Continue explorando inovações e compartilhe conhecimento.",
  },
  assessorias: {
    low: "Sem assessoria, você fica vulnerável a riscos jurídicos, fiscais e de imagem.",
    mid: "Assessoria parcial. Considere ampliar para cobrir jurídico, marketing e gestão.",
    high: "Equipe de apoio completa. Mantenha revisões periódicas dos contratos e estratégias.",
  },
  negocio: {
    low: "Tratar sua atividade como negócio não diminui sua vocação — potencializa resultados.",
    mid: "Visão empreendedora em desenvolvimento. Estruture um plano de negócios formal.",
    high: "Gestão profissional sólida. Explore escalabilidade e novos modelos de atuação.",
  },
};

function getDimInterpretation(catId: string, score: number) {
  const texts = dimensionInterpretations[catId];
  if (!texts) return "";
  if (score <= 40) return texts.low;
  if (score <= 65) return texts.mid;
  return texts.high;
}

const serviceRecommendations: Record<string, { title: string; slug: string }> = {
  financeiro: { title: "Assessoria Tributária para Médicos", slug: "assessoria-tributaria" },
  negocio: { title: "Consultoria de Gestão de Consultório", slug: "gestao-consultorio" },
  assessorias: { title: "Coaching de Liderança Médica", slug: "coaching-lideranca" },
  imagem: { title: "Estratégia de Marketing Digital Médico", slug: "marketing-digital" },
  planejamento: { title: "Mentoria de Carreira Médica", slug: "mentoria-carreira" },
  metas: { title: "Coaching de Liderança Médica", slug: "coaching-lideranca" },
  qualidade: { title: "Consultoria de Gestão de Consultório", slug: "gestao-consultorio" },
  etica: { title: "Consultoria Jurídica Médica", slug: "consultoria-juridica" },
  tecnologia: { title: "Estratégia de Marketing Digital Médico", slug: "marketing-digital" },
};

// Visible dimensions in free mode
const freeDimensions = new Set(["planejamento", "financeiro", "imagem", "tecnologia"]);

// ── Animated Components ──────────────────────────────────

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(count, target, { duration, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
    return controls.stop;
  }, [target, duration, count]);
  return (
    <motion.span className="font-display text-5xl font-bold text-foreground tabular-nums"
      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}>
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
        <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
        <motion.circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--accent))" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }} />
        <motion.circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--accent))" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference, opacity: 0 }}
          animate={{ strokeDashoffset: offset, opacity: 0.3 }} transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }} filter="blur(6px)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter target={score} duration={2} />
        <motion.span className="text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>/100</motion.span>
      </div>
    </div>
  );
}

// ── Animation variants ───────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ── Mock evolution data ──────────────────────────────────
const evolutionData = [
  { month: "Out", score: 0 }, { month: "Nov", score: 0 }, { month: "Dez", score: 0 },
  { month: "Jan", score: 0 }, { month: "Fev", score: 0 }, { month: "Mar", score: 72 },
];

// ══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════

export default function ResultadoPage() {
  const [searchParams] = useSearchParams();
  const modo = searchParams.get("modo") === "completo" ? "complete" : "free";
  const { answers } = useApp();

  const { totalScore, categoryScores } = useMemo(() => {
    if (answers.length > 0) {
      return calculateScores(answers, modo);
    }
    // Fallback mock data
    return {
      totalScore: modo === "free" ? 68 : 72,
      categoryScores: [
        { category: "planejamento", label: "Planejamento de Carreira", score: 78, maxScore: 100 },
        { category: "financeiro", label: "Gestão Financeira", score: 35, maxScore: 100 },
        { category: "imagem", label: "Imagem e Reputação", score: 65, maxScore: 100 },
        { category: "metas", label: "Metas Profissionais", score: 70, maxScore: 100 },
        { category: "qualidade", label: "Qualidade e Resultados", score: 85, maxScore: 100 },
        { category: "etica", label: "Ética e Conduta", score: 90, maxScore: 100 },
        { category: "tecnologia", label: "Uso de Tecnologia", score: 58, maxScore: 100 },
        { category: "assessorias", label: "Assessorias e Suporte", score: 45, maxScore: 100 },
        { category: "negocio", label: "Visão Empreendedora", score: 42, maxScore: 100 },
      ],
    };
  }, [answers, modo]);

  const levelInfo = getLevel(totalScore, 100, modo);
  const reportTexts = modo === "free" ? freeReportTexts : completeReportTexts;
  const interpretationText = reportTexts[levelInfo.level];

  const dimensions = categoryScores.map(c => ({ ...c, ...getDimLevel(c.score) }));
  const lowestDims = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 3);

  if (modo === "free") {
    return <FreeResult totalScore={totalScore} levelInfo={levelInfo} interpretationText={interpretationText} dimensions={dimensions} />;
  }
  return <CompleteResult totalScore={totalScore} levelInfo={levelInfo} interpretationText={interpretationText} dimensions={dimensions} lowestDims={lowestDims} />;
}

// ══════════════════════════════════════════════════════════
// FREE RESULT LAYOUT
// ══════════════════════════════════════════════════════════

function FreeResult({ totalScore, levelInfo, interpretationText, dimensions }: {
  totalScore: number; levelInfo: any; interpretationText: string; dimensions: any[];
}) {
  return (
    <DashboardLayout>
      <motion.div className="mx-auto max-w-4xl space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        {/* Score Card */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 text-center shadow-card relative overflow-hidden">
          <motion.div className="absolute inset-0 bg-accent/5 rounded-2xl" initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.3, 0] }} transition={{ duration: 2.5, ease: "easeOut" }} />
          <div className="relative">
            <h1 className="font-display text-3xl font-bold text-foreground mb-6">Seu Score de Maturidade</h1>
            <ScoreGauge score={totalScore} />
            <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, type: "spring", stiffness: 300 }}>
              <span className={`inline-block rounded-full bg-${levelInfo.color}/10 px-4 py-1.5 text-sm font-semibold text-${levelInfo.color}`}>
                {levelInfo.label}
              </span>
            </motion.div>
            <motion.p className="mt-4 max-w-lg mx-auto text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
              {interpretationText}
            </motion.p>
          </div>
        </motion.div>

        {/* Dimension Bars — some blurred */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Detalhamento por Dimensão</h2>
          <div className="space-y-4">
            {dimensions.map((dim, i) => {
              const isVisible = freeDimensions.has(dim.category);
              return (
                <motion.div key={dim.category} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                  {isVisible ? (
                    <>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{dim.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dim.bg}`}>{dim.level}</span>
                          <span className="text-sm font-bold text-foreground tabular-nums">{dim.score}</span>
                        </div>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: dim.color }}
                          initial={{ width: 0 }} whileInView={{ width: `${dim.score}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }} />
                      </div>
                    </>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5 blur-[3px] select-none">
                        <span className="text-sm font-medium text-foreground">{dim.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">—</span>
                          <span className="text-sm font-bold text-foreground tabular-nums">??</span>
                        </div>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden blur-[3px]">
                        <div className="h-full rounded-full bg-muted-foreground/30" style={{ width: "50%" }} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-center gap-1.5 rounded-full bg-card/90 border px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                          <Lock className="h-3 w-3" /> Disponível no Teste Completo
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Scale Legend */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-6 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-3">Escala de Maturidade</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {scaleItems.map((s, i) => (
              <div key={s.range} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${s.color}`} />
                <div>
                  <p className="text-xs font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.range}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upgrade Banner */}
        <motion.div variants={itemVariants}
          className="rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground shadow-lg relative overflow-hidden">
          <motion.div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
            animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold mb-2">Você fez o diagnóstico gratuito com 12 questões.</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl">
              Para um resultado COMPLETO com análise detalhada de todas as 9 dimensões, recomendações personalizadas e relatório PDF exportável:
            </p>
            <Button size="lg" variant="secondary" className="font-semibold" asChild>
              <Link to="/teste?modo=completo">
                Fazer Teste Completo — R$ 49,90 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h3 className="font-display text-lg font-bold text-foreground mb-6 text-center">O que você ganha no Teste Completo:</h3>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { icon: Layers, title: "25 questões aprofundadas", desc: "Análise completa de todas as dimensões" },
              { icon: BarChart3, title: "Análise detalhada das 9 dimensões", desc: "Score individual com interpretação" },
              { icon: Lightbulb, title: "Recomendações personalizadas", desc: "Serviços e conteúdos sob medida" },
              { icon: FileText, title: "Relatório PDF exportável", desc: "Documento profissional completo" },
            ].map((b, i) => (
              <motion.div key={b.title} className="rounded-xl border bg-muted/30 p-5 text-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <b.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                <p className="text-sm font-semibold text-foreground mb-1">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/teste?modo=completo">
              Fazer Teste Completo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="lg">
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar Resultado
          </Button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════
// COMPLETE RESULT LAYOUT
// ══════════════════════════════════════════════════════════

function CompleteResult({ totalScore, levelInfo, interpretationText, dimensions, lowestDims }: {
  totalScore: number; levelInfo: any; interpretationText: string; dimensions: any[]; lowestDims: any[];
}) {
  return (
    <DashboardLayout>
      <motion.div className="mx-auto max-w-4xl space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        {/* Score Card */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 text-center shadow-card relative overflow-hidden">
          <motion.div className="absolute inset-0 bg-accent/5 rounded-2xl" initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.3, 0] }} transition={{ duration: 2.5, ease: "easeOut" }} />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Teste Completo <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-6">Seu Score de Maturidade</h1>
            <ScoreGauge score={totalScore} />
            <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, type: "spring", stiffness: 300 }}>
              <span className={`inline-block rounded-full bg-${levelInfo.color}/10 px-4 py-1.5 text-sm font-semibold text-${levelInfo.color}`}>
                {levelInfo.label}
              </span>
            </motion.div>
            <motion.p className="mt-4 max-w-lg mx-auto text-muted-foreground text-sm leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
              {interpretationText}
            </motion.p>
          </div>
        </motion.div>

        {/* Full Dimension Breakdown */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Detalhamento por Dimensão</h2>
          <div className="space-y-6">
            {dimensions.map((dim, i) => (
              <motion.div key={dim.category} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{dim.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dim.bg}`}>{dim.level}</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">{dim.score}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: dim.color }}
                    initial={{ width: 0 }} whileInView={{ width: `${dim.score}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }} />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{getDimInterpretation(dim.category, dim.score)}</p>
                <Link to="/recomendacoes" className="text-xs text-accent hover:underline mt-0.5 inline-block">
                  Ver recomendações para esta dimensão →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Visão Geral — Radar de Maturidade</h2>
          <motion.div className="w-full h-[380px]" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={dimensions.map(d => ({ name: d.label, score: d.score, fullMark: 100 }))}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  tickFormatter={(v: string) => v.length > 14 ? v.slice(0, 12) + "…" : v} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(var(--border))" />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Scale Legend */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-6 shadow-card">
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
        </motion.div>

        {/* Priority Dimensions */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ delay: 3, duration: 0.5 }}>
              <AlertTriangle className="h-5 w-5 text-warning" />
            </motion.div>
            Dimensões Prioritárias
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {lowestDims.map((dim, i) => (
              <motion.div key={dim.category} className="rounded-xl border border-destructive/20 bg-destructive/5 p-5"
                initial={{ opacity: 0, y: 20, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }} whileHover={{ scale: 1.02 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">{dim.label}</span>
                  <span className="text-lg font-bold text-destructive tabular-nums">{dim.score}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{getDimInterpretation(dim.category, dim.score)}</p>
                {serviceRecommendations[dim.category] && (
                  <Link to={`/servicos/${serviceRecommendations[dim.category].slug}`}
                    className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
                    Ver {serviceRecommendations[dim.category].title} <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/recomendacoes">Ver Minhas Recomendações <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" /> Baixar Relatório PDF
          </Button>
          <Button variant="ghost" size="lg">
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar Resultado
          </Button>
        </motion.div>

        {/* Evolution Placeholder */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Evolução do Score</h2>
          <p className="text-sm text-muted-foreground mb-6">Refaça o teste em 6 meses para acompanhar sua evolução</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
