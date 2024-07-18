import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api";

export default function DeckForm() {
  const [deck, setDeck] = useState([]);
  const [decks, setDecks] = useState([]);
  const [isSucceed, setIsSucceed] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecksList() {
      try {
        const data = await listDecks(abortController.signal);
        setDecks(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching cardId. There is no cardId found");
        }
      }
    }
    fetchDecksList();
  }, []);
  // Function to handle changes
  const handleChange = (e) => {
    setDeck({
      ...deck,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle Deck update
  let newDeckId = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    createDeck(deck);
    setIsSucceed(!isSucceed);
    // return to main view
    newDeckId = decks.length + 1;
    console.log("New DECKID", newDeckId);
    window.location = `/decks/${newDeckId}`;
  };

  return (
    <div className="card">
      <div className="card-tile">
        {isSucceed ? (
          <div className="alert alert-success" role="alert">
            New Deck created successfully !
          </div>
        ) : null}
      </div>
      <br />
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="deck_name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="deck_name"
              name="name"
              onChange={handleChange}
              aria-describedby="deckname"
              placeholder="Deck Name"
              value={deck.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deck_description" className="form-label">
              Description
            </label>
            <div className="input-group">
              <textarea
                id="deck_description"
                className="form-control"
                aria-label="With textarea"
                name="description"
                onChange={handleChange}
                placeholder="Brief description of the deck"
                value={deck.description}></textarea>
            </div>
          </div>
          <NavLink to={`/`} type="submit" className="btn btn-secondary mr-2">
            Cancel
          </NavLink>
          <NavLink
            onClick={handleSubmit}
            to={`/decks/${newDeckId}`}
            type="submit"
            className="btn btn-primary">
            Submit
          </NavLink>
        </form>
      </div>
    </div>
  );
}
