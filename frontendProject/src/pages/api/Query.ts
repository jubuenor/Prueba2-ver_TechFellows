import axios from "axios";
import { QueryCreate, Results, Query } from "@/types/query";
import cookie from "js-cookie";

// Function to check the query
export function checkQuery(query: QueryCreate) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  const token = cookie.get("username");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post<{ message: string; data: { query: string; results: Results } }>(
      `${BASE_URL}/api/query/checkQuery`,
      query,
      config
    )
    .then((res) => res.data);
}

// Function to save the query in the backend
export function saveQuery(query: Query) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  const token = cookie.get("username");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .post<{ message: string }>(`${BASE_URL}/api/query/create`, query, config)
    .then((res) => res.data);
}

// Function to get all queries from the backend
export function getAllQueries() {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  return axios
    .get<{ message: string; data: Query[] }>(`${BASE_URL}/api/query/getAll`)
    .then((res) => res.data);
}
