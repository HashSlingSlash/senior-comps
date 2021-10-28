import './Home.css'
import { useHistory } from 'react-router'
import { useAuth } from '../../Contexts/Auth'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Button } from 'react-bootstrap'
import { Header } from '../Header/Header'
import { Court } from '../Court/Court';

export function Home() {
  let [courts, setCourts] = useState();
  let distances = {}

  useEffect(() => {
    getCourts()
  }, [])

  async function getCourts() {
    try {
      let { data, error, status } = await supabase
        .from('courts')
        .select()
        
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(data)
        setCourts(data)
      }
    }
    catch (error) {
      alert(error.message)
    }
  }

  function setDistance(court, distance){
    distances[court] = distance
  }

  function sortCourts(){
    // Create items array
    var items = Object.keys(distances).map(function(key) {
      return [key, distances[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
      return first[1] - second[1];
    });

    console.log(items)

    let temp = []
    items.forEach(item => {
      courts.forEach(court => {
        if(item[0] == court.name){
          temp.push(court)
        }
      })
    })
    console.log(temp)
    setCourts(temp)
  }


  return (
    <div>
      <Header></Header>
      <h1>Basketball Courts</h1>

      {courts ?
      <div className="display-courts"> 
          <Button onClick={sortCourts} variant="success" className="mb-2 mt-2">See Courts Near Me</Button>
      {
        courts.map(court => {
          return <Court key={court.id} court={court} setDistance={setDistance} className="mb-2"/>
        })
      }
      </div>
      :
      <h1>No Courts Near You</h1>
    }
 
  </div>
  )}

