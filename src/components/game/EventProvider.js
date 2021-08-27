import React, { useState } from "react"

export const EventContext = React.createContext()

export const EventProvider = (props) => {
    const [ events, setEvents ] = useState([])

    const getEvents = () => {
        return fetch("https://lambrow-levelup-server.herokuapp.com/events", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setEvents)
    }

    const createEvent = (event) => {
        return fetch("https://lambrow-levelup-server.herokuapp.com/events", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
        .then(res => res.json())
        .then(getEvents)
    }

    const deleteEvent = eventId => {
        return fetch(`https://lambrow-levelup-server.herokuapp.com/events/${eventId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getEvents)
    }

    const joinEvent = eventId => {
        return fetch(`https://lambrow-levelup-server.herokuapp.com/events/${eventId}/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(getEvents)
    }

    const leaveEvent = eventId => {
        return fetch(`https://lambrow-levelup-server.herokuapp.com/events/${ eventId }/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(getEvents)
    }    

    // TODO: write function to delete entry in EventJoin table

    return (
        <EventContext.Provider value={{ events, getEvents, createEvent, joinEvent, leaveEvent, deleteEvent }} >
            { props.children }
        </EventContext.Provider>
    )
}
