import { useEffect } from "react";
import { Step, useMainStore } from "../store";

function LobbyScreen() {
  const setStep = useMainStore((state) => state.setStep);

  useEffect(() => {
    setTimeout(() => {
      setStep(Step.game);
    }, 2000);
  });

  return (
    <>
      <span className="text-fancy">Looking for a worthy opponent...</span>
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

export default LobbyScreen;
