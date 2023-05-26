import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from '../utils/api'

import CardForm from '../Layout/CardForm'

function EditCard(){
    const history = useHistory()
    const {cardId, deckId} = useParams()
    
    const [card, setCard] = useState({front: "", back: ""})
    const [deck, setDeck] = useState({ name: "", description: "", cards:[] })
    
    useEffect(() => {
        readDeck(deckId).then(setDeck);
   
    }, [deckId]);
    
    useEffect(()=>{
        readCard(cardId).then(cardData => {
            setCard(cardData)
            
        })
        
    },[cardId])

    function submitHandler(card) {
       
        updateCard(card).then((savedCardData) => {
          setCard(savedCardData);
          history.push(`/decks/${deckId}`);
        });
      }
    function cancel(){
        history.goBack()
    }

    const editData = card.id ? (
        <CardForm
            onCancel={cancel}
            onSubmit={submitHandler}
            initialState={card}
        />
    ) : (
        <p>Loading...</p>
    )
    
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <span className="oi oi-home" /> Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit Card {card.id}
                        </li>
                    </ol>
                </nav>
                <h1>Edit Card</h1>
                {editData}
            </>
        )
    
}

export default EditCard