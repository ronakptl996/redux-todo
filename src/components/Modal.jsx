import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormComponent from "./FormComponent";
import { setModal } from "../features/posts/postsSlice";

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.post);

  const toggle = () => {
    dispatch(
      setModal({
        isOpen: !modal.isOpen,
        post: {},
        modalType: "",
      })
    );
  };

  return (
    <Form>
      <Modal isOpen={modal.isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4>View Details</h4>
        </ModalHeader>
        <ModalBody>
          <FormComponent />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default ModalComponent;
