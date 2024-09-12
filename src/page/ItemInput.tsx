import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  padding-left: 0.3rem;
`;

const InputArea = styled.input`
  padding: 0.7rem;
  background-color: #e4e0d5;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  height: 10rem;
  resize: none;
  padding: 0.7rem;
  background-color: #e4e0d5;
  border-radius: 0.5rem;
`;

const ItemInput: React.FC<{
  type?: string;
  id: string;
  label: string;
  isTextarea?: boolean;
  defaultValue: string | number;
  required?: boolean;
}> = ({
  type = "text",
  id,
  label,
  defaultValue,
  isTextarea = false,
  required = false,
}) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      {!isTextarea && (
        <InputArea
          type={type}
          name={id}
          id={id}
          defaultValue={defaultValue}
          required={required}
        />
      )}
      {isTextarea && (
        <Textarea
          name={id}
          id={id}
          defaultValue={defaultValue}
          required={required}
        />
      )}
    </Container>
  );
};

export default ItemInput;
