import DarkLightSelect from "./DarkLightSelect";
import AccentColorSelect from "./AccentColorSelect";
import SettingsHeader from "./SettingsHeader";
import SettingsActionBtns from "./SettingsActionBtns";

const Settings = ({ onSettingsOpen }) => {
  return (
    <div
      onClick={onSettingsOpen}
      className="fixed inset-0 z-10 h-full w-full bg-neutral-700/40 dark:text-white"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 z-10 h-full w-64 bg-neutral-100 dark:bg-neutral-800"
      >
        <SettingsHeader onSettingsOpen={onSettingsOpen} />
        <DarkLightSelect />
        <AccentColorSelect />
        <SettingsActionBtns />
      </aside>
    </div>
  );
};

export default Settings;
