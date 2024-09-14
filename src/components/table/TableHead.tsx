import { Data, HeadCell } from "./const";
import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "../../types/common";
import useColors from "../../hooks/useColors";
import ColumnWidth from "../../util/ColumnWidth";
import helper from "../../util/helper";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: readonly HeadCell[];
  isSelectionCheckBox?: boolean;
}

export default function TableHeadComp(props: Readonly<EnhancedTableProps>) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    isSelectionCheckBox,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const colors = useColors();
  
  

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: colors.primary[400],
        }}
      >
        {isSelectionCheckBox && (
          <TableCell
            padding="checkbox"
            sx={{
              paddingX: "4px",
              backgroundColor: "inherit",
            }}
          >
            <Checkbox
              color="success"
              // color={`${colors.greenAccent[500]}`}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              sx={{
                color: colors.greenAccent[500],
              }}
            />
          </TableCell>
        )}
        <TableCell
          padding="checkbox"
          sx={{
            paddingX: "10px",
            fontSize: ".9rem",
            fontWeight: "bold",
            backgroundColor: "inherit",
            color: colors.greenAccent[500],
          }}
        >
          S.No.
        </TableCell>
        {props?.headCells?.map((headCell) => (
          <TableCell
            key={headCell.key}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.key ? order : false}
            sx={{
              paddingX: "10px",
              fontSize: ".9rem",
              fontWeight: "600",
              color: colors.greenAccent[500],
              backgroundColor: "inherit",
              minWidth: `${helper.getWidthByColumnLabel(
                headCell.label
              )}px !important`,
              maxWidth: `max-content`,
              wordWrap: "break-word",
            }}
            // width={helper.getWidthByColumnLabel(headCell.label)}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.key ? order : "asc"}
              onClick={createSortHandler(headCell.key)}
              sx={{ textTransform: "capitalize" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          key={`actions-header`}
          align={"left"}
          padding={"normal"}
          sx={{
            paddingX: "4px",
            fontSize: ".9rem",
            fontWeight: "600",
            color: colors.greenAccent[500],
            backgroundColor: "inherit",
            minWidth: `${ColumnWidth.actions}`,
            maxWidth: `max-content`,
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
