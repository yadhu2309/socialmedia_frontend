import * as React from 'react';
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


import jwt_decode from 'jwt-decode';

import './Login.css'
import axios from 'axios';
import { DateRange } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
// import { GoogleLogin } from 'react-google-login';

const theme = createTheme();

export default function SignIn(props) {
  let {authTokens,setAuthTokens,user,setUser,
    mentorLog,setMentorLog,authTokenMentor,setAuthTokenMentor} = React.useContext(AuthContext)
  const navigate = useNavigate();
  const[error,setError] = React.useState()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    axios.post('https://prosmedia.online/api/token/',{
      username:data.get('username'),
      password:data.get('password'),
    }).then((response)=>{
      console.log('entered',response.data)
      console.log('lol',jwt_decode(response.data.access))
      if(response.status == 200){
        if(!jwt_decode(response.data.access).is_staff && !jwt_decode(response.data.access).is_superuser && props.value==='user'){
          // console.log('is_staff',user.is_staff)
          setUser(jwt_decode(response.data.access))
          setAuthTokens(response.data)
          localStorage.setItem('authTokenUser',JSON.stringify(response.data))
          navigate('/user/');
        }
        else if(jwt_decode(response.data.access).is_staff && props.value === 'mentor'){
          setMentorLog(jwt_decode(response.data.access))
          setAuthTokenMentor(response.data)
          localStorage.setItem('authTokenMentor',JSON.stringify(response.data))
          navigate('/mentor/')
        }
        else{
          setError('Invalid Username or Password')
        }
      }
      console.log(response.status);
     
      
     
    }).catch((error)=>{
    if(error){
      setError('Invalid Username or Password')
      console.log(error);
    }
    })

  };

  // const onLoginSuccess = (res)=>{
  //   console.log('google',res)

  // }

  React.useEffect(()=>{
    
    /* global google */
    google.accounts.id.initialize({
      client_id:"730262936029-9tqdo6l41sjmu08i7avrdiut35thgaad.apps.googleusercontent.com",
      callback:handleLogin
    })
  
    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      {size:"large",overflow:'hidden'}
);
  },[])

  function handleLogin(response){
    console.log("from google",response.credential)
    var user_obj=jwt_decode(response.credential);
    console.log(user_obj)
    
    
    axios.post("https://prosmedia.online/api/google_signin",{
      username:user_obj.name,
      email:user_obj.email,
      googleprofile:user_obj.picture,
    }).then((res)=>{
      if(res.status==201 || res.status==200){
      
      setAuthTokens(response.credential)
      let user_goole = jwt_decode(response.credential)
      console.log('iamapi',res.data)
      user_goole.id=res.data.id
      user_goole.username=res.data.username
      console.log('iamgoogle',user_goole)
      setUser(user_goole)
        localStorage.setItem('authTokenUser',JSON.stringify(response.credential))
        navigate('/user/');
    //  console.log(res.data)
    //   setisLoggedIn(true);
      }
     


})

}

  return (
    <div className='cover'>
    {console.log('error',error)}
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
             variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error &&

<Box 
sx={{
  display: 'inline-flex',
  m: 1,
  p: 1,
  bgcolor:'red',
  // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
  // color: (theme) =>
  //   theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
  border: '1px solid',
  borderColor: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
  borderRadius: 2,
  fontSize: '0.875rem',
  fontWeight: '700',
  
}}
>
{error}
</Box>
}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,background:'#252525' }}
              // color='secondary'
            >
              Sign In
            </Button>
           
            {/* <GoogleLogin
    clientId="648304199422-3dk90rtqba3tir9bf8ja2arck9evu14a.apps.googleusercontent.com"
    buttonText="Login"
    // onSuccess={onLoginSuccess}
    // onFailure={onLoginFailure}
    cookiePolicy={'single_host_origin'}
  /> */}
  
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
        {props.value === 'user' && 
        
          <span id='signinDiv'></span>
         
          
          }
    
      </Container>
    </ThemeProvider>
    </div>
  );
}