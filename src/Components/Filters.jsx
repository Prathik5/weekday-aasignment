import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredJobData } from '../utils/jobSlice';
import { getUniqueData } from '../utils/helper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function Filters() {
  const [filters, setFilters] = useState({jobRole: [], location: [], minExp: [], minJdSalary: []})

  const dispatch = useDispatch()
  const jobData = useSelector(state => state.jobs.jobData)

  const roles = getUniqueData(jobData, "jobRole")
  const locations = getUniqueData(jobData, "location")
  const minExperienceOnlyData = Array.from({length: 10}, (_, i) => i + 1)
  const minSalaryOnlyData = Array.from({length: 24}, (_, i) => (i + 1) * 5)

  useEffect(() => {
    if (!jobData) {
      return;
    }
  
    let filteredData = jobData.filter(job => {
      let matches = true;
  
      if (filters.jobRole.length > 0) {
        matches = matches && filters.jobRole.includes(job.jobRole);
      }
  
      if (filters.location.length > 0) {
        matches = matches && filters.location.includes(job.location);
      }
  
      if (filters.minExp.length > 0) {
        matches = matches && filters.minExp.includes(job.minExp);
      }

      if (filters.minJdSalary.length > 0) {
        matches = matches && filters.minJdSalary.includes(job.minJdSalary);
      }
  
      return matches;
    });
    
    dispatch(setFilteredJobData(filteredData));
  }, [filters, dispatch, jobData]);
  
  const handleChange = (event) => {
    setFilters(prevFilters => ({ ...prevFilters, [event.target.name]: event.target.value }));
  };

  const handleDelete = (filterName, valueToDelete) => {
    console.log(`Deleting ${valueToDelete} from ${filterName}`);
    setFilters(prevFilters => {
      const newFilterValues = prevFilters[filterName].filter(value => value !== valueToDelete);
      console.log(`New ${filterName}:`, newFilterValues);
      return { ...prevFilters, [filterName]: newFilterValues };
    });
  };

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box m={1}>
              <FormControl fullWidth>
                <InputLabel id="jobRole-label">Job Role</InputLabel>
                 <Select
                  labelId="jobRole-label"
                  id="jobRole"
                  multiple
                  value={filters.jobRole}
                  onChange={handleChange}
                  name="jobRole"
                  renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} onDelete={handleDelete}/>
                    ))}
                  </Box>
                )}
              >
                {roles.map((roleData, index) => (
                  <MenuItem key={index} value={roleData}>{roleData}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
            <Box m={1}>
              <FormControl fullWidth>          
              <InputLabel id="location-label">Location</InputLabel>
              <Select
  labelId="location-label"
  id="location"
  multiple
  value={filters.location}
  onChange={handleChange}
  name="location"
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} onDelete={() => handleDelete('location', value)} />
      ))}
    </Box>
  )}
>
  {locations.map((locationData, index) => (
    <MenuItem key={index} value={locationData}>{locationData}</MenuItem>
  ))}
</Select>
        </FormControl>
        </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
            <Box m={1}>
              <FormControl fullWidth>          <InputLabel id="minExp-label">Minimum Experience</InputLabel>
          <Select
            labelId="minExp-label"
            id="minExp"
            multiple
            value={filters.minExp}
            onChange={handleChange}
            name="minExp"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {minExperienceOnlyData.map((minExpData, index) => (
              <MenuItem key={index} value={minExpData}>{minExpData}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
            <Box m={1}>
              <FormControl fullWidth>          
              <InputLabel id="minJdSalary-label">Minimum Salary</InputLabel>
              <Select
                labelId="minJdSalary-label"
                id="minJdSalary"
                multiple
                value={filters.minJdSalary}
                onChange={handleChange}
                name="minJdSalary"
                renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
            )}
          >
            {minSalaryOnlyData.map((minSalaryData, index) => (
              <MenuItem key={index} value={minSalaryData}>{minSalaryData}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default Filters;