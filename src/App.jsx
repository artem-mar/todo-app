import React, {
  useEffect, useMemo, useState,
} from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskContext from './TaskContext.js';
import TaskList from './components/TaskList/TaskList.jsx';

import styles from './App.module.css';

const App = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const uploadTasks = async () => {
      const url = 'https://todo-list-7aa15-default-rtdb.europe-west1.firebasedatabase.app/todos.json';

      try {
        const { data } = await axios.get(url);
        const taskList = Object.entries(data).map(([id, task]) => ({ id, ...task }));
        setTasks(taskList);
      } catch (e) {
        const feedback = e.name === 'AxiosError' ? 'Ошибка сети' : 'Неизвестная ошибка';
        console.log(feedback);
      }
    };
    uploadTasks();
  }, []);

  return (
    <TaskContext.Provider value={useMemo(() => ({ tasks, setTasks }), [tasks, setTasks])}>
      <main className={styles.container}>
        <div className={styles.inner}>
          <TaskForm />
          <TaskList tasks={tasks} />
        </div>
      </main>
    </TaskContext.Provider>
  );
};

export default App;
