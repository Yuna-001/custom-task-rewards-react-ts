import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import authAction from "./components/auth/authActions";
import RootLayout from "./layout/RootLayout";
import MainPage from "./pages/MainPage";
import ItemForm from "./pages/ItemForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

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
        { index: true, element: <MainPage /> },
        {
          path: ":category",
          children: [
            { index: true, element: <MainPage /> },
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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
