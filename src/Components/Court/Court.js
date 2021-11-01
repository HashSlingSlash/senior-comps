import './Court.css'
import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'
import { DistanceMatrixService, GoogleMap, LoadScript } from "@react-google-maps/api"
import Geocode from "react-geocode";

export function Court(props) {

    const [rating, setRating] = useState(null);
    let [userLat, setUserLat] = useState()
    let [userLong, setUserLong] = useState()
    let [courtLat, setCourtLat] = useState()
    let [courtLong, setCourtLong] = useState()

    function _clickedCourt(e){
        const courtName = e.target.value;
        window.location.href = `/courts/${courtName}`;    
    }

    async function getRating() {
        try {
          let { data, error, status } = await supabase
            .from('reviews')
            .select('rating')
            .eq("court_id", props.court.id)
            
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

      function getLocation() {
        if (navigator.geolocation) {
          props.setLoading(true)
          navigator.geolocation.getCurrentPosition((pos) =>{
            setUserLat(pos.coords.latitude)
            setUserLong(pos.coords.longitude)
            props.setLoading(false)
          });
        } 
      }
      
      Geocode.setApiKey("AIzaSyBdk8yecnM9x_C8WfIrH-HSqvVRfZzsiFE");
      Geocode.enableDebug();

      function getDestination(){
        Geocode.fromAddress(props.court.location).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            setCourtLat(lat)
            setCourtLong(lng)
          },
          (error) => {
            console.error(error);
          });
      }

      useEffect(() => {
        getRating()
        getLocation()
        getDestination()
      }, [])

  return (
    <div className="court-card">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.court.photo} />
        <Card.Body className="card-body">
            <Card.Title className="title">{props.court.name}</Card.Title>
                <Card.Text>
                <p>Rating: {rating}/5</p>
                <p>Address: <span>{props.court.location}</span></p>
                </Card.Text>
                <Button variant="primary" onClick={_clickedCourt} value={props.court.id}>More Information</Button>
            </Card.Body>
        </Card>
        <LoadScript
          googleMapsApiKey="AIzaSyBdk8yecnM9x_C8WfIrH-HSqvVRfZzsiFE"
        >
          <GoogleMap>
          <DistanceMatrixService
          options={{
             destinations: [{lat: courtLat, lng: courtLong}],
             origins: [{lat: userLat, lng: userLong}],
             travelMode: "DRIVING"
           }}
           callback = {(response) => {
             props.setDistance(props.court.name, response.rows[0].elements[0].distance.value)
            }}
           />
          </GoogleMap>
        </LoadScript>
    </div>
  )
}