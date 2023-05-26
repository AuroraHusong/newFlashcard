import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import ListOfDecks from "./ListOfDecks";
import ViewDeck from "../Teach/ViewDeck";
import EditDeck from "../Teach/EditDeck";
import CreateDeck from "../Teach/CreateDeck";
import { Route, Switch } from 'react-router-dom';
import Study from "../Study/Study";
import EditCard from "../Teach/EditCard";
import CreateCard from "../Teach/CreateCard";
function Layout() {
  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <CreateCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route exact path="/">
          <ListOfDecks />
        </Route>
        <Route>
          <NotFound />
        </Route>
        </Switch>
        
        
      </div>
    </>
  );
}

export default Layout;
