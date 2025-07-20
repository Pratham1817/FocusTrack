import { createContext, useContext, useState } from "react";

import { showToast } from "../utils/helpers";
import { useThemeColors } from "./ThemeContext";
import { useFetch } from "../hooks/useFetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { isLight } = useThemeColors();
  const { data: userData, setData: setUserData } = useFetch(
    "/api/user/me",
    !sessionStorage.getItem("isAuthenticated"),
  );

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [forgotPassForm, setForgotPassForm] = useState("");
  const [newPassForm, setNewPassForm] = useState({
    token: "",
    password: "",
    passwordConfirm: "",
  });
  const [signupIsVisible, setSignupIsVisible] = useState(false);
  const [forgotPassIsVisible, setForgotPassIsVisible] = useState(false);
  const [newPassFormVisible, setNewPassFormVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginForm = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e, navigate) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      return showToast("Both fields are required!", "error", isLight);
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (data.error) return showToast(data.error, "error", isLight);

      setUserData(data.user);
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupForm = (e) => {
    setSignUpForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignup = async (e, navigate) => {
    e.preventDefault();

    try {
      setIsLoading(true);
    console.log("SIGNUP DATA >>>", signUpForm);

      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpForm),
      });

      const data = await res.json();

      if (data.error) return showToast(data.error, "error", isLight);

      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPassForm = (e) => {
    setNewPassForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSetNewPass = async (e) => {
    e.preventDefault();

    if (!newPassForm.token) {
      return showToast("Security code cannot be empty!", "error", isLight);
    }
    try {
      setIsLoading(true);

      const res = await fetch(
        `/api/user/resetPassword/${newPassForm.token}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            password: newPassForm.password,
            passwordConfirm: newPassForm.passwordConfirm,
          }),
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();

      if (data.error) return showToast(data.error, "error", isLight);

      setNewPassFormVisible(false);
      showToast(data.message, "success", isLight);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassValue = (e) => setForgotPassForm(e.target.value);

  const handleRetrievePass = async (e) => {
    e.preventDefault();

    // If email field is empty
    if (!forgotPassForm) {
      return showToast("Email field is required!", "error", isLight);
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/user/forgotPassword", {
        method: "POST",
        body: JSON.stringify({ email: forgotPassForm }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) return showToast(data.error, "error", isLight);

      // Closing form of ForgotPass component and render/display form of ResetPass(so the user can set new password)
      setForgotPassIsVisible(false);
      setNewPassFormVisible(true);

      showToast(data.message, "success", isLight);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (navigate) => {
    try {
      await fetch("/api/user/logout");

      // Clearing isAuthenticated value from session storage so the logged-out user can't navigate to protected routes
      sessionStorage.setItem("isAuthenticated", "");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTogglePassVisible = (e) => {
    // Show/hide pass with click and Enter key
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setPassVisible((isVisible) => !isVisible);
    }
  };

  const handleCreateAcc = () => setSignupIsVisible((create) => !create);

  const handleForgotPass = () => {
    setForgotPassIsVisible((forgot) => !forgot);

    // Close new password form if user navigates back to forgot password (in case he needs to get new token via email)
    if (newPassFormVisible) setNewPassFormVisible(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        loginForm,
        signUpForm,
        forgotPassForm,
        newPassForm,
        signupIsVisible,
        forgotPassIsVisible,
        newPassFormVisible,
        isLoading,
        passVisible,
        handleLogin,
        handleSignup,
        handleForgotPass,
        handleLogout,
        handleForgotPassValue,
        handleTogglePassVisible,
        handleRetrievePass,
        handleSetNewPass,
        handleNewPassForm,
        handleLoginForm,
        handleSignupForm,
        handleCreateAcc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Account's context must be used inside of AccountProvider");

  return context;
};

export { AuthProvider, useAuth };
