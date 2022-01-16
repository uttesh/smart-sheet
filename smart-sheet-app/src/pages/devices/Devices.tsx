import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Device } from "../../services/device.model";
import { fetchAllDevices } from "../../services/devices.service";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { useNavigate } from "react-router";
interface DevicesPageProp {}

export const DevicesPage: FC<DevicesPageProp> = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  const navigateToRoute = (deviceId: string) => {
    console.log("navigateToRoute device details:: deviceId :: ", deviceId);
    navigate(`/devices/${deviceId}`);
  };
  useEffect(() => {
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
                  <AssessmentOutlinedIcon />
                </IconButton>
              </CardContent>
            </StyledCard>
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
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
