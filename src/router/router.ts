import { createBrowserRouter } from "react-router";
import Main from "../components/Header/Header.tsx";
import Testchildren from "../pages/Testchildren.tsx";

const router = createBrowserRouter([
  {
    Component: Main,
    children: [{ path: "/", Component: Testchildren }],
  },
]);

export default router;
