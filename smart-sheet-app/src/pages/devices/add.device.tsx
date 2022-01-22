import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { FC, useLayoutEffect, useState } from "react";
import { Device } from "../../services/device.model";

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface AddDeviceDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const AddDeviceDialog: FC<AddDeviceDialogProps> = ({
  open,
  handleClose
}) => {
  const [params, setParams] = useState<string[]>([]);
  const [paramName, setParamName] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [device, setDevice] = useState<Device>(new Device());

  const onTextChange = (e: any) => setParamName(e.target.value);
  const onDeviceChange = (e: any) => setDeviceName(e.target.value);

  const handleAddChip = () => {
    const index = params.findIndex((item) => item === paramName);
    if (index === -1) {
      params.push(paramName);
      setParams(params);
    }

    setParamName("");
  };
  const handleDeleteChip = (chip: string) => {
    setParams(params.filter((item) => item !== chip));
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleAddChip();
    }
  };

  const save = () => {
    handleClose();
    device.name = deviceName;
    device.params = params.join(",");
    setDevice(device);
  };
  useLayoutEffect(() => {}, [paramName, params]);

  return (
    <>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add Device
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Device Name"
                helperText="Keep short key name"
                defaultValue={device?.name}
                onChange={onDeviceChange}
              />
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" }
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Parameter Name"
                value={paramName}
                onChange={onTextChange}
                onKeyDown={handleKeyPress}
              />
              <AddButton variant="text" onClick={() => handleAddChip()}>
                Add Param
              </AddButton>
              <div>
                {params.map((param) => {
                  return (
                    <Chip
                      key={param}
                      label={param}
                      onDelete={() => handleDeleteChip(param)}
                    />
                  );
                })}
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={save}>
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
};

const AddButton = styled(Button)`
  margin-top: 20px;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));
