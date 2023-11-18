import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Query } from "@/types/query";
import { getUsernameCookie } from "@/pages/api/Token";
import Loading from "../Loading";
import RegisterUsernameModal from "../RegisterUsernameModal";
import { useMutation } from "react-query";
import { saveQuery } from "@/pages/api/Query";

// Functional component that renders the PostQuery component
// query is the query to post
function PostQuery({ query }: { query: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<Query>({
    username: "",
    title: "",
    description: "",
    query: query,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Mutation to save the query
  const saveQueryMutation = useMutation({
    mutationFn: saveQuery,
    onSuccess: (response) => {
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.log(error);
    },
  });

  // Handle the submit of the form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // If the user is not logged in, show the modal to register a username
    if (getUsernameCookie() === "") {
      handleShowModal();
      return;
    } else formData.username = getUsernameCookie();

    const form = event.currentTarget;
    setLoading(true);
    // If the form is valid, save the query
    if (form.reportValidity()) {
      saveQueryMutation.mutate(formData);
    } else setLoading(false);

    setValidated(true);
  };
  // Handle the change in the input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // Render the component
  return (
    <>
      <RegisterUsernameModal
        show={showModal}
        handleClose={handleCloseModal}
      ></RegisterUsernameModal>
      {loading ? <Loading></Loading> : null}
      <div className="ms-5">
        <h1>!Share your Query!</h1>
        <p>Share with other users your queries</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Query Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={handleChange}
              formNoValidate={false}
              pattern=".{5,}"
            />
            <Form.Control.Feedback type="invalid">
              Title must be at least 5 characters long
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              placeholder="Enter description"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Description is required
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Share</Button>
        </Form>
      </div>
    </>
  );
}

export default PostQuery;
