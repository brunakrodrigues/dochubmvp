import { Header, Footer } from "@/components/Layout";

const sections = [
  { title: "1. O que são Cookies?", text: "Cookies são pequenos arquivos de texto armazenados em seu navegador quando você visita nosso site. Eles nos ajudam a melhorar sua experiência, lembrar preferências e analisar o uso da plataforma." },
  { title: "2. Quais Cookies Utilizamos", text: "Utilizamos cookies essenciais (necessários para funcionamento), cookies de desempenho (análise de uso com dados anônimos), cookies de funcionalidade (preferências do usuário) e cookies de marketing (apenas com consentimento explícito)." },
  { title: "3. Como Gerenciar", text: "Você pode gerenciar cookies nas configurações do seu navegador. A desativação de cookies essenciais pode impactar o funcionamento da plataforma. Cookies de marketing podem ser desativados a qualquer momento sem impacto na experiência." },
  { title: "4. Contato", text: "Para dúvidas sobre nossa política de cookies, entre em contato pelo email privacidade@dochub.com.br." },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Política de Cookies</h1>
        <p className="text-sm text-muted-foreground mb-8">Última atualização: 01/03/2026</p>
        <div className="space-y-8">
          {sections.map(s => (<div key={s.title}><h2 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h2><p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p></div>))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
