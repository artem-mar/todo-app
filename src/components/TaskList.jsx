import React from 'react';
import TaskBlock from './TaskItem/TaskBlock.jsx';

const TaskList = ({ tasks }) => (
  tasks
    .map((t) => (
      <TaskBlock key={t.id} task={t} />
    ))
);

export default TaskList;
