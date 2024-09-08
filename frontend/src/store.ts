import { create } from "zustand";

export enum Step {
  first,
  lobby,
  game,
  wait,
  result,
}

interface MainState {
  currentStep: Step;
  setStep: (newStep: Step) => void;
}

export const useMainStore = create<MainState>()((set) => ({
  currentStep: Step.first,
  setStep: (newStep: Step) => set({ currentStep: newStep }),
}));
