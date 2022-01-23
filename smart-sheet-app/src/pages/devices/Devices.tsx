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
import { CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BlurCircularOutlinedIcon from "@mui/icons-material/BlurCircularOutlined";
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

              <StyledContent>
                <IconButton
                  color="secondary"
                  aria-label="add an alarm"
                  onClick={() => navigateToRoute(device._id)}
                >
                  <BlurCircularOutlinedIcon
                    style={{ fontSize: "5rem", color: getRandomColor() }}
                  />
                </IconButton>
              </StyledContent>
              <StyledCardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <ModeEditOutlineOutlinedIcon style={{ color: "green" }} />
                </IconButton>
                <IconButton aria-label="share">
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
              onClick={handleClickOpen}
            >
              <AddCircleOutlineIcon
                style={{ fontSize: "5rem", color: "grey" }}
              ></AddCircleOutlineIcon>
            </IconButton>
          </StyledContent>
        </StyledCard>
      </GridItem>
      <AddDeviceDialog handleClose={handleClose} open={open}></AddDeviceDialog>
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
  padding-left: 44%;
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
