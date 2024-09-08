import { useMemo } from "react";
import GameScreen from "./screens/GameScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import LobbyScreen from "./screens/LobbyScreen";
import ResultScreen from "./screens/ResultScreen";
import WaitScreen from "./screens/WaitScreen";
import { Step, useMainStore } from "./store";

function App() {
  const currentStep = useMainStore((state) => state.currentStep);

  const currentScreen = useMemo(() => {
    switch (currentStep) {
      case Step.first:
        return <JoinGameScreen />;
      case Step.lobby:
        return <LobbyScreen />;
      case Step.game:
        return <GameScreen />;
      case Step.wait:
        return <WaitScreen />;
      case Step.result:
        return <ResultScreen />;
      default:
        alert("SOMETHING WENT WRONG");
    }
  }, [currentStep]);

  return (
    <main className="flex flex-col justify-center items-center h-full relative">
      {currentScreen}
    </main>
  );
}

export default App;
