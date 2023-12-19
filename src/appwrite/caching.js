const CACHE_KEY = 'appwriteData'; // Key to store data in localStorage


// Function to get cached data from localStorage
const getCachedData = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  return cachedData ? JSON.parse(cachedData) : null;
};

// Function to save data to localStorage
const saveDataToCache = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
};

export {  getCachedData, saveDataToCache };
