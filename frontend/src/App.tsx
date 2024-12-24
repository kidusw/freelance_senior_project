// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Gig from "./pages/Gig";
import Gigs from "./pages/Gigs";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import Orders from "./pages/Orders";
import Add from "./pages/AddGig";
import useAutoRefresh from "./utils/useAutoRefresh";
import MyGigs from "./pages/MyGigs";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import AdminUser from "./pages/AdminUser";
import AdminSeller from "./pages/AdminSeller";
import SingleGig from "./pages/SingleGig";
import Success from "./pages/Success";

const App = () => {
  useAutoRefresh();
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              path: "/admin/users",
              element: <AdminUser />,
            },
            {
              path: "/admin/sellers",
              element: <AdminSeller />,
            },
          ],
        },
        {
          path: "singlegig/:id",
          element: <SingleGig />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*", // Catch-all route for unmatched paths
      element: <NotFound />,
    },
    {
      path: "/payment/:id",
      element: <Payment />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
