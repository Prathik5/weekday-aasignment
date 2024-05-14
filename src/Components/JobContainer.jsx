import React, {useEffect} from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { setJobData } from '../utils/jobSlice';
import Grid from '@mui/material/Grid';

const JobContainer = () => {
    const dispatch = useDispatch()
    const jobData = useSelector(state => state.jobs.jobData) 


    const fetchData = async () =>{
        try {
            const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
                limit: 10,
                offset: 0
              });
              dispatch(setJobData(response.data.jdList))
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
        {jobData.map((dataSet) => (<JobCard info={dataSet} key={dataSet.jdUid}/>))}
    </Grid>
    </>
  )
}

export default JobContainer