import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import IngridientSearchForm from "./Components/IngridientSearchForm";
import RecipeList from "./Components/RecipeList";
import RecipeDetails from "./Components/RecipeDetails";
import ErrorPage from "./Components/ErrorPage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: "/",
        element: <IngridientSearchForm />,
      },
      { path: "/recipe-list", element: <RecipeList /> },
      {
        path: "/recipe-details/:id",
        element: <RecipeDetails />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
