import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

//routes import
import Landing from './routes/landing';
import ErrorPage from './routes/errorPage';
import Test from './routes/test';
import RecipesHome from './routes/recipesHome';
import Login from './routes/login';
import Register from './routes/register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/recipesHome",
    element: <RecipesHome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} className=" bg-slate-900"/>
  </React.StrictMode>
);

