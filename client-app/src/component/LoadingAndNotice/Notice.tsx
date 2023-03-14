import React from "react";
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearNotice, selectNotice } from "./noticeSlice";

const colorText = (type: AlertColor) => {
  switch (type) {
    case "success":
      return "rgb(46, 125, 50)";
    case "error":
      return "rgb(211, 47, 47)";
    case "warning":
      return "rgb(237, 108, 2)";
    case "info":
      return "rgb(2, 136, 209)";
    default:
      return "";
  }
};

export default function Notice() {
  const dispatch = useAppDispatch();
  const nowNotice = useAppSelector(selectNotice);
  return (
    <Dialog open={nowNotice.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText color={colorText(nowNotice.type)}>{nowNotice.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(clearNotice())} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
