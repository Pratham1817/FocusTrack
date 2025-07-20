import { useThemeColors } from "../../context/ThemeContext";
import FormInput from "../common/FormInput";

const AccentColorSelect = () => {
  const { accentColor, handleAccentColor } = useThemeColors();

  return (
    <div className="mt-4 px-3 py-1.5">
      <FormInput
        id="color"
        type="color"
        labelText="Change accent color:"
        value={accentColor}
        onChange={handleAccentColor}
      />
    </div>
  );
};

export default AccentColorSelect;
