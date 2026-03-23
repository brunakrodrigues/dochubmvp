import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Star, Search, Filter } from "lucide-react";

const categories = ["Todos", "Jurídico", "Contábil/Fiscal", "Gestão", "Mentoria", "Comunicação", "Saúde Ocupacional"];

const services = [
  { id: "assessoria-tributaria", name: "Assessoria Tributária para Médicos", price: "R$350/mês", category: "Contábil/Fiscal", rating: 4.8, reviews: 32, desc: "Planejamento tributário completo para profissionais da saúde, incluindo abertura e gestão de PJ." },
  { id: "consultoria-juridica", name: "Consultoria Jurídica Médica", price: "R$500 avulso", category: "Jurídico", rating: 4.7, reviews: 18, desc: "Orientação jurídica especializada para questões médicas, contratos e compliance." },
  { id: "mentoria-carreira", name: "Mentoria de Carreira Médica", price: "R$200/sessão", category: "Mentoria", rating: 4.9, reviews: 45, desc: "Sessões individuais com mentores experientes para acelerar seu desenvolvimento profissional." },
  { id: "gestao-consultorio", name: "Gestão de Consultório", price: "R$800/mês", category: "Gestão", rating: 4.6, reviews: 12, desc: "Profissionalização da gestão do seu consultório com indicadores, processos e metas." },
  { id: "marketing-digital", name: "Estratégia de Marketing Digital Médico", price: "R$1.200 pacote", category: "Comunicação", rating: 4.5, reviews: 8, desc: "Estratégia completa de presença digital, conteúdo e posicionamento profissional." },
  { id: "saude-ocupacional", name: "Saúde Ocupacional para Clínicas", price: "R$600 avulso", category: "Saúde Ocupacional", rating: 4.4, reviews: 6, desc: "Adequação às normas de saúde ocupacional para clínicas e consultórios médicos." },
  { id: "coaching-lideranca", name: "Coaching de Liderança Médica", price: "R$300/sessão", category: "Mentoria", rating: 4.8, reviews: 22, desc: "Desenvolvimento de habilidades de liderança para médicos gestores e coordenadores." },
  { id: "planejamento-financeiro", name: "Planejamento Financeiro Pessoal", price: "R$450 avulso", category: "Contábil/Fiscal", rating: 4.7, reviews: 15, desc: "Planejamento financeiro pessoal e profissional com foco em médicos." },
  { id: "registro-marca", name: "Registro de Marca e Patentes", price: "R$900 avulso", category: "Jurídico", rating: 4.3, reviews: 5, desc: "Proteção da sua marca profissional e propriedade intelectual." },
];

const gradientColors = [
  "from-accent/20 to-accent/5", "from-info/20 to-info/5", "from-warning/20 to-warning/5",
  "from-success/20 to-success/5", "from-destructive/20 to-destructive/5", "from-primary/20 to-primary/5",
];

export default function ServicosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const filtered = activeCategory === "Todos" ? services : services.filter(s => s.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Serviços Especializados para Médicos</h1>
          <p className="text-muted-foreground">Marketplace de serviços verificados para sua carreira</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === c ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <Link key={s.id} to={`/servicos/${s.id}`} className="group rounded-xl border bg-card shadow-card hover:shadow-card-hover transition-all overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${gradientColors[i % gradientColors.length]}`} />
              <div className="p-5">
                <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{s.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">{s.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{s.rating}</span>
                    <span className="text-xs text-muted-foreground">({s.reviews})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
