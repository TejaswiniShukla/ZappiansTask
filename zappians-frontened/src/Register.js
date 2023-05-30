import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerService } from "./Utilities/Axios/apiService";
import { setUserData } from "./Utilities/Helper/function";
import CancelIcon from '@mui/icons-material/Cancel';

function Register({ addUser, handleClose }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      let userData = await registerService({
        name: data.get("name"),
        email: data.get("email"),
        mobile: data.get("mobile"),
        password: data.get("password"),
      });
      console.log(userData, "User regist Data");
      setUserData(userData.data.data);

      if (userData.data.message === "user created successfully") {
        addUser === true ? handleClose() : navigate("/");
      }
    } catch (error) {
      console.log(
        "Registration Failed With Error---",
        error.response.data.message
      );
    }
  };

  return (
    <Container style={{ padding: "50px" }}>
      <Box
        bgcolor="#F3E5B6"
        maxWidth={400}
        alignItems={"center"}
        marginTop={5}
        margin="auto"
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        component="form"
        onSubmit={handleSubmit}
      >
        {addUser===true && <CancelIcon onClick={handleClose}/> }
        

        <Typography variant="h4" align="center">
        {addUser === true?"Add User":"Register Yourself"}
        </Typography>

        <Grid marginTop={2} item xs={12} align="center">
          <TextField
            type="Text"
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            InputProps={{
              style: {
                marginTop: "12px",
              },
            }}
          />
        </Grid>

        <Grid marginTop={1} item xs={12} align="center">
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            InputProps={{
              style: {
                margin: "5px",
              },
            }}
          />
        </Grid>

        <Grid marginTop={1} item xs={12} align="center">
          <TextField
            id="mobile"
            name="mobile"
            type="tel"
            label="Mobile Number   "
            variant="outlined"
            InputProps={{
              style: {
                margin: "5px",
              },
            }}
          />
        </Grid>

        <Grid marginTop={1} item xs={12} align="center">
          <TextField
            id="passwod"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            InputProps={{
              style: {
                margin: "5px",
              },
            }}
          />
        </Grid>

        <Grid marginTop={1} item xs={12} align="center">
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              borderRadius: 6,
            }}
            onSubmit={handleSubmit}
          >
            Register
          </Button>
        </Grid>

        <Grid marginTop={1} item xs={12} align="center">
          <Link
            underline="hover"
            component="button"
            onClick={() => {
              navigate("/Login");
            }}
            variant="body2"
          >
            {"Already a User? Login now !"}
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}

export default Register;
