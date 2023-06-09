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
import axios from 'axios';
import { Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




const theme = createTheme();

export default function FormMentors() {
  const[val,setValue] = React.useState({username:'',password:'',email:'',lastname:'',firstname:'',phone:'',address:'',country:'',state:''})
  const[error,setError] = React.useState({eusername:'',epassword:'',eemail:'',
  elastname:'',efirstname:'',ephone:'',eaddress:'',ecountry:'',estate:''})
//show password
const[show,setShow]=React.useState(true)

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
  const makeChange = (event)=>{
    
    const {name,value} = event.target;
 
    
    setValue(prevState =>({...prevState,[name]:value}))
    
    if(name==='firstname'){
      if(value!=''){
      let content={
        ...error,
        efirstname:''
      }
      setError(content)
    }
    else{
      let content={
        ...error,
        efirstname:'please enter a valid firstname'
      }
      setError(content)

    }
    } 
    else if(name==='username'){
        if(value!=''){
        let content={
          ...error,
          eusername:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          eusername:'please enter a valid username'
        }
        setError(content)

      }
      }
      else if(name==='country'){
        if(value!=''){
        let content={
          ...error,
          ecountry:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          ecountry:'please fill this field'
        }
        setError(content)

      }
      }else if(name==='address'){
        if(value!=''){
        let content={
          ...error,
          eaddress:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          eaddress:'please enter a valid address'
        }
        setError(content)

      }
      }
      else if(name==='state'){
        if(value!=''){
        let content={
          ...error,
          estate:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          estate:'please fill this field'
        }
        setError(content)

      }
      }else if(name==='email'){
        if(value!=''){
        let content={
          ...error,
          eemail:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          eemail:'please enter a valid email'
        }
        setError(content)

      }
      }
      else if(name==='phone'){
        if(value!=''){
        let content={
          ...error,
          ephone:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          ephone:'please enter a valid phone'
        }
        setError(content)

      }
      }
      else if(name==='password'){
        if(value!=''){
        let content={
          ...error,
          epassword:''
        }
        setError(content)
      }
      else{
        let content={
          ...error,
          epassword:'please enter a valid password'
        }
        setError(content)

      }
      }

   
}

  const handleSubmit = (event) => {
    event.preventDefault();
   
    let content = {}
    if(val.firstname===''){
     content = {
       ...content,
       efirstname:'please enter a valid firstname'
     }
 
   }
   if(val.lastname===''){
    content = {
      ...content,
      elastname:'please enter a valid lastname'
    }
   
  }
  if(val.address===''){
    content = {
      ...content,
          eaddress:'please enter a valid address'
        }
   
      }
      if(val.country===''){
        content = {
          ...content,
              ecountry:'please fill this field'
            }
          
          }
          if(val.state===''){
            content = {
              ...content,
              estate:'please fill this field'
            }
         
          }
      
   
    if(val.username===''){
      content = {
        ...content,
        eusername:'please enter a valid username'
      }
   
    }
   
     if(val.email===''){
      content = {
        ...content,
        eemail:'please enter a valid email'
      }
     
    }
    if(val.phone===''|| val.phone.length<10 || val.phone.length>10){
      content = {
        ...content,
        ephone:'please enter a valid phone number'
      }
      
    } 
    if(val.password===''){
      content = {
        ...content,
        epassword:'please enter a valid password'
      }
      
    }   
    setError(content)
  
if(Object.keys(content).length === 0){
  setError({eusername:'',epassword:'',eemail:'',
  elastname:'',efirstname:'',ephone:'',eaddress:'',ecountry:'',estate:''})
    axios.post('https://prosmedia.online/api/mentors',{
      username:val.username,
      email:val.email,
      phone:val.phone,
      password:val.password,
      last_name:val.lastname,
      first_name:val.firstname,
      address:val.address,
      state:val.state,
      country:val.country,
      

    }).then((response)=>{
      // console.log(response.data);
      setValue({email:'',phone:'',lastname:'',firstname:'',username:'',password:'',address:'',state:'',country:''})
    })
  }
  };


  return (
   
    <ThemeProvider theme={theme}>
      {/* {console.log("error",error)} */}
      <Container component="main" maxWidth="xs" sx={{ border:1,backgroundColor:'#D9D9D9'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           
          }}
        >
          
          {/* <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          <Box component="form" noValidate sx={{ mt: 3 ,}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  variant="filled"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={makeChange}
                  value={val.firstname}
                />
                {error.efirstname&&<span style={{color:'red'}}>{error.efirstname}</span>}
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
                {error.elastname&&<span style={{color:'red'}}>{error.elastname}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  variant="filled"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  onChange={makeChange}
                  value={val.address}
                />
                {error.eaddress&&<span style={{color:'red'}}>{error.eaddress}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  variant="filled"
                  fullWidth
                  id="Country"
                  label="Country"
                  name="country"
                  autoComplete="state"
                  onChange={makeChange}
                  value={val.country}
                />
                {error.ecountry&&<span style={{color:'red'}}>{error.ecountry}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="filled"
                  fullWidth
                  id="State"
                  label="State"
                  name="state"
                  
                  onChange={makeChange}
                  value={val.state}
                />
                {error.estate&&<span style={{color:'red'}}>{error.estate}</span>}
              </Grid>
              <Divider/>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="filled"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={makeChange}
                  value={val.username}
                />
                {error.eusername&&<span style={{color:'red'}}>{error.eusername}</span>}
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
                {error.eemail&&<span style={{color:'red'}}>{error.eemail}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="filled"
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={makeChange}
                  value={val.phone}
                />
                {error.ephone&&<span style={{color:'red'}}>{error.ephone}</span>}
              </Grid>
              <Grid item xs={12}>
               <div style={{display:'flex',alignItems:'center'}}> <TextField
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
                {error.epassword&&<span style={{color:'red'}}>{error.epassword}</span>}
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
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    
  );
}