import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Set the username cookie
export async function setUsernameCookie(username: string) {
  cookie.set("username", username, { expires: 1 });
}

// Get the username cookie
export function getUsernameCookie(): string {
  const token = cookie.get("username");
  if (!token) return "";
  const username: { username: string } = jwtDecode(token);
  return username.username;
}

// Remove the username cookie
export function removeUsernameCookie() {
  cookie.remove("username");
}
