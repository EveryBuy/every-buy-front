import {
  createBrowserRouter,
} from "react-router-dom";
import Home from '../pages/home/Home'
import Login from '../pages/login/Login';


export const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
]);