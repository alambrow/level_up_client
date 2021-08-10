import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const EditGameForm = () => {
    const {  getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)
    const [currentGame, setCurrentGame] = useState({})
    const {gameId} = useParams()
    const history = useHistory()

    // TODO: Get game info by id, then populate form with that data, resend via PUT to edit

    // const [currentGame, setCurrentGame] = useState({
    //     name: gameObj.name,
    //     game_type: gameObj.game_type,
    //     description: gameObj.description,
    //     number_of_players: gameObj.number_of_players,
    //     maker: gameObj.maker
    // })

    useEffect(() => {
        getGameById(gameId).then(data =>  
            setCurrentGame(data))
    }, [])

    useEffect(() => {
        getGameTypes()
    }, [])

    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        console.log(newGameState)
        setCurrentGame(newGameState)
    }

    console.log(currentGame, "current game")
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
                    <select name="game_type" defaultValue={currentGame.game_type} onChange={handleControlledInputChange}>Select one
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

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        name: currentGame.name,
                        description: currentGame.description,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        game_type: parseInt(currentGame.game_type.id)
                    }

                    // Send PUT request to your API
                    updateGame(game)
                    history.push("/")
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}