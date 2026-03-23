import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Download, Trash2 } from "lucide-react";

const notifTypes = ["Resultado do teste", "Recomendações", "Status de serviço", "Novos conteúdos", "Alertas financeiros"];
const channels = ["Email", "Push", "WhatsApp"];

export default function PerfilPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Meu Perfil</h1>

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="relative h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground"><Camera className="h-3 w-3" /></button>
          </div>
          <div><p className="font-semibold">Dr. João Silva</p><p className="text-sm text-muted-foreground">joao.silva@email.com</p></div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
          <h2 className="font-display text-lg font-semibold">Dados Pessoais</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label>Nome</Label><Input defaultValue="Dr. João Silva" className="mt-1.5" /></div>
            <div><Label>Email</Label><Input defaultValue="joao.silva@email.com" className="mt-1.5" /></div>
            <div><Label>Telefone</Label><Input defaultValue="(11) 99999-9999" className="mt-1.5" /></div>
            <div><Label>CRM</Label><Input defaultValue="123456-SP" className="mt-1.5" /></div>
            <div><Label>Especialidade</Label><Input defaultValue="Cardiologia" className="mt-1.5" /></div>
            <div><Label>Tempo de Formação</Label><Input defaultValue="12 anos" className="mt-1.5" /></div>
            <div><Label>Cidade</Label><Input defaultValue="São Paulo" className="mt-1.5" /></div>
            <div><Label>Estado</Label><Input defaultValue="SP" className="mt-1.5" /></div>
          </div>
          <Button variant="accent">Salvar Alterações</Button>
        </div>

        {/* Password */}
        <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
          <h2 className="font-display text-lg font-semibold">Alterar Senha</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div><Label>Senha atual</Label><Input type="password" className="mt-1.5" /></div>
            <div><Label>Nova senha</Label><Input type="password" className="mt-1.5" /></div>
            <div><Label>Confirmar senha</Label><Input type="password" className="mt-1.5" /></div>
          </div>
          <Button variant="outline">Alterar Senha</Button>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold mb-4">Preferências de Notificação</h2>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="py-2 text-left text-muted-foreground">Tipo</th>{channels.map(c => <th key={c} className="text-center text-muted-foreground">{c}</th>)}</tr></thead>
            <tbody>
              {notifTypes.map(t => (
                <tr key={t} className="border-b">
                  <td className="py-3">{t}</td>
                  {channels.map(c => (
                    <td key={c} className="text-center">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LGPD */}
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold mb-4">Privacidade e Dados (LGPD)</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exportar meus dados</Button>
            <Button variant="ghost" className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Excluir minha conta</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
