import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

export default function AssinaturaPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Minha Assinatura</h1>
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent"><Check className="h-4 w-4" /> Plano Premium</span>
              <p className="mt-2 text-sm text-muted-foreground">Próxima cobrança: 22/04/2026</p>
              <p className="text-sm text-muted-foreground">Forma de pagamento: Visa ****6411</p>
            </div>
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-sm text-muted-foreground">Interações com Copiloto</p><p className="font-display text-2xl font-bold">23 <span className="text-sm font-normal text-muted-foreground">este mês</span></p></div>
          <div className="rounded-xl border bg-card p-5 shadow-card"><p className="text-sm text-muted-foreground">Conteúdos acessados</p><p className="font-display text-2xl font-bold">12</p></div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold mb-4">Histórico de Pagamentos</h2>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-muted-foreground"><th className="py-2 text-left">Data</th><th className="text-left">Descrição</th><th className="text-right">Valor</th><th className="text-right">Status</th></tr></thead>
            <tbody>
              {[["22/03/2026","Plano Premium - Mar/2026","R$149,00"],["22/02/2026","Plano Premium - Fev/2026","R$149,00"],["22/01/2026","Plano Premium - Jan/2026","R$149,00"]].map(([d,desc,v],i)=>(
                <tr key={i} className="border-b"><td className="py-3">{d}</td><td>{desc}</td><td className="text-right">{v}</td><td className="text-right"><span className="text-accent text-xs font-medium">Pago ✓</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Alterar Plano</Button>
          <Button variant="outline">Alterar Forma de Pagamento</Button>
          <Button variant="ghost" className="text-destructive">Cancelar Assinatura</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
