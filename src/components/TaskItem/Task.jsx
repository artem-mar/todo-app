import React, { useContext } from 'react';
import {
  PencilSquare, CheckCircleFill, XCircleFill, Trash3,
} from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import TaskContext from '../../TaskContext';

import styles from './Task.module.css';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const Task = ({ task, openForm }) => {
  const date = dayjs(task.deadline).format('LLL');

  const { tasks, setTasks } = useContext(TaskContext);

  const toggleStatus = () => {
    const newStatus = task.status === 'pending' ? 'success' : 'pending';
    const filtered = tasks.map((t) => (t.id === task.id ? { ...task, status: newStatus } : t));
    setTasks(filtered);
  };

  return (
    <div className={styles.flex_row_start}>
      <div className={styles.task_info}>

        <h2>{task.name}</h2>
        <p className={styles.description}>{task.description}</p>
        <span className={styles.file}>{task.file}</span>

      </div>

      <div className={styles.task_control}>
        <span>{date}</span>
        <div className={styles.btn_group}>
          <button onClick={toggleStatus} className={styles.btn} type="button">
            {task.status === 'pending' && <CheckCircleFill size="2rem" />}
            {task.status === 'success' && <CheckCircleFill color="green" size="2rem" />}
            {task.status === 'expired' && <XCircleFill color="red" size="2rem" />}
          </button>

          <button className={styles.btn} type="button" onClick={openForm}>
            <PencilSquare size="2rem" />
          </button>

          <button className={styles.btn} type="button">
            <Trash3 size="2rem" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default Task;
