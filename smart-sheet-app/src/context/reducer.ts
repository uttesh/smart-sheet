import { Reducer, Dispatch } from "react";

import { Actions } from "./actions";
import { State } from "./state";

export type StateDispatch = Dispatch<Actions>;

export const reducer: Reducer<State, Actions> = (prevState, action) => {
  switch (action._type) {
    case "SetDeviceList": {
      const nextState: State = {
        ...prevState,
        devices: action.data
      };
      return nextState;
    }
    case "SetDeviceListPending": {
      const nextState: State = {
        ...prevState,
        deviceDataListPending: action.data
      };
      return nextState;
    }

    case "SetDeviceDataList": {
      const nextState: State = {
        ...prevState,
        deviceDataList: action.data
      };
      return nextState;
    }

    case "SetDeviceDataListPending": {
      const nextState: State = {
        ...prevState,
        deviceDataListPending: action.data
      };
      return nextState;
    }
  }
};
