import { useHistory } from 'react-router'
import { useAuth } from '../../Contexts/Auth'

export function Home() {
  const { user, signOut } = useAuth()
  const history = useHistory()

  async function handleSignOut() {
    await signOut()

    history.push('/signin')
  }

  return (
    <div>
      <p>Welcome, {user?.id}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )}

