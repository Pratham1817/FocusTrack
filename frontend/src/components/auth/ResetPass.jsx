import { ArrowLeftOutlined } from "@ant-design/icons";

import AccountFormHeader from "./AccountFormHeader";
import Button from "../common/Button";
import ResetPassForm from "./ResetPassForm";
import { useAuth } from "../../context/AuthContext";

const ResetPass = () => {
  const { handleForgotPass } = useAuth();

  return (
    <>
      <Button onClick={handleForgotPass} stylesType="goBack">
        <ArrowLeftOutlined />
      </Button>
      <AccountFormHeader
        pText="Forgot password?"
        spanText="Enter the code we sent on your e-mail and your new password."
      />
      <ResetPassForm />
    </>
  );
};

export default ResetPass;
