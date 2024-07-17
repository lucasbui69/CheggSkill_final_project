import React, { useState, useEffect } from "react";
import BreadCrumb from "./DeckBreadcrumb";
import { NavLink } from "react-router-dom";
import { listDecks } from "../../utils/api";

export default function DeckCreate() {
  const [decks, setDecks] = useState([]);

  //   Create to pull data from data.json
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecks() {
      try {
        const data = await listDecks(abortController.signal);
        setDecks(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchDecks();

    return () => abortController.abort();
  }, []);

  const routename = "Create Deck";
  return (
    <div className="container">
      <BreadCrumb routename={routename} />
      <h1>Create Deck</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="deckname" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="deckname"
            aria-describedby="deckname"
            placeholder="Deck Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deckdescription" className="form-label">
            Description
          </label>
          <div className="input-group">
            <textarea
              id="deckdescription"
              className="form-control"
              aria-label="With textarea"
              placeholder="Brief description of the deck"></textarea>
          </div>
        </div>
        <NavLink to="/" type="submit" className="btn btn-secondary mr-2">
          Cancel
        </NavLink>
        <NavLink
          to={`/decks/${decks.length + 1}`}
          type="submit"
          className="btn btn-primary">
          Submit
        </NavLink>
      </form>
    </div>
  );
}
