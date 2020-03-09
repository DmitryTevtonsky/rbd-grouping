/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './index.css';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task';

const Column = ({ column, tasks }) => {
  return (
    <div className="column">
      <div className="column-title">{column.title}</div>
      <Droppable droppableId={column.id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
