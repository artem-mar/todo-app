const paths = {
  dataBase: (id = '') => (
    `https://todo-list-7aa15-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
  ),
  storage: () => (
    'gs://todo-list-7aa15.appspot.com'
  ),
};

export default paths;
