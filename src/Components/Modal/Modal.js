import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";
import axios from 'axios';
import { AuthContext } from '../../utils/AuthContext';
import { Stack } from '@mui/system';
import { Grid } from '@mui/material';


import ReactCrop from 'react-image-crop'

 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#c8ccc9',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
  height:500,
  minWidth:500,
  borderRadius:'10px'
  // display:'flex',
  // justifyContent:'center',
  // alignItems:'center'

 
};

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[image,setImage] = React.useState();
  const[filename,setFilename] = React.useState();
  const[check,setCheck] = React.useState(false);

  const[nextBool,setNextBool] = React.useState(false)
// verify user

  const[val,setValue] = React.useState({first_name:'',
  last_name:'',
  email:'',phone:'',
  company_name:'',
  company_phone:'',
  company_address:'', 
  company_email:'',
 
  about:"",
  
  address:'',

})
const[error,setError] = React.useState({first_name:'',
  last_name:'',
  email:'',phone:'',
  company_name:'',
  company_phone:'',
  company_address:'', 
  company_email:'',
 
  about:"",
  
  address:'',

})

  let{user,mentorLog} = React.useContext(AuthContext)

  const makeChange = (event)=>{
    const {name,value} = event.target;
    setValue(prevState =>({...prevState,[name]:value}))
    console.log("iamval",val)
   
}

const requestSubmit =()=>{
  let content ={}
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(val.first_name==='' || val.last_name===''){
    content={
      ...content,
      first_name:'please enter a valid name'
    }
    setError(content)
  }if(val.phone===''|| val.phone.length<10 || val.phone.length>10){
    content={
      ...content,
      phone:'please enter a valid phone number'
    }
  
  }
  if(val.email===''|| !val.email.match(validRegex)){
    content={
      ...content,
      email:'please enter a valid email'
    }
   

  }if(val.address===''){
    content={
      ...content,
      address:'please enter a valid address'
    }


  }if(val.company_name===''){
    content={
      ...content,
      company_name:'please enter a valid name'
    }
    

  }
  if(val.company_email===''){
    content={
      ...content,
      company_email:'please enter a valid email'
    }
 


  }
  if(val.company_address===''){
    content={
      ...content,
      company_address:'please enter a valid address'
    }
    
    
  }
  setError(content)
  if(Object.keys(content).length === 0){
  axios.post('https://www.smedia.fun/api/requesttoverify',{
    name:val.first_name+val.last_name,
    email:val.email,
    phone:val.phone,
    company_name:val.company_name,
    email_company:val.company_email,
  
    address:val.address,
    company_address:val.company_address,
   
    uid:user.id,
   
  }).then((response)=>{
    console.log("request",response.data)
    setValue({first_name:'',
  last_name:'',
  email:'',phone:'',
  company_name:'',
  company_phone:'',
  company_address:'', 
  company_email:'',
  // lino:'',
  // about:"",
  // country:'',
  // state:'',
  address:'',
  // contact:''
})
handleClose();
  })
}}

  const handleImage=(e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
    console.log('image',e.target.files[0])
    setCheck(true)
    setFilename(e.target.files[0])


  }

  const handleChangeProfileImage= ()=>{
    const uploadImage = new FormData()
    uploadImage.append('dp',filename)
    props.identity==='mentor'?uploadImage.append('uid',mentorLog.id):uploadImage.append('uid',user.id)

    axios.post(`https://www.smedia.fun/api/changeprofileImage/${props.identity==='mentor'?mentorLog.id:user.id}`,uploadImage).then((response)=>{
      console.log(response.data)
      setFilename('')
      setImage('')
      handleClose()
    })
   



  }

  const handleProfileImage= ()=>{
    const uploadImage = new FormData()
    uploadImage.append('dp',filename)
    props.identity==='mentor'?uploadImage.append('uid',mentorLog.id):uploadImage.append('uid',user.id)

    axios.post(`https://www.smedia.fun/api/profileImage/${props.identity==='mentor'?mentorLog.id:user.id}`,uploadImage).then((response)=>{
      console.log(response.data)
      setFilename('')
      setImage('')
      handleClose()
    })
   



  }

  return (
    <div>
      {props.modalvalue==='profile' && <Button onClick={()=>{handleOpen();}}>{props.boolval?<span>Change Profile</span>:<span>profile Picture</span>}</Button>}
      {props.modalvalue==='requesttoverify'?props.mveri?'':<Button onClick={()=>{handleOpen();}}>Request to Verify</Button>:''}
      {/* {props.modalvalue==='editprofile' && <Button onClick={()=>{handleOpen();}}>Edit profile</Button>} */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
              >
        <Fade in={open}>
          <Box sx={style} >
            {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography> */}
 {/* #####################################            */}           
            {props.modalvalue==='profile' && <>

            <Box 
            style={{display:'flex',justifyContent:'center',
            alignItems:'center',minWidth:'100%',
            height:"90%",overflowY:'hidden'}}>

                {check?<><img src={image} width='60%'/></>: 
             <><input type='file' name='select from device'
              onChange={handleImage} id='custom-file-input'
              accept="image/*"
               hidden/>
            <motion.label className='lab' whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
           dragConstraints={{ left: -100, right: 100 }} 
           htmlFor='custom-file-input'
             >
                select from device
             </motion.label>
             </>
             }
            </Box>
          <Box id="transition-modal-description" sx={{ mt: 2,padding:'auto' }}>
              {check && <Box style={{border:'1px solid',
              width:'100%',display:'flex',
              justifyContent:'right'}} >
                {props.boolval?<>
                <button onClick={handleChangeProfileImage}>Change</button></>
              :<><button onClick={handleProfileImage}>Post</button></>}</Box>}
            </Box>
           </> }
{/* #####################################            */}
           {/* verify user form */}


           {props.modalvalue==='requesttoverify' &&
           <>
           
           <Grid container direction='row' spacing={1}>
          
           
              
              
               
               
               
            
           
           <>
           <label>Personal Details</label>
               <div style={{display:'flex'}}>
               
              <TextField id="filled-basic"
               name='first_name'
               autoFocus
               label="First Name"
                variant="filled"
                onChange={makeChange}
                value={val.first_name} />
                
              <TextField sx={{marginLeft:1}}
               name='last_name'
                id="filled-basic"
                 label="Last Name"
                  variant="filled"
                  onChange={makeChange}
                  value={val.last_name} />
              </div>
              {error.first_name && <span style={{color:"red"}}>{error.first_name}</span>}
              <div style={{display:'flex',marginTop:'1em'}} >
              <div><TextField id="filled-basic"
              type='number'
               name='phone'
               inputProps={{  maxLength: 10 }}
                label="Phone"
                 variant="filled"
                 onChange={makeChange}
                 value={val.phone} /><br/>
                 {error.phone && <span style={{color:"red"}}>{error.phone}</span>}
                 </div>
                  <div>
              <TextField sx={{marginLeft:1}}
               name='email'
                id="filled-basic"
                 label="Email Address"
                  variant="filled"
                  onChange={makeChange}
                  value={val.email} /><br/>
                  {error.email && <span style={{color:"red"}}>{error.email}</span>}
                  </div>
              </div>
              <div style={{width:'100%',marginTop:'1em'}}>
                
              <TextField id="filled-basic"
               name='address'
                fullWidth
                 label="Address"
                  variant="filled"
                  onChange={makeChange}
                  value={val.address} />
                  {error.address && <span style={{color:"red"}}>{error.address}</span>}
              </div>
              
              <label style={{marginTop:'1em'}}>Enterprise Details</label>
              
             
              <div style={{display:'flex'}} >
               <div> 
              <TextField id="filled-basic"
               name='company_name' 
                label="Name"
                 variant="filled"
                 onChange={makeChange}
                 value={val.company_name} /><br/>
                 {error.company_name && <span style={{color:"red"}}>{error.company_name}</span>}
                 </div>
                 <div>
              <TextField sx={{marginLeft:1}} 
              name='company_email'
               id="filled-basic" 
               label="Email Address" 
               variant="filled"
               onChange={makeChange}
               value={val.company_email} /><br/>
               {error.company_email && <span style={{color:"red"}}>{error.company_email}</span>}
               </div>
              </div>
              <div style={{width:'100%',marginTop:'1em'}}>
              <TextField id="filled-basic" 
              fullWidth  
              label="Address"
               variant="filled" 
               name='company_address'
               onChange={makeChange}
               value={val.company_address}
               />
               {error.company_address && <span style={{color:"red"}}>{error.company_address}</span>}
              </div>
              <div style={{border:'1px solid',width:'100%',display:'flex',justifyContent:'space-between',marginTop:'1em'}}>
              <button>Close</button>
              <button onClick={requestSubmit} >Submit</button>
              </div>
              </>
              
              </Grid>
           </>}
          </Box>
          
        </Fade>
      </Modal>
    </div>
  );
}