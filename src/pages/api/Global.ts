import { create } from "zustand";
import axios from "axios";
import { Data, Country, Serie } from "@/types/data";

export function getData() {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  return axios
    .get<{ message: string; data: Data }>(`${BASE_URL}/api/data`)
    .then((res) => res.data);
}

export const useGlobalStore = create<{
  data: Data | null;
  setData: (data: Data) => void;
}>((set) => ({
  data: null,
  setData: (data: Data) => set({ data }),
}));
