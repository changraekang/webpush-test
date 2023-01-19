import styled from "styled-components";
import React from "react";
import { grey5, grey6, primary5 } from "../../constants/color";
const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${grey5};

  &:focus {
    border: 1px solid ${primary5};
  }

  &::placeholder {
    color: ${grey6};
    font-size: 12px;
  }
`;

export const InputGroup = ({
  type = "text",
  placeholder = "",
  value,
  setValue,
  id,
  minlength,
  readonly = false,
}) => {
  return (
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        id={id}
        readOnly={readonly}
        minlength={minlength}
        onChange={(e) => setValue(e.target.value)}
      />
  );
};

export const InputValidateGroup = ({
  type = "text",
  placeholder = "",
  value,
  setValue,
  id,
  name,
  maxlength,
  readonly = false,
}) => {
  return (
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        id={id}
        readOnly={readonly}
        maxlength={maxlength}
        name={name}
        onChange={setValue}
      />
  );
};
