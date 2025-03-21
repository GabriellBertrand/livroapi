import React, { useState } from "react";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const searchBooks = async () => {
    try {
      setError(null);
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar os livros");
      }
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // Pegando apenas os 10 primeiros resultados
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Busca de Livros</h1>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Digite o título do livro"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 w-full" onClick={searchBooks}>
        Buscar
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="mt-4">
        {books.map((book, index) => (
          <li key={index} className="border-b py-2">
            <strong>{book.title}</strong> - {book.author_name?.join(", ") || "Autor desconhecido"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
