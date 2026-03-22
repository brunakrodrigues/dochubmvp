export interface Question {
  id: number;
  category: string;
  text: string;
  options: { text: string; value: number }[];
  testType: 'free' | 'complete' | 'both';
}

export const categories = [
  { id: 'imagem', name: 'Imagem e Reputação', icon: '🌟' },
  { id: 'etica', name: 'Ética e Conduta Profissional', icon: '⚖️' },
  { id: 'planejamento', name: 'Planejamento de Carreira', icon: '📋' },
  { id: 'metas', name: 'Metas Profissionais', icon: '🎯' },
  { id: 'qualidade', name: 'Qualidade e Resultados', icon: '📊' },
  { id: 'tecnologia', name: 'Uso de Tecnologia e Inovação', icon: '💻' },
  { id: 'financeiro', name: 'Gestão Financeira e Benefícios', icon: '💰' },
  { id: 'assessorias', name: 'Assessorias e Suporte Profissional', icon: '🤝' },
  { id: 'negocio', name: 'Visão de Negócio e Empreendedorismo', icon: '🚀' },
];

export const questions: Question[] = [
  // FREE (12 questions - also used in complete)
  {
    id: 1, category: 'imagem', testType: 'both',
    text: 'Como você define hoje a sua presença profissional (redes, eventos, mídia, relacionamento)?',
    options: [
      { text: 'Tenho presença consolidada e intencional', value: 4 },
      { text: 'Estou em construção, com presença irregular', value: 3 },
      { text: 'Tenho presença limitada e sem estratégia', value: 2 },
      { text: 'Evito exposição profissional', value: 1 },
    ],
  },
  {
    id: 2, category: 'imagem', testType: 'both',
    text: 'Você utiliza estratégias de posicionamento digital e de reputação?',
    options: [
      { text: 'Sim, com acompanhamento especializado', value: 4 },
      { text: 'Sim, de forma autônoma', value: 3 },
      { text: 'Não, mas tenho interesse', value: 2 },
      { text: 'Não considero necessário', value: 1 },
    ],
  },
  {
    id: 3, category: 'etica', testType: 'both',
    text: 'Como você age diante de dilemas éticos (ex: conflitos de interesse, privacidade, marketing)?',
    options: [
      { text: 'Tenho protocolos e referências definidos', value: 4 },
      { text: 'Busco apoio de colegas ou entidades', value: 3 },
      { text: 'Tomo decisões por experiência pessoal', value: 2 },
      { text: 'Não sei como proceder', value: 1 },
    ],
  },
  {
    id: 4, category: 'planejamento', testType: 'both',
    text: 'Qual o seu nível de clareza sobre seus objetivos profissionais?',
    options: [
      { text: 'Total clareza', value: 4 },
      { text: 'Parcial clareza', value: 3 },
      { text: 'Pouca clareza', value: 2 },
      { text: 'Nenhuma clareza', value: 1 },
    ],
  },
  {
    id: 5, category: 'planejamento', testType: 'both',
    text: 'Você tem interesse em desenvolver ou expandir negócios na área da saúde?',
    options: [
      { text: 'Sim, tenho projeto em andamento', value: 4 },
      { text: 'Sim, mas ainda sem estruturação', value: 3 },
      { text: 'Tenho ideias, mas sem plano', value: 2 },
      { text: 'Não tenho interesse', value: 1 },
    ],
  },
  {
    id: 6, category: 'metas', testType: 'both',
    text: 'Você possui metas de atualização técnica e científica?',
    options: [
      { text: 'Sim, com plano contínuo', value: 4 },
      { text: 'Sim, de forma pontual', value: 3 },
      { text: 'Não, mas me atualizo conforme demanda', value: 2 },
      { text: 'Não tenho metas de atualização', value: 1 },
    ],
  },
  {
    id: 7, category: 'qualidade', testType: 'both',
    text: 'Você mensura resultados assistenciais e indicadores de qualidade?',
    options: [
      { text: 'Sim, com dados e relatórios periódicos', value: 4 },
      { text: 'Parcialmente, em alguns casos', value: 3 },
      { text: 'Raramente', value: 2 },
      { text: 'Nunca', value: 1 },
    ],
  },
  {
    id: 8, category: 'tecnologia', testType: 'both',
    text: 'Qual é o seu grau de familiaridade com ferramentas digitais e IA na prática diária?',
    options: [
      { text: 'Alta — utilizo diversas soluções integradas', value: 4 },
      { text: 'Média — uso ferramentas básicas', value: 3 },
      { text: 'Baixa — uso apenas o essencial', value: 2 },
      { text: 'Nula — evito ou desconheço', value: 1 },
    ],
  },
  {
    id: 9, category: 'financeiro', testType: 'both',
    text: 'Você possui seguros e benefícios adequados à sua atividade profissional?',
    options: [
      { text: 'Sim, completos (vida, saúde, previdência, responsabilidade civil)', value: 4 },
      { text: 'Parcialmente', value: 3 },
      { text: 'Apenas plano de saúde', value: 2 },
      { text: 'Nenhum', value: 1 },
    ],
  },
  {
    id: 10, category: 'financeiro', testType: 'both',
    text: 'Como você administra suas finanças e investimentos?',
    options: [
      { text: 'Tenho acompanhamento profissional', value: 4 },
      { text: 'Gerencio por conta própria com planejamento', value: 3 },
      { text: 'Sem planejamento estruturado', value: 2 },
      { text: 'Não faço gestão financeira', value: 1 },
    ],
  },
  {
    id: 11, category: 'assessorias', testType: 'both',
    text: 'Você conta com assessoria contábil, jurídica ou fiscal?',
    options: [
      { text: 'Sim, todas', value: 4 },
      { text: 'Parcialmente', value: 3 },
      { text: 'Apenas uma', value: 2 },
      { text: 'Nenhuma', value: 1 },
    ],
  },
  {
    id: 12, category: 'negocio', testType: 'both',
    text: 'Você gostaria de desenvolver um projeto com suporte técnico e mentoria?',
    options: [
      { text: 'Sim, imediato', value: 4 },
      { text: 'Sim, a médio prazo', value: 3 },
      { text: 'Talvez', value: 2 },
      { text: 'Não', value: 1 },
    ],
  },
  // COMPLETE-ONLY (13 additional questions)
  {
    id: 13, category: 'imagem', testType: 'complete',
    text: 'Em que medida você se preocupa com o impacto da sua imagem sobre pacientes e parceiros?',
    options: [
      { text: 'Constantemente', value: 4 },
      { text: 'Ocasionalmente', value: 3 },
      { text: 'Raramente', value: 2 },
      { text: 'Nunca pensei sobre isso', value: 1 },
    ],
  },
  {
    id: 14, category: 'imagem', testType: 'complete',
    text: 'Você já recebeu orientações ou realizou uma mentoria sobre imagem e comunicação?',
    options: [
      { text: 'Sim, recentemente', value: 4 },
      { text: 'Sim, há mais de 1 ano', value: 3 },
      { text: 'Não, apenas me aconselho com outros profissionais da área de saúde', value: 2 },
      { text: 'Nunca', value: 1 },
    ],
  },
  {
    id: 15, category: 'etica', testType: 'complete',
    text: 'Você conhece e aplica o código de ética da sua profissão?',
    options: [
      { text: 'Conheço profundamente', value: 4 },
      { text: 'Conheço parcialmente', value: 3 },
      { text: 'Tenho noções básicas', value: 2 },
      { text: 'Não conheço', value: 1 },
    ],
  },
  {
    id: 16, category: 'etica', testType: 'complete',
    text: 'Como avalia seu compromisso com sigilo, transparência e integridade?',
    options: [
      { text: 'Totalmente aderente', value: 4 },
      { text: 'Parcialmente aderente', value: 3 },
      { text: 'Pouco aderente', value: 2 },
      { text: 'Não sigo formalmente', value: 1 },
    ],
  },
  {
    id: 17, category: 'planejamento', testType: 'complete',
    text: 'Você possui um plano de carreira estruturado para os próximos 3 a 5 anos?',
    options: [
      { text: 'Sim, documentado e revisado periodicamente', value: 4 },
      { text: 'Sim, mas de forma informal', value: 3 },
      { text: 'Tenho apenas metas pontuais', value: 2 },
      { text: 'Não possuo plano definido', value: 1 },
    ],
  },
  {
    id: 18, category: 'planejamento', testType: 'complete',
    text: 'Você tem acompanhamento (mentoria, coaching, supervisão) para desenvolvimento profissional?',
    options: [
      { text: 'Sim, com frequência regular', value: 4 },
      { text: 'Sim, de forma pontual', value: 3 },
      { text: 'Não, mas gostaria de ter', value: 2 },
      { text: 'Não vejo necessidade', value: 1 },
    ],
  },
  {
    id: 19, category: 'metas', testType: 'complete',
    text: 'Suas metas profissionais são documentadas e mensuráveis?',
    options: [
      { text: 'Sim, com indicadores e prazos definidos', value: 4 },
      { text: 'Parcialmente, com metas gerais', value: 3 },
      { text: 'Tenho metas subjetivas', value: 2 },
      { text: 'Não defino metas', value: 1 },
    ],
  },
  {
    id: 20, category: 'metas', testType: 'complete',
    text: 'Você revisa seus resultados periodicamente?',
    options: [
      { text: 'Mensalmente', value: 4 },
      { text: 'Trimestralmente', value: 3 },
      { text: 'Esporadicamente', value: 2 },
      { text: 'Nunca', value: 1 },
    ],
  },
  {
    id: 21, category: 'qualidade', testType: 'complete',
    text: 'Você tem clareza sobre o impacto do seu trabalho no custo e desfecho do paciente?',
    options: [
      { text: 'Total clareza', value: 4 },
      { text: 'Parcial clareza', value: 3 },
      { text: 'Pouca clareza', value: 2 },
      { text: 'Não tenho controle', value: 1 },
    ],
  },
  {
    id: 22, category: 'qualidade', testType: 'complete',
    text: 'Como você avalia sua adesão às boas práticas clínicas e protocolos?',
    options: [
      { text: 'Alta adesão', value: 4 },
      { text: 'Parcial adesão', value: 3 },
      { text: 'Baixa adesão', value: 2 },
      { text: 'Não sigo protocolos formalmente', value: 1 },
    ],
  },
  {
    id: 23, category: 'tecnologia', testType: 'complete',
    text: 'Você vê a IA como aliada para melhorar resultados e produtividade?',
    options: [
      { text: 'Sim, com forte potencial', value: 4 },
      { text: 'Sim, mas com cautela', value: 3 },
      { text: 'Tenho dúvidas', value: 2 },
      { text: 'Não acredito nisso', value: 1 },
    ],
  },
  {
    id: 24, category: 'assessorias', testType: 'complete',
    text: 'Você realiza ações de marketing, comunicação e imagem com orientação técnica?',
    options: [
      { text: 'Sim, regularmente', value: 4 },
      { text: 'Sim, esporadicamente', value: 3 },
      { text: 'Não, mas gostaria', value: 2 },
      { text: 'Não vejo necessidade', value: 1 },
    ],
  },
  {
    id: 25, category: 'negocio', testType: 'complete',
    text: 'Você já empreende ou tem plano de negócio na área da saúde?',
    options: [
      { text: 'Sim, em andamento', value: 4 },
      { text: 'Tenho projeto estruturado', value: 3 },
      { text: 'Tenho ideia inicial', value: 2 },
      { text: 'Não tenho interesse', value: 1 },
    ],
  },
];

export function getQuestionsForTest(testType: 'free' | 'complete'): Question[] {
  if (testType === 'free') {
    return questions.filter(q => q.testType === 'both' || q.testType === 'free');
  }
  return questions;
}
