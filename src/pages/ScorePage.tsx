import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/Layout";
import { useApp } from "@/context/AppContext";
import { categories } from "@/data/questions";
import { getLevel, freeReportTexts, completeReportTexts } from "@/data/reportTexts";
import { marketData } from "@/data/marketData";
import { ArrowRight, Lock, Calendar } from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Cell,
} from "recharts";

function AnimatedGauge({ score, maxScore }: { score: number; maxScore: number }) {
  const [animValue, setAnimValue] = useState(0);
  const pct = (score / maxScore) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setAnimValue(pct), 100);
    return () => clearTimeout(timer);
  }, [pct]);

  const radius = 90;
  const circ = Math.PI * radius;
  const offset = circ - (animValue / 100) * circ;

  return (
    <div className="relative mx-auto w-56">
      <svg viewBox="0 0 200 120" className="w-full">
        <path d="M 10 110 A 90 90 0 0 1 190 110" fill="none" stroke="hsl(var(--border))" strokeWidth="12" strokeLinecap="round" />
        <motion.path
          d="M 10 110 A 90 90 0 0 1 190 110"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <motion.span
          className="font-display text-4xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground">de {maxScore} pts</span>
      </div>
    </div>
  );
}

export default function ScorePage() {
  const navigate = useNavigate();
  const { result, user } = useApp();

  useEffect(() => {
    if (!result) navigate('/');
  }, [result, navigate]);

  if (!result) return null;

  const levelInfo = getLevel(result.totalScore, result.maxScore, result.testType);
  const reportTexts = result.testType === 'free' ? freeReportTexts : completeReportTexts;
  const reportText = reportTexts[levelInfo.level];

  const radarData = result.categoryScores.map(cs => {
    const cat = categories.find(c => c.id === cs.category);
    return {
      subject: cat?.name.split(' ')[0] || cs.category,
      fullName: cat?.name || cs.category,
      value: cs.maxScore > 0 ? Math.round((cs.score / cs.maxScore) * 100) : 0,
      fullMark: 100,
    };
  });

  const barColors = ['hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--info))', 'hsl(var(--destructive))', 'hsl(173 58% 50%)', 'hsl(222 47% 35%)', 'hsl(38 70% 55%)', 'hsl(160 40% 50%)'];

  const userState = user?.state || 'São Paulo';
  const regionalSalary = marketData.salaryByRegion[userState] || marketData.nationalAverage;

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      <div className="container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Score Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <AnimatedGauge score={result.totalScore} maxScore={result.maxScore} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4">
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-lg font-bold ${
                levelInfo.color === 'destructive' ? 'bg-destructive/10 text-destructive' :
                levelInfo.color === 'warning' ? 'bg-warning/10 text-warning' :
                levelInfo.color === 'success' ? 'bg-success/10 text-success' :
                'bg-accent/10 text-accent'
              }`}>
                {levelInfo.emoji} {levelInfo.label}
              </span>
            </motion.div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-8 rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">Perfil por Dimensão</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Bars */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-8 rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">Score por Categoria</h3>
            <div className="space-y-3">
              {result.categoryScores.map((cs, i) => {
                const cat = categories.find(c => c.id === cs.category);
                const pct = cs.maxScore > 0 ? Math.round((cs.score / cs.maxScore) * 100) : 0;
                return (
                  <div key={cs.category}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{cat?.icon}</span>
                        <span className="font-medium text-foreground">{cat?.name}</span>
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{cs.score}/{cs.maxScore}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: barColors[i % barColors.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Report Text */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-8 rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-3 font-display text-lg font-bold text-foreground">Seu Diagnóstico</h3>
            <p className="leading-relaxed text-muted-foreground">{reportText}</p>
          </motion.div>

          {/* Complete-only: Market Data */}
          {result.testType === 'complete' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <h3 className="mb-4 font-display text-xl font-bold text-foreground">Dados do Mercado</h3>

              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-card p-6 shadow-card">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Salário Médio: Sua Região vs Nacional</h4>
                  <div className="h-48">
                    <ResponsiveContainer>
                      <BarChart data={[
                        { name: userState, value: regionalSalary },
                        { name: 'Média Nacional', value: marketData.nationalAverage },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR')}`} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          <Cell fill="hsl(var(--accent))" />
                          <Cell fill="hsl(var(--muted-foreground))" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-2xl border bg-card p-6 shadow-card">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Evolução do Número de Médicos no Brasil</h4>
                  <div className="h-48">
                    <ResponsiveContainer>
                      <LineChart data={marketData.doctorsEvolution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(v: number) => v.toLocaleString('pt-BR')} />
                        <Line type="monotone" dataKey="count" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-card p-6 text-center shadow-card">
                  <p className="font-display text-3xl font-bold text-accent">{marketData.newDoctors2026.toLocaleString('pt-BR')}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Médicos se formarão em 2026</p>
                </div>
                <div className="rounded-2xl border bg-card p-6 text-center shadow-card">
                  <p className="font-display text-3xl font-bold text-foreground">600 mil</p>
                  <p className="mt-1 text-sm text-muted-foreground">Médicos ativos no Brasil (2025)</p>
                </div>
                <div className="rounded-2xl border bg-card p-6 text-center shadow-card">
                  <p className="font-display text-3xl font-bold text-warning">6-33%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Faixa tributária (Simples Nacional)</p>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-hero p-8 text-center shadow-xl">
                <Calendar className="mx-auto h-8 w-8 text-accent" />
                <h3 className="mt-3 font-display text-2xl font-bold text-primary-foreground">Agende sua Mentoria</h3>
                <p className="mt-2 text-primary-foreground/70">
                  {'direction' in levelInfo ? (levelInfo as { direction: string }).direction : 'Converse com um especialista sobre seus resultados'}
                </p>
                <Button variant="hero" size="lg" className="mt-6" asChild>
                  <a href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20mentoria%20DocHub" target="_blank" rel="noopener noreferrer">
                    Agendar Mentoria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Free-only: Upgrade CTA */}
          {result.testType === 'free' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <div className="relative mb-6 overflow-hidden rounded-2xl border bg-card p-6 shadow-card">
                <div className="pointer-events-none select-none blur-sm">
                  <h3 className="font-display text-lg font-bold text-foreground">Dados do Mercado Médico</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="h-40 rounded-xl bg-muted" />
                    <div className="h-40 rounded-xl bg-muted" />
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="h-24 rounded-xl bg-muted" />
                    <div className="h-24 rounded-xl bg-muted" />
                    <div className="h-24 rounded-xl bg-muted" />
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm">
                  <Lock className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">Desbloqueie seu Relatório Completo</h3>
                  <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
                    Acesse dados de mercado, análise detalhada por categoria e recomendações personalizadas
                  </p>
                  <Button variant="hero" size="lg" className="mt-6" asChild>
                    <Link to="/paywall">
                      Desbloquear por R$ 49,90
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-card">
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">O que você ganha no teste completo</h3>
                <ul className="grid gap-2 md:grid-cols-2">
                  {[
                    '13 perguntas adicionais aprofundadas',
                    'Gráfico radar detalhado com 9 eixos',
                    'Relatório personalizado por categoria',
                    'Dados salariais da sua região',
                    'Evolução do mercado médico',
                    'Impacto tributário estimado',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/">Voltar ao Início</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
