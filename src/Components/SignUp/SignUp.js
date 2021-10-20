import "./SignUp.css"
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { Header } from "../Header/Header"

export function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()
  const avatarRef = useRef()
  const skillRef = useRef()

  const [error, setError] = useState(null)

  const { signUp } = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value
    const username = usernameRef.current.value
    const avatar = avatarRef.current.value
    const skill_level = skillRef.current.value

    const { user, session, error } = await signUp({ email, password })

    if (error) return setError(error)
    
    const { data, upserterror } = await supabase.from('profiles').upsert({
      id: user.id,
      username: username,
      skill_level: skill_level,
      avatar_url: avatar,
      email: email,
      updated_at: new Date()});

    if (upserterror) return setError(upserterror)

    console.log(data)
    history.push('/')
  }

  return (
    <div>
      <Header></Header>
      <Row>
        <Col className="sign-up-form">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="email" ref={emailRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" ref={usernameRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Avatar URL</Form.Label>
                <Form.Control type="text" placeholder="avatar.url" ref={avatarRef} />
            </Form.Group>

            <Form.Label>Skill Level</Form.Label>
            <Form.Select aria-label="Skill Level" ref={skillRef} className="mb-3">
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
      <p>
        Already have an account? <Link to="/signin">Log In</Link>
      </p>
      </Col>
      </Row>
    </div>
  )
};