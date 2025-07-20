import FormInput from "../common/FormInput";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

const ForgotPassForm = () => {
  const {
    isLoading,
    forgotPassForm,
    handleForgotPassValue,
    handleRetrievePass,
  } = useAuth();

  return (
    <form onSubmit={handleRetrievePass}>
      <FormInput
        type="email"
        labelText="Enter your email:"
        value={forgotPassForm}
        onChange={handleForgotPassValue}
      />
      <Button type="submit" stylesType="account">
        {isLoading ? <LoadingSpinner /> : "Next"}
      </Button>
    </form>
  );
};

export default ForgotPassForm;
