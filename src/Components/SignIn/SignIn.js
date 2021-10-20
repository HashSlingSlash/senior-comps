import "./SignIn.css"
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

import { useAuth } from '../../Contexts/Auth'
import { Header } from "../Header/Header";

export function SignIn() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState(null)

  const { signIn } = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const { error } = await signIn({ email, password })

    if (error) return setError(error)

    history.push('/')
  }

  return (
    <div>
      <Header></Header>
      <Row>
        <Col className="sign-in-form">
        <Form onSubmit={handleSubmit}>
        <div>{error && JSON.stringify(error)}</div>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="email" ref={emailRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
            </Form.Group>

            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      </Col>
      </Row>
    </div>
  )
}
;