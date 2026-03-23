import { useState } from "react";
import { Header, Footer } from "@/components/Layout";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Button } from "@/components/ui/button";
import { Target, Brain, Briefcase, Users } from "lucide-react";

export default function SobrePage() {
  const [waOpen, setWaOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <section className="bg-gradient-hero py-20">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground">Sobre o DocHub</h1>
          <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl mx-auto">Ser a principal plataforma digital de apoio à carreira médica no Brasil.</p>
        </div>
      </section>
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {[
            { icon: Target, title: "Diagnóstico Baseado em Dados", desc: "Avaliação profissional em 9 dimensões com score de maturidade e recomendações personalizadas." },
            { icon: Brain, title: "IA Aplicada à Carreira", desc: "Copiloto inteligente que analisa seu perfil e sugere ações concretas para evolução profissional." },
            { icon: Briefcase, title: "Serviços Especializados", desc: "Marketplace de serviços verificados: contábil, jurídico, mentoria, marketing e gestão." },
          ].map(v => (
            <div key={v.title} className="rounded-2xl border bg-card p-8 shadow-card text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10"><v.icon className="h-7 w-7 text-accent" /></div>
              <h3 className="font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="font-display text-2xl font-bold text-center mb-8">Nossa Equipe</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto mb-12">
          {[
            { name: "Dr. Ricardo Almeida", role: "CEO & Fundador", initials: "RA" },
            { name: "Ana Carolina Souza", role: "CTO", initials: "AS" },
            { name: "Dr. Marcos Oliveira", role: "Head de Conteúdo", initials: "MO" },
          ].map(m => (
            <div key={m.name} className="rounded-xl border bg-card p-6 shadow-card text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 font-display text-xl font-bold text-accent">{m.initials}</div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="hero" size="lg" onClick={() => setWaOpen(true)}>Fale Conosco</Button>
        </div>
      </section>
      <Footer />
      <WhatsAppModal open={waOpen} onOpenChange={setWaOpen} message="Olá! Gostaria de saber mais sobre o DocHub." context="Fale Conosco" />
    </div>
  );
}
