import  React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck } from '../utils/api'

function Study(){
    const history = useHistory();
    const [currentCardIndex, setCurrentCardIndex]= useState(0)
    const {deckId}=useParams()

    const [deck, setDeck] = useState({ cards: [] });
    const [showBack, setShowBack] = useState(false)
    
    
    useEffect( () => {
        readDeck(deckId).then(data => setDeck(data));
      }, [deckId])

      function handleFlip(){
        setShowBack(!showBack)
       
      }
      function handleNextCard() {
        setShowBack(false)
        if (currentCardIndex === deck.cards.length - 1) {
          const shouldRestart = window.confirm('Restart cards?');
          if (shouldRestart) {
            setCurrentCardIndex(0);
          }
        } else {
          setCurrentCardIndex(currentCardIndex + 1);
        }
      }

    return(
        <main className="container study-page">
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
      <li className="breadcrumb-item active">Study</li>
    </ol>
  </nav>

  {deck.cards.length <= 2 ? (
    <div>
      <h1>{deck.name}: Study</h1>
      <h2>Not enough cards.</h2>
      <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-2">
        <span className="oi oi-plus" /> Add Cards
      </Link>
    </div>
  ) : (
    <div>
    <h1 className="h1">Study: {deck.name}</h1>
    <div className="border p-4">
      
      <h2 className="p-2 h4">Card {currentCardIndex + 1} of {deck.cards.length}</h2>

      {showBack ? (
        <div>
        <h3 className="h3">{deck.cards[currentCardIndex].back}</h3>
        
      </div>
      ) : (
        <h3 className="h3">{deck.cards[currentCardIndex].front}</h3>
      )}

      <button className="btn btn-lg btn-secondary mr-2 mt-3" onClick={handleFlip}>
        flip
      </button>

      {showBack &&
      <button className="btn btn-lg btn-primary mr-2 mt-3" onClick={handleNextCard}>
        Next
      </button>
      }
    </div>
    </div>
  )}
</main>
    )
}


export default Study;