import React from 'react'
import { clearLocalStorage } from './Utilities/Helper/function'
import { AppBar,Toolbar,Typography,Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'




function Header() {
  const navigate=useNavigate()
  

  return (
    <React.Fragment>
    <AppBar  position="static" sx={{backgroundColor:'#E17299',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Toolbar>
                  <Typography variant='h4' align='center'>
                    Hello Zappians 🙋‍♀️!!
                  </Typography>
                  
                  
                  <Button 
                  sx={{
                   marginLeft:'50px'
                  }}
                  variant='contained' onClick={()=>{
                    clearLocalStorage()
                    navigate('/Login')
                  }}>
                      Logout
                  </Button> 
                 
              </Toolbar>
    </AppBar>
    </React.Fragment>
  )


}

export default Header