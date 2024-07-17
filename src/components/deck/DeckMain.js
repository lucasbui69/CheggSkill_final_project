import { useEffect, useState } from "react";
import DeckList from "./DeckList";
import { listDecks } from "../../utils/api";

export default function DeckMain() {
  const [decks, setDecks] = useState([]);

  //   Create to pull data from data.json
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecks() {
      try {
        const data = await listDecks(abortController.signal);
        setDecks(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching decks:", error);
        }
      }
    }

    fetchDecks();

    return () => abortController.abort();
  }, []);

  //   Create handle deck delete
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      `Delete this deck?\n\nYou will not be able to recover it.`
    );
    if (confirmed) {
      setDecks(decks.filter((deck) => deck.id !== id));
    }
  };

  return (
    <div>
      <DeckList decks={decks} handleDelete={handleDelete} />
    </div>
  );
}
