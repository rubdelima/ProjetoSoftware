import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/home/pages/Home"
import Login from "./app/home/pages/Login"

const router = createBrowserRouter([
    {
      path: "*",
      Component: Home,
    },
    {
      path: "/login",
      Component: Login,
    }
  ]);

export default function App() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
  }
