import { DeviceData } from "../services/devicedata.model";

export const getDateTimeStr = (datestr: string) => {
  const _date = new Date(datestr);
  return `${_date.toLocaleDateString()} ${_date.toLocaleTimeString(
    "it-US"
  )}.${_date.getMilliseconds()}`;
};

export const getFormattedData = (data: string) => {
  const jdata = JSON.parse(data);
  console.log("jdata :: ", jdata["data"]);
  return jdata["data"];
};

export const processData = (deviceDataList: DeviceData[]) => {};
