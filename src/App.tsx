import Title from "antd/lib/typography/Title";
import React from "react";
import DownloadPage from "./pages/DownloadPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="ml-4 mt-4 p-4">
        <span
          className="p-2 font-black text-2xl select-none cursor-pointer hover:text-gray-500"
          onClick={() => {
            window.location.pathname = "";
          }}
        >
          Dispatch.io
        </span>
      </div>
      {window.location.pathname.includes("/files") ? (
        <DownloadPage />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
