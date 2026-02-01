import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StepIndicator } from "@/components/DocHubComponents";
import { Header } from "@/components/Layout";
import { ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const steps = [
  { label: "Dados Pessoais", description: "Informações básicas" },
  { label: "Profissional", description: "CRM e especialidade" },
  { label: "Senha", description: "Segurança da conta" },
  { label: "Consentimentos", description: "Termos e privacidade" },
];

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  uf: string;
  especialidade: string;
  senha: string;
  confirmarSenha: string;
  termos: boolean;
  privacidade: boolean;
  marketing: boolean;
}

export default function CadastroPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    crm: "",
    uf: "",
    especialidade: "",
    senha: "",
    confirmarSenha: "",
    termos: false,
    privacidade: false,
    marketing: false,
  });

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit form and redirect to test
      navigate("/teste");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Dr. João da Silva"
                inputSize="lg"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail profissional</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="joao@clinica.com.br"
                inputSize="lg"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                placeholder="(11) 99999-9999"
                inputSize="lg"
                className="mt-1.5"
              />
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="crm">Número do CRM</Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => handleChange("crm", e.target.value)}
                  placeholder="123456"
                  inputSize="lg"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="uf">UF do CRM</Label>
                <Input
                  id="uf"
                  value={formData.uf}
                  onChange={(e) => handleChange("uf", e.target.value)}
                  placeholder="SP"
                  inputSize="lg"
                  className="mt-1.5"
                  maxLength={2}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="especialidade">Especialidade principal</Label>
              <Input
                id="especialidade"
                value={formData.especialidade}
                onChange={(e) => handleChange("especialidade", e.target.value)}
                placeholder="Cardiologia"
                inputSize="lg"
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Você poderá adicionar outras especialidades depois
              </p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="senha">Senha</Label>
              <div className="relative mt-1.5">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  value={formData.senha}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  inputSize="lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                placeholder="Repita a senha"
                inputSize="lg"
                className="mt-1.5"
              />
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium">Sua senha deve conter:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${formData.senha.length >= 8 ? "text-success" : ""}`} />
                  Mínimo 8 caracteres
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${/[A-Z]/.test(formData.senha) ? "text-success" : ""}`} />
                  Uma letra maiúscula
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${/[0-9]/.test(formData.senha) ? "text-success" : ""}`} />
                  Um número
                </li>
              </ul>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id="termos"
                checked={formData.termos}
                onCheckedChange={(checked) => handleChange("termos", checked === true)}
              />
              <div>
                <Label htmlFor="termos" className="cursor-pointer">
                  Li e aceito os{" "}
                  <Link to="/termos" className="text-accent hover:underline">
                    Termos de Uso
                  </Link>
                </Label>
                <p className="text-xs text-muted-foreground">Obrigatório para usar a plataforma</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacidade"
                checked={formData.privacidade}
                onCheckedChange={(checked) => handleChange("privacidade", checked === true)}
              />
              <div>
                <Label htmlFor="privacidade" className="cursor-pointer">
                  Li e aceito a{" "}
                  <Link to="/privacidade" className="text-accent hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Seus dados são protegidos conforme LGPD
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="marketing"
                checked={formData.marketing}
                onCheckedChange={(checked) => handleChange("marketing", checked === true)}
              />
              <div>
                <Label htmlFor="marketing" className="cursor-pointer">
                  Aceito receber comunicações do DocHub
                </Label>
                <p className="text-xs text-muted-foreground">
                  Novidades, conteúdos e ofertas relevantes (opcional)
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-accent/5 p-4">
              <h4 className="mb-2 font-medium text-foreground">Como seus dados são usados</h4>
              <p className="text-sm text-muted-foreground">
                O DocHub utiliza seus dados para personalizar recomendações, calcular seu score de maturidade e sugerir serviços adequados ao seu perfil. Você pode solicitar exclusão a qualquer momento.
              </p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.nome && formData.email && formData.telefone;
      case 1:
        return formData.crm && formData.uf && formData.especialidade;
      case 2:
        return formData.senha.length >= 8 && formData.senha === formData.confirmarSenha;
      case 3:
        return formData.termos && formData.privacidade;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="public" />

      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          <Card variant="elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{steps[currentStep].label}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                <Button variant="accent" onClick={handleNext} disabled={!isStepValid()}>
                  {currentStep === steps.length - 1 ? "Criar Conta" : "Continuar"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
