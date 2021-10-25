import './Bio.css'
import React from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'
import { useParams } from 'react-router';
import { Header } from '../Header/Header';

export function Bio() {
    let { userID } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile(){
        console.log(userID);
        let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', userID)
        .single()

        console.log(data)

        if(data){
            setProfile(data)
        }
    }

  return (
    <div className="show-profile">
        <Header></Header>
        <Container>
            <Row>
                {profile ?
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={profile.avatar_url} />
                    <Card.Body className="card-body">
                    <Card.Title className="title">{profile.username}</Card.Title>
                    <Card.Text>
                    <p>Email Address: <span>{profile.email}</span></p>
                    </Card.Text>
                </Card.Body>
                <Button variant="primary" href="/users">Go Back</Button>
                </Card>
                    :
                <p>No Profile</p>
                }                
            </Row>
        </Container>
    </div>
  )
}