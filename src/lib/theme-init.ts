/**
 * Theme initialization script
 * This script initializes the theme based on user preference or system preference
 * It should be imported in the main entry point of the application
 */

/**
 * Initialize the theme based on user preference or system preference
 */
export function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Check for system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme based on preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply if no saved preference exists
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}
