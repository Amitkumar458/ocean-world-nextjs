// import React from 'react'
import useColors from "../../hooks/useColors";
import {
  Box,
  InputBase,
  IconButton,
  InputBaseProps,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import helper from "../../util/helper";
type Props = InputBaseProps & {
  value: string|undefined;
};

const SearchComp = ({ onChange, ...props }: Props) => {
  const colors = useColors();
  const [search, setSearch] = useState<string>((props.value as string) || "");
  const onChangeDebouncer = useMemo(() => helper.debounce(onChange!, 300), [onChange]);  

  return (
    <Box
      sx={{
        display: "flex",
        borderStyle: "solid",
        borderWidth:"1px",
        borderColor: colors.greenAccent[500],
        borderRadius: "3px",
        
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1, }}
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          onChangeDebouncer(e);
        }}
        value={search}
      />
      <IconButton>
        <Search />
      </IconButton>
    </Box>
  );
};

export default SearchComp;
