import { create } from "zustand";

interface MainState {
  currentStep: number;
  goToNextStep: () => void;
  showWaitScreen: boolean;
  setShowWaitScreen: (val: boolean) => void;
}

export const useMainStore = create<MainState>()((set) => ({
  currentStep: 0,
  goToNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  showWaitScreen: false,
  setShowWaitScreen: (val) => set(() => ({ showWaitScreen: val })),
}));
