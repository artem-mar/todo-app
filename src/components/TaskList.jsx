import React from 'react';
import TaskBlock from './TaskItem/TaskBlock.jsx';

const TaskList = ({ tasks }) => {
  const tasknames = tasks.map((t) => t.name);
  console.log(tasknames);

  return (
    tasks.map((t) => (
      <TaskBlock key={t.id} task={t} />
    ))
  );
};

export default TaskList;
