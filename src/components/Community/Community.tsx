import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import Link from "next/link";
import Comment from "./Comments";
import PostModal from "./PostModal";

function Community() {
  const [showComments, setShowComments] = useState<boolean>(false);
  const handleClose = () => setShowComments(false);
  const handleShow = () => setShowComments(true);
  return (
    <>
      {showComments && (
        <PostModal show={showComments} handleClose={handleClose}></PostModal>
      )}
      <div className="p-5">
        <Card className="m-auto" style={{ maxWidth: "50rem" }}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title className="m-0">Community</Card.Title>
            <Link href="#" className="btn btn-light btn-sm rounded-5">
              <span className="me-2">Load query</span>
              <FaPlayCircle size={35} color="green" />
            </Link>
          </Card.Header>
          <Card.Body>
            <p className="mb-0">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
              architecto, cupiditate laudantium ipsam necessitatibus soluta
              eaque, quis eius molestiae beatae quas ad officia non fugit totam
              eos enim delectus dignissimos!
            </p>
            <p
              className="m-0 text-end"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            >
              12 comments
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Community;
