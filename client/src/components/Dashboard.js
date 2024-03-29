import {useState, useEffect} from 'react';
import axios from 'axios';
import {Chart} from 'react-google-charts';
import styles from './Dashboard.module.css';
import bugService from '../services/bugService';
import userService from '../services/userService';


let userProjects = () => {
    return userService.getUserProjects()
}
let userBugs = () => {
    return userService.getUserBugs()
}
let setPriorityCount = (data) => {
    console.log(data)
    let dataArray = [["Priority","Count"]]
    const priorities = ["Low","Medium","High"]
    for(let i=0;i<priorities.length;i++) {
        let count = 0
        for(let j=0;j<data.length;j++) {
            if(priorities[i] === data[j].priority) {
                count++
            }
        }
        dataArray.push([priorities[i],count])
    }
    console.log(dataArray)
    return(dataArray)
}
let setStatusCount = (data) => {
    let dataArray =[["Status","Count"]]
    const status = ["Open","Worked on","Solved"]
    for(let i=0;i<status.length;i++) {
        let count = 0
        for (let j=0;j<data.length;j++) {
            if(status[i]===data[j].status) {
                count++
            }
        }
        dataArray.push([status[i],count])
    }
    console.log(dataArray)
    return dataArray
}
let setTicketByProjectCount = (data) => {
    let dataArray = [["Project","Count"]]
    let projects = []
    for(let i=0;i<data.length;i++) {
        if(!projects.flat().includes(data[i].project)){
            projects.push([data[i].project,0])
        }
    }
    for(let i=0;i< projects.length;i++) {
        for(let j=0;j< data.length;j++) {
            if(projects[i][0] === data[j].project) {
                projects[i][1] ++
            }
        }
    }
    for(let i=0;i<projects.length;i++) {
        dataArray.push(projects[i])
    }
    console.log(dataArray)
    return(dataArray)
}
const Dashboard = () => {
     const [projectArray, setProjectArray] = useState([])
     const [bugArray, setBugArray] = useState([])
     const [dataPriority, setDataPriority] = useState([])
     const [dataStatus, setDataStatus] = useState([])
     const [dataTicketByProject, setDataTicketByProject] = useState([])

    useEffect(() => {
        userProjects()
        .then(res => {
            setProjectArray(res)
            console.log(res)
        })
    }, [])
    useEffect(() => {
        userBugs()
        .then(res => {
            setBugArray(res)
            console.log(res)
        })
    },[])
    useEffect(()=> {
        setDataPriority(setPriorityCount(bugArray))
    },[bugArray])
    useEffect(() => {
        setDataStatus(setStatusCount(bugArray))
    },[bugArray])
    useEffect(() => {
        setDataTicketByProject(setTicketByProjectCount(bugArray))
    },[bugArray])
   
    const dataPriorityOptions = {
        chart: {
            title: "No. of tickets by Priority",
            subtitle:"Low, Medium, High"
        }
    }
    const dataStatusOptions = {
        chart: {
            title: "No. of tickets by Status",
            subtitle:"Open, Worked On, Solved"
        }
    }
    const dataTicketByProjectOptions = {
        chart: {
            title: "No. of tickets by projects",
            subtitle: "Project IDs"
        }
    }

    return(
        <div className={styles.dashboard}>
            <div className= {styles.dashboardContainer}>
                <div className = {styles.dashboardItem}>
                        <h3>Assigned ticket count by priority</h3> 
                    <Chart 
                    chartType="Bar" 
                    data={dataPriority}
                    options = {dataPriorityOptions}
                    />
                </div>
                <div className = {styles.dashboardItem}>
                    <h3>Assigned ticket count by Status</h3>
                    <Chart 
                    chartType="Bar"
                    data={dataStatus}
                    options={dataStatusOptions}
                    />
                </div>
                <div className = {styles.dashboardItem}>
                    <h3>Number of assigned ticket by Project</h3>
                    <Chart
                    chartType="PieChart"
                    data={dataTicketByProject}
                    options={dataTicketByProjectOptions}
                    />
                </div>
                <div className = {styles.dashboardItem}>
                    <h3>Assigned Projects</h3>
                    <a>To be added</a>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;