import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { updateCard, createCard, readDeck, readCard } from "../../utils/api";

export default function CardForm({ deckId, cardId = null }) {
  const [deck, setDeck] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isSucceed, setIsSucceed] = useState(false);
  const [mode, setMode] = useState("created");
  // loading card data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeckData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching deckId. There is no deckId found");
        }
      }
    }
    fetchDeckData();

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCardData() {
      if (cardId) {
        try {
          const data = await readCard(cardId, abortController.signal);
          setCardData(data);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching cardId. There is no cardId found");
          }
        }
      }
    }
    fetchCardData();

    return () => abortController.abort();
  }, [cardId]);

  // Function to hanlde card changes
  const handleChange = (e) => {
    e.preventDefault();
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    console.log("Card submitted");
    if (!cardId) {
      console.log(deckId, cardId, cardData);
      createCard(deck.id, cardData);
    } else {
      setMode("updated");
      updateCard(cardData);
    }
    // changes is sucess message
    setIsSucceed(!isSucceed);
  };

  return (
    <div className="container card shadow">
      <div className="card-title">
        <br />
        {isSucceed ? (
          <div className="alert alert-success" role="alert">
            Card {mode} successfully !
          </div>
        ) : null}
      </div>
      <div className="card-body">
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onClick={hanldeSubmit}
            type="submit"
            className="btn btn-primary">
            Save
          </NavLink>
        </form>
      </div>
    </div>
  );
}
