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
                <Col className="profile-card">
                {profile ?
                <Card>
                    <Card.Img variant="top" src={profile.avatar_url} className="prof-img"/>
                    <Card.Body className="card-body">
                    <Card.Title className="title">{profile.username}</Card.Title>
                    <Card.Text>
                        <h5>Bio:</h5>
                        <p>{profile.bio}</p>
                        <h5>Skill Level (1-5):</h5>
                        <p>{profile.skill_level}</p>
                        <h5>Contact Information:</h5>
                        <p>{profile.contact_information}</p>
                    </Card.Text>
                </Card.Body>
                </Card>
                    :
                <p>No Profile</p>
                }
                </Col>
            </Row>
        </Container>
    </div>
  )
}