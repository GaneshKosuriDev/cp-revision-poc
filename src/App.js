import React, { Component } from "react";
import Modal from "react-modal";

import { courseConcepts, codingPractices } from "./custom/data";
import { move, REVISION_STATUS, getCalculatedScore } from "./custom/utils";

import ModalContent from "./components/ModalContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DragAndDrop from "./components/DragAndDrop";

const initialState = {
  concepts: courseConcepts,
  ["requiredConcepts"]: [],
  activeCPIndex: 0,
  gameState: REVISION_STATUS.READY,
  isModalOpen: true,
  score: 0,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

class App extends Component {
  state = initialState;

  startGame = () => {
    this.setState({
      isModalOpen: false,
      gameState: REVISION_STATUS.IN_PROGRESS,
    });
  };

  componentDidMount() {
    this.initializeStateVariables();
  }

  initializeStateVariables = () => {
    const { activeCPIndex } = this.state;
    let newData;
    const storageData = localStorage.getItem("cp_data");
    if (storageData) {
      newData = JSON.parse(storageData);
      const { id } = codingPractices[activeCPIndex];
      this.setState({
        concepts: newData[id].concepts,
        requiredConcepts: newData[id].requiredConcepts,
      });
    }
  };

  endGame = () => {
    // this.setState({
    //   gameState: REVISION_STATUS.READY,
    // });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      gameState: REVISION_STATUS.IN_PROGRESS,
    });
  };

  onDragEnd = ({ source, destination }) => {
    const { activeCPIndex } = this.state;
    if (!destination) {
      return;
    }

    this.setState(
      (state) => {
        return move(state, source, destination);
      },
      () => this.updateLocalStorage(activeCPIndex)
    );
  };

  onSuccessSubmitCP = () => {
    this.setState({ gameState: REVISION_STATUS.SUBMITTED, isModalOpen: true });
  };

  onSubmitCodingPractice = () => {
    const { activeCPIndex, requiredConcepts } = this.state;
    const userSolution = requiredConcepts.map((concept) => concept.id);
    const updatedScore = getCalculatedScore(
      codingPractices[activeCPIndex],
      userSolution
    );

    this.setState(
      {
        score: updatedScore,
      },
      this.onSuccessSubmitCP
    );
  };

  updateLocalStorage = (activeCPIndex) => {
    const { concepts, requiredConcepts } = this.state;
    const { id } = codingPractices[activeCPIndex];
    let newData = {};
    const data = { [id]: { concepts, requiredConcepts } };
    const storageData = localStorage.getItem("cp_data");
    if (storageData) {
      newData = JSON.parse(storageData);
    }
    newData = { ...newData, ...data };
    localStorage.setItem("cp_data", JSON.stringify(newData));
  };

  resetState = (value) => {
    const data = localStorage.getItem("cp_data");
    if (data === null) {
      this.setState({ requiredConcepts: [], concepts: courseConcepts });
    } else {
      const parsedData = JSON.parse(data);
      const { id } = codingPractices[this.state.activeCPIndex];
      const storedData = parsedData[id];
      if (storedData) {
        this.setState({
          concepts: storedData.concepts,
          requiredConcepts: storedData.requiredConcepts,
        });
      } else {
        this.setState({ requiredConcepts: [], concepts: courseConcepts });
      }
    }
    this.updateLocalStorage(value);
  };

  onClickPrevious = () => {
    const { activeCPIndex } = this.state;
    if (activeCPIndex) {
      this.setState({ activeCPIndex: activeCPIndex - 1 }, () =>
        this.resetState(activeCPIndex)
      );
    }
  };

  onClickNext = () => {
    const { activeCPIndex } = this.state;
    if (activeCPIndex < codingPractices.length - 1) {
      this.setState({ activeCPIndex: activeCPIndex + 1 }, () =>
        this.resetState(activeCPIndex)
      );
    }
  };

  getActiveCPDetails = () => {
    const { activeCPIndex } = this.state;

    return codingPractices[activeCPIndex];
  };

  render() {
    const { gameState, concepts, isModalOpen, score, requiredConcepts } =
      this.state;
    const currentCPDetails = this.getActiveCPDetails();
    return (
      <>
        {this.state.gameState !== REVISION_STATUS.IN_PROGRESS && (
          <Modal isOpen={isModalOpen} style={customStyles}>
            <ModalContent
              startGame={this.startGame}
              resetGame={this.resetGame}
              gameState={gameState}
              score={score}
              currentCPDetails={currentCPDetails}
              closeModal={this.closeModal}
            />
          </Modal>
        )}
        {(this.state.gameState === REVISION_STATUS.IN_PROGRESS ||
          this.state.gameState === REVISION_STATUS.SUBMITTED) && (
          <>
            <Header endGame={this.endGame} />
            <DragAndDrop
              onDragEnd={this.onDragEnd}
              currentCPDetails={currentCPDetails}
              concepts={concepts}
              requiredConcepts={requiredConcepts}
            />
            <Footer
              onClickPrevious={this.onClickPrevious}
              onSubmitCodingPractice={this.onSubmitCodingPractice}
              onClickNext={this.onClickNext}
            />
          </>
        )}
      </>
    );
  }
}

export default App;
