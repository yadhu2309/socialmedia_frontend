import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Signup.css'


const theme = createTheme();

export default function SignUp() {
const[show,setShow]=React.useState(true)

  //show password
const inputRef = React.useRef(null);
const showPassword = ()=>{
//  inputRef.current.focus()
if(inputRef.current.type==='password'){
  inputRef.current.type='text'
  setShow(false)
}
else{
  inputRef.current.type='password'
  setShow(true)
}
 
}
  
  const navigate = useNavigate()
  const[val,setValue] = React.useState({username:'',password:'',email:'',lastname:'',firstname:'',phone:''})
  const[error,setError] = React.useState({eusername:'',epassword:'',eemail:'',elastname:'',efirstname:'',ephone:''})
  const makeChange = (event)=>{
    const {name,value} = event.target;
    
    setValue(prevState =>({...prevState,[name]:value}))
    

    
   
}
  const handleSubmit = (event) => {
    event.preventDefault();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let content={}
    if(val.firstname === ''){
    content={
        ...content,
        efirstname:'please enter your name'
      }
     
    }
  if(val.lastname === ''){
    content={
      ...content,
        elastname:'please enter your name'
      }
      setError(content)
    }
     if(val.username === ''){
      content={
        ...content,
        eusername:'please enter a value'

      }
      setError(content)
    } if(val.email === '' || !val.email.match(validRegex)){
      content={
        ...content,
          eemail:'please enter valid email address'
         }
         setError(content)
        }if(val.phone === '' || val.phone.length>10 || val.phone.length<10){
          content={
            ...content,
            ephone:'please enter valid phone number'
          }
          setError(content)
    } if(val.password === ''){
      content={
        ...content,
         epassword:'please enter your password' 
      }
    }
    setError(content)
  if(Object.keys(content).length === 0){
    // console.log('content')

      axios.post('http://127.0.0.1:8000/api/signup/',{
      username:val.username,
      email:val.email,
      phone:val.phone,
      password:val.password,
      last_name:val.lastname,
      first_name:val.firstname,

    }).then((response)=>{
      // console.log(response);
      if(response.status ===201){
      setValue({email:'',phone:'',lastname:'',firstname:'',username:'',password:''})
      setError({eusername:'',epassword:'',eemail:'',elastname:'',efirstname:'',ephone:''})
      navigate('/')
      }
      else if(response.status===409){
        // console.log('409',response)
      }
    }).catch((error)=>{
     if(error.response.status===409){

      //  console.log('error',error.response.data)
       let content ={
        ...error,
        eusername:error.response.data.error
       }
       setError(content)
     }

    })
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#252525' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid  container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  variant="filled"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={makeChange}
                  value={val.firstname}
                  
                />
                {error.efirstname && <span style={{color:'red'}}>{error.efirstname}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={makeChange}
                  value={val.lastname}
                />
                {error.elastname && <span style={{color:'red'}}>{error.elastname}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={makeChange}
                  value={val.username}
                />
                {error.eusername && <span style={{color:'red'}}>{error.eusername}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={makeChange}
                  value={val.email}
                />
                {error.eemail && <span style={{color:'red'}}>{error.eemail}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  // className='input'
                  // style={{WebkitAppearance:'none'}}
                  fullWidth
                  type='number'
                  variant="filled"
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={makeChange}
                  value={val.phone}
                  
                />
                {error.ephone && <span style={{color:'red'}}>{error.ephone}</span>}
              </Grid>
              <Grid item xs={12}>
                <div style={{display:'flex',alignItems:'center'}}>
                <TextField
                 inputRef={inputRef}
                  required
                  variant="filled"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={makeChange}
                  value={val.password}
                />
                {show? <VisibilityIcon onClick={showPassword}/>:
                <VisibilityOffIcon onClick={showPassword}/>}</div>
                {error.epassword && <span style={{color:'red'}}>{error.epassword}</span>}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // color='secondary'
              sx={{ mt: 3, mb: 2 ,bgcolor:'#252525'}}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}