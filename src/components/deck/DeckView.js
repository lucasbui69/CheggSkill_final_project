import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardView from "../cards/CardView";
import BreadCrumb from "./DeckBreadcrumb";

export default function DeckView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardList, setCardlist] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        setCardlist(data.cards);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching deck:", error);
        }
      }
    }

    fetchDeck();

    return () => abortController.abort();
  }, [deckId]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  // Function to delete CardID
  const handleDeleteCard = (cardId) => {
    return setCardlist(cardList.filter((card) => card.id !== cardId));
  };

  // Function to handle Delete a deck
  const handleDeleteDeck = (deckId) => {
    const isConfirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it"
    );
    if (isConfirmed) {
      // removeDeck(deckId)
      console.log("Redirect to homepage");
      window.location = "/";
    }
  };

  return (
    <div>
      <BreadCrumb routename={deck.name} />
      {/* Study Deck content */}
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      {/* Deck buttons */}
      <div className="deck-button-bar">
        <NavLink
          to={`/decks/${deckId}/edit`}
          className="ml-1 btn btn-secondary">
          <i className="bi bi-pencil"></i>
          Edit
        </NavLink>
        <NavLink to={`/decks/${deckId}/study`} className="ml-1 btn btn-primary">
          <i className="bi bi-journal-bookmark-fill"></i>
          Study
        </NavLink>
        <NavLink
          to={`/decks/${deckId}/cards/new`}
          className="ml-1 btn btn-primary">
          <i className="bi bi-plus-lg"></i>
          Add Cards
        </NavLink>
        <NavLink
          onClick={handleDeleteDeck}
          className="btn btn-danger float-right">
          {" "}
          <i className="bi bi-trash"></i>
        </NavLink>
      </div>
      <br />
      <h3>Cards</h3>
      {deck.cards ? (
        <CardView
          cards={cardList}
          handleDeleteCard={handleDeleteCard}
          deckId={deck.id}
          deckName={deck.name}
        />
      ) : null}
    </div>
  );
}
