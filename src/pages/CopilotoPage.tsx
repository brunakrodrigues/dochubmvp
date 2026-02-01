import { Header, Footer } from "@/components/Layout";
import { CopilotChat } from "@/components/CopilotChat";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function CopilotoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" isAuthenticated />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <Badge variant="accent" size="lg" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Inteligência Artificial
            </Badge>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Copiloto DocHub
            </h1>
            <p className="mt-2 text-muted-foreground">
              Seu assistente de carreira com IA. Faça perguntas sobre serviços, carreira, finanças e muito mais.
            </p>
          </div>

          <CopilotChat className="h-[600px]" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm font-medium text-foreground">Respostas fundamentadas</p>
              <p className="text-xs text-muted-foreground">Baseadas em documentação oficial</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm font-medium text-foreground">Contexto personalizado</p>
              <p className="text-xs text-muted-foreground">Considera seu perfil e score</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm font-medium text-foreground">Governança total</p>
              <p className="text-xs text-muted-foreground">Transparência nas recomendações</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
