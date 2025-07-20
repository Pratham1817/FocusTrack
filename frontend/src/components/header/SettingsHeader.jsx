import { CloseOutlined } from "@ant-design/icons";

import Button from "../common/Button";

const SettingsHeader = ({ onSettingsOpen }) => {
  return (
    <header className="flex h-11 items-center justify-between border-b-2 px-5 ">
      <p>Settings</p>
      <Button onClick={onSettingsOpen}>
        <CloseOutlined />
      </Button>
    </header>
  );
};
export default SettingsHeader;
