import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../deck/DeckBreadcrumb";
import { readDeck, readCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function CardEdit() {
  const { deckId, cardId } = useParams();
  const [cardData, setCardData] = useState([]);
  const [deck, setDeckData] = useState([]);
  const routename = `Edit Card ${cardId}`;

  // loading card data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeckData() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeckData(deckData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchDeckData();

    async function fetchCardData() {
      try {
        const data = await readCard(cardId, abortController.signal);
        setCardData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchCardData();

    return () => abortController.abort();
  }, [deckId, cardId]);

  return (
    <div className="container">
      <BreadCrumb routename={routename} deck={deck} />
      <h1>Edit Card</h1>
      <CardForm deckId={deckId} cardId={cardId} />
    </div>
  );
}
