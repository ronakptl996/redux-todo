import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { Button, Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { submitPost } from "../features/posts/postsSlice";

const Home = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const submitBtn = () => {
    let id = Date.now();
    dispatch(submitPost({ id, userId, title, body }));
    setUserId("");
    setBody("");
    setTitle("");
  };

  return (
    <div className="container">
      <Form className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow-sm">
        <InputComponent
          label="User ID"
          placeholder="Enter your User ID"
          value={userId}
          type="text"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <InputComponent
          label="Title"
          placeholder="Enter your Title"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <InputComponent
          label="Content"
          placeholder="Enter description for title"
          value={body}
          type="textarea"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <Button color="primary" onClick={submitBtn}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Home;
