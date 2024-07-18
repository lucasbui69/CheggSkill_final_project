import React, { useState, useEffect } from "react";
import BreadCrumb from "../deck/DeckBreadcrumb";
import { useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../../utils/api";

export default function CardCreate() {
  const routename = "Add Card";
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeckData() {
      try {
        // const data = await readCard(cardId, abortController.signal);
        const deckData = await readDeck(deckId);
        // setCardData(data);
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

  return (
    <div className="container">
      <BreadCrumb routename={routename} deckId={deckId} />
      {/* <h3>Add Card</h3> */}
      <h3>{deck.name}: Add Card</h3>
      {/* If Deck present then show the card input  */}
      <CardForm deckId={deckId} />
    </div>
  );
}
