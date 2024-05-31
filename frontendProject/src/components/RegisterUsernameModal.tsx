import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { setUpUsername } from "@/pages/api/User";
import { Message } from "@/types/message";
import MessageComponent from "./MessageModal";
import { setUsernameCookie } from "@/pages/api/Token";
import Loading from "./Loading";
import { GoogleGetUserdata } from "@/pages/api/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

// Functional component that renders the RegisterUsernameModal component
// show is a boolean to show or hide the modal
// handleClose is the function to close the modal
function RegisterUsernameModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageOptions, setMessageOptions] = useState<Message>({
    type: "success",
    message: "",
  });
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);

  // Mutation to set up the username
  const setUpUsernameMutation = useMutation({
    mutationFn: setUpUsername,
    onSuccess: (response) => {
      // Set the username cookie and show a success message
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
      setMessageOptions({
        type: "error",
        message: "Username set up failed",
      });
      handleShowMessage();
      setLoading(false);
    },
  });

  // Handle the submit of the form

  const googleLoginMutation = useMutation({
    mutationFn: GoogleGetUserdata,
    onSuccess: (response) => {
      console.log(response);
      setUpUsernameMutation.mutate(
        response.email.split("@")[0],
      );
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleLoginMutation.mutate(tokenResponse.access_token),
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  // Render the component
  return (
    <>
      {loading && <Loading></Loading>}
      <MessageComponent
        show={showMessage}
        handleClose={handleCloseMessage}
        options={messageOptions}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set up Username</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center p-5">
          <Button
            onClick={() => {
              handleGoogleLogin();
              setLoading(true);
            }}
            size="lg"
            variant="light"
          >
            <FcGoogle size={30} />
            <span className="ms-2">
              Google Login
            </span>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterUsernameModal;
