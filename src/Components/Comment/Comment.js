import './Comment.css'
import React from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap";

export function Comment(props) {

  return (
    <div className="review mb-4">
        <Container>
            <Row>
            <Card>
                <Card.Body>
                    <Card.Title className="review-title">{props.review.title}</Card.Title>
                    <Card.Text>
                    <p>{props.review.text}</p>
                    <p>Rating: {props.review.rating}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Row>
        </Container>
    </div>
  )
}