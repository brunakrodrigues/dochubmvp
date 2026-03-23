export interface Question {
  id: number;
  category: string;
  categoryLabel: string;
  text: string;
  options: { text: string; value: number }[];
  testType: 'free' | 'complete' | 'both';
}

export const categories = [
  { id: 'planejamento', name: 'Planejamento de Carreira', icon: '📋' },
  { id: 'financeiro', name: 'Gestão Financeira', icon: '💰' },
  { id: 'imagem', name: 'Imagem e Reputação', icon: '🌟' },
  { id: 'metas', name: 'Metas Profissionais', icon: '🎯' },
  { id: 'qualidade', name: 'Qualidade e Resultados', icon: '📊' },
  { id: 'etica', name: 'Ética e Conduta', icon: '⚖️' },
  { id: 'tecnologia', name: 'Uso de Tecnologia', icon: '💻' },
  { id: 'assessorias', name: 'Assessorias e Suporte', icon: '🤝' },
  { id: 'negocio', name: 'Visão Empreendedora', icon: '🚀' },
];

export const questions: Question[] = [
  // FREE (12 questions) — also used in complete
  {
    id: 1, category: 'planejamento', categoryLabel: 'Planejamento de Carreira', testType: 'both',
    text: 'Você possui um plano de carreira estruturado para os próximos 5 anos?',
    options: [
      { text: 'Não pensei nisso ainda', value: 0 },
      { text: 'Tenho ideias vagas', value: 33 },
      { text: 'Tenho metas definidas mas não documentadas', value: 66 },
      { text: 'Tenho plano escrito e revisado periodicamente', value: 100 },
    ],
  },
  {
    id: 2, category: 'financeiro', categoryLabel: 'Gestão Financeira', testType: 'both',
    text: 'Como você gerencia a tributação dos seus rendimentos médicos?',
    options: [
      { text: 'Não controlo ativamente', value: 0 },
      { text: 'Faço o básico no IR', value: 33 },
      { text: 'Tenho contador mas sem planejamento', value: 66 },
      { text: 'Planejamento tributário ativo com PJ e investimentos', value: 100 },
    ],
  },
  {
    id: 3, category: 'imagem', categoryLabel: 'Imagem e Reputação', testType: 'both',
    text: 'Qual sua presença digital profissional?',
    options: [
      { text: 'Não tenho presença digital', value: 0 },
      { text: 'Perfil básico em 1 rede social', value: 33 },
      { text: 'Publico conteúdo esporadicamente', value: 66 },
      { text: 'Estratégia ativa com conteúdo regular e networking', value: 100 },
    ],
  },
  {
    id: 4, category: 'metas', categoryLabel: 'Metas Profissionais', testType: 'both',
    text: 'Você acompanha indicadores de desempenho da sua prática clínica?',
    options: [
      { text: 'Não acompanho nenhum indicador', value: 0 },
      { text: 'Apenas volume de atendimentos', value: 33 },
      { text: 'Alguns indicadores básicos', value: 66 },
      { text: 'Dashboard com indicadores clínicos e financeiros', value: 100 },
    ],
  },
  {
    id: 5, category: 'qualidade', categoryLabel: 'Qualidade e Resultados', testType: 'both',
    text: 'Qual sua frequência de atualização profissional (congressos, cursos, artigos)?',
    options: [
      { text: 'Raramente me atualizo', value: 0 },
      { text: '1-2 vezes por ano', value: 33 },
      { text: 'Trimestral com certificação', value: 66 },
      { text: 'Programa contínuo de educação com especialização', value: 100 },
    ],
  },
  {
    id: 6, category: 'etica', categoryLabel: 'Ética e Conduta', testType: 'both',
    text: 'Como você lida com questões éticas na prática médica?',
    options: [
      { text: 'Resolvo caso a caso sem referência', value: 0 },
      { text: 'Conheço o código de ética básico', value: 33 },
      { text: 'Sigo o código e busco orientação quando necessário', value: 66 },
      { text: 'Tenho assessoria ética e participo de comitês', value: 100 },
    ],
  },
  {
    id: 7, category: 'tecnologia', categoryLabel: 'Uso de Tecnologia', testType: 'both',
    text: 'Qual seu nível de adoção de ferramentas digitais na prática clínica?',
    options: [
      { text: 'Uso o mínimo necessário', value: 0 },
      { text: 'Prontuário eletrônico apenas', value: 33 },
      { text: 'Telemedicina + prontuário + agenda digital', value: 66 },
      { text: 'Stack digital completo (PEP, telemedicina, automação, IA)', value: 100 },
    ],
  },
  {
    id: 8, category: 'assessorias', categoryLabel: 'Assessorias e Suporte', testType: 'both',
    text: 'Você conta com assessoria profissional especializada (jurídica, contábil, marketing)?',
    options: [
      { text: 'Nenhuma assessoria', value: 0 },
      { text: 'Apenas contador básico', value: 33 },
      { text: 'Contador + 1 assessoria', value: 66 },
      { text: 'Equipe completa (contábil, jurídica, marketing, gestão)', value: 100 },
    ],
  },
  {
    id: 9, category: 'negocio', categoryLabel: 'Visão Empreendedora', testType: 'both',
    text: 'Você trata sua atividade médica como um negócio?',
    options: [
      { text: 'Sou apenas médico', value: 0 },
      { text: 'Penso nisso mas não atuo', value: 33 },
      { text: 'Tenho gestão básica (receitas e despesas)', value: 66 },
      { text: 'Gestão profissional com indicadores, metas e plano de crescimento', value: 100 },
    ],
  },
  {
    id: 10, category: 'planejamento', categoryLabel: 'Planejamento de Carreira', testType: 'both',
    text: 'Você tem um plano de aposentadoria/independência financeira?',
    options: [
      { text: 'Nunca pensei nisso', value: 0 },
      { text: 'Ideia vaga de que preciso', value: 33 },
      { text: 'Tenho investimentos mas sem meta', value: 66 },
      { text: 'Plano estruturado com metas e acompanhamento', value: 100 },
    ],
  },
  {
    id: 11, category: 'imagem', categoryLabel: 'Imagem e Reputação', testType: 'both',
    text: 'Como você gerencia sua reputação online (avaliações, comentários, Google)?',
    options: [
      { text: 'Não monitoro', value: 0 },
      { text: 'Vejo quando alguém menciona', value: 33 },
      { text: 'Monitoro periodicamente', value: 66 },
      { text: 'Gestão ativa com resposta a avaliações e estratégia', value: 100 },
    ],
  },
  {
    id: 12, category: 'tecnologia', categoryLabel: 'Uso de Tecnologia', testType: 'both',
    text: 'Você utiliza inteligência artificial ou automação na sua rotina?',
    options: [
      { text: 'Não uso nada', value: 0 },
      { text: 'Uso ChatGPT esporadicamente', value: 33 },
      { text: 'Ferramentas de IA integradas à prática', value: 66 },
      { text: 'IA + automação de processos administrativos e clínicos', value: 100 },
    ],
  },
  // COMPLETE-ONLY (13 additional premium questions)
  {
    id: 13, category: 'planejamento', categoryLabel: 'Planejamento de Carreira', testType: 'complete',
    text: 'Você revisa e atualiza seu plano de carreira com que frequência?',
    options: [
      { text: 'Nunca revisei', value: 0 },
      { text: 'Quando surge uma oportunidade', value: 33 },
      { text: 'Anualmente', value: 66 },
      { text: 'Trimestralmente com mentor ou coach', value: 100 },
    ],
  },
  {
    id: 14, category: 'financeiro', categoryLabel: 'Gestão Financeira', testType: 'complete',
    text: 'Qual a diversificação dos seus investimentos?',
    options: [
      { text: 'Não invisto', value: 0 },
      { text: 'Apenas poupança', value: 33 },
      { text: '2-3 tipos de investimento', value: 66 },
      { text: 'Carteira diversificada com acompanhamento profissional', value: 100 },
    ],
  },
  {
    id: 15, category: 'financeiro', categoryLabel: 'Gestão Financeira', testType: 'complete',
    text: 'Você separa finanças pessoais de profissionais?',
    options: [
      { text: 'Tudo junto na mesma conta', value: 0 },
      { text: 'Tento separar mas misturo', value: 33 },
      { text: 'Contas separadas sem controle rigoroso', value: 66 },
      { text: 'Contas, contabilidade e planejamento 100% separados', value: 100 },
    ],
  },
  {
    id: 16, category: 'imagem', categoryLabel: 'Imagem e Reputação', testType: 'complete',
    text: 'Você tem uma estratégia de personal branding definida?',
    options: [
      { text: 'Não sei o que é isso', value: 0 },
      { text: 'Sei que é importante mas não faço', value: 33 },
      { text: 'Tenho ações pontuais', value: 66 },
      { text: 'Estratégia documentada com metas e métricas', value: 100 },
    ],
  },
  {
    id: 17, category: 'metas', categoryLabel: 'Metas Profissionais', testType: 'complete',
    text: 'Como você mede a satisfação dos seus pacientes?',
    options: [
      { text: 'Não meço', value: 0 },
      { text: 'Percepção informal', value: 33 },
      { text: 'Pesquisa esporádica', value: 66 },
      { text: 'NPS ou pesquisa estruturada com ações de melhoria', value: 100 },
    ],
  },
  {
    id: 18, category: 'qualidade', categoryLabel: 'Qualidade e Resultados', testType: 'complete',
    text: 'Você participa de programas de certificação ou acreditação?',
    options: [
      { text: 'Nenhum', value: 0 },
      { text: 'Já pensei mas não busquei', value: 33 },
      { text: 'Em processo de certificação', value: 66 },
      { text: 'Certificações ativas e em manutenção', value: 100 },
    ],
  },
  {
    id: 19, category: 'qualidade', categoryLabel: 'Qualidade e Resultados', testType: 'complete',
    text: 'Como você documenta e analisa seus resultados clínicos?',
    options: [
      { text: 'Não documento além do prontuário', value: 0 },
      { text: 'Registro básico', value: 33 },
      { text: 'Banco de dados próprio', value: 66 },
      { text: 'Sistema de indicadores com análise periódica', value: 100 },
    ],
  },
  {
    id: 20, category: 'etica', categoryLabel: 'Ética e Conduta', testType: 'complete',
    text: 'Você tem protocolo para lidar com conflitos de interesse?',
    options: [
      { text: 'Nunca pensei nisso', value: 0 },
      { text: 'Lido caso a caso', value: 33 },
      { text: 'Tenho diretrizes informais', value: 66 },
      { text: 'Protocolo documentado alinhado ao CRM', value: 100 },
    ],
  },
  {
    id: 21, category: 'tecnologia', categoryLabel: 'Uso de Tecnologia', testType: 'complete',
    text: 'Como você gerencia a segurança dos dados dos seus pacientes?',
    options: [
      { text: 'Confio no sistema do hospital/clínica', value: 0 },
      { text: 'Senha básica nos dispositivos', value: 33 },
      { text: 'Criptografia e backup', value: 66 },
      { text: 'Política completa LGPD com DPO e auditorias', value: 100 },
    ],
  },
  {
    id: 22, category: 'assessorias', categoryLabel: 'Assessorias e Suporte', testType: 'complete',
    text: 'Você tem seguro de responsabilidade civil profissional?',
    options: [
      { text: 'Não tenho', value: 0 },
      { text: 'Já pesquisei mas não contratei', value: 33 },
      { text: 'Tenho básico', value: 66 },
      { text: 'Seguro completo revisado anualmente', value: 100 },
    ],
  },
  {
    id: 23, category: 'assessorias', categoryLabel: 'Assessorias e Suporte', testType: 'complete',
    text: 'Como você gerencia contratos com hospitais e operadoras?',
    options: [
      { text: 'Aceito o que oferecem', value: 0 },
      { text: 'Leio mas não negocio', value: 33 },
      { text: 'Negocio termos principais', value: 66 },
      { text: 'Assessoria jurídica especializada em todos os contratos', value: 100 },
    ],
  },
  {
    id: 24, category: 'negocio', categoryLabel: 'Visão Empreendedora', testType: 'complete',
    text: 'Você tem um plano de expansão ou escala para sua prática?',
    options: [
      { text: 'Não penso em expandir', value: 0 },
      { text: 'Ideia vaga de crescer', value: 33 },
      { text: 'Plano informal', value: 66 },
      { text: 'Plano de negócios com metas, investimento e timeline', value: 100 },
    ],
  },
  {
    id: 25, category: 'negocio', categoryLabel: 'Visão Empreendedora', testType: 'complete',
    text: 'Como você lida com a gestão de pessoas (equipe, secretárias, sócios)?',
    options: [
      { text: 'Faço tudo sozinho', value: 0 },
      { text: 'Tenho equipe sem gestão formal', value: 33 },
      { text: 'Reuniões periódicas e feedback', value: 66 },
      { text: 'Gestão profissional com metas, avaliação e desenvolvimento', value: 100 },
    ],
  },
];

export function getQuestionsForTest(testType: 'free' | 'complete'): Question[] {
  if (testType === 'free') {
    return questions.filter(q => q.testType === 'both' || q.testType === 'free');
  }
  return questions;
}

export function calculateScores(answers: { questionId: number; selectedValue: number }[], testType: 'free' | 'complete') {
  const activeQuestions = getQuestionsForTest(testType);
  const categoryMap = new Map<string, { total: number; count: number; label: string }>();

  for (const cat of categories) {
    categoryMap.set(cat.id, { total: 0, count: 0, label: cat.name });
  }

  for (const q of activeQuestions) {
    const answer = answers.find(a => a.questionId === q.id);
    if (answer) {
      const entry = categoryMap.get(q.category)!;
      entry.total += answer.selectedValue;
      entry.count += 1;
    }
  }

  const categoryScores = categories.map(cat => {
    const entry = categoryMap.get(cat.id)!;
    const score = entry.count > 0 ? Math.round(entry.total / entry.count) : 0;
    return { category: cat.id, label: cat.name, score, maxScore: 100 };
  });

  const totalScore = Math.round(categoryScores.reduce((sum, c) => sum + c.score, 0) / categoryScores.length);

  return { totalScore, categoryScores };
}
