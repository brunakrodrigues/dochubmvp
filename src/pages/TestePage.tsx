import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Layout";
import { ArrowRight, ArrowLeft, CheckCircle2, HelpCircle } from "lucide-react";

interface Question {
  id: string;
  category: string;
  text: string;
  helpText?: string;
  options: { value: string; label: string; score: number }[];
}

const categories = [
  { id: "planejamento", name: "Planejamento de Carreira", icon: "📋" },
  { id: "financeiro", name: "Gestão Financeira", icon: "💰" },
  { id: "reputacao", name: "Imagem e Reputação", icon: "⭐" },
  { id: "tecnologia", name: "Uso de Tecnologia", icon: "💻" },
  { id: "etica", name: "Ética e Compliance", icon: "⚖️" },
];

const questions: Question[] = [
  {
    id: "q1",
    category: "planejamento",
    text: "Você possui um plano de carreira documentado com metas de curto, médio e longo prazo?",
    helpText: "Um plano estruturado ajuda a direcionar decisões e investimentos profissionais.",
    options: [
      { value: "a", label: "Não possuo nenhum planejamento formal", score: 0 },
      { value: "b", label: "Tenho ideias gerais, mas nada documentado", score: 1 },
      { value: "c", label: "Possuo um plano parcial, mas preciso atualizar", score: 2 },
      { value: "d", label: "Sim, tenho um plano completo e o reviso periodicamente", score: 3 },
    ],
  },
  {
    id: "q2",
    category: "planejamento",
    text: "Com que frequência você avalia seu progresso profissional em relação às suas metas?",
    options: [
      { value: "a", label: "Nunca faço esse tipo de avaliação", score: 0 },
      { value: "b", label: "Raramente, apenas quando algo acontece", score: 1 },
      { value: "c", label: "Anualmente ou semestralmente", score: 2 },
      { value: "d", label: "Trimestralmente ou mensalmente", score: 3 },
    ],
  },
  {
    id: "q3",
    category: "financeiro",
    text: "Você conhece seu custo-hora real considerando todos os seus custos operacionais?",
    helpText: "O custo-hora real inclui aluguel, funcionários, equipamentos, impostos e seu tempo.",
    options: [
      { value: "a", label: "Não sei calcular isso", score: 0 },
      { value: "b", label: "Tenho uma ideia aproximada", score: 1 },
      { value: "c", label: "Calculo periodicamente de forma básica", score: 2 },
      { value: "d", label: "Sim, controlo mensalmente com detalhes", score: 3 },
    ],
  },
  {
    id: "q4",
    category: "financeiro",
    text: "Você possui assessoria tributária/contábil especializada para profissionais médicos?",
    options: [
      { value: "a", label: "Não, faço tudo sozinho ou com contador genérico", score: 0 },
      { value: "b", label: "Tenho contador, mas não é especializado em médicos", score: 1 },
      { value: "c", label: "Tenho assessoria especializada, mas consulto raramente", score: 2 },
      { value: "d", label: "Sim, com acompanhamento regular e planejamento tributário", score: 3 },
    ],
  },
  {
    id: "q5",
    category: "reputacao",
    text: "Como você classificaria sua presença digital profissional (LinkedIn, site, redes)?",
    options: [
      { value: "a", label: "Praticamente inexistente ou desatualizada", score: 0 },
      { value: "b", label: "Básica, perfis criados mas sem manutenção", score: 1 },
      { value: "c", label: "Moderada, publico ocasionalmente", score: 2 },
      { value: "d", label: "Estratégica, com publicações regulares e engajamento", score: 3 },
    ],
  },
  {
    id: "q6",
    category: "tecnologia",
    text: "Qual seu nível de uso de ferramentas digitais na gestão do consultório/carreira?",
    options: [
      { value: "a", label: "Uso apenas papel e métodos tradicionais", score: 0 },
      { value: "b", label: "Uso ferramentas básicas (WhatsApp, planilhas)", score: 1 },
      { value: "c", label: "Uso sistemas específicos para algumas áreas", score: 2 },
      { value: "d", label: "Ambiente totalmente digitalizado e integrado", score: 3 },
    ],
  },
  {
    id: "q7",
    category: "etica",
    text: "Você possui documentação formal de consentimentos e protocolos éticos?",
    options: [
      { value: "a", label: "Não possuo documentação formal", score: 0 },
      { value: "b", label: "Tenho documentos básicos apenas", score: 1 },
      { value: "c", label: "Possuo documentação, mas preciso atualizar", score: 2 },
      { value: "d", label: "Sim, atualizada e revisada por especialista", score: 3 },
    ],
  },
];

export default function TestePage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentCategory = categories.find((c) => c.id === question.category);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate score and navigate to results
      const totalScore = Object.entries(answers).reduce((acc, [questionId, answer]) => {
        const q = questions.find((q) => q.id === questionId);
        const option = q?.options.find((o) => o.value === answer);
        return acc + (option?.score || 0);
      }, 0);
      const maxScore = questions.length * 3;
      const percentage = Math.round((totalScore / maxScore) * 100);
      navigate(`/score?score=${percentage}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      <div className="container py-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCategory?.icon}</span>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Questão {currentQuestion + 1} de {questions.length}
                  </p>
                  <p className="font-medium text-foreground">{currentCategory?.name}</p>
                </div>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                {Math.round(progress)}% completo
              </span>
            </div>
            <Progress value={progress} size="lg" indicatorVariant="accent" className="h-2" />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                        {question.text}
                      </h2>
                      {question.helpText && (
                        <button
                          onClick={() => setShowHelp(!showHelp)}
                          className="shrink-0 text-muted-foreground hover:text-accent"
                        >
                          <HelpCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {showHelp && question.helpText && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 text-sm text-muted-foreground"
                        >
                          💡 {question.helpText}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={handleAnswer}
                    className="space-y-3"
                  >
                    {question.options.map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Label
                          htmlFor={option.value}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                            answers[question.id] === option.value
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <span className="flex-1 text-sm md:text-base">{option.label}</span>
                          {answers[question.id] === option.value && (
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                          )}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button
              variant="accent"
              onClick={handleNext}
              disabled={!answers[question.id]}
            >
              {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Próxima"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Category Progress */}
          <div className="mt-12 grid grid-cols-5 gap-2">
            {categories.map((cat) => {
              const categoryQuestions = questions.filter((q) => q.category === cat.id);
              const answeredCount = categoryQuestions.filter((q) => answers[q.id]).length;
              const isComplete = answeredCount === categoryQuestions.length;
              const isActive = cat.id === question.category;

              return (
                <div
                  key={cat.id}
                  className={`rounded-lg p-3 text-center transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : isComplete
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <p className="mt-1 text-xs font-medium">{cat.name.split(" ")[0]}</p>
                  <p className="text-xs opacity-70">
                    {answeredCount}/{categoryQuestions.length}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
