import UserDetailsForm from "./UserDetailsForm";
import UserPassForm from "./UserPassForm";

const EditAccountForms = () => {
  return (
    <div className="flex w-11/12 max-w-3xl flex-col justify-evenly gap-4 md:w-full">
      <UserDetailsForm />
      <UserPassForm />
    </div>
  );
};

export default EditAccountForms;
