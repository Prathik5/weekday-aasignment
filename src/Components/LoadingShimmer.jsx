import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './CSS/LoadingShimmer.css';

const Shimmer = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" mt={4}>
      {Array(9)
        .fill("")
        .map((_, index) => (
          <Box key={index} className="shimmer-card">
            <Card sx={{ minWidth: 200, maxWidth: 350, margin: 1 }}>
              <Box display="flex" flexDirection="row">
                <Box className="shimmer-image"></Box>
                <Box display="flex" flexDirection="column">
                  <Box className="shimmer-line"></Box>
                  <Box className="shimmer-line"></Box>
                </Box>
              </Box>
              <Box className="shimmer-line"></Box>
              <Box className="shimmer-line"></Box>
              <Box className="shimmer-line"></Box>
              <Box className="shimmer-line"></Box>
              <Box className="shimmer-line"></Box>
            </Card>
          </Box>
        ))}
    </Box>
  );
};

export default Shimmer;