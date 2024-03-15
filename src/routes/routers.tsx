import {
  createBrowserRouter,
} from "react-router-dom";
import Home from '../pages/home/Home';


export const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
]);