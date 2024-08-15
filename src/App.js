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

  async function handleSearch(query) {
    const results = await searchBooks(query);
    setBooks(results);
  }

  function handleAddToFavourites(book) {
    setFavourites([...favourites, book]);
  }


  return (
    <div className="App">
      <header className="App-header">
        <Button>Favourite Books</Button>
      </header>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onAddToFavourites={handleAddToFavourites} />
      <BookList books={favourites} onAddToFavourites={() => {}} /> 
    </div>
  );
}

export default App;