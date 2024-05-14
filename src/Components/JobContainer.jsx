import React, {useEffect, useState} from 'react'
import axios from 'axios'
import JobCard from './JobCard'
import Grid from '@mui/material/Grid';

const JobContainer = () => {

    const [data, setData] = useState([])

    const fetchData = async () =>{
        try {
            const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
                limit: 10,
                offset: 0
              });
              setData(response.data.jdList)
              console.log(response.data.jdList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        fetchData();
    }, [])

  return (
    <>
    <h1>Weekday Assignment</h1>
    <Grid container spacing={1}>
        {data.map((dataSet) => (<JobCard info={dataSet} key={dataSet.jdUid}/>))}
    </Grid>
    </>
  )
}

export default JobContainer