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
const Dashboard = () => {
     const [projectArray, setProjectArray] = useState([])
     const [bugArray, setBugArray] = useState([])
     const [dataPriority, setDataPriority] = useState([])

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
        })
    },[])
    useEffect(()=> {
        setDataPriority(setPriorityCount(bugArray))
    },[bugArray])
    /* for reference
    const data = [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
      ];
      
    const options = {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      };
      */
    const dataPriorityOptions = {
        chart: {
            title: "No. of tickets by Priority",
            subtitle:"Low, Medium, High"
        }
    }


    return(
        <div className={styles.dashboard}>
            <div className= {styles.dashboardContainer}>
                <div>
                    <b>Assigned Projects</b>
                </div>
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
                </div>
            </div>
        </div>
    )
}

export default Dashboard;