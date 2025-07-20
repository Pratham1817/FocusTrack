import { ArrowLeftOutlined } from "@ant-design/icons";

import AccountFormHeader from "./AccountFormHeader";
import ForgotPassForm from "./ForgotPassForm";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const ForgotPass = () => {
  const { handleForgotPass } = useAuth();

  return (
    <>
      <Button onClick={handleForgotPass} stylesType="goBack">
        <ArrowLeftOutlined />
      </Button>
      <AccountFormHeader
        pText="Forgot password?"
        spanText="Enter your email and we will send you an email to retrieve your password."
      />
      <ForgotPassForm />
    </>
  );
};

export default ForgotPass;
