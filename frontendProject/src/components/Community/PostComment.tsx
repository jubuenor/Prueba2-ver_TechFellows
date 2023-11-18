import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { GiPlayButton } from "react-icons/gi";
import { Comment } from "@/types/comments";
import { getUsernameCookie } from "@/pages/api/Token";
import RegisterUsernameModal from "@/components/RegisterUsernameModal";
import { Query } from "@/types/query";
import Loading from "../Loading";
import { useMutation } from "react-query";
import { createComment } from "@/pages/api/Comment";

// Functional component that renders a form to post a comment
// query is the query that the comment is being posted to
// pushComment is a function that pushes the comment to the comments array in the parent component
function PostComment({
  query,
  pushComment,
}: {
  query: Query;
  pushComment: (comment: Comment) => void;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<Comment>({
    comment: "",
    username: "",
  });

  // Update the formData when the user types in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create a mutation that calls the createComment API route
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (response) => {
      // Reset the form data and push the comment to the comments array
      setFormData({ comment: "", username: "" });
      pushComment(response.data);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.log(error);
    },
  });

  // Handle the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    // If the user is not logged in, show the RegisterUsernameModal
    if (getUsernameCookie() === "") {
      handleShowModal();
      setLoading(false);
      return;
    }
    // Set the username to the username cookie
    formData.username = getUsernameCookie();
    if (query.id === undefined) {
      setLoading(false);
      return;
    }
    // Call the createComment mutation
    createCommentMutation.mutate({ id: query.id, comment: formData });
  };
  return (
    // If loading is true, render a Loading component
    // If showModal is true, render a RegisterUsernameModal

    <>
      {loading ? <Loading></Loading> : null}
      <RegisterUsernameModal
        show={showModal}
        handleClose={handleCloseModal}
      ></RegisterUsernameModal>
      <Form
        className="w-100 d-flex justify-content-between"
        onSubmit={handleSubmit}
      >
        <Form.Group className="w-100">
          <Form.Control
            as="textarea"
            name="comment"
            placeholder="Write a comment . . ."
            value={formData.comment}
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
    </>
  );
}

export default PostComment;
