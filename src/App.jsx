import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then(setEmployees)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <main>
      <h1>Employees</h1>
      {error ? <p role="alert">Unable to load employees: {error}</p> : null}
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.id}: {employee.role}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
