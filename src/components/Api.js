import axios from 'axios';

const API_KEY = 'AIzaSyBQ_Ehr-d-JqDGP0_w-Po_qbiH_hhoIMEo';  
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query, startIndex = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=20&key=${API_KEY}`);
    return response.data.items || []; 
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; 
  }
};
