import { useState } from "react";

export function useViewNavigation(initialView = 0) {
  const [[view, direction], setViewState] = useState([initialView, 0]);

  const navigateTo = (newView) => {
    const newDir = newView > view ? 1 : -1;
    setViewState([newView, newDir]);
  };

  return { view, direction, navigateTo };
}
