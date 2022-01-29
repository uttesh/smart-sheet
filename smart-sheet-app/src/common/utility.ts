import { DeviceData } from "../services/devicedata.model";
import { Device } from "../services/device.model";
import { get } from "lodash";

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

export const getTitle = (title: string): string => {
  let result = title.replace(/[A-Z]/g, " $1");
  let upperCaseTitle = result.charAt(0).toUpperCase() + result.slice(1);
  return upperCaseTitle;
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
    processData.set("createdTime", new Date(deviceData.createdDate).getTime());
    const obj = Object.fromEntries(processData);
    processDataList.push(obj);
  });
  return processDataList;
};

export const processChartData = (
  data: Map<string, unknown>[],
  device: Device
) => {
  let chartDataList: any = [];
  device.params.split(",").forEach((param) => {
    const values = data.map((item) => {
      return [get(item, "createdTime"), get(item, param)];
    });
    if (values) {
      chartDataList.push(values);
    }
  });
  return chartDataList;
};

export const processChartDataByParam = (
  data: Map<string, unknown>[],
  device: Device
) => {
  let chartDataList: any = [];
  device.params.split(",").forEach((param) => {
    const values = data.map((item) => [
      get(item, "createdTime"),
      get(item, param)
    ]);
    if (values) {
      chartDataList.push({
        name: param,
        data: values
      });
    }
  });
  return chartDataList;
};
