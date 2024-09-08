import { useMemo } from "react";
import GameScreen from "./screens/GameScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import LobbyScreen from "./screens/LobbyScreen";
import ResultScreen from "./screens/ResultScreen";
import WaitScreen from "./screens/WaitScreen";
import { Step, useMainStore } from "./store";

function App() {
  const currentStep = useMainStore((state) => state.currentStep);
  const showWaitScreen = useMainStore((state) => state.showWaitScreen);

  const currentScreen = useMemo(() => {
    if (showWaitScreen) {
      return <WaitScreen />;
    }
    switch (currentStep) {
      case Step.first:
        return <JoinGameScreen />;
      case Step.lobby:
        return <LobbyScreen />;
      case Step.game:
        return <GameScreen />;
      case Step.result:
        return <ResultScreen />;
      default:
        return <JoinGameScreen />;
    }
  }, [showWaitScreen, currentStep]);

  return (
    <main className="flex flex-col justify-center items-center h-full relative">
      {currentScreen}
    </main>
  );
}

export default App;
