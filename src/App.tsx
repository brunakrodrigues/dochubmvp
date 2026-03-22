import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

import LandingPage from "./pages/LandingPage";
import CadastroPage from "./pages/CadastroPage";
import PaywallPage from "./pages/PaywallPage";
import TestePage from "./pages/TestePage";
import ScorePage from "./pages/ScorePage";
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/paywall" element={<PaywallPage />} />
            <Route path="/teste" element={<TestePage />} />
            <Route path="/score" element={<ScorePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
