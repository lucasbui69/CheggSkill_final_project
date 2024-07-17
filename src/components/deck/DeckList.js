import React from "react";
import { NavLink } from "react-router-dom";

export default function DeckList({ decks, handleDelete }) {
  // console.log(decks);
  return (
    <div>
      <NavLink to="decks/new" className="btn btn-secondary">
        <i className="bi bi-plus-square-fill"></i> Create New
      </NavLink>
      {decks &&
        decks.map((deck) => (
          <div key={deck.id} className="card shadow deck-list mt-2 bg-gray">
            <div className="card-body">
              <h4 className="card-title">
                {deck.name}
                <span className="float-right disabled gray-text">
                  {deck.cards.length} cards
                </span>
              </h4>
              <p className="card-text">{deck.description}</p>

              <NavLink to={`/decks/${deck.id}`} className="btn btn-secondary">
                <i className="bi bi-eye"></i> View
              </NavLink>
              <span> </span>
              {/* Study desks */}
              <NavLink
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary">
                <i className="bi bi-journal-bookmark-fill"></i>
                Study
              </NavLink>
              {/* Delete Post Route */}
              <button
                onClick={() => handleDelete(deck.id)}
                className="btn btn-danger float-right">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
