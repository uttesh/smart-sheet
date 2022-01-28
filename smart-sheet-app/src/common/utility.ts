import { DeviceData } from "../services/devicedata.model";
import { Device } from "../services/device.model";

export const getDateTimeStr = (datestr: string) => {
  const _date = new Date(datestr);
  return `${_date.toLocaleDateString()} ${_date.toLocaleTimeString(
    "it-US"
  )}.${_date.getMilliseconds()}`;
};

export const getFormattedData = (data: string) => {
  const jdata = JSON.parse(data);
  return jdata["data"];
};

export const processData = (deviceDataList: DeviceData[], device: Device) => {
  let processDataList = new Array();
  deviceDataList.forEach((deviceData) => {
    let processData = new Map();
    device.params.split(",").forEach((param) => {
      const jdata = JSON.parse(deviceData.data).data;
      processData.set(param, JSON.parse(jdata)[param]);
    });
    processData.set("id", deviceData._id);
    processData.set("createdDate", deviceData.createdDate);
    const obj = Object.fromEntries(processData);
    processDataList.push(obj);
  });
  return processDataList;
};
