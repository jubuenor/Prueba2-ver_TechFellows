import axios from "axios";
import { Query, QueryCreate, Results } from "@/types/query";
import cookie from "js-cookie";

// Function to check the query
export async function checkQuery(query: QueryCreate) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://local.eduviz.com:8080";
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
      config,
    )
    .then((res) => res.data);
}

// Function to save the query in the backend
export async function saveQuery(query: Query) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://local.eduviz.com:8080";
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
export async function getAllQueries() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://local.eduviz.com:8080";
  return axios
    .get<{ message: string; data: Query[] }>(`${BASE_URL}/api/query/getAll`)
    .then((res) => res.data);
}
