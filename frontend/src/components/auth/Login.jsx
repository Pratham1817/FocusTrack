import LoginForm from "./LoginForm";
import AccountAction from "./AccountAction";
import AccountFormHeader from "./AccountFormHeader";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { handleForgotPass } = useAuth();

  return (
    <>
      <AccountFormHeader
        pText="Welcome back!"
        spanText="Enter your personal details to log in."
      />
      <LoginForm />
      <AccountAction pText="Don't have an account? " spanText="Sign up" />
      <Button onClick={handleForgotPass} stylesType="forgotPass">
        Forgot password?
      </Button>
    </>
  );
};

export default Login;
