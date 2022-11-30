import React,{useState} from 'react';
import { useNavigate  } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
 import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../Services/userService';
import {IP} from '../connection'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignInCard=()=> {
  const [loginUser, setLoginUser]=useState("");
  const [loginPass, setLoginPass]=useState("");
  
  const history =useNavigate ();
  const handleSubmit = (event) => {
    event.preventDefault();
    const userCred={user_email:loginUser ,user_pass:loginPass}
    getSignInCred(userCred);
  };

  async function getSignInCred(data){
    await userService.getInstance().loginService(data).then((res)=>{
      let result=JSON.stringify(res);
        let obj= JSON.parse(result);
        if(obj.code === '200'){
          localStorage.setItem("userID", JSON.stringify(obj.data));
          alert(obj.message);
          history("/");
        }
        else if(obj.code ==='401')
        {
          alert(obj.message)
        }
        else{
        alert(obj.message);
        history('/register');
        }
    })
  }

  return (
    <ThemeProvider theme={theme}>
       <div  style={{alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', display: 'grid',}}>
      <Container component="main" maxWidth="xs" style={{backgroundColor: "#fff",borderRadius: '20px',border: '1px solid rgba(0,0,0,0.2)',
    padding: '2%', textTransform: 'capitalize'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='loginlogo'>
          <img variant="rounded" src={IP+"getImage/?imgName=artifact/logo.png"} style={{width: '100%'}}></img>
             </div>
          <Typography component="h1" variant="h5" style={{margin: '4% auto'}}>
           User Access
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setLoginUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setLoginPass(e.target.value)}
            />
          
           

            <Grid item xs style={{textAlign: 'left'}}>
                <Link href="#" variant="body2" style={{ textTransform: 'capitalize',textAlign: 'left'}}>
                  Forgot password?
                </Link>
              </Grid>
            <Grid container style={{margin: '10% auto 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
              
              <Grid item>
                <Link href="/register" variant="body2"  style={{fontWeight: '500',  textTransform: 'capitalize'}}>
                  {"Create Account"}
                </Link>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{width: 'auto', margin: '0', textTransform: 'capitalize'}}
            >
              Sign In
            </Button>
            </Grid>
          </Box>
        </Box>
     
      </Container>
      </div>
    </ThemeProvider>
  );
}
export default SignInCard