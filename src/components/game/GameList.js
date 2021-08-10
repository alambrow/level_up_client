import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom"
import "./gamelist.css"

export const GameList = () => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    const history = useHistory()
    console.log(games)
    return (
        <article className="games">

            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game_card">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Premise: {game.description}</div>
                        <div className="game__game_type">Game type: {game.game_type.label}</div>
                        <button onClick={e => history.push(`/games/${game.id}`)}> Edit Game </button>
                    </section>
                })
            }
        </article>
    )
}
