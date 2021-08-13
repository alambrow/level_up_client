import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./eventlist.css"
import Draggable from "react-draggable"
import { Paper } from "@material-ui/core";

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent, deleteEvent } = useContext(EventContext)
    const [ change, setChange ] = useState(0)

    useEffect(() => {
        getEvents()
    }, [change])

    const history = useHistory()

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
            <Button variant="outlined" color="secondary" size="large"                     onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}>
              Schedule a New Event
            </Button>
          </div>
        );
      }



    const renderEventForm = event => {
        return (
            <Draggable>
                <Paper elevation={3}>
                    <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {event.date} @ {event.time}
                        </div>
                        <div>
                            Current Attendees: {event.attendees}
                        </div>
                        {
                            event.joined
                                ? <>
                                    <Button variant="contained" color="primary" onClick={() => {
                                      
                                        leaveEvent(event.id)
                                    }}>Leave</Button>
                                    </>
                                : <Button variant="contained" color="secondary"
                                    onClick={() => {
                                        joinEvent(event.id)
                                    }}
                                    >Join</Button>
                        }
                        <Button variant="contained" color="inherit" onClick={(evt) => {
                            evt.preventDefault()
                            deleteEvent(event.id)
                        }}>
                            Delete
                        </Button>
                    </section>
                </Paper>
            </Draggable>
        )
    }

    return (
        <article className="events">
            <header className="events__header">
                <div className="events__title">Level Up Game Events</div>
                <div className="events__button"> {OutlinedButton()}</div>
            </header>
            <div className="events__box">
                {
                    events.map(event => renderEventForm(event))
                }
            </div>
        </article>
    )
}
