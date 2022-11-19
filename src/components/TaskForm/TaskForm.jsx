/* eslint-disable no-param-reassign */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { useImmer } from 'use-immer';
import { FileEarmarkPlus, FileEarmarkPlusFill } from 'react-bootstrap-icons';
import axios from 'axios';
import TaskContext from '../../TaskContext.js';

import styles from './TaskForm.module.css';

const TaskForm = () => {
  const nameField = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    nameField.current.focus();
  }, []);

  const initialValue = {
    name: '',
    description: '',
    file: '',
    deadline: '',
    completed: false,
  };
  const [task, updateTask] = useImmer(initialValue);
  const [error, setError] = useState(null);

  const { tasks, setTasks } = useContext(TaskContext);

  const onChange = ({ target: { name, value } }) => {
    updateTask((draft) => {
      draft[name] = value;
    });
  };

  const submitData = async (event) => {
    event.preventDefault();

    try {
      const url = 'https://todo-list-7aa15-default-rtdb.europe-west1.firebasedatabase.app/todos.json';
      const { data } = await axios.post(`dd${url}`, task);
      const id = data.name;
      const taskWithId = { ...task, id };
      setTasks([...tasks, taskWithId]);

      updateTask(initialValue);
      setError(null);
    } catch (e) {
      const feedback = e.name === 'AxiosError' ? 'Ошибка сети' : 'Неизвестная ошибка';
      setError(feedback);
    }
  };

  return (
    <div className={styles.container}>
      <form ref={form} onSubmit={submitData} id="task">
        <div className={styles.flex_row}>
          <label className={styles.flex_item} htmlFor="name">
            <span>Название</span>
            <input
              onChange={onChange}
              value={task.name}
              ref={nameField}
              className={styles.input_field}
              required
              autoComplete="off"
              type="text"
              placeholder="Название задачи"
              id="name"
              name="name"
            />
          </label>

          <label className={styles.flex_item} htmlFor="deadline">
            <span>Дедлайн</span>
            <input
              onChange={onChange}
              value={task.deadline}
              required
              className={styles.input_field}
              type="date"
              id="deadline"
              name="deadline"
            />
          </label>

          <label className={styles.file_label} htmlFor="file">
            {task.file ? <FileEarmarkPlusFill size="2rem" /> : <FileEarmarkPlus size="2rem" />}
            <input
              onChange={onChange}
              value={task.file}
              className={styles.file_input}
              autoComplete="off"
              type="file"
              id="file"
              name="file"
              multiple
            />
          </label>
        </div>

        <div className={styles.flex_row}>
          <textarea
            onChange={onChange}
            value={task.description}
            className={styles.input_field}
            form="task"
            autoComplete="off"
            placeholder="Введите описание"
            name="description"
            rows="3"
          />
          <button className={styles.submit_button} type="submit">Отправить</button>
        </div>
      </form>
      {error && <span className={styles.feedback}>{error}</span>}
    </div>
  );
};

export default TaskForm;
