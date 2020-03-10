import React, { useState } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { getInitialData } from './data';
import AxisItem from './components/AxisItem';

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

    const start = data.axises[source.droppableId];
    const finish = data.axises[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.seriesesIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, seriesesIds: newTaskIds };

      setData({
        ...data,
        axises: {
          ...data.axises,
          [newColumn.id]: newColumn
        }
      });
    } else {
      const startSeriesesIds = Array.from(start.seriesesIds);
      startSeriesesIds.splice(source.index, 1);
      const newStartColumn = { ...start, seriesesIds: startSeriesesIds };

      const finishSeriesesIds = Array.from(finish.seriesesIds);
      finishSeriesesIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = { ...finish, seriesesIds: finishSeriesesIds };

      setData({
        ...data,
        axises: {
          ...data.axises,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn
        }
      });
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          {data.axisesOrder.map(axisId => {
            const axis = data.axises[axisId];
            const serieses = axis.seriesesIds.map(
              taskId => data.serieses[taskId]
            );
            return (
              <AxisItem key={axisId} axis={axis} serieses={serieses}>
                {axis.title}
              </AxisItem>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
