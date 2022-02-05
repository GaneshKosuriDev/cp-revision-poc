import React from "react";

import { instructions } from "../../custom/data";
import { REVISION_STATUS } from "../../custom/utils";

import "./index.css";

const RenderInstructions = () => (
  <div className="instructions-container">
    <p className="instructions-title">Instructions</p>
    <ul className="instructions-list">
      {instructions.map((eachInstruction) => {
        const { title, instruction, id } = eachInstruction;
        return (
          <li className="instruction" key={id}>
            <span className="instruction-heading">{title}:</span> {instruction}
          </li>
        );
      })}
    </ul>
  </div>
);

const isBestScore = (userScore, totalScore) => userScore === totalScore;

const RenderCPResult = ({ score }) => {
  const { userScore, totalScore } = score;
  return (
    <div className="result-container">
      <p className="message-description">
        {isBestScore(userScore, totalScore) ? (
          <span className="success-description">Congratulations</span>
        ) : (
          <span className="failure-description">Better Luck Next Time</span>
        )}
      </p>
      <p className="score">
        <span className="user-score">{userScore}</span> /
        <span className="total-score">{totalScore}</span>
      </p>
    </div>
  );
};

const ModalContent = ({ gameState, startGame, score, closeModal }) => (
  <div className="moda">
    {gameState !== REVISION_STATUS.READY ? (
      <div className="modal-close-btn-container">
        <button onClick={closeModal} className="button">
          X
        </button>
      </div>
    ) : null}
    <div className="modal-body">
      <div className="c">
        {gameState === REVISION_STATUS.READY ? (
          <RenderInstructions />
        ) : (
          <RenderCPResult score={score} />
        )}
      </div>
    </div>
    {gameState === REVISION_STATUS.READY ? (
      <div>
        <button className="button start-button" onClick={startGame}>
          Start Revision
        </button>
      </div>
    ) : null}
  </div>
);

export default ModalContent;
