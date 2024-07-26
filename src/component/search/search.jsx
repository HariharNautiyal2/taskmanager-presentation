import React from "react";
import "./search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search projects..." />
      <SearchOutlinedIcon />
    </div>
  );
};

export default SearchBar;
