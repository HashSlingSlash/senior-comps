import './Comment.css'
import {React, useState, useEffect} from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { supabase } from '../../supabaseClient';

export function Comment(props) {

  const [ time, setTime ] = useState(null);
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    getTime();
    getUser();
  }, [])

  function getTime(){
    let temp = new Date(rectifyFormat(props.review.created_at)).toDateString()
    setTime(temp)
  }

  // Convert 2019-09-12 09:52:52.992823+00 to
  //         2019-09-12T09:52:52.992+00:00
  // Assumes all strings are +00:00
  function rectifyFormat(s) {
    let b = s.split(/\D/);
    console.log(b)
    return b[0] + '-' + b[1] + '-' + b[2] + 'T' +
         b[3] + ':' + b[4] + ':' + b[5] + '.' +
         b[6].substr(0,3) + '+00:00';
        }

  async function getUser(){
    let { data, error, status } = await supabase
    .from('profiles')
    .select()
    .eq('id', props.review.user_id)
    
    if(data){
        setUser(data)
        console.log(data)
    }
  }



  return (
    <div className="review mb-4">
        <Container>
            <Row>
            <Card>
                <Card.Body>
                    <Card.Title className="review-title">{props.review.title}</Card.Title>
                    <Card.Text>
                      {
                        user ?
                        <p>by: <a href={"/users/" + user[0].id}>{user[0].username}</a></p>
                        :
                        ""
                      }
                    <p>{props.review.text}</p>
                    <p>Rating: {props.review.rating}</p>
                    {
                      time ?
                      <p>Written: {time}</p>
                      :
                      ""
                    }
                    </Card.Text>
                </Card.Body>
            </Card>
            </Row>
        </Container>
    </div>
  )
}