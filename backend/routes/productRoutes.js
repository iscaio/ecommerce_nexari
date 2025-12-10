const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// --- ROTA DE SEED (CRIAR 20 PRODUTOS) ---
// Acesse: http://localhost:8080/api/products/seed
router.get("/seed", async (req, res) => {
  try {
    // 1. Limpa o banco antigo
    await Product.deleteMany({});

    const sizesList = ["P", "M", "G", "GG", "XG"];

    // Função para gerar estoque aleatório (entre 5 e 20 unidades)
    const generateSizes = () =>
      sizesList.map((s) => ({
        size: s,
        stock: Math.floor(Math.random() * 15) + 5,
      }));

    // --- 1. OS 5 PRODUTOS EM PROMOÇÃO (Destaques) ---
    const promoProducts = [
      {
        name: "Camiseta NEXARI Origins",
        category: "Exclusivo",
        price: 49.9,
        oldPrice: 89.9,
        discount: 45,
        onSale: true,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop", // Camisa Preta Estilosa
        description:
          "A camiseta oficial da nossa marca. Algodão egípcio e corte moderno.",
        sizes: generateSizes(),
        colors: ["Preto", "Roxo Neon"],
      },
      {
        name: "Camiseta Developer Senior",
        category: "Dev",
        price: 59.9,
        oldPrice: 99.9,
        discount: 40,
        onSale: true,
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop", // Camisa com estampa
        description: "Para quem coda em produção na sexta-feira sem medo.",
        sizes: generateSizes(),
        colors: ["Azul Marinho", "Cinza"],
      },
      {
        name: "Camiseta Gamer Retro 8-Bit",
        category: "Games",
        price: 45.0,
        oldPrice: 75.0,
        discount: 40,
        onSale: true,
        image:
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop", // Vibe Streetwear
        description: "Nostalgia pura. Gráficos pixelados de alta qualidade.",
        sizes: generateSizes(),
        colors: ["Branco", "Preto"],
      },
      {
        name: "Camiseta Anime Hunter",
        category: "Anime",
        price: 65.0,
        oldPrice: 110.0,
        discount: 41,
        onSale: true,
        image:
          "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=600&auto=format&fit=crop", // Estilo Anime/Urbano
        description: "Edição limitada para caçadores de recompensas.",
        sizes: generateSizes(),
        colors: ["Laranja", "Preto"],
      },
      {
        name: "Camiseta Cyberpunk City",
        category: "Games",
        price: 55.9,
        oldPrice: 85.9,
        discount: 35,
        onSale: true,
        image:
          "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=600&auto=format&fit=crop", // Vibe Cyberpunk
        description: "O futuro é agora. Estampa neon reagente a luz negra.",
        sizes: generateSizes(),
        colors: ["Amarelo", "Preto"],
      },
    ];

    // --- 2. OS 15 PRODUTOS NORMAIS (Catálogo Geral) ---
    const normalProducts = [
      {
        name: "Camiseta Node.js Backend",
        category: "Dev",
        price: 79.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
        description: "Performance e escalabilidade no seu visual.",
        sizes: generateSizes(),
        colors: ["Verde", "Preto"],
      },
      {
        name: "Camiseta React Hooks",
        category: "Dev",
        price: 79.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
        description: "UseEffect: Você vai ficar estiloso a cada renderização.",
        sizes: generateSizes(),
        colors: ["Azul", "Branco"],
      },
      {
        name: "Camiseta Python Snake",
        category: "Dev",
        price: 75.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=600&auto=format&fit=crop",
        description: "Simples e poderosa, como a linguagem.",
        sizes: generateSizes(),
        colors: ["Amarelo", "Azul"],
      },
      {
        name: "Camiseta Linux Terminal",
        category: "Dev",
        price: 69.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
        description: "Sudo apt-get install style.",
        sizes: generateSizes(),
        colors: ["Preto"],
      },
      {
        name: "Camiseta Star Wars Vader",
        category: "Filmes",
        price: 89.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
        description: "Venha para o lado estiloso da força.",
        sizes: generateSizes(),
        colors: ["Preto", "Vermelho"],
      },
      {
        name: "Camiseta Marvel Shield",
        category: "Filmes",
        price: 89.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=600&auto=format&fit=crop",
        description: "Protegendo o mundo com estilo.",
        sizes: generateSizes(),
        colors: ["Azul", "Vermelho"],
      },
      {
        name: "Camiseta Batman Gotham",
        category: "Filmes",
        price: 95.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
        description: "O herói que sua guarda-roupa merece.",
        sizes: generateSizes(),
        colors: ["Preto", "Cinza"],
      },
      {
        name: "Camiseta Spider-Man Web",
        category: "Filmes",
        price: 85.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop",
        description: "Com grandes poderes vêm grandes responsabilidades.",
        sizes: generateSizes(),
        colors: ["Vermelho", "Azul"],
      },
      {
        name: "Camiseta Naruto Sage Mode",
        category: "Anime",
        price: 79.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1590188800758-681879163630?q=80&w=600&auto=format&fit=crop",
        description: "Dattebayo! O estilo ninja definitivo.",
        sizes: generateSizes(),
        colors: ["Laranja", "Preto"],
      },
      {
        name: "Camiseta One Piece Pirate",
        category: "Anime",
        price: 82.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
        description: "Em busca do tesouro do estilo.",
        sizes: generateSizes(),
        colors: ["Preto", "Branco"],
      },
      {
        name: "Camiseta Attack on Titan",
        category: "Anime",
        price: 85.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
        description: "Ofereça seu coração (e seu estilo).",
        sizes: generateSizes(),
        colors: ["Verde", "Marrom"],
      },
      {
        name: "Camiseta PlayStation Classic",
        category: "Games",
        price: 69.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop",
        description: "Para quem cresceu apertando X, O, Quadrado e Triângulo.",
        sizes: generateSizes(),
        colors: ["Cinza", "Azul"],
      },
      {
        name: "Camiseta Xbox Series",
        category: "Games",
        price: 69.9,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1621259182902-4809dd3c5c8a?q=80&w=600&auto=format&fit=crop",
        description: "Power your dreams.",
        sizes: generateSizes(),
        colors: ["Verde", "Preto"],
      },
      {
        name: "Camiseta PC Master Race",
        category: "Games",
        price: 75.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop",
        description: "FPS alto e temperaturas baixas.",
        sizes: generateSizes(),
        colors: ["Preto", "RGB"],
      },
      {
        name: "Camiseta Zelda Triforce",
        category: "Games",
        price: 85.0,
        onSale: false,
        image:
          "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=600&auto=format&fit=crop",
        description: "É perigoso ir sozinho, leve essa camiseta!",
        sizes: generateSizes(),
        colors: ["Verde", "Dourado"],
      },
    ];

    // Junta tudo (5 promos + 15 normais = 20 produtos)
    await Product.insertMany([...promoProducts, ...normalProducts]);

    res.json({
      message: "Sucesso! 20 Produtos criados (5 em promoção).",
      total: 20,
      promos: 5,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produtos" });
  }
});

// --- ROTA DE BUSCAR PROMOÇÕES (Sempre antes do ID) ---
router.get("/promotions", async (req, res) => {
  try {
    const promoProducts = await Product.find({ onSale: true });
    res.json(promoProducts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar promoções" });
  }
});

// --- ROTA DE LISTAR TODOS ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

// --- ROTA DE BUSCAR POR ID ---
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

module.exports = router;
