import { create } from "zustand";

export enum Step {
  first,
  lobby,
  game,
  result,
}

interface MainState {
  currentStep: Step;
  setStep: (newStep: Step) => void;
  showWaitScreen: boolean;
  setShowWaitScreen: (val: boolean) => void;
}

export const useMainStore = create<MainState>()((set) => ({
  currentStep: Step.first,
  setStep: (newStep: Step) => set({ currentStep: newStep }),
  showWaitScreen: false,
  setShowWaitScreen: (val) => set({ showWaitScreen: val }),
}));
