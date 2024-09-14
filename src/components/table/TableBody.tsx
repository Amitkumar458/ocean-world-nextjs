import { resPartnerType, partnersType } from "./const";
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";
import useColors from "../../hooks/useColors";
import ActionComp from "./Action";
import helper from "../../util/helper";

type Props = {
  data: resPartnerType;
  bodyData: partnersType[];
  refetch?: () => Promise<void>;
  selected: readonly number[];
  onView?: (data: any) => void;
  onEdit?: (data: any) => void;
  onDelete?: () => void;
  onActiveInactive?: () => void;
  viewQuery?: string;
  editQuery?: string;
  deleteQuery?: string;
  activeInactiveQuery?: string;
  handleClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
  isSelectionCheckBox?: boolean;
  isViewLoading?: boolean;
  isEditLoading?: boolean;
  isDeleteLoading?: boolean;
  isActiveInactiveLoading?: boolean;
  page: number;
};

const TableBodyComp = ({
  bodyData,
  refetch,
  selected,
  onView,
  onEdit,
  onDelete,
  handleClick,
  data,
  editQuery,
  viewQuery,
  deleteQuery,
  isSelectionCheckBox,
  activeInactiveQuery,
  onActiveInactive,
  isViewLoading,
  isEditLoading,
  isDeleteLoading,
  isActiveInactiveLoading,
  page,
}: Readonly<Props>) => {
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const colors = useColors();

  return (
    <TableBody
      sx={{
        overflow: "scroll",
      }}
    >
      {bodyData?.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            hover
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={`${row.uniqueId}-${index}`}
            // selected={isItemSelected} .. uncomment it to change background color of row on select
            sx={{ cursor: "pointer",height:'40px' }}
          >
            {isSelectionCheckBox && (
              <TableCell
                padding="checkbox"
                sx={{
                  paddingX: "4px",
                }}
              >
                <Checkbox
                  color="success"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                  onClick={(event) => handleClick && handleClick(event, row.id)}
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
                wordWrap: "break-word",
              }}
            >
              {String((page * 10)+(index+1)).padStart(2, "0")}
            </TableCell>
            {data.headers?.map((cell, indx) => {
              return (
                <TableCell
                  align="left"
                  padding="none"
                  key={`${cell.key}-${indx}`}
                  sx={{
                    paddingX: "10px",
                    wordWrap: "break-word",
                    minWidth: `${helper.getWidthByColumnLabel(
                      cell.label
                    )}px !important`,
                    maxWidth: `max-content`,
                  }}
                >
                  {row[cell.key] === "" ? "N/A" : row[cell.key]}
                </TableCell>
              );
            })}
            <ActionComp
              itemId={row.id}
              isSelected={isItemSelected}
              onView={onView?() => {
                onView && onView(row);
              }:undefined}
              onDelete={onDelete}
              onEdit={onEdit?() => {
                onEdit && onEdit(row);
              }:undefined}
              editQuery={editQuery}
              viewQuery={viewQuery}
              isEditLoading={isEditLoading}
              isViewLoading={isViewLoading}
              deleteQuery={deleteQuery}
              activeInactiveQuery={activeInactiveQuery}
              onActiveInactive={onActiveInactive}
              activeInactiveStatus={row[`status`]}
              isActiveInactiveLoading={isActiveInactiveLoading}
              isDeleteLoading={isDeleteLoading}
              refetch={refetch}
            />
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyComp;
