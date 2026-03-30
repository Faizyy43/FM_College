import React from "react";

import IndexRoute from "./routes/IndexRoute";
import ScrollToTop from "./components/MainComponents/ScrollToTop";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "text-lg font-semibold px-6 py-4 rounded-xl text-center bg-indigo-600 text-white shadow-lg",
        }}
      />

      <ScrollToTop />

      <IndexRoute />
    </>
  );
};

export default App;
