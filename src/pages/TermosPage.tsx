import { Header, Footer } from "@/components/Layout";

const sections = [
  { title: "1. Aceitação dos Termos", text: "Ao utilizar a plataforma DocHub, você concorda com estes Termos de Uso. Caso não concorde, não utilize nossos serviços. O uso continuado após alterações constitui aceitação dos novos termos." },
  { title: "2. Descrição dos Serviços", text: "O DocHub oferece diagnóstico profissional, recomendações personalizadas, marketplace de serviços, conteúdo educacional e assistente de IA para médicos. Os serviços do marketplace são prestados por parceiros independentes." },
  { title: "3. Pagamentos e Assinaturas", text: "Os planos pagos são cobrados conforme o ciclo escolhido (mensal ou anual). O cancelamento pode ser feito a qualquer momento, mantendo o acesso até o fim do período pago. Reembolsos seguem a política do Código de Defesa do Consumidor." },
  { title: "4. Propriedade Intelectual", text: "Todo o conteúdo da plataforma (textos, gráficos, logos, software) é propriedade do DocHub ou de seus licenciadores. É proibida a reprodução, distribuição ou modificação sem autorização expressa." },
  { title: "5. Limitação de Responsabilidade", text: "O DocHub não substitui orientação profissional individualizada. As recomendações geradas pela plataforma e pelo Copiloto IA são informativas e não constituem parecer médico, jurídico ou financeiro." },
  { title: "6. Foro", text: "Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias." },
];

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-8">Última atualização: 01/03/2026</p>
        <div className="space-y-8">
          {sections.map(s => (<div key={s.title}><h2 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h2><p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p></div>))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
