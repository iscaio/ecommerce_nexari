import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Zap, Lock, Mail } from "lucide-react";
import { useToast } from "../hooks/use-toast"; // Descomentei aqui

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta à NEXARI.",
          className: "bg-green-500 text-white border-none",
        });
        navigate("/promotions");
      } else {
        toast({
          title: "Erro no login",
          description: result.message || "Verifique suas credenciais.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      if (localStorage.getItem("token")) {
        window.location.href = "/promotions";
      } else {
        toast({
          title: "Erro de conexão",
          description:
            "O servidor não respondeu. Verifique se o backend está rodando.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center hex-pattern px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md shadow-2xl bg-slate-900/90 backdrop-blur-xl border-indigo-500/30 relative z-10">
        <CardHeader className="text-center space-y-4">
          <div
            className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl 
          flex items-center justify-center neon-glow"
          >
            <Zap className="text-white w-8 h-8" fill="currentColor" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">
            NEXARI
          </CardTitle>
          <CardDescription className="text-base text-gray-400">
            <span className="mono text-cyan-400">//</span> Entre com suas
            credenciais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-slate-800 border-slate-700"
                />
                <span className="text-gray-400">Lembrar de mim</span>
              </label>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 btn-glow"
              size="lg"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Entrar"}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Cadastre-se
              </Link>
            </div>
          </form>

          {/* Mantive a caixa de teste para facilitar seus testes */}
          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
            <p className="text-sm text-indigo-400 font-medium mb-2 mono">
              // Conta de teste (Crie no /register)
            </p>
            <p className="text-xs text-gray-400 mono">
              Dica: Cadastre um usuário novo para testar!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
