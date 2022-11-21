import React, {
  useContext,
} from 'react';

import TaskContext from '../../TaskContext.js';
import Form from './Form.jsx';
import styles from './Form.module.css';

const FormBlock = () => {
  const { setPrintForm } = useContext(TaskContext);
  const closeForm = () => setPrintForm(false);

  return (
    <div className={styles.container}>
      <div className={styles.container_item}>
        <Form closeForm={closeForm} />
      </div>
    </div>
  );
};

export default FormBlock;
