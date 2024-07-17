import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function CardList({ cards }) {
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  // Function to handle when user flip the card
  const handleFlipped = (e) => {
    e.preventDefault();
    setFlipped(!flipped);
  };

  // Function to move to the next Card ID
  const handleNextCard = () => {
    if (cardIndex === cards.length - 2) {
      const isRestart = window.confirm(
        "Restart cards ?\n\nClick `cancel` to return to the home page."
      );

      if (isRestart) {
        setCardIndex(0);
        setFlipped(!flipped);
      }
    } else {
      setCardIndex((prevIndex) => prevIndex + 1);
      setFlipped(!flipped);
    }
  };

  // Set current card
  console.log(cards.length);
  let currentCard = null;
  if (cards.length > 2) {
    currentCard = cards[cardIndex];
  }

  return (
    <div>
      {currentCard ? (
        <div
          className="card shadow-sm mb-3"
          style={{ width: 40 + "rem" }}
          key={currentCard.id}>
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {cards.length}
            </h5>
            {flipped ? (
              <p className="card-text">{currentCard.back}</p>
            ) : (
              <p className="text-primary card-text">{currentCard.front}</p>
            )}

            <button className="btn btn-secondary" onClick={handleFlipped}>
              Flip
            </button>
            <span> </span>
            {flipped ? (
              <NavLink
                href="#"
                className="btn btn-primary"
                onClick={handleNextCard}>
                Next
              </NavLink>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <NavLink to="/cards/new" className="btn btn-primary">
            <i className="bi bi-plus-square-fill"></i> Add Cards
          </NavLink>
        </div>
      )}
    </div>
  );
}
