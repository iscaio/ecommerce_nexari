import React from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const PromoSection = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-pink-500 mono">//</span>
              Promoções Ativas
            </h2>
            <p className="text-gray-400">
              Descontos de até 31% em produtos selecionados
            </p>
          </div>
          <Button
            variant="outline"
            className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
          >
            Ver Todas
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
