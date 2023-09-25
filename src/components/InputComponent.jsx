import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const InputComponent = ({
  label,
  onChange,
  placeholder,
  type,
  value,
  readOnly,
}) => {
  return (
    <FormGroup>
      <Label for={label}>{label}</Label>
      <Input
        id={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="border-2 border-light-subtle bg-transparent"
        readOnly={readOnly}
      />
    </FormGroup>
  );
};

export default InputComponent;
