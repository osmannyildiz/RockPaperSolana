import { useMainStore } from "../store";

function JoinGameScreen() {
  // const goToNextStep = useMainStore((state) => state.goToNextStep);
  const setShowWaitScreen = useMainStore((state) => state.setShowWaitScreen);

  return (
    <>
      <button
        type="button"
        className="px-4 py-4 bg-orange-700 rounded text-fancy hover:scale-125 transition-transform"
        onClick={() => {
          setShowWaitScreen(true);
          setTimeout(() => {
            setShowWaitScreen(false);
          }, 1000);
          // goToNextStep();
        }}
      >
        Join Game
      </button>
      <img
        src="/rock-optimized.svg"
        alt=""
        className="absolute top-[100px] left-[100px] w-[200px] rotate-[35deg]"
      />
      <img
        src="/paper-optimized.svg"
        alt=""
        className="absolute top-[400px] right-[10px] w-[250px] rotate-[-15deg]"
      />
      <img
        src="/scissors-optimized.svg"
        alt=""
        className="absolute top-[700px] left-[200px] w-[250px] rotate-[75deg]"
      />
    </>
  );
}

export default JoinGameScreen;
