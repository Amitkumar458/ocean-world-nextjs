import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material/";
import useColors from "../../hooks/useColors";

import ButttonComp from "../../components/button";
import { FormType } from "../../types/form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type DialogProps = {
  children: ReactNode;
  open: boolean;
  dialogActionComp?: ReactNode;
  title?: string;
  type?: FormType;
  onClose?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onReset?: () => void;
  onClear?: () => void;
  isSaveLoading?: boolean;
  isCancelLoading?: boolean;
  isCloseLoading?: boolean;
  isResetLoading?: boolean;
  isClearLoading?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "xs";
  paperSx?: SxProps<Theme>;
  extendedActionComponent?: ReactNode;
  contentBoxSx?: SxProps<Theme>;
  saveButtonLabel?: string;
  saveButtonSx?: SxProps<Theme>;
  isSaveDisabled?: boolean;
  cancelButtonLabel?: string;
  cancelButtonSx?: SxProps<Theme>;
  isCancelDisabled?: boolean;
  isClearDisabled?: boolean;
  clearButtonSx?: SxProps<Theme>;
  saveButtonType?: "submit" | "button";
};

export default function DialogContainer(props: Readonly<DialogProps>) {
  const colors = useColors();

  // const useStyles = makeStyles({
  //   button: {
  //     backgroundColor: colors.redAccent[500],

  //   },
  // });
  const handlDialogClose = (_:any, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick") {
      props.onClose?.();
    }
  };

  return (
    <BootstrapDialog
      onClose={handlDialogClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1280px", // Set your width here
          },
        },
      }}
      maxWidth={props.maxWidth}
      PaperProps={{
        sx: {
          ...props.paperSx,
        },
      }}
      // fullScreen
      fullWidth
    >
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: "bold" }}
        id="customized-dialog-title"
      >
        {props.title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ ...props?.contentBoxSx }}>
        {props.children}
      </DialogContent>
      <DialogActions>
        {props.onReset && props.type !== "view" && (
          <ButttonComp
            type="reset"
            onClick={props.onReset}
            isLoading={props.isResetLoading}
          />
        )}
        {props.onSave && props.type !== "view" && (
          <ButttonComp
            type="save"
            onClick={props.onSave}
            isLoading={props.isSaveLoading}
            label={props.saveButtonLabel}
            sx={{ ...props.saveButtonSx }}
            isDisabled={props.isSaveDisabled}
            buttonType={props.saveButtonType}
          />
        )}
        {props.onCancel && (
          <ButttonComp
            type="cancel"
            onClick={props.onCancel}
            isLoading={props.isCancelLoading}
            sx={{ ...props.cancelButtonSx }}
            label={props.cancelButtonLabel}
            isDisabled={props.isCancelDisabled}
          />
        )}
        {props.onClear && (
          <ButttonComp
            type="clear"
            onClick={props.onClear}
            isLoading={props.isClearLoading}
            sx={{ ...props.clearButtonSx }}
            isDisabled={props.isClearDisabled}
          />
        )}
        {props.extendedActionComponent}
        {props.onClose && (
          <ButttonComp
            type="close"
            onClick={props.onClose}
            isLoading={props.isCloseLoading}
          />
        )}
      </DialogActions>
    </BootstrapDialog>
  );
}
