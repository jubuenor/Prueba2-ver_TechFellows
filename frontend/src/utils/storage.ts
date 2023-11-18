import { QueryStorage } from "@/types/query";

export function setQueryStorage(query: string) {
  localStorage.setItem("query", query);
}

export function getQueryStorage(): QueryStorage | null {
  const query = localStorage.getItem("query");
  if (!query) return null;
  const queryStorage: QueryStorage = JSON.parse(query);
  return queryStorage;
}

export function removeQueryStorage() {
  localStorage.removeItem("query");
}
