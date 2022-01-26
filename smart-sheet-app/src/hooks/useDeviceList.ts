import { useEffect, useMemo } from "react";
import { useSmartSheetContext } from "../context/Context";
import { Device } from "../services/device.model";
import { PageHookData } from "./PageHookData";
import { StateDispatch } from "../context/reducer";
import { State } from "../context/state";
import { fetchAllDevices } from "../services/devices.service";

export const useDeviceList = (): PageHookData<Device[] | null> => {
  const { state, dispatch } = useSmartSheetContext();

  useEffect(() => {
    fetchDevices(state, dispatch);
  }, []);

  return useMemo<PageHookData<Device[]>>(() => {
    return {
      pending: state.devicesPending,
      data: state.devices
    };
  }, [state.devicesPending, state.devices]);
};

const fetchDevices = async (state: State, dispatch: StateDispatch) => {
  // mark as pending
  dispatch({
    _type: "SetDeviceListPending",
    data: true
  });
  // // fetch the data and wait for it
  const response = await fetchAllDevices();
  // // mark as not pending
  dispatch({
    _type: "SetDeviceListPending",
    data: false
  });

  if (response) {
    dispatch({
      _type: "SetDeviceList",
      data: response
    });
  }
};
