import { Button, List, message } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import * as React from "react";
import firebase from "./firebase";
import "antd/dist/antd.css";
import { useState } from "react";
import Dropzone from "react-dropzone";

const ONE_MB = 1000000;

const MAX_SIZE = 20 * ONE_MB;

function App() {
  const ref = firebase.database();
  const storage = firebase.storage();

  const [fileList, setFileList] = useState<Array<File>>([]);

  const getSum = (list: typeof fileList) => {
    console.log(list);
    if (list.length === 0) return 0;
    if (list.length === 1) return list[0].size;

    return list.map((f) => f.size).reduce((total, amount) => total + amount);
  };

  return (
    <div className="h-auto w-screen flex flex-col justify-center items-center overflow-y-auto font-black">
      <div className="flex items-end space-x-1.5 my-16">
        <span className="text-5xl">
          {((MAX_SIZE - getSum(fileList)) / ONE_MB).toPrecision(3)}
        </span>
        <span>MB left</span>
      </div>
      <Dropzone
        onDrop={(acceptedFiles) => {
          let files = [...fileList, ...acceptedFiles];
          let sum = getSum(files);

          if (sum > MAX_SIZE) {
            message.error("Files exceed size limit");
          } else {
            setFileList(files);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="max-w-xl w-11/12">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Dragger
                style={{ background: "#E7F6FE" }}
                openFileDialogOnClick={false}
                height={200}
              >
                <p className="text-blue-900">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </Dragger>
            </div>
            <Button
              className="font-black"
              type="primary"
              block
              disabled={fileList.length === 0}
              onClick={() => {
                console.log("upload");
              }}
            >
              Upload
            </Button>
          </section>
        )}
      </Dropzone>

      {fileList.length > 0 && (
        <div className="border-2 border-dashed border-gray-100 max-w-xl my-4 p-1.5 w-11/12">
          <div className="border flex items-center justify-between pl-4 pr-1.5 py-2">
            <span>Files Added</span>
            <Button
              className="font-black"
              type="ghost"
              danger
              onClick={() => {
                setFileList([]);
              }}
            >
              Clear All
            </Button>
          </div>
          <div>
            {fileList.map((f, i) => {
              return (
                <div className="border border-gray-500 flex justify-between px-1 py-2 select-none my-1 font-light">
                  <span className="flex-1 truncate">{f.name}</span>
                  <span
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setFileList(fileList.filter((f, index) => index !== i));
                    }}
                  >
                    remove
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
