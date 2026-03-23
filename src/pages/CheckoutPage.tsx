import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Layout";
import { CheckCircle, CreditCard, QrCode, FileText, Shield, ArrowRight } from "lucide-react";

const payTabs = ["Cartão de Crédito", "PIX", "Boleto"];

export default function CheckoutPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Cartão de Crédito");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header variant="public" />
        <div className="container flex items-center justify-center py-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Pagamento confirmado!</h1>
            <p className="mt-3 text-muted-foreground">
              Sua Ordem de Serviço <span className="font-semibold text-foreground">#OS-2026-0047</span> foi aberta.
            </p>
            <Button variant="hero" size="lg" className="mt-8" asChild>
              <Link to="/meus-servicos/OS-2026-0047">
                Acompanhar Serviço <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">Checkout</h1>
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-card p-6 shadow-card">
                <h2 className="font-semibold text-foreground mb-4">Resumo do Pedido</h2>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-foreground">Assessoria Tributária para Médicos</p>
                  <p className="text-muted-foreground">Planejamento tributário completo para médicos</p>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between"><span className="text-muted-foreground">Valor mensal</span><span>R$350,00</span></div>
                    <div className="flex justify-between text-success"><span>Desconto Premium -20%</span><span>-R$70,00</span></div>
                    <div className="flex justify-between font-bold text-foreground border-t pt-2 mt-2"><span>Total</span><span>R$280,00/mês</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border bg-card p-6 shadow-card">
                <div className="flex gap-2 mb-6">
                  {payTabs.map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeTab === t ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
                  ))}
                </div>

                {activeTab === "Cartão de Crédito" && (
                  <div className="space-y-4">
                    <div><Label>Número do cartão</Label><Input placeholder="0000 0000 0000 0000" className="mt-1.5" /></div>
                    <div><Label>Nome no cartão</Label><Input placeholder="JOÃO SILVA" className="mt-1.5" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Validade</Label><Input placeholder="MM/AA" className="mt-1.5" /></div>
                      <div><Label>CVV</Label><Input placeholder="123" className="mt-1.5" /></div>
                    </div>
                  </div>
                )}
                {activeTab === "PIX" && (
                  <div className="text-center space-y-4">
                    <div className="mx-auto h-48 w-48 rounded-xl bg-muted flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <Button variant="outline"><CreditCard className="mr-2 h-4 w-4" /> Copiar código PIX</Button>
                  </div>
                )}
                {activeTab === "Boleto" && (
                  <div className="text-center space-y-4">
                    <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">O boleto será gerado e enviado para seu email.</p>
                    <Button variant="outline">Gerar Boleto</Button>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 rounded border-border" />
                    <span className="text-xs text-muted-foreground">Li e aceito os Termos de Contratação e a Política de Privacidade do DocHub.</span>
                  </label>
                  <Button variant="hero" size="lg" className="w-full" disabled={!agreed} onClick={() => setSubmitted(true)}>
                    Confirmar Pagamento
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3.5 w-3.5" /> Pagamento seguro e criptografado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
