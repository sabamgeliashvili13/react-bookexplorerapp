import React from "react";
import "../App.css";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #810100;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const Book = ({ book, onAddToFavourites }) => {
  return (
    <div className="book-item">
      <h3 className="book-title">{book.volumeInfo.title}</h3>
      <p className="book-authors">
        <strong>Author(s):</strong> {book.volumeInfo.authors?.join(", ")}
      </p>
      <p className="book-description">{book.volumeInfo.description}</p>
      {book.volumeInfo.imageLinks && (
        <img
          className="book-image"
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      )}
      <Button onClick={() => onAddToFavourites(book)}>Add to Favorites</Button>
    </div>
  );
};

export default Book;
