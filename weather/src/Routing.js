import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Routing.css'


export default function Home(){
    return (
        <>
    
          <Nav id="navbar" className="navbar1" style={{ marginBottom: "5vh" },{marginRight:"0vh"}} dir="rtl">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/Favorite">Favorite</Link>
          </Nav>
          
    
        </>
      )
}
