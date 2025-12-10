import React, { useState, useEffect } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { Tag, TrendingDown, Clock, Loader2 } from "lucide-react";
import { Badge } from "../components/ui/badge";

const Promotions = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await api.get("/products/promotions");
        setPromoProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar promoções:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const maxDiscount =
    promoProducts.length > 0
      ? Math.max(...promoProducts.map((p) => p.discount || 0))
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Tag className="w-5 h-5" />
            <span className="font-semibold">Promoções Ativas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Descontos de até {maxDiscount}%
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Aproveite nossas ofertas especiais em produtos selecionados. Estoque
            limitado!
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Clock className="w-5 h-5" />
            <span>Ofertas por tempo limitado</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Produtos em Promoção
              </h2>
              <p className="text-gray-600">
                {promoProducts.length}{" "}
                {promoProducts.length === 1 ? "produto" : "produtos"} com
                desconto
              </p>
            </div>
            {/* Só exibe badge se houver produtos */}
            {promoProducts.length > 0 && (
              <Badge variant="outline" className="text-lg px-4 py-2">
                <TrendingDown className="w-5 h-5 mr-2" />
                Economize agora
              </Badge>
            )}
          </div>

          {promoProducts.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma promoção ativa no momento
              </h3>
              <p className="text-gray-600">
                Volte em breve para conferir nossas ofertas!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promoProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Inscreva-se para Receber Ofertas Exclusivas
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Seja o primeiro a saber sobre novas promoções e lançamentos
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
