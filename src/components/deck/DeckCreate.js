import React from "react";
import BreadCrumb from "./DeckBreadcrumb";
import DeckForm from "./DeckForm";

export default function DeckCreate() {
  const routename = "Create Deck";
  return (
    <div className="container">
      <BreadCrumb routename={routename} />
      <h1>Create Deck</h1>
      <DeckForm />
    </div>
  );
}
