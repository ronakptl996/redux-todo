import React, { useRef } from "react";
import { FormGroup, Input, Label } from "reactstrap";
// import SimpleReactValidator from "simple-react-validator";

const InputComponent = ({
  name,
  label,
  onChange,
  placeholder,
  type,
  value,
  readOnly,
  onBlur,
  errorMessage,
}) => {
  // const simpleValidator = useRef(
  //   new SimpleReactValidator({
  //     className: "text-danger",
  //     messages: {
  //       title: "That is not an title.",
  //     },
  //   })
  // );

  return (
    <FormGroup>
      <Label for={label}>{label}</Label>
      <Input
        id={label}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="border-2 border-light-subtle bg-transparent"
        readOnly={readOnly}
        onBlur={onBlur}
      />
      {errorMessage}
    </FormGroup>
  );
};

export default InputComponent;
