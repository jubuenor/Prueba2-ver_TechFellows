import cookie from "js-cookie";
import * as jose from "jose";
import { jwtDecode } from "jwt-decode";

export async function setUsername(username: string) {
  const SECRET_KEY = new TextEncoder().encode(
    process.env.SECRET_KEY ?? "secret"
  );
  const alg = "HS256";
  const token = new jose.SignJWT({ username: username })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  cookie.set("username", await token, { expires: 1 });
}

export function getUsername(): string {
  const token = cookie.get("username");
  if (!token) return "";
  const username: { username: string } = jwtDecode(token);
  console.log(username);
  return username.username;
}

export function removeUsername() {
  cookie.remove("username");
}
