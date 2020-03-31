import React, {Component, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App () {
    const [message, setMessage] = useState("Welcome");

 
    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome</h1>
            <Link to="/signin">Login</Link>
            <Link to="/signup">Register</Link>
            </header>
            
        </div>
    )
}

export default App;