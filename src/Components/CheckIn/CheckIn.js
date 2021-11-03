import "./Checkin.css"
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory, useParams } from 'react-router'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Header } from '../Header/Header'

export function CheckIn() {
    
    const [court, setCourt] = useState(null)
    const [error, setError] = useState(null)

  let { courtID } = useParams();

  const weatherRef = useRef()
  const courtConditionsRef = useRef()
  const openCourtsRef = useRef()
  const activeGamesRef = useRef()
  const stayLengthRef = useRef()
  const additionalCommentsRef = useRef()

  const { user } = useAuth()
  const history = useHistory()
  
  useEffect(() => {
      getCourt();
    }, [])

    async function getCourt(){
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

  async function handleSubmit(e) {
    e.preventDefault()

    const weather = weatherRef.current.value
    const courtConditions = courtConditionsRef.current.value
    const openCourts = openCourtsRef.current.value
    const activeGames = activeGamesRef.current.value
    const stayLength = stayLengthRef.current.value
    const additionalComments = additionalCommentsRef.current.value

    if (error) return setError(error)
    
    const { data, upserterror } = await supabase.from('checkins').insert({
      created_at: new Date(),
      weather_conditions: weather,
      court_conditions: courtConditions,
      open_courts: openCourts,
      active_games: activeGames,
      court_id: courtID,
      user_id: user.id,
      stay_length: stayLength,
      additional_comments: additionalComments
    });

    if (upserterror) return setError(upserterror)

    console.log(data)
    history.push('/')
  }


  return (
    <div>
    <Header></Header>
    {court ?
    <h1>Check-in at {court.name}</h1>
    :
    ""
    }
    <Row>
      <Col className="profile">
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Weather Conditions</Form.Label>
              <Form.Control type="text" as="textarea" rows={5} placeholder="Hot day, clear skies, no wind" ref={weatherRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Court Conditions</Form.Label>
              <Form.Control type="text" as="textarea" rows={5} placeholder="The court is a little dusty, but manageable" ref={courtConditionsRef} />
          </Form.Group>

          <Form.Label>How many open courts are there?</Form.Label>
          <Form.Select aria-label="Open Courts" ref={openCourtsRef} className="mb-3">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
              <option value="7">Seven</option>
              <option value="8">Eight</option>
              <option value="9">Nine</option>
              <option value="10">Ten</option>
          </Form.Select>

          <Form.Label>How many active pickup games are there?</Form.Label>
          <Form.Select aria-label="Active Games" ref={activeGamesRef} className="mb-3">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
              <option value="7">Seven</option>
              <option value="8">Eight</option>
              <option value="9">Nine</option>
              <option value="10">Ten</option>
          </Form.Select>

          <Form.Label>About how long will you be here?</Form.Label>
          <Form.Select aria-label="Stay Length" ref={stayLengthRef} className="mb-3">
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">2 hrs</option>
              <option value="150">2.5 hrs</option>
              <option value="180">3 hrs</option>
              <option value="210">3.5 hrs</option>
              <option value="240">4 hrs</option>
              <option value="270">4.5 hrs</option>
              <option value="300">5 hrs</option>
          </Form.Select>

          <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control type="text" as="textarea" rows={5} placeholder="I'm looking to play 2v2 or 1v1..." ref={additionalCommentsRef} />
          </Form.Group>

          <Button variant="primary" type="submit">
          Submit
          </Button>
      </Form>
    </Col>
    </Row>
  </div>
  )
}