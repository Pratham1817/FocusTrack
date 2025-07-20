import { useNavigate, useRouteError } from "react-router-dom";

import Button from "../components/common/Button";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-red-700 p-5 text-center text-xl text-white">
      <h1 className="text-4xl">Oops!</h1>
      <p>An unexpected error has occured.</p>
      <p>{error.status || error.message}</p>
      <Button onClick={() => navigate(-1)} stylesType="error">
        Go Back
      </Button>
    </div>
  );
};
export default ErrorPage;
