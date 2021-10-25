import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Header } from '../Header/Header'

export function Account({ session }) {
  const [username, setUsername] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const emailRef = useRef()
  const usernameRef = useRef()
  const avatarRef = useRef()
  const skillRef = useRef()

  const { user, signOut } = useAuth()
  const history = useHistory()

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setEmail(data.email)
        setAvatar(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const avatar = avatarRef.current.value
    const skill_level = skillRef.current.value
    const username = usernameRef.current.value

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
      <Col className="Profile">
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={email} ref={emailRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" defaultValue={username} ref={usernameRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control type="text" defaultValue={avatar} ref={avatarRef} />
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
    </Col>
    </Row>
  </div>
  )
}