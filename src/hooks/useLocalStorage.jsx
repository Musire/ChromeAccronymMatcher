import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  // Load initial value from localStorage
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Save value to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage key:", key, error);
    }
  }, [key, value]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        } catch (error) {
          console.error("Error parsing localStorage value for key:", key, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [value, setValue];
}


export default useLocalStorage;