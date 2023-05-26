import React, { useState } from "react";

function CardForm({onCancel, onSubmit, initialState = {front: "", back: ""}}){
    const [card, setCard] = useState(initialState)

    function changeHandler({target: { name, value }}) {
        setCard((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit({...card});
        setCard({front:"", back:""})
     }


     return (
        <>
            <form onSubmit={submitHandler} className="card-edit">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="front">Front</label>
                        <textarea
                            
                            id="front"
                            name="front"
                            tabIndex = "1"
                            className="form-control"
                            value={card.front}
                            required={true}
                            placeholder="frontside of the card"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="back">Back</label>
                        <textarea
                            
                            id="back"
                            name="back"
                            tabIndex = "2"
                            className="form-control"
                            value={card.back}
                            required={true}
                            placeholder="backside of the card"
                            onChange={changeHandler}
                        />
                    </div>
                    <button type="button" className="btn btn-secondary mr-2" tabIndex="4" onClick={onCancel}>Done</button>
                    <button type="submit" className="btn btn-primary"tabIndex="3">Save</button>
                </fieldset>
            </form>
        </>
    )

}



export default CardForm