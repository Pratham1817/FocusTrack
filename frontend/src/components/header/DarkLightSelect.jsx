import FormInput from "../common/FormInput";
import { useThemeColors } from "../../context/ThemeContext";

const DarkLightSelect = () => {
  const { theme, handleThemeSwitch } = useThemeColors();

  return (
    <div className="mt-4 px-3 py-1.5">
      <FormInput
        id="dark-light"
        type="select"
        value={theme}
        onChange={handleThemeSwitch}
        labelText="Select mode:"
        optionsArr={["light", "dark"]}
      />
    </div>
  );
};
export default DarkLightSelect;
