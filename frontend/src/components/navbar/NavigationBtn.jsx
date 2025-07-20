import { NavLink, useLocation } from "react-router-dom";

const NavigationBtn = ({ to, navText, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={
        isActive
          ? "mt-2 w-full rounded-sm bg-accent-color py-1 text-center text-white"
          : "mt-2 block cursor-pointer py-1 text-center focus:w-full dark:text-white"
      }
    >
      <p
        className={
          isActive ? "text-lg text-white" : "text-lg text-accent-color"
        }
      >
        {icon}
      </p>
      {navText}
    </NavLink>
  );
};

export default NavigationBtn;
