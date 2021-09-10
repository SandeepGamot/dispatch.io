import React from "react";
import DownloadPage from "./pages/DownloadPage";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

const App = () => (
  <div>
    <div className="p-8">
      <span
        className="font-black text-lg select-none cursor-pointer hover:text-gray-500"
        onClick={() => {
          window.location.pathname = "";
        }}
      >
        Dispatch.io
      </span>
    </div>
    {/* <Home /> */}
    {window.location.pathname.includes("/files") ? (
      <DownloadPage />
    ) : window.location.pathname.includes("/upload") ? (
      <Upload />
    ) : (
      <Home />
    )}
  </div>
);

export default App;
