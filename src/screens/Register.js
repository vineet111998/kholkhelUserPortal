import React,{ useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../Services/userService';
import {useNavigate} from 'react-router-dom'
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

const SignUpCard=()=> {
  const [registerName, setRegisterName]=useState("");
  const [registerLast, setRegisterLast]=useState("");
  const [registerEmail, setRegisterEmail]=useState("");
  const [registerPass, setRegisterPass]=useState("");
  const [primarydata, setPrimarydata]=useState();
  const [primaryLang, setPrimaryLang]=useState([]);

  useEffect(() => {
    if (primaryLang.length === 0) getlanguageData();
  });
  const handleChange = (event) => {
    setPrimarydata(event.target.value);
  };

async function getlanguageData() {
    var data={lang_status:0};
    await userService.getInstance().getAllLanguage(data).then((res) => {
      var result = JSON.parse(JSON.stringify(res));
      for(var i= 0; i<result.data.length;i++)
      {
        result.data[i]["selected"]=false;
      }
      console.log(result.data);
      setPrimaryLang(result.data);
    });
  }
  const history =useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const registerCred={user_firstname:registerName,user_lastname: registerLast,user_email:registerEmail ,lang_id:primarydata,user_pass:registerPass};
    getSignUpCred(registerCred);
  };

    async function getSignUpCred(data){
      await userService.getInstance().registerService(data).then((res)=>{
        let result=JSON.stringify(res);
        let obj= JSON.parse(result);
        console.log(obj.code);
        if(obj.code === 200){
          alert(obj.message)
          history('/login');
        }
        else{
        alert(obj.message);
        history('/register');
        }
      })
    }
    async function checkNumber(data)
    {
      await userService.getInstance().checkNumber(data).then((res)=>{
        // let result=JSON.stringify(res);
        console.log(res);
      });
    }
  return (
    <ThemeProvider theme={theme}>
        <div  style={{alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', display: 'grid',}}>
      <Container component="main" maxWidth="xs" style={{width: 'auto', margin: '0',textTransform: 'capitalize'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='registerslogo'>
          <img variant="rounded" src={IP+"getImage/?imgName=artifact/logo.png"} style={{width: '100%'}}></img>
             </div>
          <Typography component="h1" variant="h5" style={{margin: '4% auto'}}>
            Create Account as a User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>setRegisterName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setRegisterLast(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width: '100%'}}>
              <InputLabel id="demo-simple-select-autowidth-label">1st language</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={primarydata}
                onChange={handleChange}
                autoWidth
                label="Status"
              >

                {primaryLang.map(data => (
                  <MenuItem key={data.lang_id} value={data.lang_id}>
                    {data.lang_desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Contact Number"
                  name="number"
                  // autoComplete="email"
                  onChange={(e)=>checkNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setRegisterEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setRegisterPass(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
           
            <Grid container justifyContent="flex-end" style={{margin: '10% auto 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
              <Grid item>
                <Link href="/login" variant="body2">
                  Sign In Instead
                </Link>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{width: 'auto', margin: '0',textTransform: 'capitalize'}}
            >
              Create Account
            </Button>
            </Grid>
          </Box>
        </Box>
       
      </Container>
      </div>
    </ThemeProvider>
  );
}
export default SignUpCard;