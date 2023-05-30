import { Container, Typography,TextField,Button,Box,Grid,Modal} from '@mui/material'
import React from 'react'
import { useNavigate,} from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import { updateUserService } from './Utilities/Axios/apiService';

function EditPage({open,handleClose,item}) {
    
 const navigate=useNavigate()

     
 const saveEditUser = async (event) => {
   event.preventDefault();
  
  const data = new FormData(event.currentTarget);

  try {
    let editedData = await updateUserService({
      id:item._id,
      name:data.get('name'),
      email: data.get("email"),
      mobile:data.get('mobile'),
      
    });
    if(editedData.data.message===
      "User edited successfully."){
        handleClose();
      }
    console.log(editedData,"User Data");
  
    
  } catch (error) {
    console.log("Registration Failed With Error---", error.response.data.message);
  }
};


  
  

  return (
   <Container style={{padding:'50px'}}>


    <Modal open={open} onClose={handleClose}>
    <Box 
       bgcolor="#F3E5B6"
       maxWidth={400}
       alignItems={"center"}
       marginTop={5}
       margin='auto'
       padding={3}
       borderRadius={5}
       boxShadow={'5px 5px 10px #ccc'}
       component='form'
       onSubmit={saveEditUser}
       >
         
         <CancelIcon onClick={handleClose}/>

         <Typography variant="h4" align="center">
                Edit User
            </Typography>
            

            <Grid marginTop={2} item xs={12} align="center">
                   <TextField  
                    type="Text"   
                    name='name'
                    id='name'            
                    label="Name"
                    defaultValue={item.name}
                    variant="outlined"
                    InputProps={{
                        style: {
                          marginTop: '12px',
                          
                        },
                      }}
                    />
            </Grid>

            <Grid marginTop={1} item xs={12} align="center">
                   <TextField 
                    type="Email"              
                    label="Email"
                    name='email'
                    id='email'
                    defaultValue={item.email}
                    variant="outlined"
                    InputProps={{
                        style: {
                          margin: '5px',
                        },
                      }}
                   />
            </Grid>

            <Grid marginTop={1} item xs={12} align="center">
                   <TextField
                    type="tel" 
                    id='mobile'
                    name='mobile'
                    defaultValue={item.mobile}
                     label="Mobile Number   "
                     variant="outlined"
                     InputProps={{
                        style: {
                          margin: '5px',
                        },
                      }}
                   />
            </Grid>

        

            <Grid marginTop={1} item xs={12}  align="center">
                   <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{
                        borderRadius:6
                      }}
                      
                   >

                    Save

                   </Button>
            </Grid>

       </Box>
    </Modal>
       
       
   </Container>
  )
}

export default EditPage