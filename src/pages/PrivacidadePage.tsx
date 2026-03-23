import { Header, Footer } from "@/components/Layout";

const sections = [
  { title: "1. Coleta de Dados", text: "O DocHub coleta dados pessoais e profissionais fornecidos voluntariamente pelo usuário durante o cadastro e uso da plataforma, incluindo nome, email, especialidade médica, cidade, estado e respostas ao teste profissional." },
  { title: "2. Uso dos Dados", text: "Os dados coletados são utilizados exclusivamente para personalização da experiência, geração de relatórios, recomendações de serviços e conteúdos, e melhoria contínua da plataforma. Não utilizamos dados para fins publicitários de terceiros." },
  { title: "3. Compartilhamento", text: "Seus dados não são compartilhados com terceiros sem seu consentimento expresso. Parceiros de serviço recebem apenas as informações estritamente necessárias para execução do serviço contratado." },
  { title: "4. Seus Direitos (LGPD)", text: "Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a: acessar seus dados, corrigir informações incorretas, solicitar a exclusão dos seus dados, revogar consentimento e exportar seus dados em formato legível." },
  { title: "5. Contato", text: "Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato pelo email privacidade@dochub.com.br ou pelo canal de suporte da plataforma." },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-8">Última atualização: 01/03/2026</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
