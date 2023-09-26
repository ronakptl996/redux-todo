import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import InputComponent from "./InputComponent";
import { Button, Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { submitPost } from "../features/posts/postsSlice";

const Home = () => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [, forceUpdate] = useState();

  // const validator = new SimpleReactValidator();
  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "text-danger",
      messages: {
        title: "title is red.",
        description: "description needed",
      },
    })
  );

  const dispatch = useDispatch();

  const submitBtn = () => {
    if (simpleValidator.current.allValid()) {
      let id = Date.now();
      dispatch(submitPost({ id, userId, title, body }));
      setUserId("");
      setBody("");
      setTitle("");
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div className="container">
      <Form className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow-sm">
        <InputComponent
          label="User ID"
          placeholder="Enter your User ID"
          value={userId}
          name="userId"
          type="number"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          onBlur={() => simpleValidator.current.showMessageFor("userId")}
          errorMessage={simpleValidator.current.message(
            "userId",
            userId,
            "required|min:0|numeric"
          )}
        />
        {/* {simpleValidator.current.message("userId", userId, "required")} */}
        <InputComponent
          label="Title"
          name="title"
          placeholder="Enter your Title"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onBlur={() => simpleValidator.current.showMessageFor("title")}
          errorMessage={simpleValidator.current.message(
            "title",
            title,
            "required|min:25"
          )}
        />
        <InputComponent
          label="Description"
          name="description"
          placeholder="Enter description for title"
          value={body}
          type="textarea"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          onBlur={() => simpleValidator.current.showMessageFor("description")}
          errorMessage={simpleValidator.current.message(
            "description",
            body,
            "required|min:40"
          )}
        />
        <Button color="primary" onClick={submitBtn.bind(this)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Home;
