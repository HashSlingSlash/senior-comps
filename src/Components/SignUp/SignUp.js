import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../Contexts/Auth'

export function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState(null)

  const { signUp } = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const { user, session, error } = await signUp({ email, password })

    if (error) return setError(error)
    
    const { data, upserterror } = await supabase.from('profiles').upsert({
      id: user.id,
      username: email,
      website: '',
      avatar_url: '',
      email: email,
      updated_at: new Date()});

    if (upserterror) return setError(upserterror)

    console.log(data)
    history.push('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>{error && JSON.stringify(error)}</div>

        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>

      <br/>

      <p>
        Already have an account? <Link to="/signin">Log In</Link>
      </p>
    </div>
  )
};