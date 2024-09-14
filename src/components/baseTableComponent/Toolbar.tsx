import { Box, Typography } from "@mui/material";
import useColors from "../../hooks/useColors";
import { AutocompleteOption } from "../../types/common";
import SearchComp from "../search";
import { AutocompleteContainerWithOptions } from "../autocomplete";

type Props = {
  tableTitle: string;
  onSelect?: (val: AutocompleteOption|null) => void;
  onSearch?: (val: string) => void;
  header: any[];
  search: string;
};

const BaseTableToolbar = ({
  tableTitle,
  header,
  search,
  onSearch,
  onSelect
}: Readonly<Props>) => {
  const colors = useColors();

  const ColSelectionOption: AutocompleteOption[] = header.map((item) => {
    return { id: item.id, title: item.label } as AutocompleteOption;
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `2px solid ${colors.grey[200]}`,
        paddingX: "10px",
      }}
    >
      <Typography sx={{ fontWeight: "500", fontSize: "1.1rem" }}>
        {tableTitle ?? ""}
      </Typography>
      <Box sx={{ display: "flex", padding: "5px" }}>
        <SearchComp
          value={search}
          onChange={(evt) => {
            onSearch && onSearch(evt.target.value);
          }}
        />

        <AutocompleteContainerWithOptions
          label="Filter"
          name="filter"
          onChange={(_, val) => {
            if (val) {
              const findCol = header.find((item) => item.id === val.id);
              onSelect &&
                onSelect({
                  id: findCol?.id,
                  key: findCol?.key,
                } as AutocompleteOption);
            } else {
              onSelect && onSelect(null);
            }
          }}
          options={ColSelectionOption}
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
      </Box>
    </Box>
  );
};

export default BaseTableToolbar;
