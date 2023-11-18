import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import Link from "next/link";
import PostModal from "./PostModal";
import { Query } from "@/types/query";
import { setQueryStorage } from "@/utils/storage";

function Community({ queries }: { queries: Query[] }) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [selectedQuery, setSelectedQuery] = useState<Query>({} as Query);
  const handleClose = () => setShowComments(false);
  const handleShow = () => setShowComments(true);

  const renderQueries = queries.map((query, index) => {
    const date = new Date(query.date ?? "");
    return (
      <Card className="m-auto mb-4" style={{ maxWidth: "50rem" }} key={index}>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="m-0 fs-3">{query.title}</Card.Title>
            <Link
              href="/create"
              className="btn btn-light btn-sm rounded-5"
              onClick={() => setQueryStorage(query.query)}
            >
              <span className="me-2">Load query</span>
              <FaPlayCircle size={35} color="green" />
            </Link>
          </div>

          <span className="fs-6 text-muted">{date.toDateString()}</span>
        </Card.Header>
        <Card.Body>
          <p className="mb-0">{query.description}</p>
          <Button
            variant="link"
            className="text-decoration-none text-dark float-end m-0"
            onClick={() => {
              setSelectedQuery(query);
              handleShow();
            }}
          >
            View comments
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <>
      {showComments && (
        <PostModal
          show={true}
          handleClose={handleClose}
          query={selectedQuery}
        ></PostModal>
      )}
      <div className="p-5">
        {renderQueries.length === 0 ? (
          <h1 className="text-center">No queries found</h1>
        ) : (
          renderQueries
        )}
      </div>
    </>
  );
}

export default Community;
