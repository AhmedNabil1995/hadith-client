// hooks/useNavigation.ts
import { useState } from "react";
import { ScreenI } from "../types";

export const useNavigation = () => {
  const [screenState, setScreenState] = useState<ScreenI>({
    name: "maqsads",
    params: {},
  });
  const [history, setHistory] = useState<ScreenI[]>([]);

  const navigateTo = (screenName: string, params: any = {}) => {
    setHistory((prev) => [...prev, screenState]);
    setScreenState({ name: screenName, params });
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousScreen = history[history.length - 1];
      setScreenState(previousScreen);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  return { screenState, navigateTo, goBack, setScreenState };
};
