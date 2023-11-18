import React from "react";
import { ListGroup } from "react-bootstrap";
import { Comment } from "@/types/comments";

// Functional component that renders a list of comments
function Comments({ comments }: { comments: Comment[] }) {
  // If comments is not an array, return an empty div
  if (!Array.isArray(comments)) return <div></div>;

  // Map each comment to a ListGroup.Item
  const renderComments = comments.map((comment, index) => {
    const date = new Date(comment.date ?? "");

    // Return a ListGroup.Item with the comment's username, date, and comment
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
