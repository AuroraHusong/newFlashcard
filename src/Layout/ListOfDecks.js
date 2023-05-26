import  React, { useState, useEffect } from 'react';
import { listDecks, deleteDeck } from '../utils/api'
import { Link } from 'react-router-dom';

function ListOfDecks(){
    const [decks, setDecks] = useState([]);
    useEffect( () => {
        listDecks().then(data => setDecks(data));
      }, [])
      
    const handleDelete=(deckId)=>{
        if(window.confirm("Are you sure you want to delete this deck?")){
            deleteDeck(deckId).then(()=>{
                const updatedDecks = decks.filter((deck)=>deck.id !== deckId)
                setDecks(updatedDecks)
            })
        }
    }

    const list = decks.map(deck=>(
        <div className="border rounded p-4 h-100 " key={deck.id}>
            <h2 className="card-title">{deck.name}</h2>
            <p className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</p>
            <p>{deck.description}</p>
            <Link 
                to={`/decks/${deck.id}`}
                className="btn btn-secondary mr-2"
            >
                <span className="oi oi-eye" /> View
            </Link>
            <Link 
                to={`decks/${deck.id}/study`}
                className="btn btn-primary"
            >
                <span className="oi oi-book" /> Study
            </Link>
            <button
                className="btn btn-danger float-right"
                onClick={()=>handleDelete(deck.id)}
            >
                <span className="oi oi-trash" />
            </button>
        </div>
    ))
    
    return(
        <div className="container Home">
            <Link 
                to="/decks/new"
                className="btn btn-secondary mb-3"
            >
                <span className="oi oi-plus" /> Create Deck
            </Link>
            <section className="row d-inline mb-3">{list}</section>
        </div>
    )
}

export default ListOfDecks