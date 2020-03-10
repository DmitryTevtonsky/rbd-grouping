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

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      };

      setData(newData);
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = { ...startColumn, taskIds: startTaskIds };
      console.log('newStartColumn', newStartColumn);

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };
      console.log('newFinishColumn', newFinishColumn);

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn
        }
      };
      console.log('newData', newData);
      setData(newData);
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          {data.columnsOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
            return (
              <Column key={columnId} column={column} tasks={tasks}>
                {column.title}
              </Column>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
