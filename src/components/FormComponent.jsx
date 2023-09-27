import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import InputComponent from "./InputComponent";
import { Button, Form } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  submitPost,
  updatePostDetails,
  getPostById,
} from "../features/posts/postsSlice";

const FormComponent = () => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [, forceUpdate] = useState();

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { post } = useSelector((state) => state);

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

  const submitBtn = async (id) => {
    if (simpleValidator.current.allValid()) {
      if (pathname === "/") {
        let id = Date.now();
        dispatch(submitPost({ id, userId, title, body }));
        setUserId("");
        setBody("");
        setTitle("");
      } else {
        try {
          await dispatch(updatePostDetails({ id, data: { title, body } }));
          navigate("/posts");
        } catch (error) {}
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  useEffect(() => {
    if (pathname.includes("/edit")) {
      dispatch(getPostById(id));
    }
  }, [id]);

  useEffect(() => {
    if (pathname.includes("/edit")) {
      setTitle(post[0]?.title);
      setBody(post[0]?.body);
    }
  }, [post]);

  return (
    <>
      {pathname === "/" && (
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
      )}
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
      {pathname === "/" ? (
        <Button color="primary" onClick={submitBtn.bind(this)}>
          Submit
        </Button>
      ) : (
        <Button color="primary" onClick={submitBtn.bind(this, id)}>
          Update
        </Button>
      )}
    </>
  );
};

export default FormComponent;
