import { useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, Star } from "lucide-react";
import { getQuestionsForTest } from "@/data/questions";
import { useApp } from "@/context/AppContext";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.96 }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.15 + i * 0.08, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function TestePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modo = searchParams.get("modo") === "completo" ? "complete" : "free";
  const { addAnswer, setTestType } = useApp();

  const testQuestions = useMemo(() => getQuestionsForTest(modo), [modo]);
  const total = testQuestions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
  const [direction, setDirection] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const progress = ((current + 1) / total) * 100;
  const q = testQuestions[current];
  const isPremiumQ = q.testType === "complete";

  // Find which dimension number this is (1-9)
  const dimIndex = useMemo(() => {
    const seen = new Set<string>();
    for (let i = 0; i <= current; i++) {
      seen.add(testQuestions[i].category);
    }
    return seen.size;
  }, [current, testQuestions]);

  const handleSelect = useCallback((optionIdx: number) => {
    setSelectedIdx(optionIdx);
    const value = q.options[optionIdx].value;
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    addAnswer({ questionId: q.id, selectedValue: value, category: q.category });

    setTimeout(() => {
      setSelectedIdx(null);
      if (current < total - 1) {
        setDirection(1);
        setCurrent(c => c + 1);
      } else {
        setTestType(modo);
        navigate(`/resultado?modo=${modo === "complete" ? "completo" : "free"}`);
      }
    }, 500);
  }, [current, total, navigate, q, answers, addAnswer, modo, setTestType]);

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
              Dimensão {dimIndex} de 9 — <span className="text-foreground font-semibold">{q.categoryLabel}</span>
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              {modo === "complete" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  Premium <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                </span>
              )}
              Questão {current + 1} de {total} — {Math.round(progress)}% completo
            </span>
          </div>
          <motion.div className="h-2 rounded-full bg-muted overflow-hidden">
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
                {q.categoryLabel}
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
                  const wasSelected = answers[current] === opt.value && selectedIdx === null;
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
                      onClick={() => selectedIdx === null && handleSelect(i)}
                      className={`w-full text-left rounded-xl border-2 p-5 transition-colors ${
                        isPremiumQ ? "border-l-4 border-l-amber-400" : ""
                      } ${
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
                          {opt.text}
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
