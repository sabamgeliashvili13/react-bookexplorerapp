import React from 'react'; 
import Book from './book';

function BookList(props) { 
 

  return (
    <div> 
      {props.books.map(function(book) { 
        return (
          <Book 
            key={book.id} 
            book={book} 
            onAddToFavourites={props.onAddToFavourites} 
          />
        );
      })}
    </div>
  );
}

export default BookList; 
