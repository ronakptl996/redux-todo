import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const InputComponent = ({
  label,
  onChange,
  placeholder,
  type,
  value,
  readOnly,
  name,
  onBlur,
  error,
  touched,
}) => {
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
      {error && touched && <p>{error}</p>}
    </FormGroup>
  );
};

export default InputComponent;
