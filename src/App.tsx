import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Authentication, {
  action as authAction,
} from "./components/auth/Authentication";
import MainNavigation from "./components/MainNavigation";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/auth" /> },
    { path: "/auth", element: <Authentication />, action: authAction },
    {
      path: "/home",
      element: <MainNavigation />,
      children: [
        { path: "tasks" },
        { path: "rewards" },
        { path: "storage" },
        { path: "log" },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
