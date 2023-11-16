import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { PostCreate } from "@/types/post";
import { setUsername, getUsername } from "@/pages/api/Token";
import Loading from "../Loading";

function PostQuery() {
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameToken, setUsernameToken] = useState<string>("");
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<PostCreate>({
    username: "",
    title: "",
    description: "",
    query: "",
  });

  useEffect(() => {
    setUsernameToken(getUsername());
    setFormData({ ...formData, username: getUsername() });
  }, [getUsername()]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.reportValidity() === false) {
    } else {
      setUsername(formData.username);
      setLoading(false);
    }

    setValidated(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <div className="ms-5">
        <h1>!Post your Query!</h1>
        <p>Share with other users your queries</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {usernameToken === "" ? (
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                formNoValidate={false}
                pattern=".{3,}"
              />
              <Form.Control.Feedback type="invalid">
                Username must be at least 3 characters long
              </Form.Control.Feedback>
            </Form.Group>
          ) : (
            <p>Your username is {formData.username}</p>
          )}
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
          <Button type="submit">Post</Button>
        </Form>
      </div>
    </>
  );
}

export default PostQuery;
