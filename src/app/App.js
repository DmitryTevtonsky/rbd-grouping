import React, { useState } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { getInitialData } from './data';
import Column from './components/Column';

const App = () => {
  const [data, setData] = useState(getInitialData());
  console.log('DATA', data);
  const onDragEnd = result => {
    console.log('result', result);
    const { draggableId, destination, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, taskIds: newTaskIds };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn
      }
    };
    console.log('newData', newData);
    setData(newData);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnsOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
          return (
            <Column key={columnId} column={column} tasks={tasks}>
              {column.title}
            </Column>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default App;
