import { Button, Input, message, Result } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import * as React from "react";

import "antd/dist/antd.css";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { upload } from "../utils/firebaseTransactionUtils";

const ONE_MB = 1000000;

const MAX_SIZE = 20 * ONE_MB;
const MAX_FILE_COUNT = 5;

function Home() {
  const [fileList, setFileList] = useState<Array<File>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [url, setUrl] = useState("");

  const getSum = (list: typeof fileList) => {
    if (list.length === 0) return 0;
    if (list.length === 1) return list[0].size;

    return list.map((f) => f.size).reduce((total, amount) => total + amount);
  };
  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success("Copied to clipboard");
      })
      .catch(() => {
        message.error("Copying to clipboard failed");
      });
  };

  return (
    <div className="h-auto w-screen flex flex-col justify-center items-center overflow-y-auto font-black">
      {!showResult ? (
        <>
          <div className="flex items-end space-x-1.5 my-16">
            <span className=" text-3xl sm:text-5xl">
              {((MAX_SIZE - getSum(fileList)) / ONE_MB).toPrecision(3)}
              <span className="text-xs pl-1">MB</span>
            </span>
            <span className=" text-2xl sm:text-4xl px-4 sm:px-10">/</span>
            <span className="text-3xl sm:text-5xl">
              {MAX_FILE_COUNT - fileList.length}
              <span className="text-xs pl-1">files</span>
            </span>
            <span>left</span>
          </div>
          <Dropzone
            disabled={fileList.length === MAX_FILE_COUNT}
            onDrop={(acceptedFiles) => {
              let files = [...fileList, ...acceptedFiles];
              if (files.length > MAX_FILE_COUNT) {
                files = files.slice(0, MAX_FILE_COUNT);
                message.warn(
                  `Max ${MAX_FILE_COUNT} files can be added, we've kept the first ${MAX_FILE_COUNT}, rest are dropped`,
                  5
                );
              }
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
                    style={{
                      background:
                        fileList.length === MAX_FILE_COUNT
                          ? undefined
                          : "#E7F6FE",
                    }}
                    openFileDialogOnClick={false}
                    height={200}
                  >
                    <span
                      style={{ fontSize: "56px" }}
                      className={`material-icons ${
                        fileList.length === MAX_FILE_COUNT
                          ? "text-gray-300"
                          : "text-blue-500"
                      }`}
                    >
                      note_add
                    </span>
                    <p
                      className={`${
                        fileList.length === MAX_FILE_COUNT
                          ? "text-gray-300"
                          : "text-blue-900"
                      }`}
                    >
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </Dragger>
                </div>
                <Button
                  className="font-black"
                  type="primary"
                  block
                  loading={isUploading}
                  disabled={fileList.length === 0}
                  onClick={() => {
                    setIsUploading(true);
                    upload(
                      fileList,
                      ({ path }) => {
                        setUrl(`${window.location.hostname}/${path}`);
                        setFileList([]);
                        setShowResult(true);
                        setIsUploading(false);
                      },
                      () => {
                        setIsUploading(false);
                        setShowResult(true);
                        setErrorOccurred(true);
                      }
                    );
                  }}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </section>
            )}
          </Dropzone>
        </>
      ) : (
        <div className="flex flex-col items-center">
          {!errorOccurred ? (
            <Result
              status="success"
              title="Files uploaded successfully"
              extra={
                <div className="w-full flex items-center justify-center">
                  <Input
                    onClick={copyUrlToClipboard}
                    prefix={
                      <span className="material-icons pr-0.5 border-r border-gray-300">
                        link
                      </span>
                    }
                    value={`${window.location.hostname}/${url}`}
                  />
                  <Button type="primary" onClick={copyUrlToClipboard}>
                    <span className="material-icons">content_copy</span>
                  </Button>
                </div>
              }
            />
          ) : (
            <Result status="error" title="Something went wrong" />
          )}
          <Button
            className="w-1/2"
            type="primary"
            onClick={() => {
              setShowResult(false);
            }}
          >
            Upload again
          </Button>
        </div>
      )}

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
                <div className="border border-gray-500 flex font-light justify-between my-1 pt-2 px-1 select-none">
                  <span className="flex-1 truncate">{f.name}</span>
                  <span
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setFileList(fileList.filter((f, index) => index !== i));
                    }}
                  >
                    <span
                      style={{ fontSize: "24px" }}
                      className="material-icons text-red-600"
                    >
                      delete
                    </span>
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

export default Home;
