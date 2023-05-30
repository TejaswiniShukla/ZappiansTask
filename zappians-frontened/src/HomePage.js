import React from "react";
import { useState } from "react";
import { Box, Container, Grid, Typography ,Button,Modal} from '@mui/material';
import UserTable from "./UserTable";
import Register from "./Register";


function HomePage() {
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
    console.log('chala');
  };
  
  const handleClose = () => {
    setOpen(false);
    
  };


  return (
      <Container style={{padding:'50px'}} >

        <Box
           bgcolor="#F3E5B6"
          
           alignItems={"center"}
           marginTop={5}
           margin='auto'
           padding={3}
           borderRadius={5}
           boxShadow={'5px 5px 10px #ccc'}
        >
           <Typography variant="h5" align="center">
               Users List
              
            </Typography>
            
            <Grid  item xs={12} >
                         <Button 
                                variant="contained"
                                color="success" 
                                onClick={handleOpen}>
                                    Add User
                          </Button>
            </Grid>
          
            <Modal  open={open} onClose={handleClose}>
                  <Register addUser={true} handleClose={handleClose}/>
            </Modal>

            <UserTable/>
           

        </Box>
        
      </Container>
  )
}

export default HomePage