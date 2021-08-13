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
import { EditGameForm } from "./game/EditGameForm.js"
import { DragMe } from "./test/Draggable.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "2rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <EventProvider>
                    <ProfileProvider>
                        <Route exact path="/games">
                            <GameList />
                        </Route>
                        <Route exact path="/games/new">
                            <GameForm />
                        </Route>
                        <Route exact path="/games/:gameId(\d+)">
                            <EditGameForm />
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
