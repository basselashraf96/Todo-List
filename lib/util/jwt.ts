export const getToken = (): string | null => {
  // Get token from localStorage (you can also use cookies if needed)
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};