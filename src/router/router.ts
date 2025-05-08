import { createBrowserRouter } from "react-router";
import Header from "../components/Header/Header.tsx";
import Main from "../pages/Main.tsx";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";
import Catalogo from "../pages/Catalogo.tsx";

const router = createBrowserRouter([
  {
    Component: Header,
    children: [
      { path: "/", Component: Main },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      { path: "/catalogo", Component: Catalogo },
    ],
  },
]);

export default router;
