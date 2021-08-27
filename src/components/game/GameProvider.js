import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setTypes ] = useState([])


    const getGames = () => {
        return fetch("https://lambrow-levelup-server.herokuapp.com/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGameById = (gameId) => {
        return fetch(`https://lambrow-levelup-server.herokuapp.com/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const createGame = (game) => {
        return fetch("https://lambrow-levelup-server.herokuapp.com/games", {
            method: "POST", 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then(getGames)
    }
    
    const getGameTypes = () => {
        return fetch("https://lambrow-levelup-server.herokuapp.com/gametypes", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
         })
            .then(response => response.json())
            .then(setTypes)
    }
    
    const updateGame = gameObj => {
        return fetch(`https://lambrow-levelup-server.herokuapp.com/games/${gameObj.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameObj)
        })
        .then(getGames)
    }

    const deleteGame = gameId => {
        return fetch(`https://lambrow-levelup-server.herokuapp.com/games/${gameId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getGames)
    }

    return (
        <GameContext.Provider value={{ games, getGames, createGame, gameTypes, getGameTypes, getGameById, updateGame, deleteGame }} >
            { props.children }
        </GameContext.Provider>
    )
}
