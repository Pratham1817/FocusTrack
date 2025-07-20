import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useEditAcc } from "../../context/EditAccountContext";
import LoadingSpinner from "../common/LoadingSpinner";

const UserPassForm = () => {
  const {
    changePassLoading,
    userPassForm,
    handleChangePass,
    handleUserPassForm,
  } = useEditAcc();

  return (
    <form
      onSubmit={handleChangePass}
      className="flex h-full w-full flex-col justify-around bg-neutral-100 p-4 dark:bg-neutral-800 gap-3"
    >
      <h1 className="text-center font-semibold">Edit password</h1>
      <FormInput
        id="passwordCurrent"
        type="password"
        value={userPassForm.passwordCurrent}
        onChange={handleUserPassForm}
        placeholder="Your current password"
        labelText="Current password:"
      />
      <FormInput
        id="password"
        type="password"
        value={userPassForm.password}
        onChange={handleUserPassForm}
        placeholder="Your new password"
        labelText="New password:"
      />
      <FormInput
        id="passwordConfirm"
        type="password"
        value={userPassForm.passwordConfirm}
        onChange={handleUserPassForm}
        placeholder="Your new password again"
        labelText="Confirm password:"
      />
      <Button type="submit" stylesType="editAccDetails">
        {changePassLoading ? <LoadingSpinner /> : "Update password"}
      </Button>
    </form>
  );
};

export default UserPassForm;
