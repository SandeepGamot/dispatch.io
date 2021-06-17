import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getListOfFiles } from "../utils/firebaseTransactionUtils";

function DownloadPage() {
  const [fileRefs, setFileRefs] = useState<
    firebase.default.storage.Reference[]
  >([]);
  const id = window.location.pathname.split("/files")[0];

  useEffect(() => {
    if (fileRefs.length === 0) {
      getListOfFiles(id).then((items) => {
        setFileRefs(items);
      });
    }
  }, []);

  return fileRefs.length > 0 ? (
    <div>
      <Alert
        showIcon
        type="warning"
        message={<div className="text-yellow-900 text-2xl">Warning</div>}
        description={
          <div className="text-yellow-900">
            Make sure you can trust the person that sent you these files;
            downloading unknown files from the internet can be dangerous. This
            site does not scan for malicious files; any damages or losses caused
            as a result of downloading files from the site are solely the
            responsibility of the user, the site is not liable in any manner for
            such damages or losses.
          </div>
        }
      />
      <div className="flex flex-col items-center justify-center">
        <div className="border-2 border-dashed mb-4 mt-12 p-4 select-none w-2/5">
          {fileRefs.map((ref: firebase.default.storage.Reference) => {
            return (
              <div key={ref.name} className="flex items-center border px-2">
                <div className="flex-1 p-1 truncate my-2">{ref.name}</div>
                <Button
                  type="primary"
                  onClick={() => {
                    ref.getDownloadURL().then((url) => {
                      const a = document.createElement("a");
                      a.href = url;
                      a.setAttribute("download", ref.name);
                      a.style.display = "none";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    });
                  }}
                >
                  Download
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="font-black text-7xl mb-4  animate-pulse">404</div>
      <div className="">
        The page you're looking for either expired or doesn't exist
      </div>
    </div>
  );
}

export default DownloadPage;
