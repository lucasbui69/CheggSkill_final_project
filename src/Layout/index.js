import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
// Adding route to main layout page
import { Routes, Route } from "react-router-dom";

// Import sub component
import DeckMain from "../components/deck/DeckMain";
import DeckView from "../components/deck/DeckView";
import DeckCreate from "../components/deck/DeckCreate";
import DeckStudy from "../components/deck/DeckStudy";
import CardCreate from "../components/cards/CardCreate";
import CardEdit from "../components/cards/CardEdit";
import DeckEdit from "../components/deck/DeckEdit";

// Route Route function to navigate user to different route
function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DeckMain />} />
      <Route path="decks/:deckId/study" element={<DeckStudy />} />
      <Route path="decks/new" element={<DeckCreate />} />
      <Route path="decks/:deckId" element={<DeckView />} />
      <Route path="decks/:deckId/cards/:cardId/edit" element={<CardEdit />} />
      <Route path="decks/:deckId/edit" element={<DeckEdit />} />
      <Route path="decks/:deckId/cards/new" element={<CardCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <RootRoutes />
      </div>
    </div>
  );
}

export default Layout;
