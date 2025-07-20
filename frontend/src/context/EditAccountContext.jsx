import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
import { useThemeColors } from "./ThemeContext";
import { showToast } from "../utils/helpers";

const EditAccountContext = createContext();

const EditAccountProvider = ({ children }) => {
  const { userData, setUserData } = useAuth();
  const { isLight } = useThemeColors();

  const [userDetailsForm, setUserDetailsForm] = useState({
    username: "",
    email: "",
  });
  const [userPassForm, setUserPassForm] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [updateDetailsLoading, setUpdateDetailsLoading] = useState(false);
  const [changePassLoading, setChangePassLoading] = useState(false);

  const handleUserDetailsForm = (e) => {
    setUserDetailsForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    if (!userDetailsForm.username || !userDetailsForm.email)
      return showToast("Both fields are required!", "error", isLight);

    if (
      userData.username === userDetailsForm.username &&
      userData.email === userDetailsForm.email
    )
      return showToast(
        "Username or password fields cannot be the same as previous!",
        "error",
        isLight,
      );

    try {
      setUpdateDetailsLoading(true);

      const res = await fetch("/api/user/updateMe", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetailsForm),
      });

      const data = await res.json();

      if (data.error) return showToast(data.error, "error", isLight);

      showToast(
        "Your details has been successfully updated",
        "success",
        isLight,
      );
      setUserData(data.updatedUser);
    } catch (err) {
      console.log(err.message);
    } finally {
      setUpdateDetailsLoading(false);
    }
  };
  
  const handleUserPassForm = (e) => {
    setUserPassForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (
      !userPassForm.password ||
      !userPassForm.passwordConfirm ||
      !userPassForm.passwordCurrent
    ) {
      return showToast("All fields are required!", "error", isLight);
    }

    try {
      setChangePassLoading(true);

      const res = await fetch("/api/user/updatePassword", {
        method: "PATCH",
        body: JSON.stringify(userPassForm),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) return showToast(data.error, "error", isLight);

      setUserPassForm({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });

      showToast(
        "Your password has been successfully updated",
        "success",
        isLight,
      );
    } catch (err) {
      console.log(err.message);
    } finally {
      setChangePassLoading(false);
    }
  };

  // Rendering default values on user details input fields
  useEffect(() => {
    if (userData.username && userData.email) {
      setUserDetailsForm({
        username: userData.username,
        email: userData.email,
      });
    }
  }, [userData.username, userData.email]);

  return (
    <EditAccountContext.Provider
      value={{
        userDetailsForm,
        userPassForm,
        updateDetailsLoading,
        changePassLoading,
        handleUserPassForm,
        handleUserDetailsForm,
        handleChangePass,
        handleUpdateDetails,
      }}
    >
      {children}
    </EditAccountContext.Provider>
  );
};

const useEditAcc = () => {
  const context = useContext(EditAccountContext);

  if (context === undefined)
    throw new Error(
      "EditAccount's context must be used inside EditAccountProvider",
    );

  return context;
};

export { EditAccountProvider, useEditAcc };
