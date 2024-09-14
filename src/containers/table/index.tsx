// import * as React from "react";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// // import FormControlLabel from "@mui/material/FormControlLabel";
// // import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { Edit } from "@mui/icons-material";
// import { visuallyHidden } from "@mui/utils";
// import { colorToken } from "../../themes";
// import { useTheme } from "@mui/material";
// import CircularProgressComp from "../../components/circularProgressComp";

// export interface Data {
//   [key: string]: any;
// }

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// export type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // with exampleArray.slice().sort(exampleComparator)

// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number
// ) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// export interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }




// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
//   headCells: readonly HeadCell[];
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         {props.headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "left" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }






// /**
//  * Table Toolbar
//  */
// interface EnhancedTableToolbarProps {
//   numSelected: number;
//   tableLable?: string;
//   onEdit?: () => void;
//   onDelte?: () => void;
//   isEditApiLoading?: boolean;
//   isDeleteApiLoading?: boolean;
// }

// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//   const { numSelected } = props;
//   const theme = useTheme();
//   const colors = colorToken(theme.palette.mode);
//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           {props.tableLable || ""}
//         </Typography>
//       )}

//       <Tooltip title="Filter list">
//         <IconButton>
//           <FilterListIcon />
//         </IconButton>
//       </Tooltip>

//       <Tooltip title="Edit">
//         <IconButton
//           onClick={() => {
//             if (numSelected === 1) props.onEdit && props.onEdit();
//           }}
//           sx={{ color: colors.greenAccent[400] }}
//           disabled={props.isEditApiLoading || numSelected !== 1}
//         >
//           {props.isEditApiLoading ? <CircularProgressComp /> : <Edit />}
//         </IconButton>
//       </Tooltip>

//       <Tooltip title="Delete">
//         <IconButton
//           onClick={() => {
//             if (numSelected) props.onDelte && props.onDelte();
//           }}
//           sx={{ color: colors.redAccent[400] }}
//           disabled={props.isDeleteApiLoading || numSelected <= 0}
//         >
//           {props.isDeleteApiLoading ? <CircularProgressComp /> : <DeleteIcon />}
//         </IconButton>
//       </Tooltip>
//     </Toolbar>
//   );
// }








// /**
//  * Table Component
//  */
// type TableProps = {
//   cells: readonly HeadCell[];
//   rows: Data[];
//   tableLabel?: string;
//   onSelectPartner?: (row: any[]) => void;
//   onEdit?: () => void;
//   onDelete?: () => void;
//   isEditApiLoading?: boolean;
//   isDeleteApiLoading?: boolean;
// };

// export default function ListTable({ cells, rows, ...props }: TableProps) {
//   const [order, setOrder] = React.useState<Order>("asc");
//   const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
//   const [selected, setSelected] = React.useState<readonly number[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const theme = useTheme();
//   const colors = colorToken(theme.palette.mode);

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

  
//   // partern selector 
//   const partnerSelector = (selectedIds: readonly number[]) => {
//      const selectedRows: Data[] = [];
//      for (const selecteId of selectedIds) {
//        const matchedRow = rows.find((item) => item.id === selecteId);
//        if (matchedRow) selectedRows.push(matchedRow);
//      }
//      props.onSelectPartner && props.onSelectPartner(selectedRows);
//   }
  
  
  
//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       partnerSelector(newSelected);
//       return;
//     }
//     setSelected([]);
//     partnerSelector([]);
//   };

//   const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected: readonly number[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
    
//     partnerSelector(newSelected);
    
//     // if (newSelected.length === 1) {
//     //   const selectedRow = rows.find((item) => item.id === newSelected[0]);
//     //   console.log(selectedRow);
//     //   props.onSelectPartner && props.onSelectPartner(selectedRow!);
//     // }
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id: number) => selected.indexOf(id) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       stableSort(rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       ),
//     [order, orderBy, page, rowsPerPage]
//   );

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Paper sx={{ width: "100%", mb: 2, backgroundColor: colors.primary[400] }}>
//         <EnhancedTableToolbar
//           numSelected={selected.length}
//           tableLable={props.tableLabel}
//           onEdit={props.onEdit}
//           onDelte={props.onDelete}
//           isDeleteApiLoading={props.isDeleteApiLoading}
//           isEditApiLoading={props.isEditApiLoading}
//         />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? "small" : "medium"}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy as string}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//               headCells={cells}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = isSelected(row.id as number);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id as number)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: "pointer" }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           "aria-labelledby": labelId,
//                         }}
//                       />
//                     </TableCell>
//                     {cells.map((cell, indx) => {
//                       return (
//                         <TableCell
//                           align="left"
//                           padding="none"
//                           key={`${cell.id}.${indx}`}
//                         >
//                           {row[cell.id]}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//               {/* {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={cells.length + 1} />
//                 </TableRow>
//               )} */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           // onRowsPerPageChange={handleChangeRowsPerPage}
//           labelRowsPerPage
//         />
//       </Paper>
//       {/* <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       /> */}
//     </Box>
//   );
// }
