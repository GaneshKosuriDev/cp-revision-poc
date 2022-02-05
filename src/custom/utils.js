export const getCalculatedScore = (codingPractice, userSolution) => {
  const { solution } = codingPractice;
  const parsedSolution = solution.map((concept) => {
    return {
      isEvaluated: false,
      concept,
    };
  });
  let userScore = 0;
  userSolution.forEach((userSolutionConceptId) => {
    let isConceptIdMatched = false;
    solution.forEach((concept, index) => {
      if (typeof concept === "string") {
        if (userSolutionConceptId === concept) {
          userScore += 1;
          isConceptIdMatched = true;
        }
      } else {
        concept.forEach((conceptId) => {
          const { isEvaluated } = parsedSolution[index];
          if (conceptId === userSolutionConceptId) {
            if (!isEvaluated) {
              userScore += 1;
              parsedSolution[index].isEvaluated = true;
            }
            isConceptIdMatched = true;
          }
        });
      }
    });
    if (!isConceptIdMatched) {
      userScore -= 1;
    }
  });
  return { userScore, totalScore: solution.length };
};

export const move = (state, source, destination) => {
  const srcListClone = [...state[source.droppableId]];
  const destListClone =
    source.droppableId === destination.droppableId
      ? srcListClone
      : [...state[destination.droppableId]];

  const [movedElement] = srcListClone.splice(source.index, 1);
  destListClone.splice(destination.index, 0, movedElement);

  return {
    [source.droppableId]: srcListClone,
    ...(source.droppableId === destination.droppableId
      ? {}
      : {
          [destination.droppableId]: destListClone,
        }),
  };
};

export const REVISION_STATUS = {
  READY: "Ready",
  IN_PROGRESS: "In Progress",
  DONE: "Submitted",
};
