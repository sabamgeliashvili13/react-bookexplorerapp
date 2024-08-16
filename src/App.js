import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/search'; 
import BookList from './components/bookList'; 
import styled from 'styled-components';
import { searchBooks } from './components/Api'; 

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #810100;
  color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #710110;
    transition: .3s ease-in-out;
    border-radius: 10px;
  }
`;

function App() {
  const [books, setBooks] = useState([]); 
  const [favourites, setFavourites] = useState([]); 
  const [viewFavourites, setViewFavourites] = useState(false); 
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState(1);
  const booksNumOnPage = 5;

  const startIndex = (currentPage - 1) * booksNumOnPage;
  const endIndex = startIndex + booksNumOnPage;

  function handleSearch(query) {
    searchBooks(query).then(function(results) {
      setBooks(results);
      setCurrentPage(1); 
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

  function toggleTheme()  {
    setTheme(function(prevTheme) {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  }

  function nextPage() {
    setCurrentPage(function(prevPage) {
      return prevPage + 1;
    });
  }

  function prevPage() {
    setCurrentPage(function(prevPage) {
      if (prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  }

  useEffect(function() {
    document.body.className = theme + '-mode';
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={toggleViewFavourites}>
          {viewFavourites ? 'Back to Search Results' : 'View Favourite Books'}
        </Button>
        <Button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </header>
      {!viewFavourites && (
        <>
          <SearchBar onSearch={handleSearch} />
          <BookList 
            books={books.slice(startIndex, endIndex)}
            onAddToFavourites={handleAddToFavourites}
          />
          <div>
            <Button onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
            <Button onClick={nextPage} disabled={endIndex >= books.length}>Next</Button>
          </div>
        </>
      )}
      {viewFavourites && (
        <BookList 
          books={favourites}
          onAddToFavourites={function() {}} 
        />
      )}
    </div>
  );
}

export default App;
