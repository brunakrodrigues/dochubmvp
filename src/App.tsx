import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import CadastroPage from "./pages/CadastroPage";
import TestePage from "./pages/TestePage";
import ScorePage from "./pages/ScorePage";
import RecomendacoesPage from "./pages/RecomendacoesPage";
import CopilotoPage from "./pages/CopilotoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Jornada de Descoberta */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Jornada de Cadastro */}
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/login" element={<CadastroPage />} />
          
          {/* Jornada do Teste */}
          <Route path="/teste" element={<TestePage />} />
          
          {/* Jornada de Resultado */}
          <Route path="/score" element={<ScorePage />} />
          
          {/* Jornada de Recomendação */}
          <Route path="/recomendacoes" element={<RecomendacoesPage />} />
          <Route path="/dashboard" element={<RecomendacoesPage />} />
          
          {/* Jornada do Copiloto IA */}
          <Route path="/copiloto" element={<CopilotoPage />} />
          
          {/* Placeholder routes for other journeys */}
          <Route path="/conteudo" element={<LandingPage />} />
          <Route path="/servicos" element={<LandingPage />} />
          <Route path="/planos" element={<LandingPage />} />
          <Route path="/checkout" element={<LandingPage />} />
          <Route path="/acompanhamento" element={<LandingPage />} />
          <Route path="/backoffice" element={<LandingPage />} />
          <Route path="/parceiros" element={<LandingPage />} />
          <Route path="/executivo" element={<LandingPage />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
