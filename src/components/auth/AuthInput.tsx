import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Label = styled.label`
  width: 6rem;
  text-align: center;
  padding-bottom: 1rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #f8f8f3;
  border: 1.5px solid
    ${({ $hasError }) => ($hasError ? "#d6cfc6e6" : "#4caf93")};
`;

const ErrorText = styled.p`
  color: red;
  height: 1rem;
  width: 100%;
  margin: 0;
  padding: 4px;
  font-size: 0.8rem;
`;

const AuthInput: React.FC<{
  type: string;
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  errorMessage: string;
}> = ({ type, id, label, value, onChange, hasError, errorMessage }) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Content>
        <InputArea
          type={type}
          name={id}
          id={id}
          value={value}
          required
          onChange={onChange}
          $hasError={hasError}
        />
        <ErrorText>{hasError ? errorMessage : ""}</ErrorText>
      </Content>
    </Container>
  );
};

export default AuthInput;
