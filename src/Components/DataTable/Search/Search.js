import React, { useState } from "react";

import "./style.css";

const Search = ({ searchCallback }) => {
  const [q, setQ] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setQ(e.target.value);
    searchCallback(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder=" Search..."
        onChange={onChange}
        type="text"
        name="query"
        id="query"
        value={q}
      />
    </div>
  );
};

export default Search;
