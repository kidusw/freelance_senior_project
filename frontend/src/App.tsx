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

const queryClient = new QueryClient();

const App = () => {
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
      path: "/gigs",
      element: <Gigs />,
    },
    {
      path: "/gig/:id",
      element: <Gig />,
    },
    {
      path: "*", // Catch-all route for unmatched paths
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;

//  <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
