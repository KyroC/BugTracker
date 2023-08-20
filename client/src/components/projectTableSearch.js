import {useState} from 'react'
import './projectTableSearch.css'

const ProjectTableSearch = ({callback}) => {
    const [innerValue, setInnerValue] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        callback(innerValue)
    }
    
    return (
        <form className="searchBar" onSubmit={handleSubmit}>
            <input 
            type="text" 
            className="searchBarInput"
            value={innerValue}
            placeholder="Search"
            onChange={(e) => setInnerValue(e.target.value)}
            />
        </form>
    )
}

export default ProjectTableSearch;