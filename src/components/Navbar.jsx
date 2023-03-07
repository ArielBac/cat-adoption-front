import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <img className="me-2" height="35px" src="/logo.png" alt="" />
            <Link className="navbar-brand" to={`/`}>Cat Adoption</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to={`/`}>Gatinhos</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to={`/vaccines`}>Vacinas</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar