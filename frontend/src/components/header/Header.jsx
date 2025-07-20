import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../common/Logo";
import HeaderButton from "./HeaderButton";
import Settings from "./Settings";

const Header = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettingsOpen = () => setSettingsOpen((isOpen) => !isOpen);

  return (
    <header className="fixed left-0 transition-colors ease-linear top-0 z-10 flex h-10 w-full items-center justify-between bg-neutral-100 px-2 sm:px-4 py-1.5 dark:bg-neutral-800">
      <Logo
        onClick={() => navigate("/home")}
        className="cursor-pointer italic font-semibold dark:text-white"
      />
      <HeaderButton onSettingsOpen={handleSettingsOpen} />
      {settingsOpen && <Settings onSettingsOpen={handleSettingsOpen} />}
    </header>
  );
};

export default Header;
