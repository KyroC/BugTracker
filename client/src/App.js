import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Topbar from './components/Topbar'
import Navbar from "./components/Navbar"
import Home from "./pages/home"
import ProjectDetails from "./pages/projectDetails"
import Projects from "./pages/projects.js"
import Bugs from "./pages/bugs"
import loginService from './services/login'
import projectService from './services/projectService'
import './App.css'


const App = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON= window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      projectService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email,password
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      projectService.setToken(user.token)
      setUser(user)
      setEmail("")
      setPassword("")
    } catch (exception){
      setErrorMessage("Wrong credentials")
      setTimeout(()=> {
        setErrorMessage(null)
      },5000)
    }
    console.log("Logging in with", email, password)
  }
  const loginForm = () => (
  <div className="login-form">
    <form onSubmit={handleLogin}>
    <div>
      Email
      <input 
      type="text"
      value={email}
      name="Email"
      onChange= {({target}) => setEmail(target.value)}/>
    </div>
    <div>
      password
      <input
      type="text"
      value={password}
      name="Password"
      onChange= {({target}) => setPassword(target.value)} />
    </div>
    <button type="submit">login</button>
  </form>
</div>
  )


  const mainApp = (e) => (
    <Router>
      <div className = "app-container">
      <Navbar />
        <div className="main">
          <Topbar />
          <div className="page">
              <Routes >
                <Route exact path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/projects" element={< Projects/>} />
                <Route path="/bugs" element={<Bugs />} />
              </Routes>
          </div>
        </div>
      </div>
    </Router>
  )

  return(
    <div className="app">
      {user === null && loginForm()}
      {user !== null && mainApp()}
    </div>     
)
}

export default App