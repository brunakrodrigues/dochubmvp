import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/Layout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Check, Star, ArrowRight, Users, Award, BookOpen, Presentation, GraduationCap, Building2 } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  priceSuffix?: string;
  desc: string;
  highlight: boolean;
  items: string[];
  cta: string;
  accent?: boolean;
}

const plans: Plan[] = [
  {
    name: "Standard",
    price: "R$ 350",
    priceSuffix: "/mês",
    desc: "Comece sua jornada com o essencial para estruturar a carreira médica.",
    highlight: false,
    cta: "Assinar Standard",
    items: [
      "Teste profissional completo",
      "Plano de carreira personalizado",
      "Mentoria coletiva",
      "Artigos exclusivos",
      "5 aulas exclusivas por ano",
    ],
  },
  {
    name: "Premium",
    price: "R$ 830",
    priceSuffix: "/mês",
    desc: "Amplie seu desenvolvimento com workshops e cursos especializados.",
    highlight: true,
    cta: "Assinar Premium",
    items: [
      "Tudo do Standard",
      "2 workshops com especialistas por ano",
      "3 cursos exclusivos por ano",
    ],
  },
  {
    name: "Exclusive",
    price: "R$ 1.250",
    priceSuffix: "/mês",
    desc: "Mentoria individual e acompanhamento estratégico de carreira.",
    highlight: false,
    cta: "Assinar Exclusive",
    items: [
      "Tudo do Premium",
      "Mentoria individualizada",
      "Sessões on-line mensais de até 90 minutos",
      "Ferramentas de análise do perfil socioprofissional",
      "Gerenciamento psicossocial",
    ],
  },
  {
    name: "Associativo",
    price: "Sob consulta",
    desc: "Parceria para associações e empresas oferecerem o DocHub aos associados.",
    highlight: false,
    cta: "Solicitar proposta",
    items: [
      "Plataforma para todos os associados",
      "Descontos de 15% a 25%",
      "Plano fidelidade com pontos",
      "Conteúdos e aulas exclusivas",
    ],
  },
];

const standardLessons = [
  "Qual é o Valor da Saúde?",
  "O médico como agente de transformação",
  "Quem paga a conta?",
  "A saúde e as gerações",
  "Caminhos de transformação para a saúde",
];

const premiumWorkshops = [
  "Tecnologia e IA",
  "Finanças e investimentos",
  "Imagem e comunicação",
  "Fiscal e contábil",
  "Jurídico e compliance",
];

const premiumCourses = [
  "Reforma tributária e impactos para profissionais de saúde",
  "Empreendedorismo na saúde",
  "Ética, compliance e LGPD na saúde",
];

const exclusiveFocus = [
  "Planejamento de carreira",
  "Metas profissionais",
  "Qualidade e resultados",
  "Imagem e reputação",
  "Ética",
];

const associativeForAssoc = [
  { icon: Users, text: "Plataforma completa de serviços de qualidade para todos os associados." },
  { icon: Presentation, text: "1 workshop com especialistas por ano para todos os associados." },
  { icon: GraduationCap, text: "1 curso de 120 minutos para todos os associados: \"O médico como agente da transformação do mercado de saúde\"." },
  { icon: Building2, text: "Remuneração sobre todas as movimentações realizadas na plataforma pelos associados." },
];

const associativeForMember = [
  { icon: Award, text: "Descontos de 15% a 25% na contratação de serviços na plataforma." },
  { icon: Star, text: "Plano fidelidade com pontos para gerar descontos em novas compras." },
  { icon: BookOpen, text: "Acesso a artigos e conteúdos exclusivos." },
  { icon: GraduationCap, text: "Aulas exclusivas sobre desenvolvimento profissional." },
];

export default function PlanosPage() {
  const [waOpen, setWaOpen] = useState(false);
  const [waCtx, setWaCtx] = useState({ context: "", message: "" });

  const openWa = (context: string, message: string) => {
    setWaCtx({ context, message });
    setWaOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-20">
        <div className="container text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Star className="h-3.5 w-3.5" /> Planos
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            Planos para cada etapa da sua carreira
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/75">
            Standard, Premium, Exclusive e Associativo — escolha o nível de acompanhamento ideal para o seu momento profissional.
          </p>
        </div>
      </section>

      {/* Planos individuais */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-7 shadow-card transition-all hover:shadow-card-hover ${
                  p.highlight ? "border-accent bg-accent/5 shadow-accent" : "border-border bg-card"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    <Star className="mr-1 inline h-3 w-3" /> Mais popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground">{p.name}</h3>
                <p className="mt-2 min-h-[40px] text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-5">
                  <span className="font-display text-4xl font-bold text-foreground">{p.price}</span>
                  {p.priceSuffix && <p className="mt-1 text-xs text-muted-foreground">{p.priceSuffix}</p>}
                </div>
                <ul className="mt-6 flex-grow space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.highlight ? "hero" : "default"}
                  className="mt-6 w-full"
                  onClick={() =>
                    openWa(
                      p.name === "Associativo" ? "Plano Associativo" : `Assinatura ${p.name}`,
                      p.name === "Associativo"
                        ? "Olá! Gostaria de solicitar uma proposta para o Plano Associativo."
                        : `Olá! Tenho interesse no plano ${p.name}.`
                    )
                  }
                >
                  {p.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detalhes dos planos */}
      <section className="border-y bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              O que está incluído em cada plano
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {/* Standard lessons */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Standard</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">Aulas exclusivas</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {standardLessons.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium workshops + courses */}
            <div className="rounded-2xl border border-accent/40 bg-accent/5 p-7 shadow-accent">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Premium</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">Workshops</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {premiumWorkshops.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">Cursos</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {premiumCourses.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusive focus */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Exclusive</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">Mentoria individualizada</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Mentoria especializada individual, com sessões mensais on-line de até 90 minutos, aplicando ferramentas para análise do perfil socioprofissional e gerenciamento psicossocial.
              </p>
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Focos</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {exclusiveFocus.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plano Associativo */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl border border-accent/30 bg-gradient-to-br from-primary to-primary/85 p-8 text-primary-foreground md:p-12">
            <div className="mb-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <Users className="h-3.5 w-3.5" /> Plano Associativo
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Para associações e empresas de saúde
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/75">
                Uma parceria estratégica para oferecer serviços de alto valor aos associados, com benefícios compartilhados.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="font-display text-lg font-semibold">Vantagens para a associação ou empresa</h3>
                <ul className="mt-4 space-y-3">
                  {associativeForAssoc.map((v) => (
                    <li key={v.text} className="flex items-start gap-3 text-sm text-primary-foreground/85">
                      <v.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {v.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="font-display text-lg font-semibold">Vantagens para o associado</h3>
                <ul className="mt-4 space-y-3">
                  {associativeForMember.map((v) => (
                    <li key={v.text} className="flex items-start gap-3 text-sm text-primary-foreground/85">
                      <v.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {v.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button
                variant="accent"
                size="xl"
                onClick={() =>
                  openWa(
                    "Plano Associativo",
                    "Olá! Gostaria de solicitar uma proposta para o Plano Associativo."
                  )
                }
              >
                Solicitar proposta associativa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppModal
        open={waOpen}
        onOpenChange={setWaOpen}
        context={waCtx.context || "Planos DocHub"}
        message={waCtx.message || "Olá! Gostaria de saber mais sobre os planos."}
      />
    </div>
  );
}
