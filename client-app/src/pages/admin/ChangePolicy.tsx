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
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { changePolicyAPI } from "../../api/policy";
import { useAppDispatch } from "../../app/hooks";
import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";
import { IInputPolicy, TYPE_POLICY } from "../../constant/policy/policy";

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChangePolicy({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [type, setType] = React.useState(TYPE_POLICY.FIXED);
  const [value, setValue] = React.useState(1);
  const [threshold, setThreshold] = React.useState(1);

  const handleChangeValue = (value: number) => {
    if (value < 1) setValue(1);
    else if (type === TYPE_POLICY.PERCENT && value > 100) {
      setValue(100);
    } else setValue(value);
  };

  const handleChangeThreshold = (threshold: number) => {
    if (threshold < 1) setThreshold(1);
    else setThreshold(threshold);
  };

  React.useEffect(() => {
    if (type === TYPE_POLICY.FIXED && threshold < value) {
      setThreshold(value);
    }
  }, [threshold, type, value]);

  const handleSubmit = async () => {
    const policy = { type, value };
    console.log(policy);
    changePolicyAPI({ threshold, value, voucher_type_id: type } as IInputPolicy)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          setOpen(false);
          dispatch(changeNotice({ message: "update policy successfully", open: true, type: "success" }));
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
    <Dialog
      open={open}
      onClose={() => {
        setValue(0);
        setOpen(false);
      }}
    >
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
            Change Policy
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Policy</InputLabel>
                  <Select value={type} label="Policy" onChange={(event) => setType(event.target.value as TYPE_POLICY)}>
                    <MenuItem value={TYPE_POLICY.FIXED}>FIXED</MenuItem>
                    <MenuItem value={TYPE_POLICY.PERCENT}>PERCENT</MenuItem>
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
                  onChange={(event) => handleChangeValue(event.target.value as unknown as number)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={"number"}
                  required
                  fullWidth
                  label="Threshold"
                  value={threshold}
                  onChange={(event) => handleChangeThreshold(event.target.value as unknown as number)}
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
