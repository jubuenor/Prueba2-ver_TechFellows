import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import Comments from "./Comments";
import { Query } from "@/types/query";
import { Comment } from "@/types/comments";
import Loading from "../Loading";
import { useQuery } from "react-query";
import { getAllComments } from "@/pages/api/Comment";
import { setQueryStorage } from "@/utils/storage";
import PostComment from "./PostComment";

// Functional component that renders a modal to view a query and its comments
// show is a boolean that determines whether the modal is shown
// handleClose is a function that closes the modal
// query is the query that is being viewed
// comments is an array of comments that is being viewed
function BodyModal({
  show,
  handleClose,
  query,
  comments,
}: {
  show: boolean;
  handleClose: () => void;
  query: Query;
  comments: Comment[];
}) {
  const date = new Date(query.date ?? "");
  const [commentsData, setCommentsData] = useState<Comment[]>(comments);
  // Update the commentsData when the comments prop changes
  useEffect(() => {
    setCommentsData(comments);
  }, [comments]);
  // Push a comment to the commentsData array
  const pushComment = (comment: Comment) => {
    const newComments = [comment].concat(commentsData);
    setCommentsData(newComments);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        className="d-flex justify-content-between align-items-center"
      >
        <Link
          href="/create"
          className="btn btn-light btn-sm rounded-5"
          onClick={() => setQueryStorage(query.query)}
        >
          <FaPlayCircle size={35} color="green" />
        </Link>
        <Card.Title className="m-0">
          {query.title}{" "}
          <span className="text-muted fs-6">by {query.username}</span>
        </Card.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="text-muted m-0 fs-6"> {date.toDateString()}</span>
        <Card.Body>
          <p className="mb-0">{query.description}</p>
        </Card.Body>
        <hr />
        <Card.Footer className="overflow-auto" style={{ maxHeight: "400px" }}>
          {commentsData.length === 0 ? (
            <p> Be the first to comment</p>
          ) : (
            <Comments comments={commentsData}></Comments>
          )}
        </Card.Footer>
      </Modal.Body>
      <Modal.Footer>
        <PostComment query={query} pushComment={pushComment}></PostComment>
      </Modal.Footer>
    </Modal>
  );
}
// Functional component that renders a modal to view a query and its comments
// show is a boolean that determines whether the modal is shown
// handleClose is a function that closes the modal
// query is the query that is being viewed
function PostModal({
  show,
  handleClose,
  query,
}: {
  show: boolean;
  handleClose: () => void;
  query: Query;
}) {
  // If query is undefined or query.id is undefined, return an empty div
  if (query === undefined || query.id === undefined) return <div></div>;

  // Call the getAllComments API route
  // If the query.id is an empty string, disable the query
  // If the query.id is not an empty string, enable the query
  const {
    status,
    error,
    data: data,
  } = useQuery({
    queryKey: ["getData"],
    queryFn: () => (query.id !== "" ? getAllComments(query.id ?? "") : null),
    enabled: query.id !== "",
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (data === null || data === undefined) return <h1>Error</h1>;

  // Render the BodyModal
  return (
    <BodyModal
      show={show}
      handleClose={handleClose}
      query={query}
      comments={data.data}
    ></BodyModal>
  );
}

export default PostModal;
