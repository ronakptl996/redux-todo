import React, { useRef, useState } from "react";
import InputComponent from "../components/InputComponent";
import SimpleReactValidator from "simple-react-validator";
import { Button, Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { loginBtn } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [, forceUpdate] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "text-danger",
      messages: {
        title: "title is red.",
        description: "description needed",
      },
    })
  );

  const submitBtn = async () => {
    if (simpleValidator.current.allValid()) {
      await dispatch(loginBtn());
      navigate("/");
      setValidationErrors({});
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      setValidationErrors(simpleValidator.current.getErrorMessages());
    }
  };

  return (
    <div className="container">
      <Form className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow">
        <InputComponent
          label="Username"
          name="username"
          placeholder="Enter your Username"
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onBlur={() => simpleValidator.current.showMessageFor("username")}
          errorMessage={simpleValidator.current.message(
            "username",
            username,
            "required|min:2"
          )}
          validationErrors={validationErrors && validationErrors.username}
        />
        <InputComponent
          label="Password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onBlur={() => simpleValidator.current.showMessageFor("password")}
          errorMessage={simpleValidator.current.message(
            "password",
            password,
            "required|min:10"
          )}
          validationErrors={validationErrors && validationErrors.password}
        />

        <Button color="primary" onClick={submitBtn}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
