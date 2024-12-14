import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";

import { queryClient } from "./api/queryClient";
import AuthPage from "./pages/AuthPage";
import authAction from "./components/auth/authActions";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RootLayout from "./components/layout/RootLayout";
import MyPageLayout from "./components/layout/MyPageLayout";
import ErrorPage from "./pages/ErrorPage";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SettingPage = lazy(() => import("./pages/SettingPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const ItemForm = lazy(() => import("./components/items/ItemForm"));

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
      errorElement: <ErrorPage />,
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
