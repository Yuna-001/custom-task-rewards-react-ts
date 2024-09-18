import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./page/AuthPage";
import authAction from "./components/auth/authActions";
import RootLayout from "./layout/RootLayout";
import Page from "./page/Page";
import ItemForm from "./page/ItemForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage />,
      action: authAction,
    },
    {
      path: ":userId",
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Page /> },
        {
          path: ":category",
          children: [
            { index: true, element: <Page /> },
            { path: "add", element: <ItemForm /> },
            {
              path: ":itemId",
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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
