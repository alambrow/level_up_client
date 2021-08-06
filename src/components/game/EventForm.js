import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "./GameProvider.js"
import { EventContext } from "./EventProvider.js"

export const EventForm = () => {
    const history = useHistory()
    const { games, getGames } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)
    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (event) => {
        const tempEvent = {...currentEvent}
        tempEvent[event.target.name] = event.target.value
        console.log(tempEvent)
        setEvent(tempEvent)
    }

    console.log(games)
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
                    <br />
                    <input type="text" required autofocus name="title" onKeyUp={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Date</label>
                    <br />
                    <input type="date" name="date" onChange={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Time</label>
                    <br />
                    <input type="time" name="time" onChange={ changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <br />
                    <input type="text" required autofocus name="description" onKeyUp={ changeEventState } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={ currentEvent.game }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games?.map(game => (
                                <option value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        title: currentEvent.title,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        description: currentEvent.description,
                        game: currentEvent.game,
                        host: localStorage.getItem("lu_token")
                    }

                    createEvent(event).then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
