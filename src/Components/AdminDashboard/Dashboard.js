import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HorizontalCard from '../HorizontalCard/HorizontalCard'
import Table from '../Table/Table'


import axios from 'axios';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormMentors from '../FormMentor/FormMentor';
import { Stack } from '@mui/material';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent(props) {
  const navigate = useNavigate()
  let{mentor,setMentor,reqBool,setReqBool,setBoo,setMentorDetails,setRequestDetails,detail,setDetail,requests,setRequests,requestDetails}=React.useContext(AuthContext)
  const [open, setOpen] = React.useState(true);
 
  let arr;
  const toggleDrawer = () => {
    setOpen(!open);
  };
const handleDetail=(id)=>{
  // console.log('men',mentor[id])
  setMentorDetails(mentor[id])
  // console.log('menlast',mentor[id].last_name)
// arr.push(mentor[id].user)
// console.log('he;o',mentor[id].user);
setDetail(mentor[id].user[0])
mentor[id].user.map((data)=>{
  // console.log(data.uid);
})

}

const requestDetailshandle=(id)=>{
  // console.log('welcome',requests[id])
  setRequestDetails(requests[id])
  setBoo(true)
}


  const approveRequest = (id)=>{
    // console.log("f",id);
    axios.put(`http://127.0.0.1:8000/api/approve_user/${id}`,{
      approve:true,
    }).then((response)=>{
      // console.log('requestverify',response.data)
      setRequests(response.data)
    })
  }
  React.useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/requesttoverify').then((response)=>{
      setRequests(response.data)
      setReqBool(true)
     
    })
    
    },[])  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* {console.log('det',detail)} */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                {/* <NotificationsIcon /> */}
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <span style={{marginLeft:'10%',cursor:'pointer'}} onClick={()=>{navigate('/admin/')}}>Home</span>
            <Divider sx={{ my: 1 }} />
            <span style={{marginLeft:'10%',cursor:'pointer'}} onClick={()=>{navigate('/admin/mentors')}}>Mentors</span>
            <Divider sx={{ my: 1 }} />
            <span style={{marginLeft:'10%',cursor:'pointer'}} onClick={()=>{navigate('/admin/addmentors')}}>Add Mentors</span>
            {/* <Divider sx={{ my: 1 }} />
            <span style={{marginLeft:'10%',cursor:'pointer'}} >Users</span> */}
            <Divider sx={{ my: 1 }} />
            <span style={{marginLeft:'10%',cursor:'pointer'}} onClick={()=>{navigate('/admin/requests')}} >Request</span>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor:'#252525',
            //  (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          
            <Stack spacing={1}>
              
             {/* <h1>{props.value}</h1> */}
             {props.value === 'helo'? 
              <Table title={props.value} actions={(index)=>handleDetail(index)} rows={mentor}/>
            //  <FormMentors/>
            // mentor.map((data,index)=>{
            //   return( <div style={{minWidth:'90%',margin:'auto'}} 
            //   onClick={
            //    ()=>{
            //       handleDetail(index)
            //     }} 
            //   key={index}>
            //      <HorizontalCard username={data.username} rid={data.id}/>
            //      </div>)
            // })
            // <HorizontalCard />
          
            :''}
            {/* {console.log("addwe",props.value)} */}
            {props.value === 'add'?<FormMentors/>:''}
            {props.value==='requests'?
         
            reqBool?
            <>
            <Table title='requests'
            rows={requests}
            actions={(index)=>{requestDetailshandle(index)}}
            action={()=>{approveRequest(requestDetails.id)}}/>
            </>
            // requests.map((data,index)=>{
            //   return( <div style={{minWidth:'90%',margin:'auto'}} 
            //   onClick={
            //    ()=>{
            //     requestDetailshandle(index)
            //     }} 
            //   key={index}>
            //    <HorizontalCard action={()=>approveRequest(requestDetails.id)} title='request' username={data.username}/>
            // </div>)
            // })
            :'':''}
             
            </Stack>
            
           
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    
  );
}

export default function Dashboard(props) {
  return <DashboardContent value={props.val}/>;
}