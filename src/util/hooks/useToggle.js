import { useCallback, useState } from "react";

export const useToggle = (initialState = false) => {
	const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down
  // the component. This function changes the boolean value to opposite.
	const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle]
};
