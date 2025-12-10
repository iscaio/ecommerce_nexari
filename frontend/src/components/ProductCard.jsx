import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";

const ProductCard = ({ product }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selecione tamanho e cor",
        description:
          "Por favor, escolha um tamanho e uma cor para adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    const sizeStock = product.sizes.find((s) => s.size === selectedSize);
    if (sizeStock && sizeStock.stock > 0) {
      addToCart(product, selectedSize, selectedColor, 1);
      toast({
        title: "Produto adicionado!",
        description: `${product.name} foi adicionado ao carrinho.`,
      });
      setDialogOpen(false);
      setSelectedSize("");
      setSelectedColor("");
    } else {
      toast({
        title: "Sem estoque",
        description: "Este tamanho está esgotado.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="group overflow-hidden bg-slate-900 border-slate-800 hover:border-indigo-500/50 card-hover">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.onSale && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 border-0 neon-glow">
              -{product.discount}%
            </Badge>
          )}
          <button className="absolute top-3 right-3 p-2 bg-slate-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-slate-700">
            <Heart className="w-5 h-5 text-pink-400" />
          </button>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              R$ {product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s.size}
                className={`text-xs px-2 py-1 rounded border ${
                  s.stock > 0
                    ? "border-indigo-500/30 text-indigo-400 bg-indigo-500/10"
                    : "border-slate-700 text-slate-600 line-through"
                }`}
              >
                {s.size}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            onClick={() => setDialogOpen(true)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{product.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Selecione o tamanho e a cor desejados
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-base font-semibold mb-3 block text-white">
                Tamanho
              </Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <label
                      key={s.size}
                      className={`relative flex items-center justify-center h-12 border-2 rounded-lg cursor-pointer transition-all ${
                        s.stock === 0
                          ? "opacity-50 cursor-not-allowed border-slate-700"
                          : selectedSize === s.size
                          ? "border-indigo-500 bg-indigo-500/20"
                          : "border-slate-700 hover:border-indigo-500/50"
                      }`}
                    >
                      <RadioGroupItem
                        value={s.size}
                        disabled={s.stock === 0}
                        className="sr-only"
                      />
                      <span className="font-semibold text-white">{s.size}</span>
                      {s.stock === 0 && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-red-400 font-medium">
                          Esgotado
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block text-white">
                Cor
              </Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
              >
                <div className="space-y-2">
                  {product.colors.map((color) => (
                    <label
                      key={color}
                      className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedColor === color
                          ? "border-indigo-500 bg-indigo-500/20"
                          : "border-slate-700 hover:border-indigo-500/50"
                      }`}
                    >
                      <RadioGroupItem value={color} />
                      <span className="font-medium text-white">{color}</span>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Preço:</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-slate-700 text-gray-300 hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
