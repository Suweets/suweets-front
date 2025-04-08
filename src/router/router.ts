import { createBrowserRouter } from "react-router";
import Header from "../components/Header/Header.tsx";
import Main from "../pages/Main.tsx";

const router = createBrowserRouter([
  {
    Component: Header,
    children: [{ path: "/", Component: Main }],
  },
]);

export default router;
