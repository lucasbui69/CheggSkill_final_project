import React from "react";
import { NavLink } from "react-router-dom";

export default function CardView({ cards, handleDeleteCard, deckId }) {
  return (
    <div>
      {cards &&
        cards.map((card) => (
          <div
            className="card shadow-sm mb-3"
            style={{ width: 40 + "rem" }}
            key={card.id}>
            <div className="card-body">
              <div className="row align-items-start card-text">
                <div className="col">{card.front}</div>
                <div className="col">
                  {card.back}
                  <br />
                  <p className="float-right mt-4">
                    <NavLink
                      to={`/decks/${deckId}/cards/${card.id}/edit`}
                      className="btn btn-secondary mr-2">
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="btn btn-danger float-right">
                      {" "}
                      <i className="bi bi-trash"></i>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
