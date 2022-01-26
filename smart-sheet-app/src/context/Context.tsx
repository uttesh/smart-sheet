import React, { FC, useReducer, useContext } from "react";

import { StateDispatch, reducer } from "./reducer";
import { State, defaultStateProvider } from "./state";

export const ContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    defaultStateProvider
  );

  const providerData: ContextData = {
    state,
    dispatch
  };

  return <Context.Provider value={providerData} children={children} />;
};

interface ContextData {
  state: State;
  dispatch: StateDispatch;
}

// tslint:disable-next-line:no-any
export const Context = React.createContext<ContextData>({} as any);

export const useSmartSheetContext = () => useContext(Context);
