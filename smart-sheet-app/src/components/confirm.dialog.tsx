import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
interface ConfirmProps {
  show: boolean;
  message: string;
  yes: () => void;
  dismiss: () => void;
}

export const ConfirmDialog: FC<ConfirmProps> = ({
  show,
  yes,
  dismiss,
  message
}) => {
  return (
    <>
      <Dialog
        open={show}
        onClose={dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dismiss}>Cancel</Button>
          <Button onClick={yes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
