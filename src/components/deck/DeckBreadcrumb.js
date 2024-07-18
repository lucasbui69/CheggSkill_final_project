import React from "react";
import { NavLink } from "react-router-dom";

export default function BreadCrumb({ routename, deck = null }) {
  return (
    <div className="breadcrumb">
      <NavLink to="/" className="ml-1 mr-1">
        {" "}
        <i className="bi bi-house-door-fill"></i> Home
      </NavLink>
      {deck && deck.name ? (
        <div>
          /
          <NavLink to={`/`} className="ml-1 mr-1">
            {" "}
            {deck.name}
          </NavLink>
        </div>
      ) : null}
      <span className="text-secondary ml-1"> / {routename}</span>
    </div>
  );
}
