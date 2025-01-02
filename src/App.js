import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchBooks } from "./services/booksService";
import Book from "./components/Book";
import BookDetails from "./components/BookDetails";
import "./styles/App.css";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(savedHistory);
  }, []);

  const saveToHistory = (query) => {
    const newHistory = [query, ...searchHistory];
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const handleSearch = async () => {
    setLoading(true);
    saveToHistory(query);
    const results = await fetchBooks(query);
    setBooks(results || []);
    setLoading(false);
  };

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
    <Router>
      <Routes>
        {/* Main Page - Book Search */}
        <Route
          path="/"
          element={
            <div className="app">
              <h1>Google Books Search</h1>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books"
              />
              <button onClick={handleSearch}>Search</button>

              {/*<div className="search-history">
                <h2>Search History</h2>
                {searchHistory.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>*/}

              <div className="book-list">
                {loading ? (
                  <ClipLoader color="#000" size={100} />
                ) : (
                  books.map((book) => (
                    <Book
                      key={book.id}
                      id={book.id} // Pass ID for routing
                      title={book.volumeInfo.title}
                      authors={book.volumeInfo.authors}
                      thumbnail={
                        book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"
                      }
                    />
                  ))
                )}
              </div>

                <br></br>

              <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 0}>
                  Previous
                </button>
                <button onClick={handleNextPage}>Next</button>
              </div>
            </div>
          }
        />

        {/* Book Details Page */}
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
