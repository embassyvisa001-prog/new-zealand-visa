import React from "react";
import Navbar from "./header/Navbar";
import NavigationMenu from "./header/NavigationMenu";
import "../styles/Head.css";

function Head({ searchQuery, setSearchQuery, onSearchSubmit, onLoginClick }) {
  return (
    <div className="head-shell">
      <Navbar onLoginClick={onLoginClick} />
      <NavigationMenu
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={onSearchSubmit}
      />
    </div>
  );
}

export default Head;
