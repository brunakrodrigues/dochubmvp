import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header, Footer } from "@/components/Layout";
import { CopilotChat } from "@/components/CopilotChat";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const recommendations = [
  {
    type: "service",
    title: "Assessoria de Planejamento Tributário",
    description: "Otimize sua estrutura fiscal e reduza impostos de forma legal.",
    reason: "Seu score em Gestão Financeira (45%) indica oportunidade de melhoria significativa.",
    priority: "high",
    price: "A partir de R$ 1.500",
  },
  {
    type: "content",
    title: "Curso: Finanças para Médicos",
    description: "Aprenda a gerenciar suas finanças pessoais e profissionais.",
    reason: "Conteúdo alinhado ao seu perfil e momento de carreira.",
    priority: "medium",
    isFree: true,
  },
  {
    type: "service",
    title: "Mentoria de Carreira",
    description: "Sessões individuais com especialistas em gestão médica.",
    reason: "Complementa sua jornada de desenvolvimento profissional.",
    priority: "medium",
    price: "R$ 500/sessão",
  },
];

export default function RecomendacoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" isAuthenticated />

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Recomendações Personalizadas
              </h1>
              <p className="mt-2 text-muted-foreground">
                Com base no seu score de 72% e perfil profissional
              </p>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="interactive">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant={rec.type === "service" ? "accent" : "secondary"}>
                              {rec.type === "service" ? <Briefcase className="mr-1 h-3 w-3" /> : <BookOpen className="mr-1 h-3 w-3" />}
                              {rec.type === "service" ? "Serviço" : "Conteúdo"}
                            </Badge>
                            {rec.priority === "high" && (
                              <Badge variant="warning">Prioritário</Badge>
                            )}
                            {rec.isFree && <Badge variant="success">Gratuito</Badge>}
                          </div>
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {rec.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{rec.description}</p>
                          <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent/5 p-3">
                            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <p className="text-xs text-muted-foreground">
                              <strong>Por que recomendamos:</strong> {rec.reason}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {rec.price && (
                            <p className="mb-2 font-semibold text-foreground">{rec.price}</p>
                          )}
                          <Button variant="accent" size="sm">
                            Ver Detalhes
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/conteudo">Ver Mais Conteúdos</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/servicos">Ver Mais Serviços</Link>
              </Button>
            </div>
          </div>

          {/* Sidebar - Copilot */}
          <div className="lg:col-span-1">
            <CopilotChat className="sticky top-24 h-[600px]" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
