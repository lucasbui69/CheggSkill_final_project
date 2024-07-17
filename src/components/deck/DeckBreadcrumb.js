import React from "react";
import { NavLink } from "react-router-dom";

export default function BreadCrumb({
  routename,
  deckId = null,
  deckName = null,
}) {
  return (
    <div className="breadcrumb">
      <NavLink to="/" className="ml-1 mr-1">
        {" "}
        <i className="bi bi-house-door-fill"></i> Home
      </NavLink>
      {deckName ? (
        <div>
          /
          <NavLink to={`/`} className="ml-1 mr-1">
            {" "}
            {deckName}
          </NavLink>
        </div>
      ) : null}
      <span className="text-secondary ml-1"> / {routename}</span>
    </div>
  );
}
