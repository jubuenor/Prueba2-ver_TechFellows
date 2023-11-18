import React from "react";
import { ListGroup } from "react-bootstrap";
import { Comment } from "@/types/comments";

function Comments({ comments }: { comments: Comment[] }) {
  if (!Array.isArray(comments)) return <div></div>;
  const renderComments = comments.map((comment, index) => {
    const date = new Date(comment.date ?? "");

    return (
      <ListGroup.Item key={index}>
        <p>
          <strong>{comment.username}</strong>
          <span className="text-muted ms-3">{date.toDateString()}</span>
        </p>
        <p className="m-0">{comment.comment}</p>
      </ListGroup.Item>
    );
  });
  return <ListGroup>{renderComments}</ListGroup>;
}

export default Comments;
