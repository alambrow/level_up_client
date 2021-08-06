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
                        <div className="game__title"><str>{game.name} by {game.maker}</str></div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Premise: {game.description}</div>
                        <br/>
                    </section>
                })
            }
        </article>
    )
}
