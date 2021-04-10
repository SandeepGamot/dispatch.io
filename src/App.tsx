import { Button, message } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import * as React from "react";
import firebase from "./firebase";
import "antd/dist/antd.css";
import { UploadFile } from "antd/lib/upload/interface";
import { useCallback, useEffect, useState } from "react";

const ONE_MB = 1000000;

const MAX_SIZE = 20 * ONE_MB;

function App() {
  const ref = firebase.database();
  const storage = firebase.storage();

  const [batchSize, setBatchSize] = useState(0);
  const [fileList, setFileList] = useState<Array<UploadFile<any>>>([]);

  const getSum = (list: typeof fileList) => {
    if (fileList.length === 0) return 0;
    if (fileList.length === 1) return fileList[0].size;

    return list.map((f) => f.size).reduce((total, amount) => total + amount);
  };

  const updateFileList = useCallback(
    (list: typeof fileList) => {
      let sum = getSum(list);
      if (sum <= MAX_SIZE) {
        setFileList(() => list);
        console.log({ sum });
        setBatchSize(() => sum);
      }
    },
    [fileList]
  );

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <p>{((MAX_SIZE - getSum(fileList)) / ONE_MB).toPrecision(3)} MB left</p>
        <Dragger
          style={{ width: 500, height: 300 }}
          beforeUpload={(file, fileList) => {
            let sum = getSum(fileList);
            if (sum > MAX_SIZE) {
              message.error("File exceeds size limit");
              return false;
            }
            return true;
          }}
          onChange={(info) => {
            updateFileList(info.fileList);
          }}
          onRemove={(file) => {
            let l = fileList.filter((f) => f.uid !== file.uid);
            console.log({ l });
            updateFileList(l);
          }}
        >
          <p className="text-lg">Click or drag file to this area to upload</p>
        </Dragger>
      </div>
    </div>
  );
}

export default App;
