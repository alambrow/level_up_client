import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from "./game/EventProvider.js"
import { EventList } from "./game/EventList.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./game/EventForm.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"
import { Profile } from "./auth/Profile.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <EventProvider>
                    <ProfileProvider>
                        <Route exact path="/">
                            <GameList />
                        </Route>
                        <Route exact path="/games/new">
                            <GameForm />
                        </Route>
                        <Route exact path="/events">
                            <EventList />
                        </Route>
                        <Route exact path="/events/new">
                            <EventForm />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </ProfileProvider>
                </EventProvider>
            </GameProvider>
        </main>
    </>
}
