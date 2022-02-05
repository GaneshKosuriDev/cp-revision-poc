import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Dropzone from "../Dropzone";

import "./index.css";

const DragAndDrop = ({
  onDragEnd,
  currentCPDetails,
  concepts,
  requiredConcepts,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="drag-and-drop-container">
      <Dropzone
        id="Coding Practice Details"
        currentCPDetails={currentCPDetails}
      />
      <Dropzone id="requiredConcepts" concepts={requiredConcepts} />
      <Dropzone id="concepts" concepts={concepts} />
    </div>
  </DragDropContext>
);

export default DragAndDrop;
