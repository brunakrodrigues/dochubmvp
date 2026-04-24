import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header, Footer } from "@/components/Layout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Button } from "@/components/ui/button";
import {
  Compass,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const marketStats = [
  { value: "3.700+", label: "programas de educação médica no Diretório Mundial de Escolas Médicas." },
  { value: "494", label: "escolas médicas registradas no Brasil em 2025." },
  { value: "50.974", label: "novos médicos formados por ano no país." },
  { value: "91,5%", label: "das novas vagas estão em instituições privadas." },
  { value: "83%", label: "das escolas médicas brasileiras sem módulo obrigatório em gestão e custos." },
  { value: "12 anos", label: "de tempo médio de retorno sobre o investimento na educação médica." },
  { value: "18%", label: "dos médicos brasileiros recebem treinamento em saúde organizacional." },
  { value: "42%", label: "dos profissionais da saúde relatam falta de capacitação em gestão e liderança." },
];

const contextGaps = [
  "Falta de competências em gestão e uso ético de IA na formação médica.",
  "A ausência de formação em gestão impacta diretamente a eficiência hospitalar.",
  "Necessidade de capacitação médica em gestão e interoperabilidade digital.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

export default function SobrePage() {
  const [waOpen, setWaOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      {/* Hero */}
      <section className="bg-gradient-hero py-20">
        <div className="container text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Compass className="h-3.5 w-3.5" /> A jornada
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            A jornada do médico no mercado de saúde
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/75">
            Entenda o contexto por trás da plataforma e por que a carreira médica precisa de uma nova estrutura de apoio.
          </p>
        </div>
      </section>

      {/* O contexto */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              O contexto
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Dados que mostram a realidade da formação médica
            </h2>
            <p className="mt-3 text-muted-foreground">
              Números que expõem as lacunas entre a formação tradicional e as novas exigências do mercado.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketStats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="font-display text-3xl font-bold text-accent md:text-4xl">{s.value}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-card">
            <h3 className="font-display text-lg font-semibold text-foreground">Lacunas estruturais</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {contextGaps.map((g) => (
                <li key={g} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Por que a plataforma existe */}
      <section className="border-y bg-muted/40 py-20">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Por que o DocHub existe
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Uma nova jornada para a carreira médica
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Lightbulb, title: "Metodologia consolidada", desc: "Ferramentas de mercado adaptadas à realidade médica." },
              { icon: GraduationCap, title: "Complemento à formação", desc: "Conhecimentos e habilidades que a graduação não entrega." },
              { icon: TrendingUp, title: "Sustentabilidade profissional", desc: "Gestão, tecnologia e ética para uma carreira sólida e duradoura." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border bg-card p-7 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-10 shadow-card">
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Pronto para dar o próximo passo na sua carreira?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Faça o teste profissional e descubra seu Índice de Perfil Profissional.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="hero" size="lg" asChild>
                <Link to="/cadastro">
                  Fazer teste de carreira
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => setWaOpen(true)}>
                Falar com especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} message="Olá! Gostaria de saber mais sobre a plataforma DocHub." context="Fale com o DocHub" />
    </div>
  );
}
