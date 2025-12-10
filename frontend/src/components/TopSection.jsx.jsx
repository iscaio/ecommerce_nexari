import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Cpu,
  Gamepad2,
  Code,
} from "lucide-react";

const TopSection = () => {
  return (
    <section className="relative hex-pattern py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-sm
           text-indigo-400 px-5 py-2 rounded-full mb-6"
          >
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-semibold mono">// Coleção 2025 </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text glitch">NEXARI</span>
            <br />
            <span className="text-white">Wear Your Passion</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Camisetas com designs exclusivos para gamers, devs e nerds.
            <span className="text-cyan-400"> Level up </span> seu guarda-roupa.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 btn-glow"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explorar Loja
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Ver Promoções
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-indigo-400" />
              <span>Designs Exclusivos</span>
            </div>

            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" />
              <span>Qualidade Premium</span>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Edição Limitada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
