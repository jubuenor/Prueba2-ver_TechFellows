import { QueryStorage } from "@/types/query";

// Fuctions to save query in local storage
export function setQueryStorage(query: string) {
  localStorage.setItem("query", query);
}

// Function to get query from local storage
export function getQueryStorage(): QueryStorage | null {
  const query = localStorage.getItem("query");
  if (!query) return null;
  const queryStorage: QueryStorage = JSON.parse(query);
  return queryStorage;
}

// Function to remove query from local storage
export function removeQueryStorage() {
  localStorage.removeItem("query");
}
