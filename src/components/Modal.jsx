import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { setModal, updatePostDetails } from "../features/posts/postsSlice";
import { useFormik } from "formik";
import { modalValidationSchema } from "../Schemas";

const ModalComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);

  const toggle = () => {
    dispatch(setModal({ isOpen: !modal.isOpen, value: {}, modalType: "" }));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { title, body },
      validationSchema: modalValidationSchema,
      onSubmit: (values, action) => {},
      enableReinitialize: true,
    });

  const submitBtn = (id) => {
    dispatch(
      updatePostDetails({
        id,
        data: { title: values.title, body: values.body },
      })
    );
    toggle();
  };

  useEffect(() => {
    setTitle(modal?.value?.title);
    setBody(modal?.value?.body);
  }, [modal]);

  return (
    <Form>
      <Modal isOpen={modal.isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {modal.modalType === "viewDetails" ? (
            <h4>View Details</h4>
          ) : (
            <h4>Edit Details</h4>
          )}
        </ModalHeader>
        <ModalBody>
          <InputComponent
            label="Title"
            placeholder="Enter your Title"
            type="text"
            readOnly={modal.modalType === "viewDetails" && true}
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
            readOnly={modal.modalType === "viewDetails" && true}
            name="body"
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.body}
            touched={touched.body}
          />
        </ModalBody>
        <ModalFooter>
          {modal.modalType === "editDetails" && (
            <Button
              type="submit"
              color="primary"
              disabled={Object.keys(errors).length > 0}
              onClick={() => submitBtn(modal.value.id)}
            >
              Submit
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default ModalComponent;
