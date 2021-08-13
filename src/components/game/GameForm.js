import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        name: "",
        game_type: 0,
        description: "",
        number_of_players: 0,
        maker: ""
    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        console.log(newGameState)
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleControlledInputChange}
                    />
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInputChange}
                    />
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleControlledInputChange}
                    />
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={handleControlledInputChange}
                    />
                    <label htmlFor="game_type">Game type:</label>
                    <br/>
                    <select name="game_type" value="0" onChange={handleControlledInputChange}>Select one
                    {
                        gameTypes.map(gT => (
                            <option key={gT.id} value={gT.id}>
                                {gT.label}
                            </option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>

            <Button variant="contained" color="secondary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        name: currentGame.name,
                        description: currentGame.description,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
            >
                Create Game
            </Button>

        </form>
    )
}
