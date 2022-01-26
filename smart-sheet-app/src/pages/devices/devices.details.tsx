import { FC, useEffect } from "react";
import { useParams } from "react-router";
import {
  fetchByDeviceId,
  fetchDeviceDataById
} from "../../services/devices.service";
export interface DeviceDetailProps {}

export const DeviceDetail: FC<DeviceDetailProps> = () => {
  let { deviceId } = useParams();
  useEffect(() => {
    console.log("deviceId :: ", deviceId);
    if (deviceId)
      fetchDeviceDataById(deviceId).then((data) => {
        console.table(data);
      });
  }, []);
  return <></>;
};
