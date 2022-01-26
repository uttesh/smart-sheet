import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import React, { FC, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Device } from "../../services/device.model";
import { fetchAllDevices, removeDevice } from "../../services/devices.service";
import { AddDeviceDialog } from "./add.device";
import { ConfirmDialog } from "../../components/confirm.dialog";
import { MESSAGES } from "../../common/constants";
import { useDeviceList } from "../../hooks/useDeviceList";
import { useSmartSheetContext } from "../../context/Context";
interface DevicesPageProp {}

export const DevicesPage: FC<DevicesPageProp> = () => {
  useDeviceList();
  const { state, dispatch } = useSmartSheetContext();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<string>();
  const [editDeviceObj, setEditDeviceObj] = useState<Device>(new Device());
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const openDeviceDialog = (selectedDevice: Device) => {
    setEditDeviceObj(selectedDevice);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  const deleteDeviceConfirmed = async () => {
    setShowConfirmation(false);
    if (selectedDevice) {
      await removeDevice(selectedDevice).then((data) => {
        updateDevices();
      });
    }
  };

  const navigateToRoute = (deviceId: string) => {
    navigate(`/devices/${deviceId}`);
  };

  const deleteDevice = (id: string) => {
    setSelectedDevice(id);
    setShowConfirmation(true);
  };

  const dismissConfirmation = () => {
    setShowConfirmation(false);
  };

  const updateDevices = () => {
    fetchAllDevices().then((devices) => {
      dispatch({
        _type: "SetDeviceList",
        data: devices
      });
    });
  };

  return (
    <GridContainer>
      {state.devices.map((device, index) => {
        return (
          <GridItem key={"GridItem_" + device.name + "_" + index}>
            <StyledCard key={"StyledCard_" + device.name + "_" + index}>
              <StyledHeader title={device.name} />

              <StyledContent>
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={() => navigateToRoute(device._id)}
                >
                  <MemoryOutlinedIcon
                    style={{ fontSize: "5rem", color: "#97c6d9" }}
                  />
                </IconButton>
              </StyledContent>
              <StyledCardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => openDeviceDialog(device)}
                >
                  <ModeEditOutlineOutlinedIcon style={{ color: "green" }} />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() => deleteDevice(device._id)}
                >
                  <DeleteOutlinedIcon style={{ color: "#ce2525" }} />
                </IconButton>
              </StyledCardActions>
            </StyledCard>
          </GridItem>
        );
      })}
      <GridItem key="Add_Device_GridItem">
        <StyledCard key="Add_Device_card">
          <StyledHeader title="Add Device" />

          <StyledContent>
            <IconButton
              color="secondary"
              aria-label="add device"
              onClick={() => openDeviceDialog(new Device())}
            >
              <AddCircleOutlineIcon
                style={{ fontSize: "5rem", color: "grey" }}
              ></AddCircleOutlineIcon>
            </IconButton>
          </StyledContent>
        </StyledCard>
      </GridItem>
      {open && (
        <AddDeviceDialog
          editDevice={editDeviceObj}
          handleClose={handleClose}
          open={open}
        ></AddDeviceDialog>
      )}

      <ConfirmDialog
        show={showConfirmation}
        message={MESSAGES.DELETE_DEVICE_CONFIRMATION}
        dismiss={dismissConfirmation}
        yes={deleteDeviceConfirmed}
      ></ConfirmDialog>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  padding: 2px;
  width: 10%;
`;

const StyledCardActions = styled(CardActions)`
  padding-left: 50%;
`;

const StyledHeader = styled(CardHeader)`
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const GridItem = styled.div`
  padding: 5px;
  font-size: 10px;
  text-align: center;
  width: 200px;
`;

const StyledIcon = styled(IconButton)`
  .MuiSvgIcon-root {
    height: 40px;
  }
`;

const StyledCard = styled(Card)`
  .MuiPaper-root-MuiCard-root {
    margin-left: 0px;
  }
`;
const StyledContent = styled(CardContent)`
  padding: 0;

  .MuiIconButton-root {
    height: 100px;
  }
`;
