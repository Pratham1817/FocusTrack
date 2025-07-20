import FormInput from "../common/FormInput";
import Button from "../common/Button";
import PasswordEye from "../common/PasswordEye";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

const ResetPassForm = () => {
  const {
    isLoading,
    passVisible,
    newPassForm,
    handleNewPassForm,
    handleSetNewPass,
  } = useAuth();

  return (
    <form onSubmit={handleSetNewPass}>
      <FormInput
        id="token"
        labelText="Enter code:"
        value={newPassForm.token}
        onChange={handleNewPassForm}
      />
      <FormInput
        type={passVisible ? "text" : "password"}
        id="password"
        labelText="Enter new password:"
        containerStyles="relative"
        value={newPassForm.password}
        onChange={handleNewPassForm}
      >
        <PasswordEye />
      </FormInput>
      <FormInput
        type="password"
        id="passwordConfirm"
        labelText="Confirm new password:"
        value={newPassForm.passwordConfirm}
        onChange={handleNewPassForm}
      />
      <Button type="submit" stylesType="account">
        {isLoading ? <LoadingSpinner /> : "Confirm"}
      </Button>
    </form>
  );
};

export default ResetPassForm;
