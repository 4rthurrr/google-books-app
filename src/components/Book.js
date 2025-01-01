import React from "react";

const Book = ({ title, authors, thumbnail }) => (
  <div className="book">
    <img src={thumbnail} alt={title} />
    <h3>{title}</h3>
    <p>{authors ? authors.join(", ") : "Unknown Author"}</p>
  </div>
);

export default Book;
