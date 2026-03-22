import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Layout";
import { useApp } from "@/context/AppContext";
import { brazilianStates, medicalSpecialties, ageRanges } from "@/data/marketData";
import { ArrowRight, Shield } from "lucide-react";

export default function CadastroPage() {
  const navigate = useNavigate();
  const { setUser, setTestType } = useApp();
  const [form, setForm] = useState({
    name: '', email: '', specialty: '', city: '', state: '', ageRange: '',
  });

  const isValid = form.name && form.email && form.specialty && form.state && form.ageRange;

  const handleSubmit = (type: 'free' | 'complete') => {
    if (!isValid) return;
    setUser(form);
    setTestType(type);
    if (type === 'complete') {
      navigate('/paywall');
    } else {
      navigate('/teste');
    }
  };

  const selectClass = "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">Dados Profissionais</h1>
            <p className="mt-2 text-muted-foreground">Preencha para personalizar seu diagnóstico</p>
          </div>

          <div className="rounded-2xl border bg-card p-8 shadow-card">
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Dr(a). João Silva" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="email">Email profissional</Label>
                <Input id="email" type="email" placeholder="joao@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="specialty">Especialidade médica</Label>
                <select id="specialty" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} className={`${selectClass} mt-1.5`}>
                  <option value="">Selecione...</option>
                  {medicalSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <select id="state" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className={`${selectClass} mt-1.5`}>
                    <option value="">UF...</option>
                    {brazilianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="São Paulo" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="age">Faixa etária</Label>
                <select id="age" value={form.ageRange} onChange={e => setForm(f => ({ ...f, ageRange: e.target.value }))} className={`${selectClass} mt-1.5`}>
                  <option value="">Selecione...</option>
                  {ageRanges.map(a => <option key={a} value={a}>{a} anos</option>)}
                </select>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button variant="hero" size="lg" className="w-full" onClick={() => handleSubmit('free')} disabled={!isValid}>
                Teste Free — 12 perguntas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={() => handleSubmit('complete')} disabled={!isValid}>
                Teste Completo — 25 perguntas (R$ 49,90)
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              Seus dados são protegidos e não serão compartilhados
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
