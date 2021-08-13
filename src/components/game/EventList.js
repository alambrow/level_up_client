import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./eventlist.css"
import Draggable from "react-draggable"
import { Paper } from "@material-ui/core";

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)
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
                        {
                            event.joined
                                ? <>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setChange(Math.random())
                                        leaveEvent(event.id)
                                    }}>Leave</Button>
                                    </>
                                : <Button variant="contained" color="secondary"
                                    onClick={() => {
                                        joinEvent(event.id)
                                    }}
                                    >Join</Button>
                        }
                    </section>
                </Paper>
            </Draggable>
        )
    }

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                {OutlinedButton()}
            </header>
            {
                events.map(event => renderEventForm(event))
            }
        </article>
    )
}

// events.map(event => {
//     return <section key={event.id} className="registration">
//         <div className="registration__game">{event.game.name}</div>
//         <div>{event.description}</div>
//         <div>
//             {
//                 new Date(event.date).toLocaleDateString("en-US",
//                 {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 })
//             }
//             @ {event.time}
//         </div>
//         <div>
//             Hosted by {event.host.user.first_name} {event.host.user.last_name}
//         </div>
//         <br/>
//     </section>