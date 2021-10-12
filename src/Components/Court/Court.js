import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'
import { useHistory } from 'react-router'

export function Court(props) {

  return (
    <div className="form-widget">
        <h4>{props.court.name}</h4>
        <p>Rating: {props.court.rating}/5</p>
        <img src={props.court.photo} alt="Court Image"></img>
        <h5>Address: <span>{props.court.location}</span></h5>
    </div>
  )
}