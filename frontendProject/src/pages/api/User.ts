import axios from "axios";

// Function to get the username token from the backend

export function setUpUsername(username: string) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8000";
  return axios
    .post<{ message: string; data: string }>(`${BASE_URL}/api/user/username`, {
      username: username,
    })
    .then((res) => res.data);
}
