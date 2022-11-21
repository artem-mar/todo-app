import React, { useState } from 'react';
import Form from '../TaskForm/Form.jsx';
import Task from './Task.jsx';

import styles from './Task.module.css';

const TaskBlock = ({ task }) => {
  const [edit, setEdit] = useState(false);
  const openForm = () => setEdit(true);
  const closeForm = () => setEdit(false);
  console.log();

  return (
    <div className={styles.container}>
      <div className={styles.container_item}>
        {!edit && <Task task={task} openForm={openForm} />}
        {edit && <Form initialValue={task} closeForm={closeForm} />}
      </div>
    </div>
  );
};

export default TaskBlock;
