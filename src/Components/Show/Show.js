import './Show.css'
import React from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'
import { useParams } from 'react-router';
import { Comment } from '../Comment/Comment';
import { Header } from '../Header/Header';

export function Show() {
    let { courtID } = useParams();
    const [court, setCourt] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        getCourt();
        getReviews();
    })

    async function getCourt(){
        console.log(courtID);
        let { data, error, status } = await supabase
        .from('courts')
        .select()
        .eq('id', courtID)
        .single()

        console.log(data)

        if(data){
            setCourt(data)
        }
    }

    async function getReviews(){
        let { data, error, status } = await supabase
        .from('reviews')
        .select()
        .eq('court_id', courtID)

        if(data){
            setReviews(data)
        }
    }

  return (
    <div className="show-court">
        <Header></Header>
        <Container>
            <Row>
                {court ?
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={court.photo} />
                    <Card.Body className="card-body">
                    <Card.Title className="title">{court.name}</Card.Title>
                    <Card.Text>
                    <p>Rating: {court.rating}/5</p>
                    <p>Address: <span>{court.location}</span></p>
                    <h4>Reviews:</h4>
                    {reviews ?
                    <div className="display-reviews"> 
                    {
                        reviews.map(review => {
                        return <Comment key={review.id} review={review} />
                        })
                    }
                    </div>
                    :
                    <h1>No Reviews Yet</h1>
                    }
                    <Button variant="warning" href={"/reviews/" + courtID} className="review-button">Leave a Review</Button>
                    </Card.Text>
                </Card.Body>
                <Button variant="primary" href="/">Go Back</Button>
                </Card>
                    :
                <p>No Court</p>
                }                
            </Row>
        </Container>
    </div>
  )
}