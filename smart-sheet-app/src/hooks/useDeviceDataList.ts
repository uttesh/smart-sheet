import { useEffect, useMemo } from "react";
import { useSmartSheetContext } from "../context/Context";
import { StateDispatch } from "../context/reducer";
import { DeviceData } from "../services/devicedata.model";
import { fetchDeviceDataById } from "../services/devices.service";
import { PageHookData } from "./PageHookData";

export const useDeviceDataList = (
  deviceId: string
): PageHookData<DeviceData[] | null> => {
  const { state, dispatch } = useSmartSheetContext();

  useEffect(() => {
    fetchDeviceData(deviceId, dispatch);
  }, []);

  return useMemo<PageHookData<DeviceData[]>>(() => {
    return {
      pending: state.deviceDataListPending,
      data: state.deviceDataList
    };
  }, [state.deviceDataListPending, state.deviceDataList]);
};

const fetchDeviceData = async (deviceId: string, dispatch: StateDispatch) => {
  dispatch({
    _type: "SetDeviceDataListPending",
    data: true
  });
  const response = await fetchDeviceDataById(deviceId);
  dispatch({
    _type: "SetDeviceDataListPending",
    data: false
  });

  if (response) {
    dispatch({
      _type: "SetDeviceDataList",
      data: response
    });
  }
};
