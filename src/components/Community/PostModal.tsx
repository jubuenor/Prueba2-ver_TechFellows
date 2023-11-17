import React, { useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import Comments from "./Comments";
import { GiPlayButton } from "react-icons/gi";
import { Comment } from "@/types/comments";

function PostModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [formData, setFormData] = useState<Comment>({
    comment: "",
    username: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        className="d-flex justify-content-between align-items-center"
      >
        <Link href="#" className="btn btn-light btn-sm rounded-5">
          <FaPlayCircle size={35} color="green" />
        </Link>
        <Card.Title className="m-0">Community</Card.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Body>
          <p className="mb-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
            architecto, cupiditate laudantium ipsam necessitatibus soluta eaque,
            quis eius molestiae beatae quas ad officia non fugit totam eos enim
            delectus dignissimos!
          </p>
        </Card.Body>
        <hr />
        <Card.Footer className="overflow-auto" style={{ maxHeight: "400px" }}>
          <Comments></Comments>
        </Card.Footer>
      </Modal.Body>
      <Modal.Footer>
        <Form className="w-100 d-flex justify-content-between">
          <Form.Group className="w-100">
            <Form.Control
              as="textarea"
              name="comment"
              placeholder="Write a comment . . ."
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <div>
            <Button
              variant="primary"
              disabled={formData.comment.length === 0}
              type="submit"
            >
              <GiPlayButton />
            </Button>
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;
