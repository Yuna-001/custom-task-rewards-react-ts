import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Authentication, {
  action as authAction,
} from "./components/auth/Authentication";
import RootLayout from "./layout/RootLayout";
import Page from "./page/Page";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/auth" /> },
    { path: "/auth", element: <Authentication />, action: authAction },
    {
      path: "/home",
      element: <RootLayout />,
      children: [
        {
          path: "tasks",
          element: <Page type="tasks" />,
        },
        { path: "rewards-shop", element: <Page type="rewards-shop" /> },
        { path: "storage", element: <Page type="storage" /> },
        { path: ":category/add" },
        { path: ":category/:id" },
        { path: ":category/:id/edit" },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
