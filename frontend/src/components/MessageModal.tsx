import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Message } from "@/types/message";

function Message({
  options,
  show,
  handleClose,
}: {
  options: Message;
  show: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title
          className={`${
            options.type === "success" ? "text-success" : "text-danger"
          }`}
        >
          {options.type === "success" ? "Successful operation" : "Error"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{options.message}</Modal.Body>
      <Modal.Footer>
        <Button variant={options.type} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Message;
