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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (response) => {
      setFormData({ comment: "", username: "" });
      pushComment(response.data);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.log(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    if (getUsernameCookie() === "") {
      handleShowModal();
      setLoading(false);
      return;
    }
    formData.username = getUsernameCookie();
    if (query.id === undefined) {
      setLoading(false);
      return;
    }
    createCommentMutation.mutate({ id: query.id, comment: formData });
  };
  return (
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
