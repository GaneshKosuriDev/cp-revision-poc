import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CPDetails from "../CPDetails";

import "./index.css";

const Dropzone = ({ currentCPDetails, concepts, id }) => (
  <div className="droppable-container">
    <p className="course-id">{id}</p>
    {currentCPDetails === undefined ? (
      <RenderDroppableContainer id={id} concepts={concepts} />
    ) : (
      <CPDetails currentCPDetails={currentCPDetails} />
    )}
  </div>
);

const RenderDroppableContainer = ({ id, concepts }) => (
  <Droppable droppableId={id}>
    {(provided) => {
      return (
        <div
          className="concepts-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {concepts.map(({ name }, index) => (
            <Concept key={name} name={name} index={index} />
          ))}
          {provided.placeholder}
        </div>
      );
    }}
  </Droppable>
);

const Concept = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {(provided) => {
      return (
        <div
          className="concept-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img className="course-icon" src={`./js.svg`} alt={name} />
          <div className="concept-title">{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default Dropzone;
