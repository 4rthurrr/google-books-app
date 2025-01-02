import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../services/booksService";
import './BookDetails.css';
import ClipLoader from "react-spinners/ClipLoader";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getBookDetails = async () => {
        const data = await fetchBookById(id); // Fetch book details using the ID
        setBook(data);
        setLoading(false);
      };
      getBookDetails();
    }
  }, [id]);

  return (
    <div className="app">
      <div className="book-details">
        {loading ? (
          <ClipLoader color="#000" size={100} />
        ) : (
          book && (
            <div>
              <h1>{book.volumeInfo.title}</h1>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title} // Use the book title as the alt text
              />
              <p>
                <strong>By:</strong> {book.volumeInfo.authors?.join(", ")}
              </p>
              <p>
                <strong>Published by:</strong> {book.volumeInfo.publisher}
              </p>
              <p>
                <strong>Published on:</strong> {book.volumeInfo.publishedDate}
              </p>
              <div className="description">
                <strong>Description:</strong>
                <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
              </div>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookDetails;
