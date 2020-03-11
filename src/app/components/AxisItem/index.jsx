/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './index.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SeriesItem from '../SeriesItem';

const AxisItem = ({ axis, serieses, index }) => {
  return (
    <Draggable draggableId={axis.id} index={index}>
      {provided => (
        <div
          className="axis-item"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="axis-item-title" {...provided.dragHandleProps}>
            {axis.title}
          </div>
          <Droppable droppableId={axis.id} type="series">
            {providedDroppable => (
              <div
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                className="series-list"
              >
                {serieses.map((series, indexS) => (
                  <SeriesItem key={series.id} series={series} index={indexS} />
                ))}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default AxisItem;
