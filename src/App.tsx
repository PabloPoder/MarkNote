import './App.css'
import { Notes } from './components/Notes.tsx'

import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer.tsx'

function App (): JSX.Element {
  // Get current location
  const location = useLocation()

  return (
    <>
      <h1>MarkNote 📑</h1>
      <p>
        Your versatile note-taking companion with <code>Markdown</code> support.
      </p>

      <main>
        {location.pathname === '/' && <Notes />}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
