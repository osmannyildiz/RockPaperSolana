import { useMemo } from "react";
import JoinGameScreen from "./screens/JoinGameScreen";
import WaitScreen from "./screens/WaitScreen";
import { useMainStore } from "./store";

function App() {
  const currentStep = useMainStore((state) => state.currentStep);
  const showWaitScreen = useMainStore((state) => state.showWaitScreen);

  const currentScreen = useMemo(() => {
    if (showWaitScreen) {
      return <WaitScreen />;
    }
    switch (currentStep) {
      case 1:
        return <JoinGameScreen />;
      default:
        return <JoinGameScreen />;
    }
  }, [showWaitScreen, currentStep]);

  return (
    <main className="flex justify-center items-center h-full relative">
      {currentScreen}
    </main>
  );
}

export default App;
