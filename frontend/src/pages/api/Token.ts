import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

export async function setUsernameCookie(username: string) {
  cookie.set("username", username, { expires: 1 });
}

export function getUsernameCookie(): string {
  const token = cookie.get("username");
  if (!token) return "";
  const username: { username: string } = jwtDecode(token);
  return username.username;
}

export function removeUsernameCookie() {
  cookie.remove("username");
}
