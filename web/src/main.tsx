import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import "overlayscrollbars/overlayscrollbars.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <App />
        <ToastContainer
          pauseOnFocusLoss={false}
          autoClose={3000}
          pauseOnHover={false}
          theme="dark"
          position="bottom-center"
        />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
