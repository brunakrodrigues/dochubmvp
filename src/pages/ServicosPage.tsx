import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ArrowRight,
  Scale,
  Calculator,
  Megaphone,
  LineChart,
  ShieldCheck,
  Cpu,
  HardHat,
  Shield,
  ClipboardCheck,
  Compass,
  TrendingUp,
  GraduationCap,
  Presentation,
  BookOpen,
  Users,
  Video,
  FileText,
  Store,
  Building,
  Briefcase,
  Stethoscope,
  FileSearch,
  Brain,
  Apple,
  Dumbbell,
} from "lucide-react";

type ServiceItem = {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
};

type Category = {
  id: string;
  title: string;
  desc: string;
  items: ServiceItem[];
};

const categories: Category[] = [
  {
    id: "essenciais",
    title: "Serviços essenciais",
    desc: "Estrutura completa para o exercício seguro da profissão.",
    items: [
      { id: "juridico-compliance", icon: Scale, title: "Jurídico e compliance", desc: "Assessoria jurídica especializada em saúde." },
      { id: "fiscal-contabil", icon: Calculator, title: "Fiscal e contábil", desc: "Planejamento tributário e contabilidade médica." },
      { id: "imagem-comunicacao", icon: Megaphone, title: "Imagem e comunicação", desc: "Estratégia de marca, conteúdo e reputação." },
      { id: "financeira-investimentos", icon: LineChart, title: "Financeira e investimentos", desc: "Planejamento e gestão patrimonial." },
      { id: "seguros-beneficios", icon: ShieldCheck, title: "Seguros e benefícios", desc: "Proteção profissional, patrimonial e pessoal." },
      { id: "tecnologia-ia", icon: Cpu, title: "Tecnologia e IA", desc: "Transformação digital e uso ético de IA." },
      { id: "engenharia-arquitetura", icon: HardHat, title: "Engenharia e arquitetura", desc: "Projetos para clínicas e consultórios." },
      { id: "saude-seguranca-trabalho", icon: Shield, title: "Saúde e segurança do trabalho", desc: "Adequação às normas e cuidados com a equipe." },
    ],
  },
  {
    id: "desenvolvimento",
    title: "Desenvolvimento profissional",
    desc: "Educação contínua, mentoria e crescimento de carreira.",
    items: [
      { id: "teste-profissional", icon: ClipboardCheck, title: "Teste profissional com plano personalizado", desc: "Diagnóstico e direcionamento estratégico." },
      { id: "mentoria-carreira", icon: Compass, title: "Mentoria de carreira", desc: "Acompanhamento individual para evolução." },
      { id: "mentoria-negocios", icon: TrendingUp, title: "Mentoria de negócios", desc: "Apoio para empreender e escalar em saúde." },
      { id: "ensino-gestao", icon: GraduationCap, title: "Ensino em gestão e carreira", desc: "Trilhas educacionais com foco médico." },
      { id: "palestras", icon: Presentation, title: "Palestras", desc: "Eventos com referências do setor." },
      { id: "cursos", icon: BookOpen, title: "Cursos", desc: "Cursos exclusivos sobre temas estratégicos." },
      { id: "workshops", icon: Users, title: "Workshops com especialistas", desc: "Imersões práticas em temas críticos." },
      { id: "aulas", icon: Video, title: "Aulas", desc: "Aulas ao vivo e sob demanda." },
      { id: "acervo-cientifico", icon: FileText, title: "Acervo científico completo", desc: "Artigos e publicações selecionadas." },
    ],
  },
  {
    id: "mercado",
    title: "Mercado em saúde",
    desc: "Oportunidades, operação e análises para o ecossistema.",
    items: [
      { id: "marketplace-medicos", icon: Store, title: "Marketplace para médicos", desc: "Contratação de serviços com preços diferenciados." },
      { id: "facilities-saude", icon: Building, title: "Facilities para serviços de saúde", desc: "Suporte operacional especializado." },
      { id: "vagas-oportunidades", icon: Briefcase, title: "Painel de vagas e oportunidades", desc: "Conexão com o mercado médico." },
      { id: "consultoria-gestao", icon: Stethoscope, title: "Consultoria em gestão de serviços em saúde", desc: "Estruturação e expansão de operações." },
      { id: "auditoria-saude", icon: FileSearch, title: "Auditoria de serviços de saúde", desc: "Qualidade, compliance e eficiência." },
    ],
  },
  {
    id: "qualidade",
    title: "Qualidade de vida e equilíbrio",
    desc: "Bem-estar para sustentar uma carreira longa e saudável.",
    items: [
      { id: "suporte-psicologico", icon: Brain, title: "Suporte psicológico especializado", desc: "Atendimento focado na rotina médica." },
      { id: "suporte-nutricional", icon: Apple, title: "Suporte nutricional especializado", desc: "Saúde alimentar para profissionais de saúde." },
      { id: "atividade-fisica", icon: Dumbbell, title: "Suporte de atividade física", desc: "Programas para equilíbrio e performance." },
    ],
  },
];

export default function ServicosPage() {
  const [activeCat, setActiveCat] = useState<string>(categories[0].id);
  const active = categories.find((c) => c.id === activeCat)!;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Painel de Serviços</h1>
          <p className="text-muted-foreground">Tudo o que o médico precisa em um só lugar — organizado por categoria.</p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCat === c.id
                  ? "bg-accent text-accent-foreground shadow-accent"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">{active.desc}</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {active.items.map((s) => (
            <Link
              key={s.id}
              to={`/servicos/${s.id}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-accent/40 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground group-hover:text-accent">{s.title}</h3>
              <p className="mt-1.5 flex-grow text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Saiba mais <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
