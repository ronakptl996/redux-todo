import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { setModal } from "../features/posts/postsSlice";

const ModalComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);

  const toggle = () => {
    dispatch(setModal({ isOpen: !modal.isOpen, value: {}, modalType: "" }));
  };

  useEffect(() => {
    setTitle(modal?.value?.title);
    setBody(modal?.value?.body);
  }, [modal]);

  return (
    <div>
      <Modal isOpen={modal.isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4>View Details</h4>
        </ModalHeader>
        <ModalBody>
          <InputComponent
            name="title"
            label="Title"
            placeholder="Enter your Title"
            value={title}
            type="text"
            readOnly={true}
          />

          <InputComponent
            name="description"
            label="Content"
            placeholder="Enter description for title"
            value={body}
            type="textarea"
            readOnly={true}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
