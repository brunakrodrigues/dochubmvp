import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

// Public pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RecuperarSenhaPage from "./pages/RecuperarSenhaPage";
import CadastroPage from "./pages/CadastroPage";
import TestePage from "./pages/TestePage";
import ScorePage from "./pages/ScorePage";
import PaywallPage from "./pages/PaywallPage";
import SobrePage from "./pages/SobrePage";
import PlanosPage from "./pages/PlanosPage";
import FaqPage from "./pages/FaqPage";
import SuportePage from "./pages/SuportePage";
import PrivacidadePage from "./pages/PrivacidadePage";
import TermosPage from "./pages/TermosPage";
import CookiesPage from "./pages/CookiesPage";

// Doctor authenticated pages
import DashboardPage from "./pages/DashboardPage";
import ResultadoPage from "./pages/ResultadoPage";
import RecomendacoesPage from "./pages/RecomendacoesPage";
import ServicosPage from "./pages/ServicosPage";
import ServicoDetalhePage from "./pages/ServicoDetalhePage";
import CheckoutPage from "./pages/CheckoutPage";
import MeusServicosPage from "./pages/MeusServicosPage";
import MeuServicoDetalhePage from "./pages/MeuServicoDetalhePage";
import ConteudoPage from "./pages/ConteudoPage";
import ConteudoDetalhePage from "./pages/ConteudoDetalhePage";
import TrilhaPage from "./pages/TrilhaPage";
import AssinaturaPage from "./pages/AssinaturaPage";
import CopilotoPage from "./pages/CopilotoPage";
import PerfilPage from "./pages/PerfilPage";
import NotificacoesPage from "./pages/NotificacoesPage";

// Partner portal
import { ParceiroLoginPage, ParceiroDashboardPage, ParceiroOsDetalhePage, ParceiroAgendaPage, ParceiroRepassesPage } from "./pages/parceiro/ParceiroPages";

// Operations portal
import { OperacaoLoginPage, OperacaoPainelPage, OperacaoParceirosPage, OperacaoExcecoesPage, OperacaoConteudoPage, OperacaoPlanosPage } from "./pages/operacao/OperacaoPages";

// Executive portal
import { DiretoriaLoginPage, DiretoriaDashboardPage } from "./pages/diretoria/DiretoriaPages";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/teste" element={<TestePage />} />
            <Route path="/score" element={<ScorePage />} />
            <Route path="/resultado" element={<ResultadoPage />} />
            <Route path="/paywall" element={<PaywallPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/planos" element={<PlanosPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/suporte" element={<SuportePage />} />
            <Route path="/privacidade" element={<PrivacidadePage />} />
            <Route path="/termos" element={<TermosPage />} />
            <Route path="/cookies" element={<CookiesPage />} />

            {/* Doctor authenticated */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recomendacoes" element={<RecomendacoesPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/servicos/:id" element={<ServicoDetalhePage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/meus-servicos" element={<MeusServicosPage />} />
            <Route path="/meus-servicos/:id" element={<MeuServicoDetalhePage />} />
            <Route path="/conteudo" element={<ConteudoPage />} />
            <Route path="/conteudo/trilha/:slug" element={<TrilhaPage />} />
            <Route path="/conteudo/:slug" element={<ConteudoDetalhePage />} />
            <Route path="/assinatura" element={<AssinaturaPage />} />
            <Route path="/copiloto" element={<CopilotoPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/notificacoes" element={<NotificacoesPage />} />

            {/* Partner portal */}
            <Route path="/parceiro/login" element={<ParceiroLoginPage />} />
            <Route path="/parceiro/dashboard" element={<ParceiroDashboardPage />} />
            <Route path="/parceiro/os/:id" element={<ParceiroOSDetalhePage />} />
            <Route path="/parceiro/agenda" element={<ParceiroAgendaPage />} />
            <Route path="/parceiro/repasses" element={<ParceiroRepassesPage />} />

            {/* Operations portal */}
            <Route path="/operacao/login" element={<OperacaoLoginPage />} />
            <Route path="/operacao/painel" element={<OperacaoPainelPage />} />
            <Route path="/operacao/parceiros" element={<OperacaoParceirosPage />} />
            <Route path="/operacao/excecoes" element={<OperacaoExcecoesPage />} />
            <Route path="/operacao/conteudo" element={<OperacaoConteudoPage />} />
            <Route path="/operacao/planos" element={<OperacaoPlanosPage />} />

            {/* Executive portal */}
            <Route path="/diretoria/login" element={<DiretoriaLoginPage />} />
            <Route path="/diretoria/dashboard" element={<DiretoriaDashboardPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
