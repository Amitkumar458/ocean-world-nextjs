import { TableCell, Box, IconButton, Typography } from "@mui/material";
import CircularProgressComp from "../circularProgressComp";
import useColors from "../../hooks/useColors";
import ActiveInactiveButton from "./ActiveInactiveButton";

import { Edit, Delete, RemoveRedEye } from "@mui/icons-material";

import { useCrudApi } from "../../hooks/apis";
import {
  DeleteQueryReqType,
  ActiveInactiveType,
} from "./const";
import { WarnningAlert } from "../../util/alert";

type Props = {
  itemId: number;
  isSelected: boolean;
  editQuery?: string;
  viewQuery?: string;
  onEdit?: (data: any) => void;
  onDelete?: () => void;
  onView?: (data: any) => void;
  onActiveInactive?: () => void;
  activeInactiveStatus?: string;
  activeInactiveQuery?: string;
  deleteQuery?: string;
  isViewLoading?: boolean;
  isEditLoading?: boolean;
  isDeleteLoading?: boolean;
  isActiveInactiveLoading?: boolean;
  refetch?: () => Promise<void>;
};

const ActionComp = (props: Readonly<Props>) => {
  const colors = useColors();

  const deleteQuery = useCrudApi<DeleteQueryReqType, any>(
    "post",
    `${props.deleteQuery ?? ""}`
  );
  const ActiveInactiveQuery = useCrudApi<ActiveInactiveType, any>(
    "post",
    `${props.activeInactiveQuery ?? ""}`
  );

  const handleActiveInactive = () => {
    ActiveInactiveQuery.mutate(
      {
        mode: "STATUS",
        ids: [props.itemId],
      },
      {
        onSuccess() {
          // refetch the table query for updated data and call the call back method for additon task
          props.refetch?.();
          props.onActiveInactive?.();
        },
      }
    );
  };

  const handleDelete = () => {
    WarnningAlert("Are you sure to delete?", () => {
      deleteQuery.mutate(
        {
          ids: [props.itemId],
        },
        {
          onSuccess() {
            // refetch the table query for updated data and call the call back method for additon task
            props.refetch?.();
            props.onDelete?.();
          },
        }
      );
    })
  };
  

  return (
    <TableCell
      align="left"
      padding="none"
      sx={{
        paddingX: "4px",
      }}
    >
      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
        {props.onView ? (
          <IconButton
            sx={{
              color: colors.greenAccent[500],
              borderRadius: "24px",
            }}
            onClick={props.onView}
          >
            {props.isViewLoading ? <CircularProgressComp /> : <RemoveRedEye />}{" "}
            <Typography
              sx={{ fontSize: ".8rem", marginLeft: "5px", fontWeight: "500" }}
            >
              View
            </Typography>
          </IconButton>
        ) : null}

        {props.onEdit ? (
          <IconButton
            sx={{
              color: colors.greenAccent[500],
              marginLeft: "10px",
              borderRadius: "24px",
            }}
            onClick={props.onEdit}
          >
            {props.isEditLoading ? <CircularProgressComp /> : <Edit />}{" "}
            <Typography
              sx={{ fontSize: ".8rem", marginLeft: "5px", fontWeight: "500" }}
            >
              Edit
            </Typography>
          </IconButton>
        ) : null}

        {props.deleteQuery ? (
          <IconButton
            sx={{
              color: colors.redAccent[500],
              marginLeft: "10px",
              borderRadius: "24px",
            }}
            onClick={handleDelete}
          >
            {deleteQuery.isLoading ? <CircularProgressComp /> : <Delete />}
            <Typography
              sx={{ fontSize: ".8rem", marginLeft: "5px", fontWeight: "500" }}
            >
              Delete
            </Typography>
          </IconButton>
        ) : null}

        {props.activeInactiveQuery ? (
          <ActiveInactiveButton
            activeInactiveStatus={
              props.activeInactiveStatus as "active" | "suspended"
            }
            isActiveInactiveLoading={ActiveInactiveQuery.isLoading}
            onActiveInactive={handleActiveInactive}
          />
        ) : null}
      </Box>
    </TableCell>
  );
};

export default ActionComp;
