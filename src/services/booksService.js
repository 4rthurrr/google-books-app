const API_KEY = process.env.REACT_APP_BOOKS_API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

// Utility function to add a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchBooks = async (query, startIndex = 0, maxResults = 7) => {
  try {
    await delay(1000);
    const response = await fetch(
      `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchBookById = async (id) => {
  try {
    
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch book details");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};



