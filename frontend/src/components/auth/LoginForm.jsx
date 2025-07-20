import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import FormInput from "../common/FormInput";
import PasswordEye from "../common/PasswordEye";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin, loginForm, handleLoginForm, passVisible, isLoading } =
    useAuth();

  return (
    <form
      onSubmit={(e) => handleLogin(e, navigate)}
      className="flex flex-col justify-around gap-2"
    >
      <FormInput
        id="email"
        type="email"
        labelText="Enter your email:"
        value={loginForm.email}
        onChange={handleLoginForm}
      />
      <FormInput
        id="password"
        type={passVisible ? "text" : "password"}
        labelText="Enter your password:"
        containerStyles="relative"
        value={loginForm.password}
        onChange={handleLoginForm}
      >
        <PasswordEye />
      </FormInput>
      <Button type="submit" stylesType="account">
        {isLoading ? <LoadingSpinner /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
