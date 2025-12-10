import React from "react";
import ProductCard from "./ProductCard";

const CatalogSection = ({ products }) => {
  return (
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-cyan-500 mono">//</span>
            Catálogo Completo
          </h2>
          <p className="text-gray-400">Explore toda nossa coleção</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
