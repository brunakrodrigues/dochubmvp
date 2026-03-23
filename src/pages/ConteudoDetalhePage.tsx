import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { ChevronRight, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConteudoDetalhePage() {
  const { slug } = useParams();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/conteudo" className="hover:text-foreground">Conteúdo</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Carreira</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Como planejar sua carreira médica</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Como planejar sua carreira médica em 5 passos</h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-4 w-4" /> Equipe DocHub</span>
                <span>15/03/2026</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min</span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-foreground space-y-4">
              <p>O planejamento de carreira é uma das competências mais negligenciadas por médicos. A maioria dos profissionais investe fortemente na formação técnica, mas pouco tempo na gestão estratégica da própria trajetória profissional. Este artigo apresenta um framework prático para transformar essa realidade.</p>

              <h2 className="font-display text-xl font-bold">Por que planejar sua carreira?</h2>
              <p>Médicos que possuem um plano de carreira estruturado têm, em média, 40% mais satisfação profissional e 25% mais rendimento ao longo de 10 anos, segundo estudos do CFM. O planejamento não limita — ele potencializa escolhas conscientes.</p>

              <h2 className="font-display text-xl font-bold">Os 5 passos fundamentais</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Diagnóstico atual:</strong> Avalie onde você está hoje em cada dimensão da carreira — financeira, reputacional, técnica, empreendedora.</li>
                <li><strong>Defina sua visão de futuro:</strong> Onde você quer estar em 3, 5 e 10 anos? Inclua metas financeiras, de estilo de vida e de impacto.</li>
                <li><strong>Mapeie as lacunas:</strong> Compare o estado atual com a visão. Quais competências faltam? Quais recursos você precisa?</li>
                <li><strong>Crie um plano de ação:</strong> Defina metas SMART com prazos, responsáveis e indicadores de acompanhamento.</li>
                <li><strong>Revise periodicamente:</strong> Agende revisões trimestrais do plano. Ajuste rotas conforme o mercado e seus objetivos evoluem.</li>
              </ol>

              <div className="rounded-xl border-l-4 border-accent bg-accent/5 p-4">
                <p className="font-semibold text-foreground">💡 Dica DocHub</p>
                <p className="text-sm">Use o Score de Maturidade Profissional do DocHub como ponto de partida para seu diagnóstico. Ele avalia 9 dimensões essenciais da sua carreira.</p>
              </div>

              <p>Lembre-se: planejamento de carreira não é um evento, é um processo contínuo. Os profissionais mais bem-sucedidos revisam e ajustam seus planos regularmente, adaptando-se às mudanças do mercado e às novas oportunidades.</p>
            </div>

            {/* Related */}
            <div className="border-t pt-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Conteúdo Relacionado</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: "Tributação para médicos: PJ vs PF", type: "Vídeo", time: "15 min" },
                  { title: "Telemedicina: regulamentação", type: "Artigo", time: "8 min" },
                  { title: "Ética médica e redes sociais", type: "Artigo", time: "4 min" },
                ].map(c => (
                  <div key={c.title} className="rounded-xl border bg-card p-4 shadow-card">
                    <span className="text-xs text-accent">{c.type} · {c.time}</span>
                    <h4 className="mt-1 text-sm font-semibold">{c.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <h3 className="font-semibold text-foreground text-sm mb-3">Recomendações baseadas neste conteúdo</h3>
              {[
                { title: "Mentoria de Carreira Médica", price: "R$200/sessão", href: "/servicos/mentoria-carreira" },
                { title: "Assessoria Tributária", price: "R$350/mês", href: "/servicos/assessoria-tributaria" },
              ].map(s => (
                <Link key={s.title} to={s.href} className="block rounded-lg border p-3 mb-2 hover:bg-muted transition-colors">
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-accent">{s.price}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
