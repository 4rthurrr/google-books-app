const API_KEY = "AIzaSyDWvMNevaCyGhPisxSuctrAfOHwhILHy4M";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const fetchBooks = async (query, startIndex = 0, maxResults = 10) => {
  try {
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

