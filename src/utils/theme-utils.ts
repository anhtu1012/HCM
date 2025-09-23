// Check if we're in dark mode
export const isDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains("dark");
};

// Toggle dark mode
export const toggleDarkMode = (): void => {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

// Set dark mode
export const setDarkMode = (isDark: boolean): void => {
  if (typeof window === "undefined") return;
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Initialize theme based on user preference - now always defaulting to light mode
export const initializeTheme = (): void => {
  if (typeof window === "undefined") return;

  // First check localStorage
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    setDarkMode(true);
  } else {
    // Always default to light mode, ignoring system preference
    setDarkMode(false);
  }
};
