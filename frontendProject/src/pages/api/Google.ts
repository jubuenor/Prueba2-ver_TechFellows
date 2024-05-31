import axios from "axios";

export async function GoogleGetUserdata(token: string) {
  const GOOGLE_API = "https://www.googleapis.com/oauth2/v3/userinfo";
  return axios
    .get(GOOGLE_API, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
}
