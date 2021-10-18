import './Court.css'
import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'

export function Court(props) {

    function _clickedCourt(e){
        const courtName = e.target.value;
        window.location.href = `/courts/${courtName}`;    
    }

  return (
    <div className="court-card">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.court.photo} />
        <Card.Body className="card-body">
            <Card.Title className="title">{props.court.name}</Card.Title>
                <Card.Text>
                <p>Rating: {props.court.rating}/5</p>
                <p>Address: <span>{props.court.location}</span></p>
                </Card.Text>
                <Button variant="primary" onClick={_clickedCourt} value={props.court.id}>More Information</Button>
            </Card.Body>
        </Card>
    </div>
  )
}