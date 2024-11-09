import jwt from "jsonwebtoken";

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null;
};

export const getUserId = (): string | null => {
  const token = getToken();
  if (token) {
    try {
      const decoded = jwt.decode(token) as { userId: string };
      return decoded?.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return "";
    }
  }
  return "";
};
