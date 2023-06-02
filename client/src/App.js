import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Topbar from './components/Topbar'
import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Projects from "./pages/projects"
import Bugs from "./pages/bugs"
import './App.css'


const App = () => (
  <Router>
    <div className="app">
      <div className = "app-container">
      <Navbar />
        <div className="main">
          <Topbar />
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
)

export default App