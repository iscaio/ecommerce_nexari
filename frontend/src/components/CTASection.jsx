import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CtaSection = () => (
  <section className="py-20 px-4 relative hex-pattern overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
        <span className="text-cyan-400 font-semibold mono">// LEVEL UP</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        10% OFF na Primeira Compra
      </h2>
      <p className="text-gray-300 text-lg mb-8">
        Cadastre-se agora e ganhe desconto especial + frete grátis em compras
        acima de R$ 200
      </p>
      <Link to="/register">
        <Button
          size="lg"
          className="text-lg px-8 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600
               text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          Criar Conta Agora
        </Button>
      </Link>
    </div>
  </section>
);

export default CtaSection;
