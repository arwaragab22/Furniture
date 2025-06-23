import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Usedialogcontext } from "./contextdialog/Createcontexdialog";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
type dialogtype = {
  handleClickOpen: () => void;
  opendialog: boolean;
  handleClose: () => void;
};

export default function CustomizedDialogs() {
      const { handleClose, opendialog } = Usedialogcontext();
      console.log(opendialog);
    const navigate = useNavigate();
  return (
    <React.Fragment>
      <BootstrapDialog
        sx={{ height: "fit-content" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={opendialog}
      >
        <DialogTitle>
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <LockOutlineIcon color="warning" />
            Authentication Required
          </Stack>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1">
              To add this item to your favorites or cart, please log in or
              create a new account.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/login", { state: { from: location.pathname } })
            }
          >
            Login
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
