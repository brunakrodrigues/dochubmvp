import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/Layout";
import WhatsAppModal from "@/components/WhatsAppModal";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Compass,
  LayoutGrid,
  Sparkles,
  ClipboardList,
  Briefcase,
  Phone,
  Mail,
  MessageCircle,
  GraduationCap,
  HeartPulse,
  Scale,
  Calculator,
  Megaphone,
  LineChart,
  ShieldCheck,
  Cpu,
  Building2,
  HardHat,
  BookOpen,
  Users,
  PlayCircle,
  Presentation,
  Store,
  Briefcase as BriefcaseIcon,
  ClipboardCheck,
  Brain,
  Apple,
  Dumbbell,
  FileText,
  Video,
  FileSearch,
  MessageSquare,
  UserPlus,
  Map,
  Award,
  Gift,
  Star,
  Trophy,
  Lightbulb,
  Shield,
  TrendingUp,
  BarChart3,
  Stethoscope,
  Building,
  Globe,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const purposeItems = [
  {
    icon: Lightbulb,
    title: "Metodologia inovadora",
    desc: "Orientação baseada em ferramentas consolidadas de mercado aplicadas à realidade médica.",
  },
  {
    icon: Users,
    title: "Time multiprofissional",
    desc: "Especialistas com amplo conhecimento do mercado de saúde, gestão, finanças e tecnologia.",
  },
  {
    icon: GraduationCap,
    title: "Além da formação médica",
    desc: "Conhecimentos e habilidades que complementam o que a graduação em medicina não entrega.",
  },
  {
    icon: Brain,
    title: "Conhecimento estratégico",
    desc: "Acervo científico, aulas, cursos e mentorias sobre gestão, carreira e novos negócios na saúde.",
  },
  {
    icon: HeartPulse,
    title: "Suporte personalizado",
    desc: "Atendimento alinhado à rotina médica, com serviços sob medida e canais diretos de comunicação.",
  },
];

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
  "Ausência de formação em gestão impacta diretamente a eficiência hospitalar.",
  "Necessidade de capacitação médica em gestão e interoperabilidade digital.",
];

const platformBlocks = [
  {
    icon: ClipboardCheck,
    title: "Teste profissional com plano personalizado",
    desc: "Avaliação completa do perfil médico com direcionamento sobre carreira, gestão e próximos passos.",
  },
  {
    icon: BookOpen,
    title: "Acervo científico em gestão e carreira",
    desc: "Artigos, publicações e pesquisas selecionadas para apoiar decisões estratégicas da rotina médica.",
  },
  {
    icon: Compass,
    title: "Mentoria de carreira e negócios",
    desc: "Acompanhamento individual e coletivo com especialistas do mercado de saúde.",
  },
  {
    icon: Briefcase,
    title: "Assessoria especializada",
    desc: "Jurídico, contábil, financeiro, imagem, tecnologia e saúde ocupacional em um só lugar.",
  },
  {
    icon: Presentation,
    title: "Aulas, cursos e workshops",
    desc: "Programas exclusivos com especialistas sobre os temas que a faculdade de medicina não aborda.",
  },
  {
    icon: Building2,
    title: "Consultoria para serviços de saúde",
    desc: "Apoio para estruturação, gestão e expansão de clínicas, consultórios e operações em saúde.",
  },
  {
    icon: Store,
    title: "Painel de fornecedores especializados",
    desc: "Fornecedores certificados com preços diferenciados para profissionais da saúde.",
  },
];

const experienceSteps = [
  { icon: UserPlus, title: "Cadastro gratuito", desc: "Crie sua conta em poucos minutos e personalize seu perfil médico." },
  { icon: Map, title: "Tour explicativo", desc: "Conheça as áreas, serviços e possibilidades da plataforma." },
  { icon: ClipboardCheck, title: "Teste gratuito de carreira", desc: "Receba relatório do seu perfil profissional e direcionamentos." },
  { icon: LayoutGrid, title: "Acesso gratuito ao DocHub", desc: "Explore a área logada com conteúdos exclusivos e liberados." },
  { icon: PlayCircle, title: "Conteúdos gratuitos", desc: "Pílulas de aulas, vídeos, artigos sobre gestão e carreira e publicações personalizadas." },
  { icon: Sparkles, title: "Meu acesso", desc: "Ambiente pessoal com histórico, favoritos e recomendações." },
  { icon: Gift, title: "Compra avulsa", desc: "Contrate serviços específicos sem compromisso mensal." },
  { icon: Star, title: "Plano individual", desc: "Assinatura com benefícios contínuos em conteúdos e serviços." },
  { icon: Users, title: "Plano associativo", desc: "Parceria com associações e empresas para ampliar o benefício aos médicos." },
  { icon: MessageCircle, title: "Comunicação via WhatsApp", desc: "Canais diretos com especialistas e fornecedores parceiros." },
];

const strategyCards = [
  {
    icon: ShieldCheck,
    title: "Facilidade com segurança",
    desc:
      "Ajudar médicos na contratação rápida de serviços essenciais para o exercício da profissão, com segurança, compliance e sigilo. Tudo em um só lugar, com fornecedores certificados e serviço garantido.",
  },
  {
    icon: Award,
    title: "Valorização da profissão médica",
    desc:
      "Desenvolver uma jornada de proteção da carreira com responsabilidade e protagonismo, buscando melhores condições comerciais e novas formas de remuneração por resultados e performance.",
  },
  {
    icon: TrendingUp,
    title: "Novas oportunidades de mercado",
    desc:
      "Criar uma trilha de aprendizado, desenvolvimento de ideias, projetos e oportunidades, com espaço para gestão, aceleração, fomento e mentoria de novos produtos, serviços e negócios na área da saúde.",
  },
  {
    icon: Globe,
    title: "Reequilíbrio do sistema de saúde",
    desc:
      "Com uma estrutura adequada de carreira e novas habilidades de gestão, a categoria médica pode contribuir para o alinhamento dos incentivos do sistema de saúde e mitigação das distorções atuais.",
  },
];

const testAxes = [
  "Imagem e reputação",
  "Ética e conduta profissional",
  "Planejamento de carreira",
  "Metas profissionais",
  "Qualidade e resultados",
  "Uso de tecnologia e inovação",
  "Gestão financeira e benefícios",
  "Assessorias e suporte profissional",
  "Visão de negócio e empreendedorismo",
];

const methodologies = [
  "Modelo AIDA adaptado para profissionais de saúde",
  "Declaração de Genebra",
  "Código de Ética Médica",
  "Modelo Holland de Planejamento de Carreira",
  "GROW Coaching Framework",
  "OKRs",
  "SMART Goals",
  "Ciclo de Melhoria Contínua",
];

const maturityLevels = [
  { range: "0 – 40", level: "Iniciante", color: "bg-destructive/10 border-destructive/30 text-destructive", direction: "Mentoria básica + assessorias de estruturação." },
  { range: "41 – 70", level: "Intermediário", color: "bg-warning/10 border-warning/30 text-warning", direction: "Mentoria personalizada + assessoria setorial." },
  { range: "71 – 90", level: "Avançado", color: "bg-success/10 border-success/30 text-success", direction: "Mentoria estratégica + desenvolvimento de projetos." },
  { range: "91 – 100", level: "Líder de Valor", color: "bg-accent/10 border-accent/40 text-accent", direction: "Mentoria premium + novos negócios + inserção como mentor/consultor parceiro." },
];

type ServiceCategory = {
  id: string;
  title: string;
  desc: string;
  items: { icon: React.ElementType; title: string; desc: string }[];
};

const serviceCategories: ServiceCategory[] = [
  {
    id: "essenciais",
    title: "Serviços essenciais",
    desc: "Estrutura completa para o exercício seguro da profissão.",
    items: [
      { icon: Scale, title: "Jurídico e compliance", desc: "Assessoria jurídica especializada em saúde." },
      { icon: Calculator, title: "Fiscal e contábil", desc: "Planejamento tributário e contabilidade médica." },
      { icon: Megaphone, title: "Imagem e comunicação", desc: "Estratégia de marca, conteúdo e reputação." },
      { icon: LineChart, title: "Financeira e investimentos", desc: "Planejamento e gestão patrimonial." },
      { icon: ShieldCheck, title: "Seguros e benefícios", desc: "Proteção profissional, patrimonial e pessoal." },
      { icon: Cpu, title: "Tecnologia e IA", desc: "Transformação digital e uso ético de IA na saúde." },
      { icon: HardHat, title: "Engenharia e arquitetura", desc: "Projetos para clínicas, consultórios e hospitais." },
      { icon: Shield, title: "Saúde e segurança do trabalho", desc: "Adequação às normas e cuidados com a equipe." },
    ],
  },
  {
    id: "desenvolvimento",
    title: "Desenvolvimento profissional",
    desc: "Educação contínua, mentoria e crescimento de carreira.",
    items: [
      { icon: ClipboardCheck, title: "Teste profissional com plano personalizado", desc: "Diagnóstico e direcionamento estratégico." },
      { icon: Compass, title: "Mentoria de carreira", desc: "Acompanhamento individual para evolução profissional." },
      { icon: TrendingUp, title: "Mentoria de negócios", desc: "Apoio para empreender e escalar operações em saúde." },
      { icon: GraduationCap, title: "Ensino em gestão e carreira", desc: "Trilhas educacionais com foco no mercado médico." },
      { icon: Presentation, title: "Palestras", desc: "Eventos com referências do setor." },
      { icon: BookOpen, title: "Cursos", desc: "Cursos exclusivos sobre temas estratégicos." },
      { icon: Users, title: "Workshops com especialistas", desc: "Imersões práticas em temas críticos." },
      { icon: Video, title: "Aulas", desc: "Aulas ao vivo e sob demanda." },
      { icon: FileText, title: "Acervo científico completo", desc: "Artigos e publicações selecionadas." },
    ],
  },
  {
    id: "mercado",
    title: "Mercado em saúde",
    desc: "Oportunidades, operação e análises para o ecossistema.",
    items: [
      { icon: Store, title: "Marketplace para médicos", desc: "Contratação de serviços com preços diferenciados." },
      { icon: Building, title: "Facilities para serviços de saúde", desc: "Suporte operacional especializado." },
      { icon: BriefcaseIcon, title: "Painel de vagas e oportunidades", desc: "Conexão com o mercado de trabalho médico." },
      { icon: Stethoscope, title: "Consultoria em gestão de serviços em saúde", desc: "Estruturação e expansão de operações." },
      { icon: FileSearch, title: "Auditoria de serviços de saúde", desc: "Qualidade, compliance e eficiência." },
    ],
  },
  {
    id: "qualidade",
    title: "Qualidade de vida e equilíbrio",
    desc: "Bem-estar para sustentar uma carreira longa e saudável.",
    items: [
      { icon: Brain, title: "Suporte psicológico especializado", desc: "Atendimento focado na rotina médica." },
      { icon: Apple, title: "Suporte nutricional especializado", desc: "Saúde alimentar para profissionais de saúde." },
      { icon: Dumbbell, title: "Suporte de atividade física", desc: "Programas para equilíbrio e performance." },
    ],
  },
];

const plansPreview = [
  {
    name: "Standard",
    price: "R$ 350",
    highlight: false,
    items: ["Teste profissional completo", "Plano de carreira personalizado", "Mentoria coletiva", "Artigos exclusivos", "5 aulas exclusivas por ano"],
  },
  {
    name: "Premium",
    price: "R$ 830",
    highlight: true,
    items: ["Tudo do Standard", "2 workshops com especialistas por ano", "3 cursos exclusivos por ano"],
  },
  {
    name: "Exclusive",
    price: "R$ 1.250",
    highlight: false,
    items: ["Tudo do Premium", "Mentoria individualizada mensal", "Sessões on-line de até 90 minutos"],
  },
  {
    name: "Associativo",
    price: "Sob consulta",
    highlight: false,
    items: ["Plataforma para todos os associados", "Descontos de 15% a 25%", "Plano fidelidade com pontos", "Conteúdos e aulas exclusivas"],
  },
];

export default function LandingPage() {
  const [waOpen, setWaOpen] = useState(false);
  const [activeServiceCat, setActiveServiceCat] = useState<string>(serviceCategories[0].id);
  const activeCategory = serviceCategories.find((c) => c.id === activeServiceCat)!;

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Big Logo in hero */}
            <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent shadow-accent">
                <span className="font-display text-2xl font-bold text-accent-foreground">D</span>
              </div>
              <div className="text-left leading-tight">
                <span className="block font-display text-2xl font-bold text-primary-foreground">DocHub</span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-primary-foreground/60">
                  Professional Pathways
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Serviços essenciais para a{" "}
              <span className="text-accent">carreira médica</span> em um só lugar.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/75 md:text-xl">
              Uma plataforma para auxiliar médicos na estruturação da carreira de forma responsável, no
              planejamento profissional com ética e na contratação de serviços especializados com preços
              diferenciados.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="hero" size="xl" asChild>
                <a href="#plataforma">
                  Conhecer a plataforma
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="accent" size="xl" asChild>
                <Link to="/cadastro">
                  Fazer teste de carreira
                  <ClipboardCheck className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-white/30 bg-white/5 text-primary-foreground hover:bg-white/15">
                <Link to="/planos">
                  Ver planos
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* O PROPÓSITO — Editorial split layout */}
      <section id="proposito" className="scroll-mt-24 py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            {/* Coluna esquerda: headline editorial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <Target className="h-3.5 w-3.5" /> O propósito
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Por que o
                <span className="block text-accent">DocHub existe</span>
              </h2>
              <div className="mt-6 h-px w-20 bg-gradient-to-r from-accent to-transparent" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Complementar a formação médica com estrutura, conhecimento e serviços que acompanham a realidade da profissão.
              </p>
              <div className="mt-10 hidden items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur lg:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Cinco pilares que sustentam a plataforma.
                </p>
              </div>
            </motion.div>

            {/* Coluna direita: linhas numeradas */}
            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative divide-y divide-border border-y border-border"
            >
              {purposeItems.map((p, i) => (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  className="group relative grid grid-cols-[auto_1fr] gap-5 py-7 md:grid-cols-[80px_auto_1fr] md:gap-8 md:py-8"
                >
                  {/* Numeração grande */}
                  <span className="row-span-2 self-start font-display text-4xl font-bold tabular-nums text-muted-foreground/30 transition-colors group-hover:text-accent md:row-span-1 md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Ícone */}
                  <div className="col-start-2 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-accent-foreground md:row-span-1">
                    <p.icon className="h-5 w-5" />
                  </div>

                  {/* Conteúdo */}
                  <div className="col-span-full md:col-start-3 md:col-end-auto md:row-start-1">
                    <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {p.desc}
                    </p>
                  </div>

                  {/* Linha accent animada no hover */}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* A JORNADA / O CONTEXTO */}
      <section id="jornada" className="scroll-mt-24 border-y bg-muted/40 py-20 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Compass className="h-3.5 w-3.5" /> A jornada
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              O contexto do mercado médico
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 text-muted-foreground">
              Dados que mostram por que uma plataforma como o DocHub precisa existir.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketStats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
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

      {/* O FUTURO */}
      <section id="futuro" className="scroll-mt-24 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-hero p-10 text-center shadow-xl md:p-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" /> O futuro
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              A carreira médica exige preparo além da formação tradicional.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              O médico precisa atuar além da prática clínica, desenvolvendo gestão, carreira, tecnologia, negócios,
              comunicação, ética, IA e visão estratégica. A plataforma conecta conhecimento, serviços, orientação e
              oportunidades para apoiar médicos em uma jornada mais estratégica, segura e sustentável.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {["Gestão", "Carreira", "Tecnologia", "Negócios", "Comunicação", "Ética", "IA", "Estratégia"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A PLATAFORMA — Bento grid */}
      <section id="plataforma" className="scroll-mt-24 overflow-hidden border-y bg-primary py-20 text-primary-foreground md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="container relative">
          <div className="mb-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <LayoutGrid className="h-3.5 w-3.5" /> A plataforma
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
                Uma plataforma completa para <span className="text-accent">a carreira médica</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-primary-foreground/70 md:text-right">
              Para auxiliar médicos na estruturação da carreira, no desenvolvimento profissional e na contratação de serviços especializados.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6"
          >
            {platformBlocks.map((b, i) => {
              // Bento layout: items 0 and 5 are featured (span 4 cols on desktop)
              const featured = i === 0 || i === 5;
              const spanClass = featured ? "md:col-span-4" : "md:col-span-2";
              return (
                <motion.a
                  key={b.title}
                  href="#painel-servicos"
                  variants={fadeUp}
                  custom={i}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all ${spanClass} ${
                    featured
                      ? "border-accent/30 bg-gradient-to-br from-accent/20 via-accent/10 to-primary shadow-[0_0_40px_-12px_hsl(173_58%_39%_/_0.4)] hover:border-accent/60"
                      : "border-white/10 bg-white/[0.04] backdrop-blur hover:border-accent/40 hover:bg-white/[0.07]"
                  }`}
                >
                  {/* Decorative glow on featured */}
                  {featured && (
                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl transition-opacity group-hover:opacity-70" />
                  )}

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all group-hover:scale-110 ${
                        featured ? "bg-accent text-accent-foreground shadow-accent" : "bg-accent/10 text-accent"
                      }`}
                    >
                      <b.icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-xs font-semibold tabular-nums text-primary-foreground/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={`relative mt-5 font-display font-semibold leading-tight ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
                    {b.title}
                  </h3>
                  <p className={`relative mt-2 flex-grow text-sm leading-relaxed text-primary-foreground/70 ${featured ? "md:max-w-lg md:text-base" : ""}`}>
                    {b.desc}
                  </p>

                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Saiba mais
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* A EXPERIÊNCIA */}
      <section id="experiencia" className="scroll-mt-24 py-20 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" /> A experiência
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              A jornada do médico na plataforma
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 text-muted-foreground">
              Simples, descomplicada e conectada à rotina médica.
            </motion.p>
          </motion.div>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2 md:block" />
            <ol className="space-y-5 md:space-y-8">
              {experienceSteps.map((step, i) => {
                const isRight = i % 2 === 1;
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className={`relative md:grid md:grid-cols-2 md:gap-12 ${isRight ? "md:[&>div:first-child]:order-2" : ""}`}
                  >
                    <div className={`rounded-2xl border border-border bg-card p-5 shadow-card md:p-6 ${isRight ? "md:text-left" : "md:text-right"}`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">Etapa {String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                    <div className="absolute left-4 top-5 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-accent text-accent-foreground shadow-accent">
                        <step.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* A ESTRATÉGIA */}
      <section id="estrategia" className="scroll-mt-24 border-y bg-muted/40 py-20 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Trophy className="h-3.5 w-3.5" /> A estratégia
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Quatro pilares que orientam a plataforma
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-2">
            {strategyCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:border-accent/40 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-accent shadow-accent">
                    <card.icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{card.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTE DE CARREIRA */}
      <section id="teste-carreira" className="scroll-mt-24 py-20 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <ClipboardList className="h-3.5 w-3.5" /> Teste profissional
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Teste de carreira e Índice de Perfil Profissional
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 text-muted-foreground">
              Uma avaliação completa da maturidade profissional médica, com direcionamentos personalizados.
            </motion.p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {/* Eixos */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">O que o teste avalia</h3>
              <ul className="mt-4 space-y-2">
                {testAxes.map((axis) => (
                  <li key={axis} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-accent" />
                    {axis}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metodologia */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Metodologia</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Baseado em ferramentas consolidadas e validadas, adaptadas para a realidade médica.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {methodologies.map((m) => (
                  <span key={m} className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Pontuação */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card lg:col-span-2">
              <h3 className="font-display text-lg font-semibold text-foreground">Sistema de pontuação</h3>
              <p className="mt-1 text-sm text-muted-foreground">Cada pergunta vale até 4 pontos.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { alt: "Alternativa 1", pts: "4 pontos" },
                  { alt: "Alternativa 2", pts: "3 pontos" },
                  { alt: "Alternativa 3", pts: "2 pontos" },
                  { alt: "Alternativa 4", pts: "1 ponto" },
                ].map((p) => (
                  <div key={p.alt} className="rounded-xl border border-border bg-muted/40 p-4">
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.alt}</span>
                    <span className="mt-1 block font-display text-2xl font-bold text-accent">{p.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabela de maturidade */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-semibold text-foreground">Tabela de maturidade</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {maturityLevels.map((m) => (
                  <div key={m.level} className={`rounded-2xl border p-5 ${m.color}`}>
                    <span className="block text-xs font-semibold uppercase tracking-wider opacity-80">{m.range}</span>
                    <h4 className="mt-1 font-display text-lg font-bold">{m.level}</h4>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-current/10">
                      <div className="h-full rounded-full bg-current" style={{ width: m.range.includes("0 – 40") ? "40%" : m.range.includes("41 – 70") ? "70%" : m.range.includes("71 – 90") ? "90%" : "100%" }} />
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-foreground/70">{m.direction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/cadastro">
                Fazer teste profissional
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PAINEL DE SERVIÇOS */}
      <section id="painel-servicos" className="scroll-mt-24 border-y bg-muted/40 py-20 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-10 max-w-2xl text-center">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Briefcase className="h-3.5 w-3.5" /> Painel de serviços
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Tudo o que o médico precisa em um só lugar
            </motion.h2>
          </motion.div>

          {/* Filtros */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveServiceCat(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeServiceCat === c.id
                    ? "bg-accent text-accent-foreground shadow-accent"
                    : "bg-card text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">{activeCategory.desc}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeCategory.items.map((item, i) => (
              <motion.div
                key={`${activeCategory.id}-${item.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-accent/40 hover:shadow-card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <Link to="/cadastro" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                  Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS (preview) */}
      <section id="planos" className="scroll-mt-24 py-20 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-12 max-w-2xl text-center">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Star className="h-3.5 w-3.5" /> Planos
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Escolha o plano ideal para sua jornada
            </motion.h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {plansPreview.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-card transition-all hover:shadow-card-hover ${
                  plan.highlight ? "border-accent bg-accent/5 shadow-accent" : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    Mais popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="mt-3">
                  <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.price !== "Sob consulta" && <span className="text-sm text-muted-foreground"> /mês</span>}
                </div>
                <ul className="mt-5 flex-grow space-y-2">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? "hero" : "outline"} className="mt-6 w-full" asChild>
                  <Link to="/planos">Ver detalhes</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/planos">
                Comparar planos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="scroll-mt-24 border-t bg-gradient-hero py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Phone className="h-3.5 w-3.5" /> Contato
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Fale com o DocHub
            </h2>
            <p className="mt-3 text-primary-foreground/70">
              Pronto para estruturar sua carreira médica? Estamos à disposição.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
                  JA
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground">José Antonio Coelho Júnior</h3>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-primary-foreground/80 sm:grid-cols-3">
                <a href="tel:+5511996015230" className="flex items-center justify-center gap-2 hover:text-accent">
                  <Phone className="h-4 w-4" /> (11) 99601-5230
                </a>
                <a href="tel:+5519997942782" className="flex items-center justify-center gap-2 hover:text-accent">
                  <Phone className="h-4 w-4" /> (19) 99794-2782
                </a>
                <a href="mailto:jose.coelho@lc.med.br" className="flex items-center justify-center gap-2 hover:text-accent">
                  <Mail className="h-4 w-4" /> jose.coelho@lc.med.br
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => setWaOpen(true)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Button>
                <Button variant="accent" size="lg" asChild>
                  <a href="mailto:jose.coelho@lc.med.br">
                    <Mail className="mr-2 h-5 w-5" /> Enviar e-mail
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppModal
        open={waOpen}
        onOpenChange={setWaOpen}
        message="Olá! Gostaria de saber mais sobre a plataforma DocHub."
        context="Fale com o DocHub"
      />
    </div>
  );
}
