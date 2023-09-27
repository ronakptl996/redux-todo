import React from "react";
import FormComponent from "./FormComponent";
import { Form } from "reactstrap";

const Edit = () => {
  return (
    <div className="container">
      <Form className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow">
        <div>
          <h4>Edit Details</h4>
        </div>
        <FormComponent />
      </Form>
    </div>
  );
};

export default Edit;
