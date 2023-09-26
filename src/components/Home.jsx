import React from "react";
import InputComponent from "./InputComponent";
import { Button, Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { submitPost } from "../features/posts/postsSlice";
import { useFormik } from "formik";
import { validationSchema } from "../Schemas";

const Home = () => {
  const dispatch = useDispatch();

  const initialValues = {
    userId: "",
    title: "",
    body: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        dispatch(submitPost({ id: Date.now(), ...values }));
        action.resetForm();
      },
    });

  return (
    <div className="container">
      <Form
        className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow-sm"
        onSubmit={handleSubmit}
      >
        <InputComponent
          label="User ID"
          placeholder="Enter your User ID"
          type="text"
          name="userId"
          value={values.userId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.userId}
          touched={touched.userId}
        />
        <InputComponent
          label="Title"
          placeholder="Enter your Title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
          touched={touched.title}
        />
        <InputComponent
          label="Content"
          placeholder="Enter description for title"
          type="textarea"
          name="body"
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.body}
          touched={touched.body}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Home;
