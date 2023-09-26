import React, { useState, useEffect, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { setModal, updatePostDetails } from "../features/posts/postsSlice";

const ModalComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);
  const [, forceUpdate] = useState();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      className: "text-danger",
      messages: {
        title: "title is red.",
        description: "description needed",
      },
    })
  );

  const toggle = () => {
    dispatch(setModal({ isOpen: !modal.isOpen, value: {}, modalType: "" }));
  };

  const submitBtn = (id) => {
    if (simpleValidator.current.allValid()) {
      dispatch(updatePostDetails({ id, data: { title, body } }));
      toggle();
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  useEffect(() => {
    setTitle(modal?.value?.title);
    setBody(modal?.value?.body);
  }, [modal]);

  return (
    <div>
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
            name="title"
            label="Title"
            placeholder="Enter your Title"
            value={title}
            type="text"
            readOnly={modal.modalType === "viewDetails" && true}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => simpleValidator.current.showMessageFor("title")}
            errorMessage={simpleValidator.current.message(
              "title",
              title,
              "required|min:25"
            )}
          />

          <InputComponent
            name="description"
            label="Content"
            placeholder="Enter description for title"
            value={body}
            type="textarea"
            readOnly={modal.modalType === "viewDetails" && true}
            onChange={(e) => setBody(e.target.value)}
            onBlur={() => simpleValidator.current.showMessageFor("description")}
            errorMessage={simpleValidator.current.message(
              "description",
              body,
              "required|min:40"
            )}
          />
        </ModalBody>
        <ModalFooter>
          {modal.modalType === "editDetails" && (
            <Button color="primary" onClick={() => submitBtn(modal.value.id)}>
              Submit
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
