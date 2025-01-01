import React, { useState } from "react";
import { fetchBooks } from "./services/booksService";
import Book from "./components/Book";
import "./styles/App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const results = await fetchBooks(query);
    setBooks(results || []);
  };

  const [page, setPage] = useState(0);

const handleNextPage = async () => {
  const nextPageBooks = await fetchBooks(query, page + 10);
  setBooks(nextPageBooks || []);
  setPage((prev) => prev + 10);
};

const handlePreviousPage = async () => {
  if (page === 0) return;
  const prevPageBooks = await fetchBooks(query, page - 10);
  setBooks(prevPageBooks || []);
  setPage((prev) => prev - 10);
};


  return (
    <div className="app">
      <h1>Google Books Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="book-list">
        {books.map((book) => (
          <Book
            key={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            thumbnail={
              book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"
            }
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>  
    </div>
  );
};

export default App;
