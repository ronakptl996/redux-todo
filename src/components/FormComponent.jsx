import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import InputComponent from "./InputComponent";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  submitPost,
  updatePostDetails,
  getPostById,
} from "../features/posts/postsSlice";
import { useTranslation } from "react-i18next";

const FormComponent = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [, forceUpdate] = useState();
  const { t } = useTranslation("translation");

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { post, modal } = useSelector((state) => state.post);

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

        setValidationErrors({});
      } else {
        try {
          await dispatch(updatePostDetails({ id, data: { title, body } }));
          navigate("/posts");
        } catch (error) {}
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      setValidationErrors(simpleValidator.current.getErrorMessages());
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
    } else if (pathname === "/posts") {
      setTitle(modal.value.title);
      setBody(modal.value.body);
    }
  }, [post, modal]);

  return (
    <>
      {pathname === "/" && (
        <InputComponent
          label={t("USERID")}
          placeholder={t("PLUSERID")}
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
          validationErrors={validationErrors && validationErrors.userId}
        />
      )}
      <InputComponent
        label={t("TITLE")}
        name="title"
        placeholder={t("PLTITLE")}
        value={title}
        type="text"
        readOnly={modal.modalType === "viewDetails" && true}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={() => simpleValidator.current.showMessageFor("title")}
        errorMessage={simpleValidator.current.message(
          "title",
          title,
          "required|min:25"
        )}
        validationErrors={validationErrors && validationErrors.title}
      />
      <InputComponent
        label={t("DESCRIPTION")}
        name="description"
        placeholder={t("PLDESC")}
        value={body}
        type="textarea"
        readOnly={modal.modalType === "viewDetails" && true}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        onBlur={() => simpleValidator.current.showMessageFor("description")}
        errorMessage={simpleValidator.current.message(
          "description",
          body,
          "required|min:40"
        )}
        validationErrors={validationErrors && validationErrors.description}
      />
      {pathname === "/" && (
        <Button color="primary" onClick={submitBtn.bind(this)}>
          {t("SUBMIT")}
        </Button>
      )}{" "}
      {pathname.includes("edit") && (
        <Button color="primary" onClick={submitBtn.bind(this, id)}>
          {t("UPDATE")}
        </Button>
      )}
    </>
  );
};

export default FormComponent;
