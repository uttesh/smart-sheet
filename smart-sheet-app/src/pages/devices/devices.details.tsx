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
  getTitle,
  processData
} from "../../common/utility";
import { Device } from "../../services/device.model";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DataChart } from "./device.data.chart";

export interface DeviceDetailProps {}

export const DeviceDetail: FC<DeviceDetailProps> = () => {
  let { deviceId } = useParams();
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [device, setDevice] = useState<Device>(new Device());
  const [refreshInterval, setRefreshInterval] = useState(30 * 1000);
  const [processedDeviceData, setProcessedDeviceData] =
    useState<Map<string, unknown>[]>();

  const columns: GridColDef[] = [];

  const fetchMetrics = () => {
    console.log("refreshed:::", new Date());
    if (deviceId) {
      fetchDeviceDataById(deviceId).then((data) => {
        setDeviceData(data);

        if (deviceId)
          fetchByDeviceId(deviceId).then((device) => {
            setDevice(device);
            let _data = processData(data, device);
            setProcessedDeviceData(_data);
          });
      });
    }
  };

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
        headerName: getTitle(param),
        width: 250
      });
    });
    return columns;
  };

  useEffect(() => {
    fetchMetrics();
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [refreshInterval]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: "98%"
          }
        }}
      >
        {processedDeviceData && processedDeviceData.length > 0 && (
          <>
            <Card>
              <CardHeader title={`${device.name}`} subheader={device.params} />
              <CardContent>
                <DataChart
                  title={device.name}
                  data={processedDeviceData}
                  device={device}
                ></DataChart>
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
          </>
        )}
      </Box>
    </>
  );
};
