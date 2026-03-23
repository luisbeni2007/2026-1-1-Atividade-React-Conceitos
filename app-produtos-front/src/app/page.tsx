"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

function CardProduto({ produto }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">

      <img
        src={produto.images[0]}
        alt={produto.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <h2 className="text-lg font-semibold mb-2">
        {produto.title}
      </h2>

      <p className="text-gray-600 text-sm mb-2">
        {produto.description}
      </p>

      <p className="font-bold text-green-600">
        💲 {produto.price}
      </p>

      <p className="text-yellow-500">
        ⭐ {produto.rating}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        {produto.tags.join(", ")}
      </p>

    </div>
  );
}

export default function Home() {
  const [produtos, atualizarProdutos] = useState<any[]>([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <header className="max-w-4xl mx-auto mb-8 text-center">

        <h1 className="text-3xl font-bold mb-4">
          Pesquisa de Produtos
        </h1>

        <input
          type="text"
          placeholder="Digite o nome do produto..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {produtosFiltrados.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}

      </main>

    </div>
  );
}