import { Typography, InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

function FilterSearch(props) {

  return (
    <>
 
        <TextField
          type="text"
          id="filter-text-box"
          placeholder="Search..."
          onInput={props.onFilterTextBoxChanged}
          size="small"
          // to have the search icon in the input field
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

    </>
  );
}

export default FilterSearch;
