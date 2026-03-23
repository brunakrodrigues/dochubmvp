import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
  context?: string;
}

export default function WhatsAppModal({ open, onOpenChange, message = "Olá! Gostaria de mais informações sobre os serviços DocHub.", context = "Atendimento DocHub" }: WhatsAppModalProps) {
  const phone = "5511999999999";
  const encodedMessage = encodeURIComponent(message);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            {context}
          </DialogTitle>
          <DialogDescription>Você será redirecionado para o WhatsApp</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground mb-1">Mensagem pré-preenchida:</p>
            <p className="text-sm italic">"{message}"</p>
          </div>
          <p className="text-sm text-muted-foreground">Número: +55 11 99999-9999</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Voltar</Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white" asChild>
              <a href={`https://wa.me/${phone}?text=${encodedMessage}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Abrir WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
