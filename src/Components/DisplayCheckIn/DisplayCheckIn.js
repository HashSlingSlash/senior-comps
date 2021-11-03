import './DisplayCheckIn.css'
import { React, useState, useEffect } from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { supabase } from '../../supabaseClient';

export function DisplayCheckIn(props) {

    const [ time, setTime ] = useState(null);
    const [ user, setUser ] = useState(null);

    useEffect(() => {
      getTime();
      getUser();
    }, [])
  
    function getTime(){
      let temp = new Date(rectifyFormat(props.checkIn.created_at))
      temp = "Date: "+(temp.getMonth()+1)+
      "/"+temp.getDate()+
      "/"+temp.getFullYear()+
      " "+temp.getHours()+
      ":"+temp.getMinutes()+
      ":"+temp.getSeconds()
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
    .eq('id', props.checkIn.user_id)
    
    if(data){
        setUser(data)
        console.log(data)
    }
  }

  

  return (
    <div className="checkin mb-4">
        <Container>
            <Row>
            <Card>
                <Card.Body>
                    <Card.Title className="review-title">
                    {
                        user ?
                        <h4><a href={"/users/" + user[0].id}>{user[0].username}</a></h4>
                        :
                        ""
                      }
                    </Card.Title>
                    <Card.Text>
                    <p>Weather Conditions: {props.checkIn.weather_conditions}</p>
                    <p>Court Conditions: {props.checkIn.court_conditions}</p>
                    <p>Open Courts: {props.checkIn.open_courts}</p>
                    <p>Active Games: {props.checkIn.active_games}</p>
                    <p>Planning to stay: {props.checkIn.stay_length / 60} hrs</p>
                    <p>Additional Comments: {props.checkIn.additional_comments}</p>
                    {
                    time ?
                      <h4>{time}</h4>
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