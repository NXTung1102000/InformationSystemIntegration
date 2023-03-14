import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { changePolicyAPI } from "../../api/policy";
import { useAppDispatch } from "../../app/hooks";
import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";
import { TYPE_POLICY } from "../../constant/policy/policy";

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChangePolicy({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [type, setType] = React.useState(TYPE_POLICY.FIXED);
  const [value, setValue] = React.useState(0);

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as TYPE_POLICY);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value as unknown as number);
  };

  const handleSubmit = async () => {
    const policy = { type, value };
    console.log(policy);
    changePolicyAPI()
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          setOpen(false);
          dispatch(changeNotice({ message: "sign up successfully", open: true, type: "success" }));
        } else {
          dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: "error server", open: true, type: "error" }));
      });
  };

  return (
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
            Forget Password
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Policy</InputLabel>
                  <Select value={type} label="Policy" onChange={handleChangeType}>
                    <MenuItem value={TYPE_POLICY.FIXED}>{TYPE_POLICY.FIXED}</MenuItem>
                    <MenuItem value={TYPE_POLICY.PERCENT}>{TYPE_POLICY.PERCENT}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={"number"}
                  required
                  fullWidth
                  label="Value"
                  value={value}
                  onChange={(event) => handleChangeValue(event)}
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
              Update Policy
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}