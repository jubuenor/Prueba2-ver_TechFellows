import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function PostQuery() {
  return (
    <div className="ms-5">
      <h1>!Post your Query!</h1>
      <p>Share with other users your queries</p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Query Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter title"
            name="title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            name="description"
            type="textarea"
            as="textarea"
            placeholder="Enter description"
          />
        </Form.Group>
        <Button type="submit">Post</Button>
      </Form>
    </div>
  );
}

export default PostQuery;
