import { useRef, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'

export function Review(props) {
    const [error, setError] = useState(null)

    const titleRef = useRef()
    const textRef = useRef()
    const ratingRef = useRef()

    let { courtID } = useParams();

    const { user } = useAuth()
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        const title = titleRef.current.value
        const text = textRef.current.value
        const rating = ratingRef.current.value

        const { data, upserterror } = await supabase.from('reviews').upsert({
            user_id: user.id,
            court_id: courtID,
            title: title,
            text: text,
            rating: rating,
            created_at: new Date()});
  
        if (upserterror) return setError(upserterror)
  
        console.log(data)
        history.push('/')
    }

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Review Title" ref={titleRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Review</Form.Label>
                <Form.Control type="textarea" placeholder="Review..." ref={textRef} />
            </Form.Group>
            <Form.Select aria-label="Rating" ref={ratingRef}>
                <option value="1">One (Worst)</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five (Best)</option>
            </Form.Select>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    </div>
  )
}
;