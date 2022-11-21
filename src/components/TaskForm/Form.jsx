/* eslint-disable no-param-reassign */
import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import { useImmer } from 'use-immer';
import { FileEarmarkPlusFill, FileEarmarkPlus } from 'react-bootstrap-icons';
import axios from 'axios';
import TaskContext from '../../TaskContext';

import styles from './Form.module.css';

const Form = ({
  initialValue = {
    name: '',
    description: '',
    filePath: '',
    deadline: '',
    status: 'pending', // completed expired
  }, closeForm,
}) => {
  const nameField = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    nameField.current.select();
  }, []);

  const [formData, updateFormData] = useImmer(initialValue);
  const [error, setError] = useState(null);

  const { tasks, setTasks } = useContext(TaskContext);

  const onChange = ({ target: { name, value } }) => {
    updateFormData((draft) => {
      draft[name] = value;
    });
  };

  const submitData = async (event) => {
    event.preventDefault();

    try {
      const url = 'https://todo-list-7aa15-default-rtdb.europe-west1.firebasedatabase.app/todos.json';

      if (Object.hasOwn(formData, 'id')) {
        const { id, ...taskWithoutId } = formData;
        await axios.patch(url, { [id]: taskWithoutId });
        const filtered = tasks.map((t) => (t.id === id ? { id, ...formData } : t));
        setTasks(filtered);
      } else {
        const { data } = await axios.post(url, formData);
        const id = data.name;
        const taskWithId = { ...formData, id };
        setTasks([...tasks, taskWithId]);
      }

      closeForm();
    } catch (e) {
      const feedback = e.name === 'AxiosError' ? 'Ошибка сети' : 'Неизвестная ошибка';
      setError(feedback);
    }
  };

  return (
    <>
      <form style={{ width: '100%' }} ref={form} onSubmit={submitData} id="task">
        <div className={styles.flex_row}>
          <label className={styles.flex_item_grow1} htmlFor="name">
            <h3>Название</h3>
            <input
              onChange={onChange}
              value={formData.name}
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
            <h3>Дедлайн</h3>
            <input
              onChange={onChange}
              value={formData.deadline}
              required
              className={styles.input_field}
              type="datetime-local"
              id="deadline"
              name="deadline"
            />
          </label>

          <label className={styles.file_label} htmlFor="file">
            {formData.filePath ? <FileEarmarkPlusFill size="2rem" /> : <FileEarmarkPlus size="2rem" />}
            <input
              onChange={onChange}
              value={formData.filePath}
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
            value={formData.description}
            className={styles.input_field}
            form="task"
            autoComplete="off"
            placeholder="Введите описание"
            name="description"
            rows="2"
          />
          <div className={styles.flex_col}>
            <button onClick={closeForm} className={styles.btn_cancel} type="button">Отмена</button>
            <button className={styles.btn_submit} type="submit">Отправить</button>
          </div>
        </div>
      </form>
      {error && <span className={styles.feedback}>{error}</span>}
    </>
  );
};

export default Form;
