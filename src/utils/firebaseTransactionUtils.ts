import firebase from "../firebase";
import { nanoid } from "nanoid";

const getRef = (id: string) => {
  return firebase.storage().ref(`${id}/files`);
};
export const upload = (
  fileList: Array<File>,
  onComplete?: (value?: any) => void,
  onError?: () => void
) => {
  const ref = getRef(nanoid());

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

export const getListOfFiles = async (id: string) => {
  const ref = getRef(id);
  return (await ref.listAll()).items;
};

export const downloadFileFromRef = async (ref: firebase.storage.Reference) => {
  const url = await ref.getDownloadURL();

  fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    .then((response) => response.blob())
    .then((blob) => {
      const fileUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = fileUrl;
      a.download = ref.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(fileUrl);
    })
    .then(() => {
      ref.delete();
    });
};
