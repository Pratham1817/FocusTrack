import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import FormInput from "../common/FormInput";
import PasswordEye from "../common/PasswordEye";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { isLoading, passVisible, signUpForm, handleSignup, handleSignupForm } =
    useAuth();

  return (
    <form
      onSubmit={(e) => handleSignup(e, navigate)}
      className="flex flex-col gap-2"
    >
      <FormInput
        id="username"
        labelText="Username:"
        value={signUpForm.username}
        onChange={handleSignupForm}
      />
      <FormInput
        id="email"
        type="email"
        labelText="Email:"
        value={signUpForm.email}
        onChange={handleSignupForm}
      />
      <FormInput
        id="password"
        type={passVisible ? "text" : "password"}
        labelText="Password:"
        containerStyles="relative"
        value={signUpForm.password}
        onChange={handleSignupForm}
      >
        <PasswordEye />
      </FormInput>
      <FormInput
        id="passwordConfirm"
        type="password"
        labelText="Confirm Password:"
        value={signUpForm.passwordConfirm}
        onChange={handleSignupForm}
      />
      <Button type="submit" stylesType="account">
        {isLoading ? <LoadingSpinner /> : "Sign up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
