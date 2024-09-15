import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Label = styled.label`
  width: 7rem;
  text-align: center;
`;

const InputArea = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #f8f8f3;
`;

const Input: React.FC<{ type: string; id: string; label: string }> = ({
  type,
  id,
  label,
}) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <InputArea type={type} name={id} id={id} required />
    </Container>
  );
};

export default Input;
