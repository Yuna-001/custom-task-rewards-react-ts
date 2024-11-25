import styled from "styled-components";
import DeleteAccountButton from "../components/my-page/DeleteAccountButton";
import NicknameEditor from "../components/my-page/NicknameEditor";

const Setting = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SettingPage = () => {
  return (
    <Setting>
      <NicknameEditor />
      <DeleteAccountButton />
    </Setting>
  );
};

export default SettingPage;
