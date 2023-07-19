import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Debounce from './Component/Debounce';
import Home from './Component/Home';
import PrivateRouter from './Private/PrivateRouter';
import Login from './Component/Login';
import Detail from './Component/Details';
import Layout from './assets/Layout/Layout';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/debounce",
        element: <PrivateRouter>
          <Debounce></Debounce>
        </PrivateRouter>,
      }, {
        path: "/home",
        element: <PrivateRouter>
          <Home></Home>
        </PrivateRouter>
      },
      {
        path: "/:id",
        element:
          <PrivateRouter>
            <Detail></Detail>
          </PrivateRouter>
      }
    ]
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
