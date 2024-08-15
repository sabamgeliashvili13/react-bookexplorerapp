import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #810100;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

function SearchBar({ onSearch }) { 
  const [query, setQuery] = useState('');

  function handleSearch() {
    onSearch(query); 
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <Input 
        placeholder="Search for a book" 
        value={query} 
        onChange={handleChange} 
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default SearchBar;
