import React from "react";
import DownloadPage from "./pages/DownloadPage";
import Home from "./pages/Home";

function App() {
  return window.location.pathname.includes("/files") ? (
    <DownloadPage />
  ) : (
    <Home />
  );
}

export default App;
