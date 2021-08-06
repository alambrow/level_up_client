import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "./eventlist.css"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    const history = useHistory()

    return (
        <article className="events">
            <header className="events__header">
                <h3>Level Up Game Events</h3>
            <button onClick={() => {
                history.push({ pathname: "/events/new"})
            }}>New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game"><str>{event.game.name}</str></div>
                        <div>{event.description}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {event.time}
                        </div>
                        <div>
                            Hosted by {event.host.user.first_name} {event.host.user.last_name}
                        </div>
                        <br/>
                    </section>
                })
            }
        </article >
    )
}
