import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { setModal, updatePostDetails } from "../features/posts/postsSlice";

const ModalComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);

  const toggle = () => {
    dispatch(setModal({ isOpen: !modal.isOpen, value: {}, modalType: "" }));
  };

  const submitBtn = (id) => {
    dispatch(updatePostDetails({ id, data: { title, body } }));
    toggle();
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
            label="Title"
            placeholder="Enter your Title"
            value={title}
            type="text"
            readOnly={modal.modalType === "viewDetails" && true}
            onChange={(e) => setTitle(e.target.value)}
          />

          <InputComponent
            label="Content"
            placeholder="Enter description for title"
            value={body}
            type="textarea"
            readOnly={modal.modalType === "viewDetails" && true}
            onChange={(e) => setBody(e.target.value)}
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
