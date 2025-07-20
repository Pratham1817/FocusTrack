import Button from "../common/Button";
import FormInput from "../common/FormInput";
import LoadingSpinner from "../common/LoadingSpinner";
import { useEditAcc } from "../../context/EditAccountContext";

const UserDetailsForm = () => {
  const {
    userDetailsForm,
    handleUpdateDetails,
    handleUserDetailsForm,
    updateDetailsLoading,
  } = useEditAcc();

  return (
    <form
      onSubmit={handleUpdateDetails}
      className="flex h-full w-full flex-col rounded-md bg-neutral-100 p-4 dark:bg-neutral-800 gap-3"
    >
      <h1 className="text-center font-semibold">Edit account details</h1>
      <FormInput
        id="username"
        value={userDetailsForm.username}
        onChange={handleUserDetailsForm}
        labelText="Username:"
      />
      <FormInput
        id="email"
        type="email"
        value={userDetailsForm.email}
        onChange={handleUserDetailsForm}
        labelText="E-mail:"
      />
      <Button type="submit" stylesType="editAccDetails">
        {updateDetailsLoading ? <LoadingSpinner /> : "Update settings"}
      </Button>
    </form>
  );
};

export default UserDetailsForm;
