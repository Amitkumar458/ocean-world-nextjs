import {
  SxProps,
  Theme,
  ListSubheader,
  ListItemText,
  List,
  ListItemButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { StringOrNumber } from "../../types/common";
import useColors from "../../hooks/useColors";
import { useMemo, useState } from "react";
import helper from "../../util/helper";

type ListItemType = {
  [key: string]: StringOrNumber;
};

type ListCompProps = {
  headerList: string[];
  bodyList: ListItemType[];
  columList?: string[];
  BoxSX?: SxProps<Theme>;
  onSelect?: (row: ListItemType) => void;
  onSearch?: (search:string) => void;
};

type ListHeaderType = {
  headerList: string[];
};

type ListBodyType = {
  rows: ListItemType[];
  columList?: string[];
  onSelect?: (row: ListItemType) => void;
};

const ListHeader = ({ headerList }: Readonly<ListHeaderType>) => {
  const colors = useColors();
  return (
    <ListSubheader
      sx={{
        display: "flex",
        borderBottom: `1px solid ${colors.grey[200]}`,
        padding: "5px",
        paddingY:"10px",
        bgcolor: `${colors.greenV2Accent[50]}`,
      }}
    >
      {headerList.map((headerText) => (
        <Typography
          key={headerText}
          sx={{ width: "200px", fontWeight: "600", fontSize: ".9rem" }}
        >
          {headerText}
        </Typography>
      ))}
    </ListSubheader>
  );
};

const ListBody = ({ rows, columList, onSelect }: Readonly<ListBodyType>) => {
  const [selected, setSelected] = useState<number | null>(null);
  const colors = useColors();
  return (
    <>
      <></>
      {rows.map((row, index) => {
        return (
          <ListItemButton
            key={row?.id}
            sx={{
              // bgcolor: `${colors.primary[600]}`,
              ":hover": {
                backgroundColor: `${colors.primary[700]}`,
              },
              ".Mui-selected": {
                backgroundColor: `${colors.primary[700]} !important`,
              },
            }}
            onClick={() => {
              setSelected(index);
              onSelect && onSelect(row);
            }}
            selected={index === selected}
          >
            {columList?.map((item) => (
              <ListItemText key={item} sx={{ width: "200px" }}>
                {row[item]}
              </ListItemText>
            ))}
          </ListItemButton>
        );
      })}
    </>
  );
};

const ListComp = ({
  headerList,
  bodyList,
  columList,
  BoxSX,
  onSelect,
  onSearch
}: Readonly<ListCompProps>) => {
  const colors = useColors();
  const [search, setSearch] = useState<string>("");
  const onChangeDebouncer = useMemo(() => helper.debounce((e)=>{onSearch&&onSearch(e.target.value)}, 300), [onSearch]);

  return (
    <Box sx={{ display: "flex", height: "100%", ...BoxSX }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: `${colors.primary[600]}`,
          position: "relative",
          overflow: "auto",
          maxHeight: "auto",
          height: "100%",
          padding: "0px",
          borderRadius: "5px",
          ...BoxSX,
        }}
      >
        <TextField
          fullWidth
          placeholder="search..."
          sx={{
            // border: "1px solid red",
            borderRadius: "5px",
            backgroundColor:colors.primary[200],
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.greenAccent[400],
                borderWidth: "1px",
                
              },
              "&:hover fieldset": {
                borderColor: colors.greenAccent[400],
                borderWidth: "1px",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[400],
                borderWidth: "1px",
              },
            },
          }}
          value={search}
          onChange={(evt) => {
            setSearch(evt.target.value);
            onChangeDebouncer(evt);
          }}
          autoComplete="off"
        />
        <ListHeader headerList={headerList} />
        <ListBody rows={bodyList} columList={columList} onSelect={onSelect} />
      </List>
    </Box>
  );
};

export default ListComp;