import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
    {data.map((dataSet) =>{
        return (
            <div key={dataSet.jdUid}>
                <div>{dataSet.companyName}</div>
                <img src={dataSet.logoUrl} alt={dataSet.companyName} style={{width : "50px", height: "50px"}} />
                <div>{dataSet.jobDetailsFromCompany}</div>
                <div>{dataSet.minExp}</div>
                <div>{dataSet.maxJdSalary}</div>
                <div>{dataSet.maxExp}</div>
                <div>{dataSet.location}</div>
                <div>{dataSet.jobRole}</div>
                <hr />
            </div>)
    })}
    </>
  )
}

export default JobContainer