import axios from "axios";
import cookie from "js-cookie";
import { Comment } from "@/types/comments";

// Function to get all comments from the backend
export async function getAllComments(id: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://local.eduviz.com:8080";
  return axios
    .get<{ message: string; data: Comment[] }>(
      `${BASE_URL}/api/comment/${id}/getAll`,
    )
    .then((res) => res.data);
}

// Function to create a comment
export async function createComment({
  id,
  comment,
}: {
  id: string;
  comment: Comment;
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://local.eduviz.com:8080";
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post<{ message: string; data: Comment }>(
      `${BASE_URL}/api/comment/${id}/create`,
      comment,
      config,
    )
    .then((res) => res.data);
}
