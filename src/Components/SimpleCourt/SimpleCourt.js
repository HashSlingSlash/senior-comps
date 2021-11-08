import './SimpleCourt.css'
import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'

export function SimpleCourt(props) {

    const [rating, setRating] = useState(null); 
    const [court, setCourt] = useState(null);

    function _clickedCourt(e){
        const courtName = e.target.value;
        window.location.href = `/courts/${courtName}`;    
    }

    async function getRating() {
        try {
          let { data, error, status } = await supabase
            .from('reviews')
            .select('rating')
            .eq("court_id", props.courtID)
            
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
              let total = 0
              data.forEach(rating => total += rating.rating);
              if (total > 0){
                setRating(Math.round((total / data.length) * 10) / 10)
              }
              else{
                  setRating(0)
              }          }
        } catch (error) {
          alert(error.message)
        }
      }

      async function getCourt(){
          try {
              let {data, error, status} = await supabase
              .from('courts')
              .select()
              .eq('id', props.courtID)

              if (error && status !== 406) {
                throw error
              }

              if (data){
                  console.log(data)
                  setCourt(data)
              }
          } catch (error) {
              alert(error.message)
          }
      }

      useEffect(() => {
        getRating()
        getCourt()
      }, [])

  return (
    <div className="court-card">
        { court ?
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={court[0].photo} />
                <Card.Body className="card-body">
                    <Card.Title className="title">{court[0].name}</Card.Title>
                        <Card.Text>
                        <p>Rating: {rating}/5</p>
                        <p>Address: <span>{court[0].location}</span></p>
                        </Card.Text>
                        <Button variant="primary" onClick={_clickedCourt} value={court[0].id}>More Information</Button>
                    </Card.Body>
                </Card>
        :
        ""
        }
    </div>
  )
}