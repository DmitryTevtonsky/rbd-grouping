/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './index.css';
import { Droppable } from 'react-beautiful-dnd';
import SeriesItem from '../SeriesItem';

const AxisItem = ({ axis, serieses }) => {
  return (
    <div className="axis-item">
      <div className="axis-item-title">{axis.title}</div>
      <Droppable droppableId={axis.id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="series-list"
          >
            {serieses.map((series, index) => (
              <SeriesItem key={series.id} series={series} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default AxisItem;
