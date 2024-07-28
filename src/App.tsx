import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Authentication, {
  action as authAction,
} from "./components/auth/Authentication";
import MainHeader from "./components/header/MainHeader";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/auth" /> },
    { path: "/auth", element: <Authentication />, action: authAction },
    {
      path: "/home",
      element: <MainHeader />,
      children: [{ path: "tasks" }, { path: "rewards" }, { path: "storage" }],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
