import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import store from "./redux/store";
import { Provider } from "react-redux";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/jobs/:jobId",
    element: (
      <Layout>
        <JobDetails />
      </Layout>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
