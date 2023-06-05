import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Topbar from './components/Topbar'
import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Projects from "./pages/projects"
import Bugs from "./pages/bugs"
import loginService from './services/login'
import './App.css'




const App = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const handleLogin= async (event) => {
    event.preventDefault()

    try {
      const user= await loginService.login({
        email,password
      })
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

  return(
  <Router>
    <div className="app">
      <div className = "app-container">
      <Navbar />
        <div className="main">
          <Topbar />
          <div className = "login">
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
          <div className="page">
              <Routes >
                <Route exact path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/bugs" element={<Bugs />} />
              </Routes>
          </div>
        </div>
      </div>
    </div>
  </Router>
)}

export default App