import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";

import { queryClient } from "../../api/queryClient";
import { editNickname, fetchUserData } from "../../api/userApi";
import useInput from "../../hooks/useInput";
import media from "../../media";
import useErrorStore from "../../store/error";
import AuthInput from "../auth/AuthInput";
import ActionButton from "../UI/ActionButton";

const Editor = styled.form`
  display: flex;
  width: 30rem;
  justify-content: center;
  gap: 1rem;
  margin: 5rem auto 2rem;

  ${media.small`
    width: 80%;
  `}
`;

const EditButton = styled(ActionButton)`
  background-color: #e4e0d5;
  width: 5rem;
  font-weight: normal;
  padding: 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

const NicknameEditor = () => {
  const addError = useErrorStore((state) => state.addError);

  const { data, isError, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
  });

  const { mutate } = useMutation({
    mutationFn: editNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
      setNicknameHasError(true);
    },
    onError: (error) => {
      addError(error.message);
    },
  });

  const fetchedNickname = data?.nickname || "";

  const {
    enteredValue: enteredNickname,
    setEnteredValue: setEnteredNickname,
    hasError: nicknameHasError,
    setHasError: setNicknameHasError,
    errorMessage: nicknameErrorMessage,
    handleInputChange: handleNicknameChange,
  } = useInput("nickname");

  useEffect(() => {
    if (fetchedNickname) {
      setEnteredNickname(fetchedNickname);
    }
  }, [fetchedNickname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(enteredNickname);
  };

  useEffect(() => {
    if (isError && error) {
      addError(error.message);
    }
  }, [isError, error]);

  return (
    <>
      <Editor onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          id="nickname"
          label="닉네임"
          value={enteredNickname}
          onChange={handleNicknameChange}
          hasError={nicknameHasError}
          errorMessage={nicknameErrorMessage}
        />
        <EditButton disabled={nicknameHasError}>변경</EditButton>
      </Editor>
    </>
  );
};

export default NicknameEditor;
