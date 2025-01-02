import React from "react";
import { Link } from "react-router-dom";
import './Book.css';

const Book = ({ id, title, authors, thumbnail }) => (
  <div className="book">
    <Link to={`/book/${id}`} className="book-link">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
    </Link>
    {/*<p className="book-rating">Rating: {Math.floor(Math.random() * 5) + 1} / 5</p>*/}
    {/*<p>{authors ? authors.join(", ") : "Unknown Author"}</p>*/}
  </div>
);

export default Book;
