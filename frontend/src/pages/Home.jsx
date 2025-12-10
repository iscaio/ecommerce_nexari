import TopSection from "@/components/TopSection.jsx";
import PromoSection from "@/components/PromoSection";
import CatalogSection from "@/components/CatalogSection";
import CtaSection from "@/components/CTASection";
import React, { useState, useEffect } from "react";

import api from "@/api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      //console.log("Dados do Back:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const promoProducts = products.filter((p) => p.onSale);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full 
                      animate-spin mx-auto mb-4"
          ></div>
          <p className="text-gray-400">Carregando produtos...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950">
      <TopSection />
      <PromoSection products={promoProducts} />
      <CatalogSection products={products} />
      <CtaSection />
    </div>
  );
};
export default Home;
