import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardList from "../cards/CardList";
import BreadCrumb from "./DeckBreadcrumb";

const DeckStudy = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
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

  const routename = "Study";
  return (
    <div>
      {/* BreadCrum link */}
      <BreadCrumb routename={routename} deckId={deck.id} deckName={deck.name} />

      {/* Study Deck content */}
      <h2>Study: {deck.name}</h2>
      {deck.cards ? <CardList cards={deck.cards} /> : null}
    </div>
  );
};

export default DeckStudy;
