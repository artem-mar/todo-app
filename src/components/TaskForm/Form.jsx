/* eslint-disable no-param-reassign */
import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import { useImmer } from 'use-immer';
import { FileEarmarkPlusFill, FileEarmarkPlus } from 'react-bootstrap-icons';
import axios from 'axios';
import TaskContext from '../../TaskContext';
import paths from '../../path.js';
import storageApi from '../../storageApi';

import styles from './Form.module.css';

const Form = ({
  initialValue = {
    name: '',
    description: '',
    fileName: '',
    deadline: '',
    status: 'IN_WORK', // COMPLETED EXPIRED
  }, closeForm,
}) => {
  const form = useRef(null);
  const nameField = useRef(null);

  useEffect(() => {
    nameField.current.select();
  }, []);

  const [formData, updateFormData] = useImmer(initialValue);
  const [errorFeedback, setErrorFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const { tasks, setTasks } = useContext(TaskContext);

  const onChange = ({ target: { name, value, files } }) => {
    if (files && files.length) {
      updateFormData((draft) => {
        draft[name] = files[0].name;
      });

      setFile(files[0]);
    } else {
      updateFormData((draft) => {
        draft[name] = value;
      });
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const url = paths.dataBase();

    try {
      setSubmitting(true);

      if (file) {
        await storageApi.uploadFile(file);
      }

      if (Object.hasOwn(formData, 'id')) {
        const { id, ...taskWithoutId } = formData;
        await axios.patch(url, { [id]: taskWithoutId });
        const filtered = tasks.map((t) => (t.id === id ? formData : t));
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
      setErrorFeedback(feedback);
      setSubmitting(false);
      console.log(e);
    }
  };

  return (
    <>
      <form ref={form} onSubmit={submit} id="task">
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
            {file ? <FileEarmarkPlusFill size="2rem" /> : <FileEarmarkPlus size="2rem" />}
            <input
              onChange={onChange}
              className={styles.file_input}
              type="file"
              id="file"
              name="fileName"
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
            <button disabled={submitting} className={styles.btn_submit} type="submit">Отправить</button>
          </div>
        </div>
      </form>
      {errorFeedback && <span className={styles.feedback}>{errorFeedback}</span>}
    </>
  );
};

export default Form;
