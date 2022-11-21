import React, {
  useEffect, useMemo, useState,
} from 'react';
import axios from 'axios';
import { PlusLg } from 'react-bootstrap-icons';
import FormBlock from './components/TaskForm/FormBlock.jsx';
import TaskContext from './TaskContext.js';
import TaskList from './components/TaskList.jsx';

import styles from './App.module.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [printForm, setPrintForm] = useState(false);

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
    <TaskContext.Provider value={
      useMemo(() => ({ tasks, setTasks, setPrintForm }), [tasks, setTasks])
    }
    >
      <main className={styles.app_container}>
        <div className={styles.app_container_item}>
          <button onClick={() => setPrintForm(true)} className={styles.plus_btn} type="button">
            <PlusLg size="100%" />
          </button>
          {printForm && <FormBlock />}
          <TaskList tasks={tasks} />
        </div>
      </main>
    </TaskContext.Provider>
  );
};

export default App;
