import SignUpForm from "./SignUpForm";
import AccountAction from "./AccountAction";
import AccountFormHeader from "./AccountFormHeader";

const SignUp = () => {
  return (
    <>
      <AccountFormHeader
        pText="Welcome!"
        spanText="Enter your personal details to sign-up."
      />
      <SignUpForm />
      <AccountAction pText="Already have an account? " spanText="Log in" />
    </>
  );
};

export default SignUp;
