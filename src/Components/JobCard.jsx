import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const JobContainer = ({ info }) => {
  const {
    companyName,
    jobRole,
    location,
    minExp,
    jobDetailsFromCompany,
    jdLink,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
    logoUrl
  } = info;

  const [readMore, setReadMore] = useState(false);
  const shortText = jobDetailsFromCompany?.length > 100 ? jobDetailsFromCompany.substring(0, 150) + "..." : jobDetailsFromCompany;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ minWidth: 200, maxWidth: 350, margin: 1, transition: 'transform 0.15s ease-in-out', '&:hover': {boxShadow: '0 0 15px rgba(33,33,33,.2)'}}}>
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center">
            <img src={logoUrl} alt={companyName} style={{ width: '70px', height: '70px', marginRight: '10px' }} />
            <Box display="flex" flexDirection="column">
             {companyName && ( 
                <Typography color="text.secondary">
                  {companyName}
                </Typography>
             )}
             {jobRole && (
             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {jobRole}
              </Typography>
              )}
              {location &&(
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {location.toUpperCase()}
              </Typography>
            )}
            </Box>
          </Box>
          <Typography fontWeight="bold">
            Estimated Salary: {salaryCurrencyCode==="USD"? "$" : ""}{minJdSalary} - {salaryCurrencyCode==="USD"? "$" : ""}{maxJdSalary}✅
          </Typography>
          <Typography fontWeight="bold">
            About Us
          </Typography>
          <Typography variant="body2">
            {readMore ? jobDetailsFromCompany : shortText}
            <Button color="primary" onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Read Less' : 'Read More'}
            </Button>
          </Typography>
          <Typography color="text.secondary">
            Minimum Experience: {minExp} years
          </Typography>
          <hr />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Box display="flex" flexDirection="column" width="100%">
            <Button size="medium" href={jdLink} style={{ backgroundColor: 'turquoise', marginBottom: '10px' }} fullWidth>⚡ Easy Apply</Button>
            <Button size="medium" style={{ backgroundColor: 'darkblue', color: 'white' }} fullWidth>Easy Referral</Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default JobContainer;