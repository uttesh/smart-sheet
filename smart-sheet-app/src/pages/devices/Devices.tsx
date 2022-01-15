import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { FC, useState, useLayoutEffect } from "react";
import styled from "styled-components";

interface DevicesPageProp {}

export const DevicesPage: FC<DevicesPageProp> = () => {
  const [names, setNames] = useState<string[]>([]);

  useLayoutEffect(() => {
    for (let i = 0; i < 10; i++) {
      names.push("testing-1");
    }
    setNames(names);
    console.log("names :: ", names.length);
  }, []);
  return (
    <GridContainer>
      {names &&
        names.map((name, index) => {
          return (
            <GridItem>
              <StyledCard
                sx={{ maxWidth: 345, marginLeft: 10 }}
                key={name + "_" + index}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={name}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="/static/images/cards/paella.jpg"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook togetzfasfher your guests. Add 1 cup of frozen
                    peas along with the
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
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
`;

const GridItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
  font-size: 30px;
  text-align: center;
`;

const StyledCard = styled(Card)`
  > .MuiPaper-root {
    margin-left: 0px;
  }
`;
