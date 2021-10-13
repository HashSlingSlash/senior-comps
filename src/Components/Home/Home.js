import './Home.css'
import { useHistory } from 'react-router'
import { useAuth } from '../../Contexts/Auth'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

import { Court } from '../Court/Court';

export function Home() {
  let [courts, setCourts] = useState();

  const { user, signOut } = useAuth()
  const history = useHistory()

  async function handleSignOut() {
    await signOut()

    history.push('/signin')
  }

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
      <p className="user-welcome">Welcome, {user?.id}!</p>
      <button onClick={handleSignOut}>Sign out</button>
      <h1>Basketball Courts Near You</h1>
      {courts ?
      <div className="displayCourts"> 
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

