import { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "@/components/Layout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { MessageCircle, Mail, HelpCircle } from "lucide-react";

export default function SuportePage() {
  const [waOpen, setWaOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-16 max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-8">Central de Suporte</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <button onClick={() => setWaOpen(true)} className="rounded-2xl border bg-card p-8 shadow-card hover:shadow-card-hover transition-all text-center">
            <MessageCircle className="mx-auto h-10 w-10 text-accent mb-4" />
            <h3 className="font-display text-lg font-semibold">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mt-2">Fale conosco pelo WhatsApp</p>
            <p className="text-xs text-accent mt-1">Resposta em até 2h</p>
          </button>
          <div className="rounded-2xl border bg-card p-8 shadow-card text-center">
            <Mail className="mx-auto h-10 w-10 text-accent mb-4" />
            <h3 className="font-display text-lg font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground mt-2">Envie um email</p>
            <p className="text-xs text-accent mt-1">suporte@dochub.com.br</p>
            <p className="text-xs text-muted-foreground">Resposta em até 24h</p>
          </div>
          <Link to="/faq" className="rounded-2xl border bg-card p-8 shadow-card hover:shadow-card-hover transition-all text-center">
            <HelpCircle className="mx-auto h-10 w-10 text-accent mb-4" />
            <h3 className="font-display text-lg font-semibold">FAQ</h3>
            <p className="text-sm text-muted-foreground mt-2">Consulte nossas perguntas frequentes</p>
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">Horário de atendimento: Seg-Sex, 8h-18h</p>
      </div>
      <Footer />
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} />
    </div>
  );
}
