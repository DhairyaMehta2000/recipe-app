import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const errors = useRouteError();
  console.log(errors);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Error : {errors.status} - {errors.statusText}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
