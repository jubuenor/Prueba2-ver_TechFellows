import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { setUpUsername } from "@/pages/api/User";
import { Message } from "@/types/message";
import MessageComponent from "./MessageModal";
import { setUsernameCookie } from "@/pages/api/Token";
import Loading from "./Loading";

function RegisterUsernameModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageOptions, setMessageOptions] = useState<Message>({
    type: "success",
    message: "",
  });
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);

  const setUpUsernameMutation = useMutation({
    mutationFn: setUpUsername,
    onSuccess: (response) => {
      setUsernameCookie(response.data);
      setMessageOptions({
        type: "success",
        message: "Username set up successfully",
      });
      handleShowMessage();
      setLoading(false);
      handleClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setLoading(true);
    if (form.checkValidity()) {
      setUpUsernameMutation.mutate(username);
    } else setLoading(false);
    setValidated(true);
  };

  return (
    <>
      {loading && <Loading></Loading>}
      <MessageComponent
        show={showMessage}
        handleClose={handleCloseMessage}
        options={messageOptions}
      ></MessageComponent>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set up Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                pattern=".{3,}"
              />
              <Form.Control.Feedback type="invalid">
                Username must be at least 3 characters long
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit">
              Set up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterUsernameModal;
