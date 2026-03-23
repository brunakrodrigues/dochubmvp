import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Layout";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";

export default function RecuperarSenhaPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container flex items-center justify-center py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="rounded-2xl border bg-card p-8 shadow-card">
            {sent ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">Link enviado!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Link enviado para seu email. Verifique sua caixa de entrada.
                </p>
                <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Voltar para login
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <h1 className="font-display text-2xl font-bold text-foreground">Recuperar Senha</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Informe seu email para receber o link de recuperação</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
                    </div>
                  </div>
                  <Button variant="hero" size="lg" className="w-full" onClick={() => setSent(true)}>
                    Enviar link de recuperação
                  </Button>
                </div>
                <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Voltar para login
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
