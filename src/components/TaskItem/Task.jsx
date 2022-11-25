import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  PencilSquare, CheckCircleFill, XCircleFill, Trash3, Circle,
} from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import axios from 'axios';
import TaskContext from '../../TaskContext';
import paths from '../../path.js';
import storageApi from '../../storageApi';

import styles from './Task.module.css';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const statusIcons = {
  COMPLETED: CheckCircleFill,
  IN_WORK: Circle,
  EXPIRED: XCircleFill,
};

const Task = ({ task, openForm }) => {
  const date = dayjs(task.deadline).format('D MMMM YYYY, HH:mm');

  const { tasks, setTasks } = useContext(TaskContext);
  const [submitting, setSubmitting] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (task.fileName) {
      storageApi.getFileUrl(task.fileName).then((url) => setFileUrl(url));
    }
  }, [task.fileName]);

  const changeStatus = async (newStatus) => {
    const url = paths.dataBase();
    try {
      setSubmitting(true);
      const { id, ...taskWithoutId } = task;
      const updatedTask = { ...taskWithoutId, status: newStatus };
      await axios.patch(url, { [id]: updatedTask });

      const filtered = tasks.map((t) => (
        t.id === task.id ? { ...task, status: newStatus } : t
      ));
      setTasks(filtered);
    } catch (err) {
      console.log(err.message);
    }
    setSubmitting(false);
  };

  const isExpired = (d) => dayjs().isAfter(dayjs(d));

  useEffect(() => {
    const watchTime = () => {
      if (isExpired(task.deadline) && task.status === 'IN_WORK') {
        changeStatus('EXPIRED');
      }

      if (task.status === 'IN_WORK' && !isExpired(task.deadline)) {
        timerRef.current = setTimeout(watchTime, 30000);
      }
    };
    watchTime();

    return () => clearTimeout(timerRef.current);
  }, [task]);

  const toggleStatus = () => {
    const newStatus = task.status === 'IN_WORK' ? 'COMPLETED' : 'IN_WORK';
    changeStatus(newStatus);
  };

  const deleteTask = async () => {
    const url = paths.dataBase(task.id);
    try {
      await axios.delete(url);
      const filtered = tasks.filter((t) => t.id !== task.id);
      storageApi.deleteFile(task.fileName);
      setTasks(filtered);
    } catch (err) {
      console.log(err.message);
    }
  };

  const Icon = statusIcons[task.status];

  return (
    <div className={styles.flex_row_start}>
      <div className={styles.flex_col}>
        <button
          disabled={submitting}
          onClick={toggleStatus}
          className={styles[task.status]}
          type="button"
        >
          <Icon size="1.5rem" />
        </button>
      </div>

      <div className={styles.task_info}>
        <h2>
          {task.name}
        </h2>
        <p className={styles.description}>{task.description}</p>
        {fileUrl && <a target="blank" href={fileUrl} className={styles.file}>{task.fileName}</a>}
      </div>

      <div className={styles.task_control}>
        <span>{date}</span>
        <div className={styles.btn_group}>
          <button className={styles.btn} type="button" onClick={openForm}>
            <PencilSquare size="1.5rem" />
          </button>

          <button className={styles.btn} type="button">
            <Trash3 onClick={deleteTask} size="1.5rem" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
