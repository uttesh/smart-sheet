import { Device } from "../services/device.model";
import { DeviceData } from "../services/devicedata.model";

export interface State {
  devices: Device[];
  devicesPending: boolean;
  deviceDataList: DeviceData[];
  deviceDataListPending: boolean;
}

export const defaultStateProvider = (): State => ({
  devices: [],
  deviceDataListPending: false,
  devicesPending: false,
  deviceDataList: []
});
