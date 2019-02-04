import React from 'react'
import {NavLink} from "react-router-dom"

function NavBar() {
    return (
        <div className = "navbar">
            <NavLink to= "/">
            <div className = "nav-home"><h1>Home</h1></div>
            </NavLink>
            <NavLink to= "/recordings">
            <div className = "nav-recordings"><h1>Recordings</h1></div>
            </NavLink>
        </div>
    )
}

export default NavBar
