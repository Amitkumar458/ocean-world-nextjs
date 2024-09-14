import React from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useColors from "../../hooks/useColors";
import { Theme, SxProps } from "@mui/material";


import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";


type TableProps = {
  columns: any[];
  data: any[];
  tableHeadCellSx?: SxProps<Theme>;
  tableBodyCellSx?: SxProps<Theme>;
  tableContainer?: SxProps<Theme>;
  tableHeadRowSx?: SxProps<Theme>;
  tableBodyRowSx?: SxProps<Theme>;
};

const BaseTableComp = ({
  columns,
  data,
  tableBodyCellSx,
  tableHeadCellSx,
  tableContainer,
  tableHeadRowSx,
  tableBodyRowSx
}: Readonly<TableProps>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const colors = useColors();

  return (
    <TableContainer sx={{ ...tableContainer }}>
      <Table sx={{ backgroundColor: `${colors.primary[400]}` }} stickyHeader>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={`TableHead.${headerGroup.id}`}
              sx={{ ...tableHeadRowSx }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell
                    key={`tableCell.${headerGroup.id}.${header.id}`}
                    colSpan={header.colSpan}
                    sx={{
                      padding: "10px",
                      width: `${header.getSize()}px`,
                      fontWeight: "bold",
                      backgroundColor: `${colors.primary[200]}`,
                      borderBottom: `2px solid ${colors.grey[100]}`,
                      // borderWidth: "1px",
                      // borderStyle: "solid",
                      // borderColor: `${colors.grey[400]}`,
                      ...tableHeadCellSx,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                ...tableBodyRowSx,
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{
                    padding: "0px",
                    fontSize:".8rem",
                    // borderWidth: "1px",
                    // borderStyle: "solid",
                    // borderColor: `${colors.grey[400]}`,
                    ...tableBodyCellSx,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(BaseTableComp);
