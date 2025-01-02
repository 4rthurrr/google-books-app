import React from "react";
import { Link } from "react-router-dom";

const Book = ({ id, title, authors, thumbnail }) => (
  <div className="book">
    <Link to={`/book/${id}`}>
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
    </Link>

    
    {/*<p>{authors ? authors.join(", ") : "Unknown Author"}</p>*/}
  </div>
);

export default Book;
