import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/Layout";
import { categories } from "@/data/questions";
import { ArrowRight, CheckCircle, Star, BarChart3, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              DocHub Professional Pathways
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Descubra seu nível de{" "}
              <span className="text-accent">maturidade profissional</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70 md:text-xl">
              Avaliação completa de carreira para médicos — em minutos.
              Baseado em frameworks reconhecidos como OKR, GROW e PDCA.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/cadastro">
                  Começar Diagnóstico Gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-primary-foreground/50">
                12 perguntas · 5 minutos · Resultado imediato
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9 Eixos */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold text-foreground md:text-4xl">
              9 dimensões avaliadas
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-3 text-muted-foreground">
              Uma visão 360° da sua carreira médica
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                custom={i + 2}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:border-accent/30"
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{cat.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="border-y bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">Como funciona</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { step: '01', icon: CheckCircle, title: 'Responda', desc: 'Questionário rápido com 12 perguntas sobre sua carreira médica' },
              { step: '02', icon: BarChart3, title: 'Receba seu Score', desc: 'Score de maturidade profissional em 9 dimensões' },
              { step: '03', icon: FileText, title: 'Veja seu Relatório', desc: 'Mini-relatório com insights e recomendações personalizadas' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                  <item.icon className="h-8 w-8 text-accent" />
                </div>
                <span className="text-sm font-bold text-accent">{item.step}</span>
                <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-hero p-10 text-center shadow-xl">
            <Star className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground">
              Pronto para descobrir?
            </h2>
            <p className="mt-3 text-primary-foreground/70">
              Faça o diagnóstico gratuito e saiba exatamente onde investir no seu desenvolvimento profissional.
            </p>
            <Button variant="hero" size="lg" asChild className="mt-8">
              <Link to="/cadastro">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
