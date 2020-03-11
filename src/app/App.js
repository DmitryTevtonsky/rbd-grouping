import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getInitialData } from './data';
import AxisItem from './components/AxisItem';

const App = () => {
  const [data, setData] = useState(getInitialData());
  console.log('DATA', data);

  const onDragEnd = result => {
    console.log('result', result);
    const { draggableId, destination, source, type } = result;
    console.log('destination', destination);
    if (!destination) return; // TODO: creating new axis

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'axis') {
      // to reorder axises
      const newAxisesOrder = Array.from(data.axisesOrder);
      newAxisesOrder.splice(source.index, 1);
      newAxisesOrder.splice(destination.index, 0, draggableId);

      const newData = { ...data, axisesOrder: newAxisesOrder };
      setData(newData);
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
    // TODO: filter for empty(without serieses) axis
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-axises" direction="vertical" type="axis">
          {provided => (
            <div
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.axisesOrder.map((axisId, index) => {
                const axis = data.axises[axisId];
                const serieses = axis.seriesesIds.map(
                  taskId => data.serieses[taskId]
                );
                return (
                  <AxisItem
                    key={axisId}
                    axis={axis}
                    serieses={serieses}
                    index={index}
                  >
                    {axis.title}
                  </AxisItem>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
