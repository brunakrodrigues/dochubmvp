import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Star, Check, Clock, ChevronRight, MessageCircle } from "lucide-react";

const tabs = ["Descrição", "O que inclui", "Parceiro", "Avaliações"];

const reviews = [
  { name: "Dr. Ana Beatriz", rating: 5, date: "15/03/2026", text: "Excelente assessoria! Consegui reduzir minha carga tributária em 30% com a mudança para PJ. Recomendo muito." },
  { name: "Dr. Roberto Lima", rating: 5, date: "02/03/2026", text: "Profissionais extremamente competentes. O planejamento tributário fez uma diferença enorme no meu fluxo de caixa." },
  { name: "Dra. Carla Mendes", rating: 4, date: "18/02/2026", text: "Muito bom serviço. O único ponto de melhoria seria mais agilidade na comunicação inicial." },
];

const included = [
  "Declaração de Imposto de Renda completa",
  "Abertura e gestão de PJ médica (CNPJ)",
  "Planejamento tributário personalizado",
  "Emissão de notas fiscais",
  "Folha de pagamento e pró-labore",
  "Relatórios financeiros mensais",
];

const relatedServices = [
  { id: "planejamento-financeiro", name: "Planejamento Financeiro Pessoal", price: "R$450 avulso", category: "Contábil/Fiscal" },
  { id: "consultoria-juridica", name: "Consultoria Jurídica Médica", price: "R$500 avulso", category: "Jurídico" },
  { id: "gestao-consultorio", name: "Gestão de Consultório", price: "R$800/mês", category: "Gestão" },
];

export default function ServicoDetalhePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Descrição");
  const [waOpen, setWaOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/servicos" className="hover:text-foreground">Serviços</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Contábil/Fiscal</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Assessoria Tributária para Médicos</span>
        </div>

        {/* Banner */}
        <div className="h-40 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-primary/10" />

        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground mb-2">Contábil/Fiscal</span>
            <h1 className="font-display text-3xl font-bold text-foreground">Assessoria Tributária para Médicos</h1>
            <p className="mt-1 text-muted-foreground">Parceiro: Escritório Contábil MedFin</p>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">4.8</span>
                <span className="text-sm text-muted-foreground">(32 avaliações)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Prazo de entrega: 5 dias úteis | SLA garantido
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card lg:min-w-[280px]">
            <div className="text-3xl font-bold text-foreground">R$350<span className="text-lg font-normal text-muted-foreground">/mês</span></div>
            <span className="inline-block rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success mt-1">Desconto Premium: R$280/mês</span>
            <div className="mt-4 space-y-2">
              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to={`/checkout/${id || "assessoria-tributaria"}`}>Contratar Serviço</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={() => setWaOpen(true)}>
                <MessageCircle className="mr-2 h-4 w-4" /> Falar com Atendimento
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-4">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${activeTab === t ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          {activeTab === "Descrição" && (
            <div className="prose prose-sm max-w-none text-foreground">
              <p>A Assessoria Tributária para Médicos é um serviço especializado que visa otimizar a carga tributária dos profissionais da saúde. Nossa equipe de contadores especializados no setor médico oferece um acompanhamento completo e personalizado.</p>
              <p>Com a crescente complexidade do sistema tributário brasileiro, é fundamental que médicos tenham um planejamento tributário adequado. Nosso serviço ajuda a identificar a melhor estrutura jurídica (PF, PJ, Simples Nacional, Lucro Presumido) para cada perfil profissional.</p>
              <p>Além do planejamento tributário, oferecemos suporte contínuo para declaração de IR, gestão de notas fiscais, folha de pagamento e relatórios financeiros que auxiliam na tomada de decisão profissional.</p>
            </div>
          )}
          {activeTab === "O que inclui" && (
            <ul className="space-y-3">
              {included.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {activeTab === "Parceiro" && (
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <span className="font-display text-2xl font-bold text-accent">MF</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Escritório Contábil MedFin</h3>
                <p className="mt-1 text-sm text-muted-foreground">Especializado em contabilidade e planejamento tributário para profissionais da saúde desde 2015. Mais de 500 médicos atendidos em todo o Brasil, com foco em otimização fiscal e gestão financeira profissional.</p>
              </div>
            </div>
          )}
          {activeTab === "Avaliações" && (
            <div className="space-y-6">
              {reviews.map((r, i) => (
                <div key={i} className="border-b pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-warning text-warning" />)}
                    </div>
                    <span className="font-semibold text-sm">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Services */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Serviços Relacionados</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedServices.map(s => (
              <Link key={s.id} to={`/servicos/${s.id}`} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
                <span className="text-xs text-muted-foreground">{s.category}</span>
                <h3 className="mt-1 font-semibold text-foreground text-sm">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} message="Olá! Gostaria de saber mais sobre a Assessoria Tributária para Médicos." context="Falar com Atendimento" />
    </DashboardLayout>
  );
}
