import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DeviceData } from "../../services/devicedata.model";
import {
  fetchByDeviceId,
  fetchDeviceDataById
} from "../../services/devices.service";
import { DateTime } from "luxon";
import { getDateTimeStr, getFormattedData } from "../../common/utility";
import { Device } from "../../services/device.model";

export interface DeviceDetailProps {}

export const DeviceDetail: FC<DeviceDetailProps> = () => {
  let { deviceId } = useParams();
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [device, setDevice] = useState<Device>(new Device());

  const handleGetRowId = (e: any) => {
    return e._id;
  };

  const columns: GridColDef[] = [
    {
      field: "data",
      headerName: "Data",
      width: 600,
      valueGetter: (params: GridValueGetterParams) =>
        `${getFormattedData(params.row.data)}`
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 250,
      valueGetter: (params: GridValueGetterParams) =>
        `${getDateTimeStr(params.row.createdDate)}`
    }
  ];

  useEffect(() => {
    if (deviceId)
      fetchDeviceDataById(deviceId).then((data) => {
        setDeviceData(data);
        if (deviceId)
          fetchByDeviceId(deviceId).then((device) => {
            setDevice(device);
          });
      });
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: "98%",
            height: 550
          }
        }}
      >
        {device && (
          <Card>
            <CardHeader title={device.name} subheader={device.params} />
            <CardContent>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={deviceData}
                  getRowId={handleGetRowId}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
};
