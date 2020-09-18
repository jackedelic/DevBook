import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post.action";

const PostForm = ({ dispatch }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="">
        <h3>Create A Post</h3>
      </div>
      <Form
        className="my-3"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText("");
        }}
      >
        <Form.Control
          as="textarea"
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></Form.Control>
        <Button type="submit" variant="success" className="mt-2 btn-lg px-5">
          Post
        </Button>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PostForm);
