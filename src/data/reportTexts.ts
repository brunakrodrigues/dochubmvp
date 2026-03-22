export const freeReportTexts = {
  iniciante: "Seu perfil indica que você está no início da estruturação da sua carreira profissional. Existem oportunidades significativas de desenvolvimento em praticamente todas as áreas avaliadas. Uma mentoria estruturada pode acelerar consideravelmente sua evolução.",
  intermediario: "Você já possui uma base sólida em alguns aspectos da carreira, mas há áreas importantes que precisam de atenção. Com orientação direcionada, você pode evoluir rapidamente para um nível avançado de maturidade profissional.",
  avancado: "Parabéns! Você demonstra maturidade profissional em diversas dimensões. O próximo passo é lapidar pontos específicos e desenvolver uma visão mais estratégica e empreendedora da sua carreira.",
  mentor: "Seu perfil é excepcional. Além de continuar evoluindo, você tem potencial para se tornar um multiplicador de conhecimento, atuando como mentor e contribuindo ativamente para a transformação do mercado de saúde.",
};

export const completeReportTexts = {
  iniciante: "Dados básicos do mercado de saúde indicam oportunidades para estruturação inicial de carreira. Recomendamos orientações básicas de organização financeira e dicas sobre investimentos, orientação sobre obrigações fiscais e contábeis com boas práticas, e noções de seguros e benefícios para o exercício profissional.",
  intermediario: "Dados setoriais do mercado de saúde mostram evolução significativa do seu setor. Propomos alavancagem de carreira com orientações dirigidas de organização financeira e investimentos, insights sobre planejamento fiscal e contábil para vantagens competitivas, aprofundamento em seguros e benefícios, boas práticas de tecnologia e IA, e riscos associados à imagem e comunicação.",
  avancado: "Dados do mercado de saúde com tendências e cruzamento com outros mercados sustentam uma proposta de lapidação estratégica de carreira. Inclui projeção financeira e investimentos profissionais, gestão fiscal dos negócios, seguros com olhar em sucessão, modelos de tecnologia e IA com impacto em resultados, planejamento estratégico de imagem para novos públicos, e desenvolvimento de projetos em saúde.",
  mentor: "Além da base avançada, seu perfil de líder permite explorar cases de desenvolvimento de novos negócios, construção de posicionamento como multiplicador de conhecimento, inserção ativa na mudança positiva do mercado de saúde, e busca de equilíbrio entre todos os atores do sistema.",
};

export function getLevel(score: number, maxScore: number, testType: 'free' | 'complete') {
  if (testType === 'free') {
    if (score <= 19) return { level: 'iniciante' as const, label: 'Iniciante', color: 'destructive', emoji: '🔴' };
    if (score <= 33) return { level: 'intermediario' as const, label: 'Intermediário', color: 'warning', emoji: '🟡' };
    if (score <= 43) return { level: 'avancado' as const, label: 'Avançado', color: 'success', emoji: '🟢' };
    return { level: 'mentor' as const, label: 'Candidato a Mentor', color: 'accent', emoji: '🔵' };
  }
  // complete
  if (score <= 40) return { level: 'iniciante' as const, label: 'Iniciante', color: 'destructive', emoji: '🔴', direction: 'Mentoria básica + Assessoria de estruturação' };
  if (score <= 70) return { level: 'intermediario' as const, label: 'Intermediário', color: 'warning', emoji: '🟡', direction: 'Mentoria personalizada + Assessoria setorial' };
  if (score <= 90) return { level: 'avancado' as const, label: 'Avançado', color: 'success', emoji: '🟢', direction: 'Mentoria estratégica + Desenvolvimento de projetos' };
  return { level: 'mentor' as const, label: 'Líder de Valor', color: 'accent', emoji: '🔵', direction: 'Mentoria premium + Novos negócios + Inserção como mentor' };
}
