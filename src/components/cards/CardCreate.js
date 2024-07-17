import React, { useState, useEffect } from "react";
import BreadCrumb from "../deck/DeckBreadcrumb";
import { useParams, NavLink } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api";

export default function CardCreate() {
  const initialCardData = {
    front: "",
    back: "",
  };
  const routename = "Add Card";
  const [deck, setDeck] = useState([]);
  const [cardData, setCardData] = useState({ ...initialCardData });
  const { deckId } = useParams();

  //   Create to pull data from data.json
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeckData() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchDeckData();

    return () => abortController.abort();
  }, [deckId]);

  // Handle card input
  const handleCardInput = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  // Car creation
  const handleCardCreate = (e) => {
    e.preventDefault();
    cardData.id = deck.cards.length + 1;
    cardData.deckId = deck.id;
    console.log("Adding new card data: \n", cardData);
    updateCard(cardData);
    // Restart the form
    setCardData({ ...initialCardData });
  };
  return (
    <div className="container">
      <BreadCrumb routename={routename} deckId={deckId} deckName={deck.name} />
      <h3>Add Card</h3>
      <h3>{deck.name}: Add Card</h3>

      <form>
        <div className="mb-3">
          <label htmlFor="card-front" className="form-label">
            Front
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="card-front"
            name="front"
            onChange={handleCardInput}
            aria-describedby="cardfront"
            placeholder="Front side of card"
            value={cardData.front}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="card-back" className="form-label">
            Back
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="card-back"
            name="back"
            onChange={handleCardInput}
            aria-describedby="cardback"
            placeholder="Back side of card"
            value={cardData.back}
          />
        </div>
        <NavLink
          to={`/decks/${deckId}`}
          type="submit"
          className="btn btn-secondary mr-2">
          Done
        </NavLink>
        <NavLink
          onClick={handleCardCreate}
          type="submit"
          className="btn btn-primary">
          Save
        </NavLink>
      </form>
    </div>
  );
}
