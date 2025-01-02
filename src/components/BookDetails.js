import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../services/booksService";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      const getBookDetails = async () => {
        const data = await fetchBookById(id); // Fetch book details using the ID
        setBook(data);
      };
      getBookDetails();
    }
  }, [id]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {book ? (
        <>
          <h1 style={{ color: "#333", fontSize: "2em" }}>{book.volumeInfo.title}</h1>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title} // Use the book title as the alt text
            style={{ width: "200px", height: "auto", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "1.2em", color: "#555" }}>
            <strong>By:</strong> {book.volumeInfo.authors?.join(", ")}
          </p>
          <p style={{ fontSize: "1.2em", color: "#555" }}>
            <strong>Published by:</strong> {book.volumeInfo.publisher}
          </p>
          <p style={{ fontSize: "1.2em", color: "#555" }}>
            <strong>Published on:</strong> {book.volumeInfo.publishedDate}
          </p>
          <p style={{ fontSize: "1.2em", color: "#555" }}>
            <strong>Pages:</strong> {book.volumeInfo.pageCount}
          </p>
          <p style={{ fontSize: "1.2em", color: "#555" }}>
            <strong>Categories:</strong> {book.volumeInfo.categories?.join(", ")}
          </p>
          <p style={{ fontSize: "1.2em", color: "#555" }}>
            <strong>Language:</strong> {book.volumeInfo.language}
          </p>
          <div
            style={{ fontSize: "1.2em", color: "#555", marginTop: "20px" }}
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
          />
        </>
      ) : (
        <p style={{ fontSize: "1.5em", color: "#999" }}>Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;
