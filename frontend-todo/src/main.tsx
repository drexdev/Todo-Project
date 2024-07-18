import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/index.tsx";

import "./main.css";
import TaskProvider from "./providers/task-provider.tsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);