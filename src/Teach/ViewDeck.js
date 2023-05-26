import React, { useEffect, useState } from "react";
import { Link, useParams,useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from '../utils/api';

function ViewDeck() {
    const history = useHistory()
    const { deckId } = useParams();

    const [deck, setDeck] = useState({ cards: [] });

    useEffect(loadInDeck, [deckId]);

    function loadInDeck() {
        readDeck(deckId).then(setDeck);
    }

    // TODO delete handler for deck
    const handleDelete=(deckId)=>{
        if(window.confirm("Are you sure you want to delete this deck?")){
            deleteDeck(deckId).then((response)=>{
                const updatedDeck = deck.filter((deck)=>deck.id !== deckId)
                setDeck(updatedDeck)
                
            })
            history.push("/")
        }
    }
    // TODO delete handler for card
    const handleCardDelete = (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(cardId).then(() => {
              const updatedCards = deck.cards.filter((card) => card.id !== cardId);
              setDeck({ ...deck, cards: updatedCards });
            });
          }
      };

    // TODO list cards for deck
    const cardList = deck.cards.map((card) => (
        <li
          key={card.id}
          className="list-group-item list-group-item-action border border-dark mb-4 flex-column align-items-start"
        >
            <div className="row">
                <div className="col-md-10">
                    <div className="row">
                        <div className="col">{card.front}</div>
                        <div className="col">{card.back}</div>
                    </div>
                </div>
                <div className="col text-right">
                    <Link
                        to={`/decks/${deck.id}/cards/${card.id}/edit`}
                        className="btn btn-secondary mr-2"
                        title="Edit Card"
                    >
                        <span className="oi oi-pencil" /> Edit
                    </Link>
                    <button className="btn btn-danger" title="Delete Card">
                        <span
                            className="oi oi-trash"
                            onClick={() => handleCardDelete(card.id)}
                        />
                    </button>
                </div>
            </div>
        </li>
      ));


    
    return (
        <main className="container study-page">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" /> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <div className="media mb-2">
                <div className="media-body">
                    <h5 className="mt-0">{deck.name} </h5>
                    {deck.description}
                </div>
            </div>
            <Link 
                to={`/decks/${deck.id}/edit`}
                className="btn btn-secondary mr-2"
            >
                <span className="oi oi-pencil" /> Edit
            </Link>
            <Link 
                to={`${deck.id}/study`}
                className="btn btn-primary mr-2"
            >
                <span className="oi oi-book" /> Study
            </Link>
            <Link 
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary mr-2"
            >
                <span className="oi oi-plus" /> Add Cards
            </Link>
            <button
                className="btn btn-danger mr-2"
                onClick={()=>handleDelete(deck.id)}
                >
                <span className="oi oi-trash" />
            </button>
            <div className="mt-4 card-list">
                <h3>Cards</h3>
                <ul className="list-group">{cardList}</ul>
            </div>
        </main>
    )

}
export default ViewDeck;