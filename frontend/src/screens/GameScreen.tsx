// import { useMainStore } from "../store";
import { useEffect, useState } from "react";
import { Step, useMainStore } from "../store";

enum Move {
  none,
  rock,
  paper,
  scissors,
}

const getIconForMove = (move: Move) => {
  switch (move) {
    case Move.none:
      return <div className="bg-white w-4 h-4 rounded-full"></div>;
    case Move.rock:
      return <img src="/rock-optimized.svg" alt="" className="w-20" />;
    case Move.paper:
      return <img src="/paper-optimized.svg" alt="" className="w-20" />;
    case Move.scissors:
      return <img src="/scissors-optimized.svg" alt="" className="w-20" />;
  }
};

function GameScreen() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [movesMade, setMovesMade] = useState(0);
  const [moves, setMoves] = useState([
    Move.none,
    Move.none,
    Move.none,
    Move.none,
    Move.none,
  ]);
  const setStep = useMainStore((state) => state.setStep);

  useEffect(() => {
    if (timeLeft < 0) {
      setStep(Step.wait);
    }
    const timeout = setTimeout(() => {
      setTimeLeft((val) => val - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [timeLeft]);

  const makeMove = (move: Move) => {
    setMoves([
      ...moves.slice(0, movesMade),
      move,
      ...moves.slice(movesMade + 1),
    ]);
    setMovesMade((val) => val + 1);
  };

  return (
    <>
      <div className="rounded-full w-24 h-24 bg-white text-indigo-900 flex justify-center items-center text-6xl text-fancy">
        {timeLeft}
      </div>
      <div className="flex items-center gap-16 mt-16">
        {moves.map((move) => (
          <div>{getIconForMove(move)}</div>
        ))}
      </div>
      {movesMade < 5 && (
        <div className="flex gap-4 mt-32">
          <button
            type="button"
            className="w-64 h-64 rounded-xl bg-indigo-200 flex justify-center items-center hover:scale-125 transition-transform border-8"
            onClick={() => {
              makeMove(Move.rock);
            }}
          >
            <img src="/rock-optimized.svg" alt="" className="w-48" />
          </button>
          <button
            type="button"
            className="w-64 h-64 rounded-xl bg-indigo-200 flex justify-center items-center hover:scale-125 transition-transform border-8"
            onClick={() => {
              makeMove(Move.paper);
            }}
          >
            <img src="/paper-optimized.svg" alt="" className="w-48" />
          </button>
          <button
            type="button"
            className="w-64 h-64 rounded-xl bg-indigo-200 flex justify-center items-center hover:scale-125 transition-transform border-8"
            onClick={() => {
              makeMove(Move.scissors);
            }}
          >
            <img src="/scissors-optimized.svg" alt="" className="w-48" />
          </button>
        </div>
      )}
    </>
  );
}

export default GameScreen;
