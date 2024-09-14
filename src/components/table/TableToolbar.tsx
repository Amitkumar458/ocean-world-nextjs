import { Toolbar, Typography, IconButton } from "@mui/material";
import useColors from "../../hooks/useColors";
import { Delete, AddCircleOutlineRounded } from "@mui/icons-material";
import CircularProgressComp from "../circularProgressComp";
import SearchComp from "../search";
import { AutocompleteContainerWithOptions } from "../autocomplete";
import { HeadCell } from "./const";
import { AutocompleteOption } from "../../types/common";
import { WarnningAlert } from "../../util/alert";
/**
 * Table Toolbar
 */
interface TableToolbarProps {
  numSelected: number;
  tableLable?: string;
  onDelteMany?: (cb?: () => void) => void;
  isViewLoading?: boolean;
  isEditApiLoading?: boolean;
  isDeleteApiLoading?: boolean;
  header: readonly HeadCell[];
  onSearchChange?: (searchContent: string) => void;
  onColSelect?: (col: AutocompleteOption | null) => void;
  search?: string;
  selectedCol?: AutocompleteOption | null;
  onAdd?: ()=> void;
  isAddApiLoading?: boolean;
}

export default function TableToolbar(props: Readonly<TableToolbarProps>) {
  const { numSelected } = props;
  const colors = useColors();

  const ColSelectOptions: AutocompleteOption[] = props.header?.map(
    (item, _) => {
      const col = {
        id: item.id,
        title: item.label,
      } as AutocompleteOption;
      return col;
    }
  );

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // ...(numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(
        //       theme.palette.primary.main,
        //       theme.palette.action.activatedOpacity
        //     ),
        // }),
        borderStyle: "solid",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderColor: colors.grey[500],
        borderBottomWidth: "1px",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.tableLable ?? ""}
        </Typography>
      )}

      <SearchComp
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          props.onSearchChange && props.onSearchChange(e.target.value);
        }}
        value={props.search}
      />

      <AutocompleteContainerWithOptions
        label="Filter"
        name="filter"
        onChange={(_, val) => {
          if (val) {
            const findCol = props.header.find((item) => item.id === val.id);
            props.onColSelect &&
              props.onColSelect({
                id: findCol?.id,
                key: findCol?.key,
              } as AutocompleteOption);
          } else {
            props.onColSelect && props.onColSelect(null);
          }
        }}
        options={ColSelectOptions}
        getOptionLabel={(opt) =>
          typeof opt === "string" ? opt : (opt.title as string)
        }
        sx={{ minWidth: "200px", marginLeft: "5px" }}
        BoxSx={{
          // "& label": {
          //   color: "red", // change the label color of input component
          // },
          "& label.Mui-focused": {
            color: colors.greenAccent[500], // color of label when input box is focused
          },
          // "& .MuiInput-underline:after": {
          //   borderBottomColor: "yellow",
          // },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.greenAccent[500],
            },
            "&:hover fieldset": {
              borderColor: colors.greenAccent[500],
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.greenAccent[500],
            },
          },
        }}
      />

      {props.onAdd ? (
        <IconButton
          onClick={() => {
            props.onAdd && props.onAdd();
          }}
          sx={{
            marginLeft: "4px",
            borderRadius: "24px",
            color: colors.greenAccent[500],
          }}
        >
          {props.isAddApiLoading ? (
            <CircularProgressComp />
          ) : (
            <AddCircleOutlineRounded
              fontSize="large"
              sx={{ color: colors.greenAccent[500] }}
            />
          )}
          Add
        </IconButton>
      ) : null}

      {props.onDelteMany ? (
        <IconButton
          onClick={() => {
            WarnningAlert("Are you sure to delete?", () => {
              if (numSelected) props.onDelteMany && props.onDelteMany();
            });
          }}
          sx={{
            color: colors.redAccent[500],
            marginLeft: "4px",
            borderRadius: "24px",
          }}
          disabled={props.isDeleteApiLoading || numSelected <= 1}
        >
          {props.isDeleteApiLoading ? (
            <CircularProgressComp />
          ) : (
            <Delete fontSize="large" />
          )}
          Delete
        </IconButton>
      ) : null}
    </Toolbar>
  );
}
