import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./gamelist.css"
import Draggable from "react-draggable"
import { Paper } from "@material-ui/core";

export const GameList = () => {
    const { games, getGames, deleteGame } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

    function OutlinedButton() {
        const classes = useStyles();
      
        return (
          <div className={classes.root}>
            <Button variant="outlined" color="secondary" size="large" onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}>
              Register a New Game
            </Button>
          </div>
        );
      }

    const history = useHistory()
    
    const renderGameForm = (game) => {
        return (
            <Draggable>
                <Paper elevation={3}>
                    
                    <section key={`game--${game.id}`} className="game_card">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Premise: {game.description}</div>
                        <div className="game__game_type">Game type: {game.game_type.label}</div>
                        <br/>
                        <div className="game_buttons__flex">
                          <Button variant="contained" color="secondary" onClick={e => history.push(`/games/${game.id}`)}>Edit</Button>
                          <Button variant="contained" color="primary" 
                          onClick={event => {
                            event.preventDefault()
                            deleteGame(game.id)}}
                          >Delete</Button>
                        </div>
                    </section>
                </Paper>
            </Draggable>
        )
    }

    return (
        <article className="games">
          <div className="games__header">
            <div className="games__title">Games</div>
            <div>
              {OutlinedButton()}
            </div>
          </div>
          <br/>
          <div className="games__box">
            {
                games.map(game => renderGameForm(game))
            }
          </div>
        </article>
    )
}
