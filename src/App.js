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
    const results = await fetchBooks(query, page);
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
              <br></br>
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                  <linearGradient id="otgSUr7MPT3L7k0tQcrTWa_8nYUJdndt4lD_gr1" x1="-275.991" x2="-275.991" y1="-7.111" y2="34.106" gradientTransform="translate(289.492 4.672)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#427fdb"></stop>
                    <stop offset="1" stop-color="#0c52bb"></stop>
                  </linearGradient>
                  <path fill="url(#otgSUr7MPT3L7k0tQcrTWa_8nYUJdndt4lD_gr1)" d="M9.001,40.995V7.002c0-1.105,0.899-2.004,2.004-2.004 h2.997l4,20.001l-4,18h-2.997C9.899,42.999,9.001,42.101,9.001,40.995z"></path>
                  <linearGradient id="otgSUr7MPT3L7k0tQcrTWb_8nYUJdndt4lD_gr2" x1="-283.542" x2="-253.446" y1="-2.94" y2="27.156" gradientTransform="translate(288.523 6.005)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#55adfd"></stop>
                    <stop offset="1" stop-color="#438ffd"></stop>
                  </linearGradient>
                  <path fill="url(#otgSUr7MPT3L7k0tQcrTWb_8nYUJdndt4lD_gr2)" d="M14.002,42.999V4.998h22.996 c1.105,0,2.004,0.899,2.004,2.004v33.993c0,1.105-0.899,2.004-2.004,2.004H14.002z"></path>
                  <path fill="#0c53bb" fill-rule="evenodd" d="M18.002,10.001v2.999 h10.999v-2.999H18.002z" clip-rule="evenodd"></path>
                  <path fill="#0c53bb" fill-rule="evenodd" d="M21.001,14.999v2.999 h8.001v-2.999H21.001z" clip-rule="evenodd"></path>
                  <path fill="#fff" fill-rule="evenodd" d="M34.002,4.999v16l-3.5-3 l-3.5,3v-16H34.002z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h1>Google Books Search  </h1>
              
              <br></br>
              <div className="search-bar">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for books"
                />
                <button onClick={handleSearch}>Search</button>
              </div>

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

                

              <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 0}>
                  Previous
                </button>
                <button onClick={handleNextPage}>Next</button>
              </div>
              <br></br>
              <footer className="footer">
                <p>&copy; 2024 Shanuka. All rights reserved.</p>
              </footer>
            </div>
          }
        />

        {/* Book Details Page */}
        <Route path="/book/:id" element={<BookDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
