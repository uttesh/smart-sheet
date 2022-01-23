import { API } from "../common/constants";
import { Device } from "./device.model";
export const requestOptions = <T>(request: T, method: string = "POST") => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  };
};

export const addDevice = async (device: Device): Promise<Device> => {
  return await fetch(API.DEVICE.ADD, requestOptions(device))
    .then(async (res) => await res.json())
    .then((json) => {
      return json;
    });
};

export const removeDevice = async (id: string): Promise<Device> => {
  console.log("device stringify :: ", id);
  return await fetch(API.DEVICE.FIND_BY_ID(id), { method: "DELETE" })
    .then(async (res) => await res.json())
    .then((json) => {
      return json;
    });
};

export const addDeviceData = async (device: Device): Promise<Device> => {
  return await fetch(API.DEVICE.ADD_DATA(device.name), requestOptions(device))
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

export const fetchByDeviceId = async (id: string): Promise<Device> => {
  return await fetch(API.DEVICE.FIND_BY_ID(id))
    .then(async (res) => await res.json())
    .then((json) => {
      return json;
    });
};
