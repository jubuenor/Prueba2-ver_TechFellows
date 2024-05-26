import { create } from "zustand";
import axios from "axios";
import { Data } from "@/types/data";

// Function to get the data needed for the app
export async function getData() {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  return axios
    .get<{ message: string; data: Data }>(`${BASE_URL}/api/data`)
    .then((res) => res.data);
}

// Function to set the data needed for the app
export const useGlobalStore = create<{
  data: Data | null;
  setData: (data: Data) => void;
}>((set) => ({
  data: null,
  setData: (data: Data) => set({ data }),
}));
