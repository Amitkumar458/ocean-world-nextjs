import { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  SxProps,
  Theme,
  IconButton,
} from "@mui/material";
import useColors from "../../hooks/useColors";
import { FormType } from "../../types/form";
import Close from "@mui/icons-material/Close";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  type?: FormType;
  onSave?: () => void;
  onCancel?: () => void;
  onUpdate?: () => void;
  isSaveLoading?: boolean;
  isSaveDisabled?: boolean;
  isUpdateDisabled?: boolean;
  isUpdateLoading?: boolean;
  isCancelLoading?: boolean;
  isCancelDisabled?: boolean;
  paperSx?: SxProps<Theme>;
  contentBoxSx?: SxProps<Theme>;
  titleSX?:  SxProps<Theme>;
};




const DialogContainer2 = ({ open, onClose,title , titleSX , ...props }: Readonly<Props>) => {
  const colors:any = useColors();
  
  const handleColse = (_: any, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick") {
      onClose?.();
    }
  };
  
  
  return (
    <Dialog open={open} onClose={handleColse} maxWidth="md" fullWidth={true}>
      <DialogTitle
        sx={{
          m: 0,
          p: 1,
          fontWeight: "bold",
          backgroundColor:colors.redAccent[500],
          color: colors.primary[400],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...titleSX
        }}
      >
        <span
          style={{
            fontSize: "1.2rem",
            padding: "0px",
            fontWeight: "500",
            marginRight: "auto",
          }}
        >
          {title}
        </span>
        <IconButton
          sx={{
            color: colors.primary[400],
            padding: "2px",
            "&:hover": {
              backgroundColor: colors.primary[200],
              color: colors.redAccent[400],
            },
          }}
          onClick={() => {
            onClose?.();
          }}
        >
          <Close fontSize="large" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ paddingY: "10px", marginY: "20px" }}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
  
}

export default DialogContainer2;