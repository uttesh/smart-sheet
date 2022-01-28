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
import {
  getDateTimeStr,
  getFormattedData,
  processData
} from "../../common/utility";
import { Device } from "../../services/device.model";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export interface DeviceDetailProps {}

export const DeviceDetail: FC<DeviceDetailProps> = () => {
  let { deviceId } = useParams();
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [device, setDevice] = useState<Device>(new Device());
  const [processedDeviceData, setProcessedDeviceData] =
    useState<Map<string, unknown>[]>();

  const columns: GridColDef[] = [];

  const handleRowId = (e: any) => {
    return e.id;
  };

  const getColumns = () => {
    columns.push({
      field: "createdDate",
      headerName: "Created Date",
      width: 250,
      valueGetter: (params: GridValueGetterParams) =>
        `${getDateTimeStr(params.row.createdDate)}`
    });

    device.params.split(",").forEach((param) => {
      columns.push({
        field: param,
        headerName: param,
        width: 250
      });
    });
    return columns;
  };

  useEffect(() => {
    if (deviceId)
      fetchDeviceDataById(deviceId).then((data) => {
        setDeviceData(data);

        if (deviceId)
          fetchByDeviceId(deviceId).then((device) => {
            setDevice(device);
            let _data = processData(data, device);
            setProcessedDeviceData(_data);
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
        {processedDeviceData && processedDeviceData.length > 0 && (
          <Card>
            <CardHeader title={device.name} subheader={device.params} />
            <CardContent>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={handleRowId}
                  rows={processedDeviceData}
                  columns={getColumns()}
                  pageSize={10}
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
