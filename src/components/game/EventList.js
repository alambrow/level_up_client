import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "./eventlist.css"

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)
    const [ change, setChange ] = useState(0)

    useEffect(() => {
        getEvents()
    }, [change])

    const history = useHistory()

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}
                >Schedule New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {event.date} @ {event.time}
                        </div>
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => {
                                        setChange(Math.random())
                                        leaveEvent(event.id)
                                    }}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => {
                                        joinEvent(event.id)
                                    }}
                                    >Join</button>
                        }
                    </section>
                })
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