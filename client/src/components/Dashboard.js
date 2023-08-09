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

const Dashboard = () => {
     const [projectArray, setProjectArray] = useState([])
     const [bugArray, setBugArray] = useState([])
     const [dataPriority, setDataPriority] = useState([])
     const [dataStatus, setDataStatus] = useState([])

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

    return(
        <div className={styles.dashboard}>
            <div className= {styles.dashboardContainer}>
                <div>
                    <b>Assigned ticket count by priority</b>    
                    <Chart 
                    chartType="Bar" 
                    data={dataPriority}
                    options = {dataPriorityOptions}
                    />
                </div>
                <div>
                    <b>Assigned ticket count by Status</b>
                    <Chart 
                    chartType="Bar"
                    data={dataStatus}
                    options={dataStatusOptions}
                    />
                </div>
                <div>
                    <b>Number of assigned ticket by Project</b>
                </div>
                <div>
                    <b>Assigned Projects</b>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;