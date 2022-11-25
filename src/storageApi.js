import {
  ref, getStorage, getDownloadURL, deleteObject, uploadBytes,
} from 'firebase/storage';

const storageApi = {
  uploadFile: (file) => uploadBytes(ref(getStorage(), file.name), file),
  getFileUrl: (path) => getDownloadURL(ref(getStorage(), path)),
  deleteFile: (dir) => deleteObject(ref(getStorage(), dir)),
};

export default storageApi;
