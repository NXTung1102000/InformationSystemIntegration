import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearNotice, selectNotice } from "./noticeSlice";

export default function Notice() {
  const dispatch = useAppDispatch();
  const nowNotice = useAppSelector(selectNotice);
  setTimeout(() => {
    dispatch(clearNotice());
  }, 5000);
  return (
    <Snackbar
      open={nowNotice.open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ minWidth: "30%" }}
    >
      <Alert severity={nowNotice.type} sx={{ width: "100%" }}>
        {nowNotice.message}
      </Alert>
    </Snackbar>
  );
}
