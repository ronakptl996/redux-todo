import React from "react";
import FormComponent from "../components/FormComponent";
import { Form } from "reactstrap";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const { t } = useTranslation("translation");
  return (
    <div className="container">
      <Form className="col-md-6 my-5 m-auto p-5 bg-light rounded-3 shadow">
        <div>
          <h4>{t("EDITDETAILS")}</h4>
        </div>
        <FormComponent />
      </Form>
    </div>
  );
};

export default Edit;
