import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { fetchByDeviceId } from "../../services/devices.service";
export interface DeviceDetailProps {}

export const DeviceDetail: FC<DeviceDetailProps> = () => {
  let { deviceId } = useParams();
  useEffect(() => {
    console.log("deviceId :: ", deviceId);
    if (deviceId)
      fetchByDeviceId(deviceId).then((data) => {
        console.log("device details: ", data);
      });
  }, []);
  return <></>;
};
