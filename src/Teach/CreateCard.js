import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from '../utils/api'
import CardForm from "../Layout/CardForm";

function CreateCard () {
    const {deckId}= useParams()
    const history = useHistory()
    const [deck, setDeck] = useState({ name: "", description: "", cards:[] })
    
    useEffect(() => {
        readDeck(deckId).then(setDeck);
   
    }, [deckId]);
    



    function submitHandler(card) {
        createCard(deckId, card).then((savedCardData)=>{
        history.push(`/decks/${savedCardData.deckId}`)
    })

    }
    function cancel() {
        history.goBack()
    }

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
                        Add Card
                    </li>
                </ol>
            </nav>
            <h1>{deck.name}: Add Card</h1>
            <CardForm 
                onCancel={cancel}
                onSubmit={submitHandler}
                
            />
        </>
    )
}

export default CreateCard