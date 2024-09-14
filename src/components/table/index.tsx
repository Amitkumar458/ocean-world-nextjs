import React, { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import useColors from "../../hooks/useColors";
import { Data, HeadCell, reqPartnerType, resPartnerType } from "./const";
import { AutocompleteOption, Order } from "../../types/common";
import TableHeadComp from "./TableHead";
import TableToolbar from "./TableToolbar";
import LottieSpinner from "../spinner";
import animationData from "../spinner/animation.json";
import { AdminProgramCodes } from "../../util/routeConstants/admin/codes";
import { HospitalReceptionProgramCode } from "../../util/routeConstants/hospitalReception/codes";
import { useQuery, useQueryClient } from "react-query";
import api, { ApiError, ApiResponse } from "../../api";
import PageLayout from "../../layouts/pageLayout";
import TableBodyComp from "./TableBody";

/**
 * Table Component
 */
type TableProps = {
  cells?: readonly HeadCell[];
  rows?: Data[];
  tableLabel?: string;
  onSelectRow?: (row: any[]) => void;
  onEdit?: (data: any) => void;
  onDelete?: () => void;
  onView?: (data: any) => void;
  onActiveInactive?: () => void;
  onDeleteMany?: (cb?: () => void) => void;
  isDeleteApiLoading?: boolean;
  tableQuery?: string;
  viewQuery?: string;
  deleteQuery?: string;
  eidtQuery?: string;
  activeInactiveQuery?: string;
  dataKey: string;
  programCode?: keyof AdminProgramCodes | keyof HospitalReceptionProgramCode;
  isSelectionCheckBox?: boolean;
  isViewLoading?: boolean;
  isEditLoading?: boolean;
  isDeleteLoading?: boolean;
  isActiveInactiveLoading?: boolean;
  onAdd?: () => void;
  isAddApiLoading?: boolean;
  additionalParameter?: any;
  additionalComponent?: ReactNode;
};

export default function ListTableComp({
  rows,
  dataKey,
  viewQuery,
  eidtQuery,
  deleteQuery,
  activeInactiveQuery,
  onView,
  onEdit,
  onDelete,
  onActiveInactive,
  isSelectionCheckBox,
  isViewLoading,
  isEditLoading,
  isActiveInactiveLoading,
  isDeleteLoading,
  onAdd,
  isAddApiLoading,
  additionalParameter,
  additionalComponent,
  ...props
}: Readonly<TableProps>) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data | string>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [search, setSearch] = useState<string>("");
  const [searchCol, setSearchCol] = useState<keyof Data | string>("");
  const colors = useColors();

  const queryClient = useQueryClient();
  // call all the table related api here.....
  type KeyType = [string, reqPartnerType];
  let filterItem: any;
  if (searchCol) {
    const mod = "%";
    filterItem = [
      `${(searchCol as string) || "id"}`,
      "LIKE",
      `${mod}${search}${mod}`,
    ];
  }
  const payload = {
    search: search,
    sort: {
      attributes: [orderBy as string],
      sorts: [order],
    },
    filters: filterItem ? [filterItem] : [],
    pageNo: page + 1,
    itemsPerPage: 10,
    programCode: props.programCode,
    ...additionalParameter
  };

  const { data } = useQuery<
    ApiResponse<resPartnerType>,
    ApiError,
    resPartnerType,
    KeyType
  >(
    [`${props.tableQuery}`, payload],
    ({ queryKey: [url, data] }) => {
      return api.post(url, data).then((data) => data.data);
    },
    {
      keepPreviousData: true,
      staleTime: 0,
      // refetchOnWindowFocus: true,
    }
  );

  const Refetch = () => {
    return queryClient.invalidateQueries([`${props.tableQuery}`, payload]);
  };

  // method to change sort order asc or desc
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // partern selector to get list of selected partners to perfome actions
  const RowItemSelector = (selectedIds: readonly number[]) => {
    const selectedRows: Data[] = [];
    for (const selecteId of selectedIds) {
      const matchedRow = data?.body.find((item) => item.id === selecteId);
      if (matchedRow) selectedRows.push(matchedRow);
    }
    props.onSelectRow && props.onSelectRow(selectedRows);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data?.body.map((n) => n.id);
      setSelected(newSelected || []);
      RowItemSelector(newSelected || []);
      return;
    }
    setSelected([]);
    RowItemSelector([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    RowItemSelector(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <PageLayout sx={{ width: "100%" }}>
      {additionalComponent ?? null}
      {!data ? (
        <Box sx={{ position: "absolute", top: "30%", left: "40%" }}>
          <LottieSpinner animationData={animationData} />
        </Box>
      ) : (
        <Paper
          sx={{
            height: "auto",
            width: "auto",
            maxWidth: "100%",
            mb: 2,
            backgroundColor: colors.primary[400],
            overflow: "hidden",
          }}
        >
          <TableToolbar
            numSelected={selected.length}
            tableLable={props.tableLabel}
            onDelteMany={props.onDeleteMany}
            isDeleteApiLoading={props.isDeleteApiLoading}
            header={data.headers}
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
            }}
            onColSelect={(col) => {
              setSearchCol((col as AutocompleteOption)?.key || "");
            }}
            onAdd={onAdd}
            isAddApiLoading={isAddApiLoading}
          />
          <TableContainer sx={{ maxHeight: "fit-content" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHeadComp
                headCells={data.headers}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy as string}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.body ? data.body.length : 0}
                isSelectionCheckBox={isSelectionCheckBox}
              />
              <TableBodyComp
                bodyData={data.body}
                selected={selected}
                data={data}
                viewQuery={viewQuery}
                editQuery={eidtQuery}
                deleteQuery={deleteQuery}
                activeInactiveQuery={activeInactiveQuery}
                onActiveInactive={onActiveInactive}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                handleClick={handleClick}
                isSelectionCheckBox={isSelectionCheckBox}
                isActiveInactiveLoading={isActiveInactiveLoading}
                isEditLoading={isEditLoading}
                isViewLoading={isViewLoading}
                isDeleteLoading={isDeleteLoading}
                refetch={Refetch}
                page={page}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={data.totalCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage=""
          />
        </Paper>
      )}
    </PageLayout>
  );
}
