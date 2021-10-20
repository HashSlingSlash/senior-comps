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

  useEffect(() => {
    getCourts()
  })

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
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <Header></Header>
      <h1>Basketball Courts Near You</h1>
      {courts ?
      <div className="display-courts"> 
      {
        courts.map(court => {
          return <Court key={court.id} court={court} />
        })
      }
      </div>
      :
      <h1>No Courts Near You</h1>
    }
    </div>
  )}

