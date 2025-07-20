import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import { EditAccountProvider } from "./context/EditAccountContext.jsx";
import { CalendarProvider } from "./context/CalendarContext.jsx";
import { AudioProvider } from "./context/AudioContext.jsx";

const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const BoardPage = lazy(() => import("./pages/BoardPage.jsx"));
const CalendarPage = lazy(() => import("./pages/CalendarPage.jsx"));
const PomodoroPage = lazy(() => import("./pages/PomodoroPage.jsx"));
const EditAccountPage = lazy(() => import("./pages/EditAccountPage.jsx"));
const ArchivedPage = lazy(() => import("./pages/ArchivedPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <AudioProvider>
          <AppLayout />
        </AudioProvider>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<LoadingSpinner className="md:h-16 md:w-16" />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "/home/board/:boardTitle/:boardId",
        element: (
          <Suspense fallback={<LoadingSpinner className="md:h-16 md:w-16" />}>
            <BoardPage />
          </Suspense>
        ),
      },
      {
        path: "/home/calendar",
        element: (
          <Suspense fallback={<LoadingSpinner className="md:h-16 md:w-16" />}>
            <CalendarProvider>
              <CalendarPage />
            </CalendarProvider>
          </Suspense>
        ),
      },
      {
        path: "/home/pomo",
        element: (
          <Suspense fallback={<LoadingSpinner className="md:h-16 md:w-16" />}>
            <PomodoroPage />,
          </Suspense>
        ),
      },
      {
        path: "home/archived",
        element: (
          <Suspense fallback={<LoadingSpinner className="md:h-16 md:w-16" />}>
            <ArchivedPage />
          </Suspense>
        ),
      },
      {
        path: "/home/account",
        element: (
          <Suspense fallback={<LoadingSpinner className="md:h-16 md:w-16" />}>
            <EditAccountProvider>
              <EditAccountPage />
            </EditAccountProvider>
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
