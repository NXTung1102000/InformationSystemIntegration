import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAppDispatch } from "../../../app/hooks";
import { changePasswordAPI } from "../../../api/auth";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";

interface openForgetPW {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChangePassword({ open, setOpen }: openForgetPW) {
  const dispatch = useAppDispatch();

  const [oldPW, setOldPW] = React.useState("");
  const [newPW, setNewPW] = React.useState("");
  const [confirmNewPW, setConfirmNewPW] = React.useState("");

  const validateOldPW = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate email
    setOldPW(event.target.value);
  };

  const validateNewPW = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate UserName
    setNewPW(event.target.value);
  };

  const validateConfirmNewPW = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate UserName
    setConfirmNewPW(event.target.value);
  };

  const handleSubmit = async () => {
    changePasswordAPI(oldPW, newPW)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          setOpen(false);
          dispatch(changeNotice({ message: "New password was sent into your mail", open: true, type: "success" }));
        } else {
          dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: "Error server", open: true, type: "error" }));
      });
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Old password"
                    value={oldPW}
                    onChange={(event) => validateOldPW(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="New password"
                    value={newPW}
                    onChange={(event) => validateNewPW(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="New password"
                    value={confirmNewPW}
                    onChange={(event) => validateConfirmNewPW(event)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                Change
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
