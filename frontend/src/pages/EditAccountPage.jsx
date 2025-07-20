import PageHeaderTitle from "../components/common/PageHeaderTitle";
import EditAccountForms from "../components/editAccount/EditAccountForms";

const EditAccountPage = () => {
  return (
    <section className="mt-6 flex flex-col items-center gap-4 px-3 sm:px-6 dark:text-white">
      <PageHeaderTitle headerText="Account Info" />
      <EditAccountForms />
    </section>
  );
};

export default EditAccountPage;
