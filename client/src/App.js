import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Topbar from './components/Topbar'
import Navbar from "./components/Navbar"
import Home from "./pages/home"
import LoginForm from './components/LoginForm'
import ProjectDetails from "./pages/projectDetails"
import Projects from "./pages/projects.js"
import Bugs from "./pages/bugs"
import loginService from './services/login'
import projectService from './services/projectService'
import bugService from './services/bugService'
import ProjectEdit from "./pages/projectEdit"
import ProjectNew from "./pages/projectNew"
import AddTicket from "./pages/addTicket"
import BugDetail from './pages/bugDetails'
import './App.css'


const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON= window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      projectService.setToken(user.token)
      bugService.setToken(user.token)
    }
  }, [user])


  const handleLogin = async(event) => {
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
  


  const mainApp = (e) => (
    <Router>
      <div className = "app-container">
      <Navbar />
        <div className="main">
          <Topbar />
          <div className="page">
              <Routes >
                <Route exact path="/" element={<Home />} />
                <Route exact path="/projects" element={< Projects/>} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/bugs" element={<Bugs />} />
                <Route path="/bug/:id" element={<BugDetail />} />
                <Route path="/projects/:id/edit" element={<ProjectEdit />} />
                <Route path="/projects/new" element={< ProjectNew/>} />
                <Route path="/projects/:id/addTicket" element = {<AddTicket/>} />
              </Routes>
          </div>
        </div>
      </div>
    </Router>
  )

  return(
    <div className="app">
      {user === null && <LoginForm email={email} handleLogin={handleLogin} setEmail={setEmail} password={password} setPassword={setPassword}/>}
      {user !== null && mainApp()}
    </div>     
)
}

export default App