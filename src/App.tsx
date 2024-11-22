import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AuthPage from "./pages/AuthPage";
import authAction from "./components/auth/authActions";
import RootLayout from "./components/layout/RootLayout";
import MainPage from "./pages/MainPage";
import ItemForm from "./components/items/ItemForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { queryClient } from "./utils/http";
import MyPageLayout from "./components/layout/MyPageLayout";
import SettingPage from "./pages/SettingPage";
import DashboardPage from "./pages/DashboardPage";

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
          path: "my-page",
          element: <MyPageLayout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: "setting", element: <SettingPage /> },
          ],
        },
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
