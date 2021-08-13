import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import "./Auth.css"


export const Login = props => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "lu_token", res.token )
                    props.history.push("/games")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <>
        <NavBar />
        <div>
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className="login_all">
                <form onSubmit={handleLogin}>
                    <h1>Level Up</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email" id="email" className="form-control"  placeholder="Email address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control"  placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <div className="login_button__flex">
                            <Button variant="contained" color="secondary" type="submit">Sign In</Button>
                            <Button variant="outlined" color="secondary" size="large" onClick={ 
                                (evt) => {
                                    evt.preventDefault()
                                    props.history.push('/register')
                                
                                }}>Not a member?</Button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
        
        </>
    )
}
