import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../utils/AuthContext';
import Modal from '@mui/material/Modal';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);




export default function BasicCard(props) {
  const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
let{detail,mentor,setDetail,mentorDetails,requests,requestDetails,setRequestDetails,setRequests,user}=React.useContext(AuthContext)




  return (
    <>
    <Card sx={{minWidth:'90%',minHeight:"5%",margin:'auto',marginBottom:'1em',backgroundColor:'#5142AF',paddingTop:3 }}>
      <CardContent sx={{display:'flex',justifyContent:"space-between"}}>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" color='#D9D9D9'  component="div">
         <span onClick={handleOpen}> {props.username}</span>
         {/* {detail.address}
         {detail.country}
         {detail.state} */}
         {/* {mentor[0].last_name} */}
        </Typography>
        {/* <Typography  color="text.secondary">
          adjective
        </Typography> */}
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
        {/* {props.title==='request' && <div  ><button onClick={()=>{props.action(requestDetails.id)}}>Approve{requestDetails.id}</button></div>} */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      {/* {console.log('detail',detail)} */}
    </Card>
    {/* <Button >Open modal</Button> */}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title?'Request Details':'Mentor Details'}
        </Typography>
        {props.title==='request'?
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
          {console.log('requestDetails',requestDetails)}
          
          Name:{requestDetails.name}{requestDetails.id}<br/>
          Username:{requestDetails.username}<br/>
          Phone:{requestDetails.phone}<br/>
          Email:{requestDetails.email}<br/>
         Address:{requestDetails.address},{requestDetails.country},{requestDetails.state}<br/>
        Enterprise:{requestDetails.company_name}<br/>
        Enterprise_Email:{requestDetails.email_company}<br/>
        License Id:{requestDetails.license_id}

      </Typography>:
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
 Name:{mentorDetails.first_name} {mentorDetails.last_name}<br/>
        Username:{mentorDetails.username}<br/>
        Phone:{mentorDetails.phone}<br/>
        Email:{mentorDetails.email}<br/>309
       Address:{detail.address},{detail.country},{detail.state}


          
          
        </Typography>
        }
        <button onClick={handleClose}>Close</button>
        <button onClick={()=>{handleClose();props.action()}}>Approve</button>
      </Box>
    </Modal></>
  );
}