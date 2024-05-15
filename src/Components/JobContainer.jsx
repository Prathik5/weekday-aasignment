import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from "./JobCard"
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { setJobData } from '../utils/jobSlice';
import Filters from './Filters';
import Footer from './Footer';
import LoadingShimmer from './LoadingShimmer';

function JobContainer() {
  const [loading, setLoading] = useState(true); 
  const [offset, setOffset] = useState(0)
  
  const dispatch = useDispatch()
  const jobData = useSelector(state => state.jobs.jobData)
  const filteredJobData = useSelector(state => state.jobs.filteredJobData)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        limit: 10,
        offset: offset
      });
      let newData = [...jobData, ...response.data.jdList];
      let uniqueData = Array.from(new Set(newData.map(a => a.jdUid)))
        .map(jdUid => {
          return newData.find(a => a.jdUid === jdUid)
        });
      dispatch(setJobData(uniqueData)); 
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInfiniteScroll = async () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const offsetFromBottom = document.documentElement.offsetHeight - scrollPosition;
    if (offsetFromBottom <= 250 || !loading) { 
      setOffset(prevOffset => prevOffset + 1); 
      fetchData();
    }
  }


  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [offset]);

  return (
    <div>
      <h1>Weekday Assignment</h1>
      <Filters />
      <Grid container spacing={1}>
      {loading ? (
          <LoadingShimmer />
        ) : (
          filteredJobData.map((dataSet) => (
            <JobCard info={dataSet} key={dataSet.jobId} />
          ))
        )}
      </Grid>
      {/* {loading && <LoadingShimmer/>} */}
      <Footer />
    </div>
  );
}

export default JobContainer;