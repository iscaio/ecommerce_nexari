import React, { useState } from "react";
//import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { Zap, User, Mail, Lock, Loader2 } from "lucide-react"; // Importei Loader2

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Novo estado de loading

  const { register } = useAuth();
  //const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Trava o botão

    // Validações básicas
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await register(name, email, password);

      if (result.success) {
        toast({
          title: "Conta criada!",
          description: "Bem-vindo à NEXARI. Redirecionando...",
          className: "bg-green-500 text-white border-none",
        });

        // --- A CORREÇÃO MÁGICA AQUI ---
        // Força o navegador a ir para a página de promoções do zero
        window.location.href = "/promotions";
      } else {
        toast({
          title: "Erro no cadastro",
          description: result.message || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      // Se criou o token mas deu erro no front, redireciona mesmo assim
      if (localStorage.getItem("token")) {
        window.location.href = "/promotions";
      } else {
        toast({
          title: "Erro técnico",
          description: "Não foi possível conectar ao servidor.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false); // Destrava o botão
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center hex-pattern px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md shadow-2xl bg-slate-900/90 backdrop-blur-xl border-indigo-500/30 relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center neon-glow">
            <Zap className="text-white w-8 h-8" fill="currentColor" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">
            NEXARI
          </CardTitle>
          <CardDescription className="text-base text-gray-400">
            <span className="mono text-cyan-400">//</span> Crie sua conta agora
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 btn-glow"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Criar Conta"
              )}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
