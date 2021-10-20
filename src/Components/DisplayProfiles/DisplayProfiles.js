import "./DisplayProfiles.css"
import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { Profile } from "../Profile/Profile"
import { Header } from "../Header/Header"

export function DisplayProfiles({ session }) {
  const [loading, setLoading] = useState(true)
  const [profiles, setProfiles] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    getProfiles()
  }, [session])

  async function getProfiles() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
          setProfiles(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <div>
      <Header></Header>
          <h1>Other Users:</h1>
      <div className="profiles-section">
          {loading ?
          <h1>Loading profiles...</h1>
          :
          ""
          }
          {
              profiles ?
          profiles.map(profile => {
              return <Profile key={profile.id} profile={profile} />
            })
            :
            <p>No Profiles</p>
          }
      </div>      
      </div>

  )
}