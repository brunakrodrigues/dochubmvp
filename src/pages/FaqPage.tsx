import { Header, Footer } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "O que é o DocHub?", a: "O DocHub é uma plataforma digital de apoio à carreira médica que combina diagnóstico profissional, inteligência artificial e um marketplace de serviços especializados para ajudar médicos a desenvolverem suas carreiras de forma estratégica." },
  { q: "Como funciona o Teste Profissional?", a: "O Teste Profissional avalia sua maturidade em 9 dimensões: Planejamento de Carreira, Gestão Financeira, Imagem e Reputação, Metas Profissionais, Qualidade e Resultados, Ética e Conduta, Uso de Tecnologia, Assessorias e Suporte, e Visão Empreendedora. A versão gratuita tem 12 perguntas e a completa 25." },
  { q: "O que é o Score de Maturidade?", a: "O Score de Maturidade é um indicador de 0 a 100 que reflete o nível de desenvolvimento da sua carreira médica em 9 dimensões. As faixas são: Em Desenvolvimento (0-40), Intermediário (41-65), Avançado (66-85) e Referência (86-100)." },
  { q: "Quais planos estão disponíveis?", a: "Oferecemos três planos: Free (teste básico de 12 questões), Básico (R$49/mês com teste completo e conteúdo premium) e Premium (R$149/mês com Copiloto IA ilimitado, 20% de desconto em serviços e trilhas exclusivas)." },
  { q: "Como funciona o marketplace de serviços?", a: "Nosso marketplace conecta médicos a prestadores verificados de serviços como assessoria tributária, consultoria jurídica, mentoria de carreira, marketing digital e gestão de consultório. Todos os parceiros são avaliados e possuem SLA garantido." },
  { q: "O que é o Copiloto IA?", a: "O Copiloto IA é um assistente inteligente que analisa seu perfil, score e histórico para oferecer recomendações personalizadas. Ele utiliza tecnologia RAG (Retrieval-Augmented Generation) para fornecer respostas contextualizadas com base nos dados da plataforma." },
  { q: "Meus dados estão seguros?", a: "Sim. O DocHub segue rigorosamente a Lei Geral de Proteção de Dados (LGPD). Seus dados são criptografados, nunca compartilhados com terceiros sem consentimento e você pode exportá-los ou excluí-los a qualquer momento." },
  { q: "Como cancelo minha assinatura?", a: "Acesse Perfil > Minha Assinatura > Cancelar Assinatura. O cancelamento é imediato e você mantém acesso até o fim do período pago. Não há multa ou taxa de cancelamento." },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-8">Perguntas Frequentes</h1>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border bg-card px-6">
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
