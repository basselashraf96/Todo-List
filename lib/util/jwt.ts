export const getToken = (): string | null => {
  // Get token from localStorage (you can also use cookies if needed)
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null;
};
