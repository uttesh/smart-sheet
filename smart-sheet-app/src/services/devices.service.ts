import { API } from "../common/constants";
import { Device } from "./device.model";
export const requestOptions = <T>(request: T) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  };
};

export const addDevice = async (device: Device): Promise<Device> => {
  return await fetch(API.DEVICE.ADD(device.name), requestOptions(device))
    .then(async (res) => await res.json())
    .then((json) => {
      return json;
    });
};

export const fetchAllDevices = async (): Promise<Device[]> => {
  return await fetch(API.DEVICE.ALL)
    .then(async (res) => await res.json())
    .then((json) => {
      return json;
    });
};
