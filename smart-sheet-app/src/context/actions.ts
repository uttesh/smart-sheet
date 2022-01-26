import { Device } from "../services/device.model";
import { DeviceData } from "../services/devicedata.model";

export type Actions =
  | SetDeviceList
  | SetDeviceListPending
  | SetDeviceDataListPending
  | SetDeviceDataList;

export interface SetDeviceList {
  _type: "SetDeviceList";
  data: Device[];
}

export interface SetDeviceListPending {
  _type: "SetDeviceListPending";
  data: boolean;
}

export interface SetDeviceDataList {
  _type: "SetDeviceDataList";
  data: DeviceData[];
}

export interface SetDeviceDataListPending {
  _type: "SetDeviceDataListPending";
  data: boolean;
}
