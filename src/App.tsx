import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Authentication, {
  action as authAction,
} from "./components/auth/Authentication";
import RootLayout from "./layout/RootLayout";
import TaskPage from "./page/TaskPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/auth" /> },
    { path: "/auth", element: <Authentication />, action: authAction },
    {
      path: "/home",
      element: <RootLayout />,
      children: [
        {
          path: "task",
          element: <TaskPage />,
        },
        { path: "rewards" },
        { path: "storage" },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
