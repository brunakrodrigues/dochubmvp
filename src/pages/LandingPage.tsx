import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header, Footer } from "@/components/Layout";
import { FeatureCard, TestimonialCard } from "@/components/DocHubComponents";
import {
  ArrowRight,
  ClipboardCheck,
  BarChart3,
  BookOpen,
  Briefcase,
  Bot,
  Shield,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  Play,
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Teste Profissional",
    description: "Avaliação completa de maturidade profissional em múltiplas dimensões da carreira médica.",
  },
  {
    icon: BarChart3,
    title: "Score de Carreira",
    description: "Diagnóstico estruturado com score explicável e recomendações personalizadas.",
  },
  {
    icon: BookOpen,
    title: "Conteúdo Qualificado",
    description: "Artigos, vídeos e materiais educativos curados por especialistas do setor.",
  },
  {
    icon: Briefcase,
    title: "Serviços Especializados",
    description: "Marketplace de serviços com SLA garantido e parceiros verificados.",
  },
  {
    icon: Bot,
    title: "Copiloto IA",
    description: "Assistente inteligente baseado em evidências para apoiar suas decisões de carreira.",
  },
  {
    icon: Shield,
    title: "Governança e Segurança",
    description: "Dados protegidos, decisões rastreáveis e total transparência nas recomendações.",
  },
];

const stats = [
  { value: "1.000+", label: "Médicos ativos" },
  { value: "150+", label: "Assinaturas" },
  { value: "90%", label: "SLA cumprido" },
  { value: "95%", label: "Respostas com IA" },
];

const testimonials = [
  {
    quote: "O DocHub transformou minha visão sobre gestão de carreira. O teste profissional me deu clareza sobre onde investir meu tempo e recursos.",
    author: "Dra. Ana Oliveira",
    role: "Cardiologista, São Paulo",
  },
  {
    quote: "A combinação de conteúdo qualificado com serviços especializados economiza horas do meu dia. O Copiloto IA é impressionante.",
    author: "Dr. Carlos Mendes",
    role: "Cirurgião, Rio de Janeiro",
  },
  {
    quote: "Finalmente uma plataforma que entende as necessidades reais do médico brasileiro. Profissional e confiável.",
    author: "Dra. Beatriz Santos",
    role: "Pediatra, Belo Horizonte",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" size="lg" className="mb-6">
                <Bot className="mr-1.5 h-3.5 w-3.5" />
                Inteligência Artificial Integrada
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              A plataforma completa para{" "}
              <span className="text-accent">sua carreira médica</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-white/80 md:text-xl"
            >
              Diagnóstico profissional, inteligência aplicada, serviços especializados e desenvolvimento contínuo em um único ambiente confiável.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/cadastro">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/sobre">
                  <Play className="mr-2 h-5 w-5" />
                  Conheça o DocHub
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-3xl font-bold text-accent md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="border-b py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">Qual é o Valor da Saúde?</Badge>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Seu One Stop Shop profissional
            </h2>
            <p className="text-lg text-muted-foreground">
              O médico brasileiro carece de instrumentos estruturados para planejamento de carreira, tomada de decisão econômica e acesso qualificado a serviços. O DocHub centraliza essa jornada.
            </p>
          </div>

          {/* Journey Steps */}
          <div className="mt-16 grid gap-4 md:grid-cols-5">
            {[
              { step: 1, label: "Cadastro", desc: "Crie sua conta" },
              { step: 2, label: "Teste", desc: "Avaliação completa" },
              { step: 3, label: "Score", desc: "Diagnóstico" },
              { step: 4, label: "Recomendações", desc: "Trilha personalizada" },
              { step: 5, label: "Contratação", desc: "Serviços e planos" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-foreground">
                  {item.step}
                </div>
                <h3 className="mt-4 font-display font-semibold text-foreground">{item.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                {index < 4 && (
                  <div className="absolute left-[60%] top-7 hidden h-0.5 w-[80%] bg-border md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-muted-foreground">
              Módulos integrados que se complementam para apoiar cada etapa da sua jornada profissional.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 border-accent/30 bg-accent/20 text-accent">
                Inteligência Artificial
              </Badge>
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Copiloto DocHub: IA que entende sua carreira
              </h2>
              <p className="mb-6 text-primary-foreground/80">
                Nosso assistente inteligente utiliza RAG (Retrieval-Augmented Generation) e rede de agentes especializados para fornecer respostas fundamentadas e personalizadas.
              </p>
              <ul className="space-y-3">
                {[
                  "Respostas baseadas em evidências documentais",
                  "Recomendações contextualizadas ao seu perfil",
                  "Explicabilidade: saiba por que cada sugestão foi feita",
                  "Governança e rastreabilidade completas",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" className="mt-8" asChild>
                <Link to="/copiloto">
                  Experimentar o Copiloto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Card className="border-primary-foreground/10 bg-primary-foreground/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="rounded-2xl bg-primary-foreground px-4 py-2 text-sm text-primary">
                        Quais serviços fazem mais sentido para meu perfil atual?
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="rounded-2xl bg-accent/20 px-4 py-2 text-sm text-primary-foreground">
                        Com base no seu score de maturidade (72/100) e foco em gestão financeira, recomendo: Assessoria de Planejamento Tributário e o curso "Finanças para Médicos".
                        <p className="mt-2 text-xs opacity-70">
                          Fonte: Guia de Carreira DocHub, Cap. 5
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              O que dizem nossos usuários
            </h2>
            <p className="text-muted-foreground">
              Médicos de todo o Brasil já transformaram suas carreiras com o DocHub.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Pronto para transformar sua carreira?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Comece com o teste profissional gratuito e descubra seu score de maturidade.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="accent" size="xl" asChild>
                <Link to="/cadastro">
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/planos">Ver Planos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
