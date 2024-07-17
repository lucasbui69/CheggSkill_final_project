import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import BreadCrumb from "../deck/DeckBreadcrumb";
import { readCard, readDeck, updateCard } from "../../utils/api";

export default function CardEdit() {
  const { deckId, cardId } = useParams();
  const [cardData, setCardData] = useState([]);
  const [deck, setDeckData] = useState([]);
  const routename = `Edit Card ${cardId}`;
  const navigate = useNavigate();

  // loading card data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeckData() {
      try {
        const data = await readCard(cardId, abortController.signal);
        const deckData = await readDeck(deckId);
        setCardData(data);
        setDeckData(deckData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchDeckData();

    return () => abortController.abort();
  }, [deckId, cardId]);

  // Function to hanlde card changes
  const handleCardChange = (e) => {
    e.preventDefault();
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle Card Update
  const handleCardUpdate = (e) => {
    e.preventDefault();
    console.log("Update new Card data");
    console.log(cardData);
    updateCard(cardData);
    navigate(`/decks/${deck.id}`);
  };
  return (
    <div className="container">
      <BreadCrumb
        routename={routename}
        deckId={deckId}
        deckName={`Deck ${deck.name}`}
      />
      <h1>Edit Card</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="card-front" className="form-label">
            Front
          </label>
          <textarea
            type="name"
            className="form-control"
            id="card-front"
            name="front"
            onChange={handleCardChange}
            aria-describedby="deckname"
            value={cardData.front}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="card-back" className="form-label">
            Back
          </label>
          <div className="input-group">
            <textarea
              id="card-back"
              className="form-control"
              aria-label="With textarea"
              name="back"
              onChange={handleCardChange}
              value={cardData.back}></textarea>
          </div>
        </div>
        <NavLink
          to={`/decks/${deckId}`}
          type="submit"
          className="btn btn-secondary mr-2">
          Cancel
        </NavLink>
        <NavLink
          onClick={handleCardUpdate}
          type="submit"
          className="btn btn-primary">
          Submit
        </NavLink>
      </form>
    </div>
  );
}
