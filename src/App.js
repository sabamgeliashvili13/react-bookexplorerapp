import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/search'; 
import BookList from './components/bookList'; 
import styled from 'styled-components';
import { searchBooks } from './components/Api'; 

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #810100;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

function App() {
  const [books, setBooks] = useState([]); 
  const [favourites, setFavourites] = useState([]); 
  const [viewFavourites, setViewFavourites] = useState(false); 

  function handleSearch(query) {
    searchBooks(query).then(function(results) {
      setBooks(results);
      // setViewFavourites(false);
    });
  }

  function handleAddToFavourites(book) {
    setFavourites(function(prevFavourites) {
      return [...prevFavourites, book];
    });
  }

  function toggleViewFavourites() {
    setViewFavourites(function(prevViewFavourites) {
      return !prevViewFavourites;
    });
  }

  useEffect(function() {
    searchBooks('a').then(function(results) {
      setBooks(results);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={toggleViewFavourites}>
          {viewFavourites ? 'Back to Search Results' : 'View Favourite Books'}
        </Button>
      </header>
      {!viewFavourites && <SearchBar onSearch={handleSearch} />}
      <BookList 
        books={viewFavourites ? favourites : books}
        onAddToFavourites={viewFavourites ? function() {} : handleAddToFavourites}
      />
    </div>
  );
}

export default App;
