import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Errors from './../erros/Errors';
import Services from "../pages/Services";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <Errors />,
    children:
      [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },

        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/services",
          element: <Services />
        },
      ]
  },
]);
