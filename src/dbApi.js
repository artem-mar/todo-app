// @ts-check

import {
  ref, getStorage, getDownloadURL, deleteObject, uploadBytes,
} from 'firebase/storage';

const storageApi = {
  /**
   * Загружает выбраный файл в storage на сервер
   * @function
   * @async
   * @param {File} file
   * @param {string} id
   * @returns {Promise}
   */
  uploadFile: (file, id) => uploadBytes(ref(getStorage(), id), file),

  /**
   * Получает url файла из базы по пути
   * @function
   * @async
   * @param {String} path относительный путь до файла
   * @returns {Promise} промис, содержащий url файла
   */
  getFileUrl: (path) => getDownloadURL(ref(getStorage(), path)),

  /**
   * Удаляет файл из хранилища на сервере
   * @function
   * @async
   * @param {string} path относительный путь до файла
   * @returns {Promise} Промис, содержащий результат загрузки
   */
  deleteFile: (path) => deleteObject(ref(getStorage(), path)),
};

/**
 * Получить url для формирования запросов в firestore database
 * @param {string} id id задачи
 * @returns {string} url
 */
export const getDataBaseUrl = (id = '') => (
  `https://todo-list-7aa15-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
);

export default storageApi;
