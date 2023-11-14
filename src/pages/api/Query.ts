import axios from "axios";
import { QueryCreate, Results } from "@/types/query";

export function checkQuery(query: QueryCreate) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  return axios
    .post<{ message: string; data: { query: string; results: Results } }>(
      `${BASE_URL}/api/query/checkQuery`,
      query
    )
    .then((res) => res.data);
}
