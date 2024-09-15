import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./page/AuthPage";
import authAction from "./components/auth/authActions";
import RootLayout from "./layout/RootLayout";
import Page from "./page/Page";
import ItemForm from "./page/ItemForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthPage />,
      action: authAction,
    },
    {
      path: "/home",
      element: <RootLayout />,
      children: [
        { index: true, element: <Page /> },
        {
          path: ":category",
          children: [
            { index: true, element: <Page /> },
            { path: "add", element: <ItemForm /> },
            {
              path: ":id",
              children: [
                { index: true, element: <ItemForm /> },
                { path: "edit", element: <ItemForm /> },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
