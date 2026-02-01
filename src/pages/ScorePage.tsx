import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreDisplay } from "@/components/DocHubComponents";
import { Header, Footer } from "@/components/Layout";
import {
  ArrowRight,
  Download,
  Share2,
  TrendingUp,
  Target,
  BookOpen,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface ScoreCategory {
  id: string;
  name: string;
  icon: string;
  score: number;
  maxScore: number;
  status: "low" | "medium" | "good" | "excellent";
  insights: string[];
}

const getMaturityLevel = (score: number): { level: string; description: string; badge: "score-low" | "score-medium" | "score-good" | "score-excellent" } => {
  if (score < 25) return { level: "Iniciante", description: "Você está começando sua jornada de gestão profissional", badge: "score-low" };
  if (score < 50) return { level: "Em Desenvolvimento", description: "Você já deu os primeiros passos, mas há muito potencial a explorar", badge: "score-medium" };
  if (score < 75) return { level: "Avançado", description: "Você possui boa maturidade profissional em várias áreas", badge: "score-good" };
  return { level: "Expert", description: "Excelente! Você está entre os profissionais mais preparados", badge: "score-excellent" };
};

export default function ScorePage() {
  const [searchParams] = useSearchParams();
  const scoreParam = searchParams.get("score");
  const [score, setScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const finalScore = scoreParam ? parseInt(scoreParam) : 72;
  const maturity = getMaturityLevel(finalScore);

  const categories: ScoreCategory[] = [
    {
      id: "planejamento",
      name: "Planejamento de Carreira",
      icon: "📋",
      score: 65,
      maxScore: 100,
      status: "good",
      insights: ["Você tem metas definidas, mas falta um plano formal documentado"],
    },
    {
      id: "financeiro",
      name: "Gestão Financeira",
      icon: "💰",
      score: 45,
      maxScore: 100,
      status: "medium",
      insights: ["Oportunidade: assessoria tributária especializada pode otimizar seus impostos"],
    },
    {
      id: "reputacao",
      name: "Imagem e Reputação",
      icon: "⭐",
      score: 80,
      maxScore: 100,
      status: "excellent",
      insights: ["Excelente presença digital! Continue produzindo conteúdo"],
    },
    {
      id: "tecnologia",
      name: "Uso de Tecnologia",
      icon: "💻",
      score: 70,
      maxScore: 100,
      status: "good",
      insights: ["Bom uso de ferramentas. Considere integrar seus sistemas"],
    },
    {
      id: "etica",
      name: "Ética e Compliance",
      icon: "⚖️",
      score: 85,
      maxScore: 100,
      status: "excellent",
      insights: ["Documentação ética bem estruturada"],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(finalScore);
    }, 500);
    return () => clearTimeout(timer);
  }, [finalScore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      {/* Hero Score Section */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="accent" size="lg" className="mb-6">
                Resultado do Teste Profissional
              </Badge>
              <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Seu Score de Maturidade Profissional
              </h1>
            </motion.div>

            <div className="my-12 flex justify-center">
              <ScoreDisplay score={score} maxScore={100} size="lg" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <Badge variant={maturity.badge} size="lg" className="mb-4">
                {maturity.level}
              </Badge>
              <p className="text-lg text-white/80">{maturity.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/recomendacoes">
                  Ver Recomendações
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="glass" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Baixar Relatório
              </Button>
              <Button variant="glass" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Score Breakdown */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Análise por Dimensão
              </h2>
              <Button variant="ghost" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Ocultar detalhes" : "Mostrar detalhes"}
              </Button>
            </div>

            <div className="grid gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                >
                  <Card variant="default">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{category.icon}</span>
                          <div>
                            <h3 className="font-semibold text-foreground">{category.name}</h3>
                            <Badge variant={`score-${category.status}`} size="sm" className="mt-1">
                              {category.score}%
                            </Badge>
                          </div>
                        </div>
                        <div className="w-32">
                          <Progress
                            value={category.score}
                            size="lg"
                            indicatorVariant={
                              category.status === "excellent" ? "accent" :
                              category.status === "good" ? "success" :
                              category.status === "medium" ? "warning" : "destructive"
                            }
                          />
                        </div>
                      </div>

                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 border-t pt-4"
                        >
                          {category.insights.map((insight, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <span>{insight}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Score is Used */}
      <section className="border-t bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Card variant="accent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">Como este score é utilizado</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Seu score de maturidade profissional é utilizado de forma transparente para:
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex gap-3">
                    <Target className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Personalização</p>
                      <p className="text-sm text-muted-foreground">
                        Adaptar conteúdos e trilhas ao seu nível
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Briefcase className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Recomendações</p>
                      <p className="text-sm text-muted-foreground">
                        Sugerir serviços adequados às suas necessidades
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Evolução</p>
                      <p className="text-sm text-muted-foreground">
                        Acompanhar seu progresso ao longo do tempo
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="mt-12 text-center">
              <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                Pronto para evoluir sua carreira?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Com base no seu perfil, preparamos recomendações personalizadas de serviços e conteúdos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/recomendacoes">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Ver Recomendações
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/servicos">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Explorar Serviços
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
