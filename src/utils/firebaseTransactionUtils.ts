import firebase from "../firebase";
import { nanoid } from "nanoid";

export const upload = (
  fileList: Array<File>,
  onComplete?: (value?: any) => void,
  onError?: () => void
) => {
  const ref = firebase.storage().ref(`${nanoid()}/files`);

  Promise.all(fileList.map((file) => uploadFileToRef(file, ref)))
    .then((value) => {
      onComplete && onComplete({ path: ref.fullPath, value });
    })
    .catch(() => onError && onError());
};

export const uploadFileToRef = (
  file: File,
  ref: firebase.storage.Reference
) => {
  return new Promise((resolve, reject) => {
    try {
      ref
        .child(file.name)
        .put(file)
        .then(({ state, metadata }) => {
          resolve({ state, metadata });
        });
    } catch (error) {
      console.log("firebseTransactionUtils", error);
      reject(error);
    }
  });
};
