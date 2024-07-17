import React, { useState, useEffect } from "react";
import BreadCrumb from "./DeckBreadcrumb";
import { NavLink, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

export default function DeckEdit() {
  const initialDeckData = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  //   Create to pull data from data.json
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeckData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchDeckData();

    return () => abortController.abort();
  }, []);

  const routename = "Edit Deck";

  // Function to handle changes
  const handleDeckChange = (e) => {
    setDeck({
      ...deck,
      [e.target.name]: e.target.value,
    });
  };
  // Function to handle Deck update
  const handleDeckUpdate = (e) => {
    e.preventDefault();
    console.log("Update new deck data");
    updateDeck(deck);
  };
  return (
    <div className="container">
      <BreadCrumb routename={routename} deckId={deckId} deckName={deck.name} />
      <h1>Edit Deck</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="deckname" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="deckname"
            name="name"
            onChange={handleDeckChange}
            aria-describedby="deckname"
            placeholder={deck.name}
            value={deck.name}
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
              name="description"
              onChange={handleDeckChange}
              placeholder={deck.description}
              value={deck.description}></textarea>
          </div>
        </div>
        <NavLink
          to={`/decks/${deckId}`}
          type="submit"
          className="btn btn-secondary mr-2">
          Cancel
        </NavLink>
        <NavLink
          onClick={handleDeckUpdate}
          type="submit"
          className="btn btn-primary">
          Submit
        </NavLink>
      </form>
    </div>
  );
}
