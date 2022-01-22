import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Device } from "../../services/device.model";
import { fetchAllDevices } from "../../services/devices.service";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { useNavigate } from "react-router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddDeviceDialog } from "./add.device";
interface DevicesPageProp {}

export const DevicesPage: FC<DevicesPageProp> = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  const navigateToRoute = (deviceId: string) => {
    navigate(`/devices/${deviceId}`);
  };
  useLayoutEffect(() => {
    fetchAllDevices().then((data) => {
      setDevices(data);
    });
  }, []);
  return (
    <GridContainer>
      {devices.map((device, index) => {
        return (
          <GridItem key={"GridItem_" + device.name + "_" + index}>
            <StyledCard key={"StyledCard_" + device.name + "_" + index}>
              <StyledHeader title={device.name} />

              <CardContent>
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={() => navigateToRoute(device._id)}
                >
                  <AssessmentOutlinedIcon
                    style={{ fontSize: "10rem", color: getRandomColor() }}
                  />
                </IconButton>
              </CardContent>
            </StyledCard>
          </GridItem>
        );
      })}
      <GridItem key="Add_Device_GridItem">
        <StyledCard key="Add_Device_card">
          <StyledHeader title="Add Device" />

          <CardContent>
            <IconButton
              color="secondary"
              aria-label="add device"
              onClick={handleClickOpen}
            >
              <AddCircleOutlineIcon
                style={{ fontSize: "10rem", color: "grey" }}
              ></AddCircleOutlineIcon>
            </IconButton>
          </CardContent>
        </StyledCard>
      </GridItem>
      <AddDeviceDialog handleClose={handleClose} open={open}></AddDeviceDialog>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 2px;
  width: 10%;
`;

const StyledHeader = styled(CardHeader)`
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const GridItem = styled.div`
  padding: 5px;
  font-size: 30px;
  text-align: center;
`;

const StyledIcon = styled(IconButton)`
  .MuiSvgIcon-root {
    height: 80px;
  }
`;

const StyledCard = styled(Card)`
  .MuiPaper-root-MuiCard-root {
    margin-left: 0px;
  }
`;
const StyledContent = styled(CardContent)`
  .MuiCardContent-root {
    padding: 0;
  }
  .MuiIconButton-root {
    height: 100px;
  }
`;
