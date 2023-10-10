import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "reactstrap";
import FormComponent from "../components/FormComponent";
import { fetchPosts } from "../features/posts/postsSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <div className="container">
      <Form className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow">
        <FormComponent />
      </Form>
    </div>
  );
};

export default Home;
