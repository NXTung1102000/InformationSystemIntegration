import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions, DialogContentText, DialogTitle } from "@mui/material";

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  id_order: number;
  handleCancelOrder: (id: number) => void;
}

export default function CancelOrderDialog({ open, setOpen, id_order, handleCancelOrder }: IOpenDialog) {
  const [orderId, setOrderID] = React.useState(id_order);
  React.useEffect(() => {
    setOrderID(id_order);
  }, [id_order]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle color={"warning"}>{`Warning For Order has ID ${orderId}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color={"error"}>
            This order will be permanently deleted. And your Customer SCORE will be penalized 5 points. Are you sure to
            cancel it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelOrder(id_order)} autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
