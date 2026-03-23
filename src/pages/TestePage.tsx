import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check } from "lucide-react";

const dimensions = [
  "Planejamento de Carreira", "Gestão Financeira", "Imagem e Reputação",
  "Metas Profissionais", "Qualidade e Resultados", "Ética e Conduta",
  "Uso de Tecnologia", "Assessorias e Suporte", "Visão Empreendedora",
  "Planejamento de Carreira", "Imagem e Reputação", "Uso de Tecnologia",
];

const dimNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 7];

const testQuestions = [
  { dim: 0, text: "Você possui um plano de carreira estruturado para os próximos 5 anos?", options: ["Não pensei nisso ainda", "Tenho ideias vagas", "Tenho metas definidas mas não documentadas", "Tenho plano escrito e revisado periodicamente"] },
  { dim: 1, text: "Como você gerencia a tributação dos seus rendimentos médicos?", options: ["Não controlo ativamente", "Faço o básico no IR", "Tenho contador mas sem planejamento", "Planejamento tributário ativo com PJ e investimentos"] },
  { dim: 2, text: "Qual sua presença digital profissional?", options: ["Não tenho presença digital", "Perfil básico em 1 rede social", "Publico conteúdo esporadicamente", "Estratégia ativa com conteúdo regular e networking"] },
  { dim: 3, text: "Você acompanha indicadores de desempenho da sua prática clínica?", options: ["Não acompanho nenhum indicador", "Apenas volume de atendimentos", "Alguns indicadores básicos", "Dashboard com indicadores clínicos e financeiros"] },
  { dim: 4, text: "Qual sua frequência de atualização profissional (congressos, cursos, artigos)?", options: ["Raramente me atualizo", "1-2 vezes por ano", "Trimestral com certificação", "Programa contínuo de educação com especialização"] },
  { dim: 5, text: "Como você lida com questões éticas na prática médica?", options: ["Resolvo caso a caso sem referência", "Conheço o código de ética básico", "Sigo o código e busco orientação quando necessário", "Tenho assessoria ética e participo de comitês"] },
  { dim: 6, text: "Qual seu nível de adoção de ferramentas digitais na prática clínica?", options: ["Uso o mínimo necessário", "Prontuário eletrônico apenas", "Telemedicina + prontuário + agenda digital", "Stack digital completo (PEP, telemedicina, automação, IA)"] },
  { dim: 7, text: "Você conta com assessoria profissional especializada (jurídica, contábil, marketing)?", options: ["Nenhuma assessoria", "Apenas contador básico", "Contador + 1 assessoria", "Equipe completa (contábil, jurídica, marketing, gestão)"] },
  { dim: 8, text: "Você trata sua atividade médica como um negócio?", options: ["Sou apenas médico", "Penso nisso mas não atuo", "Tenho gestão básica (receitas e despesas)", "Gestão profissional com indicadores, metas e plano de crescimento"] },
  { dim: 9, text: "Você tem um plano de aposentadoria/independência financeira?", options: ["Nunca pensei nisso", "Ideia vaga de que preciso", "Tenho investimentos mas sem meta", "Plano estruturado com metas e acompanhamento"] },
  { dim: 10, text: "Como você gerencia sua reputação online (avaliações, comentários, Google)?", options: ["Não monitoro", "Vejo quando alguém menciona", "Monitoro periodicamente", "Gestão ativa com resposta a avaliações e estratégia"] },
  { dim: 11, text: "Você utiliza inteligência artificial ou automação na sua rotina?", options: ["Não uso nada", "Uso ChatGPT esporadicamente", "Ferramentas de IA integradas à prática", "IA + automação de processos administrativos e clínicos"] },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function TestePage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(12).fill(null));
  const [direction, setDirection] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const total = testQuestions.length;
  const progress = ((current + 1) / total) * 100;
  const q = testQuestions[current];
  const dimName = dimensions[q.dim];
  const dimNum = dimNumbers[q.dim];

  const handleSelect = useCallback((optionIdx: number) => {
    setSelectedIdx(optionIdx);
    const value = optionIdx + 1;
    setAnswers(prev => { const n = [...prev]; n[current] = value; return n; });
    setTimeout(() => {
      setSelectedIdx(null);
      if (current < total - 1) {
        setDirection(1);
        setCurrent(c => c + 1);
      } else {
        navigate("/resultado");
      }
    }, 500);
  }, [current, total, navigate]);

  const goBack = () => {
    if (current > 0) { setDirection(-1); setSelectedIdx(null); setCurrent(c => c - 1); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Header */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Dimensão {dimNum} de 9 — <span className="text-foreground font-semibold">{dimName}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              Questão {current + 1} de {total} — {Math.round(progress)}% completo
            </span>
          </div>
          <motion.div
            className="h-2 rounded-full bg-muted overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
            >
              {/* Dimension Badge */}
              <motion.span
                className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {dimName}
              </motion.span>

              {/* Question Text */}
              <motion.h2
                className="font-display text-2xl font-bold text-foreground md:text-3xl mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35 }}
              >
                {q.text}
              </motion.h2>

              {/* Option Cards */}
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = selectedIdx === i;
                  const wasSelected = answers[current] === i + 1 && selectedIdx === null;
                  const active = isSelected || wasSelected;

                  return (
                    <motion.button
                      key={i}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.015, boxShadow: "0 4px 20px -4px hsla(var(--accent) / 0.15)" }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => !selectedIdx && selectedIdx !== 0 && handleSelect(i)}
                      className={`w-full text-left rounded-xl border-2 p-5 transition-colors ${
                        active
                          ? "border-accent bg-accent/10 shadow-accent"
                          : "border-border bg-card hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            active ? "border-accent bg-accent text-accent-foreground" : "border-border"
                          }`}
                          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {active ? (
                            <motion.div
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                              <Check className="h-4 w-4" />
                            </motion.div>
                          ) : (
                            <span className="text-sm text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                          )}
                        </motion.div>
                        <span className={`text-sm font-medium ${active ? "text-accent" : "text-foreground"}`}>
                          {opt}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Button variant="ghost" onClick={goBack} disabled={current === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-accent" /> Respostas salvas automaticamente
          </span>
        </div>
      </div>
    </div>
  );
}
