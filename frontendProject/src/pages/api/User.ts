import axios from "axios";

// Function to get the username token from the backend

export async function setUpUsername(username: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://local.eduviz.com:8080";
  return axios
    .post<{ message: string; data: string }>(`${BASE_URL}/api/user/username`, {
      username: username,
    })
    .then((res) => res.data);
}
