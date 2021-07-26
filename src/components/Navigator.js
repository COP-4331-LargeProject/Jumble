import React from 'react';
import "../Stylesheet.css";
import { Link } from 'react-router-dom';

function Navigator()
{
    return (
        <nav id="navBar">
            <Link style={{ textDecoration: 'none' }} to="/"><h3>Jumble</h3></Link>
            <u1 className="navItems">
                <Link style={{ textDecoration: 'none' }} to="/Login">
                    <li>Login</li>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/SignUp">
                    <li>Sign Up</li>
                </Link>
            </u1>
        </nav>
    );
}

export default Navigator;