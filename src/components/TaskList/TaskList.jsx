import React from 'react';

const TaskList = ({ tasks }) => {
  const tasknames = tasks.map((t) => t.name);
  console.log(tasks);

  return (
    tasknames.map((name) => (
      <div key={name}>{name}</div>
    ))
  );
};

export default TaskList;
