import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <div className='hover-stick'></div>
            <Link to="/contact">Contact</Link>
          </nav>
          <div>
            <Button onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
                <Button onClick={toggleViewFavourites}>
                  {viewFavourites ? 'Back to Search Results' : 'View Favourite Books'}
                </Button>
          </div>
        </header>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
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
              </>
            } 
          />
          <Route 
            path="/contact" 
            element=
            {<div className='contact-page'>
              <div className='contact-box'>
                <span> <i class="fa-solid fa-phone font-awesome-icon" ></i> +995 551 73 33 42</span>
                <span> <i class="fa-solid fa-envelope font-awesome-icon"></i> Bookexplorer@gmail.com</span>
                <span> <i class="fa-solid fa-location-dot font-awesome-icon"></i> Tbilisi,Abashidze street 34</span>
                  </div>
                <div className='map-container'>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.108259612847!2d44.80354937589523!3d41.69659857126226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440ce457ded513%3A0x32ea02a26b6d1776!2zMzQg4YOc4YOY4YOZ4YOd4YOa4YOd4YOWIOGDkeGDkOGDoOGDkOGDl-GDkOGDqOGDleGDmOGDmuGDmOGDoSDhg6Xhg6Phg6nhg5AsIFRlbGF2aQ!5e0!3m2!1ska!2sge!4v1723997888835!5m2!1ska!2sge"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
              </div>
            </div>} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
