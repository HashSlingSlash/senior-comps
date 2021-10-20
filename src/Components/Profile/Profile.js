import './Profile.css'
import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'

export function Profile(props) {

    function _clickedProfile(e){
        const profileName = e.target.value;
        window.location.href = `/users/${profileName}`;    
    }

  return (
    <div className="profile-card">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.profile.avatar_url} />
        <Card.Body className="card-body">
            <Card.Title className="title">{props.profile.username}</Card.Title>
                <Card.Text>
                <p>Email Address: <span>{props.profile.email}</span></p>
                </Card.Text>
                <Button variant="primary" onClick={_clickedProfile} value={props.profile.id}>More Information</Button>
            </Card.Body>
        </Card>
    </div>
  )
}