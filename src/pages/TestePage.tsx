import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Layout";
import { useApp } from "@/context/AppContext";
import { getQuestionsForTest, categories } from "@/data/questions";
import { getLevel } from "@/data/reportTexts";
import { ArrowLeft } from "lucide-react";

export default function TestePage() {
  const navigate = useNavigate();
  const { testType, answers, addAnswer, setResult } = useApp();
  const testQuestions = getQuestionsForTest(testType);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const question = testQuestions[currentIndex];
  const total = testQuestions.length;
  const progress = ((currentIndex) / total) * 100;
  const cat = categories.find(c => c.id === question.category);
  const selectedValue = answers.find(a => a.questionId === question.id)?.selectedValue;

  const handleSelect = useCallback((value: number) => {
    addAnswer({ questionId: question.id, selectedValue: value, category: question.category });

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentIndex < total - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Calculate results
        const allAnswers = [...answers.filter(a => a.questionId !== question.id), { questionId: question.id, selectedValue: value, category: question.category }];
        const totalScore = allAnswers.reduce((sum, a) => sum + a.selectedValue, 0);
        const maxScore = testType === 'free' ? 48 : 100;

        const catScores = categories.map(c => {
          const catAnswers = allAnswers.filter(a => a.category === c.id);
          const score = catAnswers.reduce((s, a) => s + a.selectedValue, 0);
          const catQuestions = testQuestions.filter(q => q.category === c.id);
          return { category: c.id, score, maxScore: catQuestions.length * 4 };
        }).filter(c => c.maxScore > 0);

        const levelInfo = getLevel(totalScore, maxScore, testType);

        setResult({
          totalScore,
          maxScore,
          level: levelInfo.level,
          categoryScores: catScores,
          testType,
        });
        navigate('/score');
      }
    }, 400);
  }, [currentIndex, total, question, answers, testType, testQuestions, addAnswer, setResult, navigate]);

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant="public" />

      {/* Progress bar */}
      <div className="w-full bg-muted">
        <motion.div
          className="h-1.5 bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Category + counter */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} de {total}
            </span>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Category label */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl">{cat?.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  {cat?.name}
                </span>
              </div>

              {/* Question */}
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {question.text}
              </h2>

              {/* Options as cards */}
              <div className="mt-8 space-y-3">
                {question.options.map((option, i) => {
                  const isSelected = selectedValue === option.value;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(option.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full rounded-xl border-2 p-5 text-left transition-all ${
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-accent'
                          : 'border-border bg-card hover:border-accent/40 hover:shadow-card'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                          isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm font-medium text-foreground md:text-base">{option.text}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
