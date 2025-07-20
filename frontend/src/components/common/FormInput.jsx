import { capitalizeFirstLetter } from "../../utils/helpers";

const FormInput = ({
  labelText,
  id,
  type = "text",
  value,
  onChange,
  inputStyles,
  containerStyles,
  placeholder,
  autoFocus,
  optionsArr,
  children,
}) => {
  const renderInputType = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          cols="10"
          rows="6"
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          className={`scrollbar-custom w-full resize-none px-2 py-1 dark:bg-neutral-600 dark:text-white ${inputStyles}`}
        ></textarea>
      );
    } else if (type === "select") {
      return (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full rounded-sm px-1 py-1 dark:bg-neutral-600 dark:text-white ${inputStyles}`}
        >
          {optionsArr.map((option) => (
            <option key={option} value={option}>
              {capitalizeFirstLetter(option)}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          id={id}
          type={type}
          value={value}
          autoFocus={autoFocus}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-sm px-2 py-1 focus:outline-2 focus:outline-accent-color dark:bg-neutral-600 dark:text-white"
        />
      );
    }
  };

  return (
    <div className={containerStyles}>
      <label htmlFor={id} className="my-1 block">
        {labelText}
      </label>
      {renderInputType()}
      {children}
    </div>
  );
};

export default FormInput;
