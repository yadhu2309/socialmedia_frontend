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

import PersonIcon from '@mui/icons-material/Person';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


import Avatar from '@mui/material/Avatar';
import { LazyLoadImage } from "react-lazy-load-image-component";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import { AuthContext } from '../../utils/AuthContext';

import ModalEdit from '../Modal/Modal'
import axios from 'axios';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import { w3cwebsocket as W3CWebSocket } from "websocket"


import './Dashboard.css'


const optionStyles = {
  cursor:'pointer',
}

const commonStyles1 = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '2rem',
  height: '2rem',
};

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '4rem',
  height: '4rem',
};


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

  //mentorlist
  const[mentorlist,setMentorlist] = React.useState()

  // popover
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const openpop = Boolean(anchorEl);
const id = openpop ? 'simple-popover' : undefined;
//////////////////////////////////////////


  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  //select user
const[selectUser,setSelectUser]=React.useState()
const[selectIndex,setSelectIndex]=React.useState()
const[divIndex,setDivIndex]=React.useState()

// for chat

//selecting user
const select_user = (index)=>{
  verifeiduser && setSelectUser(v_users[index])
  personalstate && setSelectUser(users[index])
  mentorstate && setSelectUser(connection[index])
  setSelectIndex(index)
  messages && setMessages('')

}
const borderHandle=(id)=>{
  setDivIndex(id)

}

const[rooms,setRooms] = React.useState('')
const[receiverName,setReceiverName] = React.useState()
const[roomDetails,setRoomDetails]=React.useState()
const[messages,setMessages] = React.useState([])
  const[b,setB]=React.useState()
  const clients = React.useRef()
const[msg,setMsg]=React.useState('')
const roomCreation=(receiver_name,sender_name)=>{
  // sender_name===user.username?
  //    setRooms(receiver_name+sender_name):set
  setReceiverName(receiver_name)
console.log('mentorroom',receiver_name+sender_name)
   axios.post('http://127.0.0.1:8000/api/rooms',{
    room_name:receiver_name+sender_name,
    sender:sender_name,
    receiver:receiver_name
   }).then((response)=>{
    if(response.status === 200){
      console.log('response 200',response)
      setRooms(response.data)
    }
    console.log('successfully created',response.data[0].room_name)
     setRooms(response.data[0])
    
   })
  //  setRoomDetails(true)
    // setB(!b)
   
  // console.log('seder',rooms)
//  makewebConnection(rooms)

}


const sendMessage=()=>{
  console.log('iam clie',clients.current,msg)
  clients.current.send(JSON.stringify({
    type:'chat_message',
    text:msg,
    sender:mentorLog.username,
    room_name:rooms.id,
    receiver:''
  }))
    setB(true)
    setMsg('')
}
const makeChange=(e)=>{
setMsg(e.target.value)
}

const messagesEndRef = React.useRef(null)

const scrollToBottom = () => {
  messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
}

React.useEffect(() => {
 rooms && scrollToBottom()
}, [messages]);

React.useEffect(()=>{
  // console.log('username ',user.username)
   
  clients.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${rooms.room_name}/`)
  // setClient(clients)
  rooms&&axios.get(`http://127.0.0.1:8000/api/chatmessages/${rooms.id}`).then((response)=>{
    setMessages(response.data)
})
       console.log(clients.current,"hey",rooms.room_name)
    if(clients.current) {

      clients.current.onopen = () => {
  console.log("WebSocket Client Connected");
  }}
console.log('after send',clients.current)


  clients.current.onmessage=(message)=>{
   console.log('message whne connect',message)
   let m = JSON.parse(message.data)
   console.log('m',m)
    setMessages(messages=>[...messages,m])
 
  }
  
 
//  roomDetails && axios.get(`http://127.0.0.1:8000/api/rooms/${roomDetails.sender}/${roomDetails.receiver}`).then((response)=>{
//           console.log('successfully created get',response.data)
//          })

},[rooms.room_name])
React.useEffect(()=>{
  rooms&&selectUser.username===receiverName&&axios.get(`http://127.0.0.1:8000/api/chatmessages/${rooms.id}`).then((response)=>{
    setMessages(response.data)
})

},[selectIndex])


  //handle follow

  const[follow,setFollow] = React.useState()
  let array = []
  const[connection,setConnection] = React.useState()
  const[f_bool,setF_bool] = React.useState(false)

  const handleFollow = (id)=>{
    console.log('followid',id)
    axios.post(`http://127.0.0.1:8000/api/follow_check/${mentorLog.id}`,{
      acc_uid:mentorLog.id,
      f_uid:id
    }).then((response)=>{
             console.log('followdone',response.data)
            setFollow(response.data)
            setF_bool(!f_bool)
    })
  }
  const handleUnfollow = (id)=>{
    axios.delete(`http://127.0.0.1:8000/api/unfollow/${id}/${mentorLog.id}`).then((response)=>{
      // console.log('success')
      setFollow(response.data)
      setF_bool(!f_bool)
    })
  }

  // chat nav
  const personal=()=>{
    setSelectIndex()
    setSelectUser('')
    setMessages()
    setPersonalstate(true)
    mentorstate && setMentorstate(false)
    verifeiduser && setVerifiedUser(false)

  }
  const VerifiedUser=()=>{
    setSelectIndex()
    setSelectUser('')
    setMessages()
setVerifiedUser(true)
mentorstate && setMentorstate(false)
personalstate && setPersonalstate(false)
  }
  const mentor=()=>{
    setSelectIndex()
    setSelectUser('')
    setMessages()
    setMentorstate(true)
    verifeiduser && setVerifiedUser(false)
    personalstate && setPersonalstate(false)
    
    
  }

  const navigate = useNavigate()
  //users
  const[users,setUsers] = React.useState()

  //verified users
  const[v_users,setV_users]=React.useState()

  //profile image
  const[profile,setProfile] = React.useState()
  const[bool,setBool] = React.useState()

  //nav
  const[personalstate,setPersonalstate] = React.useState(true)
  const[mentorstate,setMentorstate] = React.useState(false)
  const[verifeiduser,setVerifiedUser] = React.useState(false)
  let{setAuthTokens,setUser,mentorLog, setMentorLog,setAuthTokenMentor}  =React.useContext(AuthContext)
 
  const[modalvalues,setModalValues] = React.useState({request:'requesttoverify',editprofile:'editprofile',profile:'profile'})

  //logout
  const logout =()=>{
    setMentorLog(null)
          setAuthTokenMentor(null)
          // localStorage.setItem('authTokenMentor',JSON.stringify(response.data))
          // navigate('/mentor/')
    
    // setUser(null)
    localStorage.removeItem('authTokenMentor')
    navigate('/mentor/login')
  }

  React.useEffect(()=>{

    //users
    axios.get('http://127.0.0.1:8000/api/users').then((response)=>{
        setUsers(response.data)
        console.log('users data',response.data)
    })

    //verifeid users
    axios.get('http://127.0.0.1:8000/api/userlist').then((response)=>{
      setV_users(response.data)
    })

    axios.get(`http://127.0.0.1:8000/api/profileImage/${mentorLog.id}`).then((response)=>{
      // 
      console.log(response.data)
     
      setProfile(response.data.dp.replace('/media/profileImages/',''))
      // console.log("ri",profile);
      setBool(true)
      // dp=response.data.dp.replace('/media/profileImages/','')
      
  })

  axios.get('http://127.0.0.1:8000/api/mentor_list').then((response)=>{
    setMentorlist(response.data)
  })
  // follow 
  axios.get(`http://127.0.0.1:8000/api/follow/${mentorLog.id}`).then((response)=>{
    console.log('menotfollow',response.data);
    setFollow(response.data)
})

axios.get(`http://127.0.0.1:8000/api/followgets/${mentorLog.id}`).then((response)=>{
          setConnection(response.data)
          console.log('following',response.data)
        })

  },[f_bool])

  return (
    <div>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
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
              {props.value}
            </Typography>
            <IconButton color="inherit">
            {/* <LazyLoadImage src={data.urlToImage}
                              width='100%' height='100%'
                              alt="Image Alt" /> */}
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
                 <Box sx={{ ...commonStyles1, borderRadius: '50%',cursor:"pointer",overflowY:'hidden'}} onClick={handleClick} aria-describedby={id}
            
             >
                            {profile?<LazyLoadImage  src={require('../../profileImages/'+profile)} style={{width:'100%',height:'100%'}} />: <Avatar sx={{width:'100%',height:'100%'}}/>}  
                                </Box>
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
            <span style={{...optionStyles}} onClick={()=>navigate('/mentor/')}>home</span>
            <Divider sx={{ my: 1 }} />
            <span style={{...optionStyles}} onClick={()=>navigate('/mentor/mentorlist/')}>mentors</span>
            <Divider sx={{ my: 1 }} />
            <span style={{...optionStyles}} onClick={()=>navigate('/mentor/userslist/')}>users</span>
            <Divider sx={{ my: 1 }} />
            <span style={{...optionStyles}} onClick={()=>navigate('/mentor/chat/')}>chat</span>
            <Divider sx={{ my: 1 }} />
            <span style={{...optionStyles}} onClick={logout}>logout</span>
            <Divider sx={{ my: 1 }} />
            
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              
              {props.value==='mentorlist' || props.value ==='userslist'? <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 440,
                  }}
                >
                  {follow && follow.map((data)=>{
                    array.push(data.f_uid)
                  })}
                  {props.value==='mentorlist'?<h4>Mentors</h4>:<h4>Users</h4>}
                  {props.value==='mentorlist'?
                  mentorlist && mentorlist.map((data,index)=>{
                    console.log('datament',data.id)
                    let imageProf=data.profile
                    if(data.id !== mentorLog.id){
                    return(
                      <div key={index} 
                      style={{paddingRight:"5px",display:'flex',
                      justifyContent:'space-between',alignItems:'center',
                      border:'1px solid',cursor:'pointer'}}>
                       <div style={{display:"flex",alignItems:'center'}}> <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'none',
                        width: '2rem',
                        height: '2rem', borderRadius: '50%',
                        overflowY:'hidden',
                        cursor:'pointer'
                         }} >
                            
     {imageProf? <img src={require('../../'+imageProf)} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
     </Box>
                        <span>{data.username}</span>
                        </div>

                        {!array.includes(data.id)?<span onClick={()=>handleFollow(data.id)}  style={{color:'blue'}}>Connect</span>
                        :
                        <span onClick={()=>handleUnfollow(data.id)}  style={{color:'blue'}}>Disconnect</span>
                  }
                      </div>
                    )}
                  }):

                  users && users.map((data,index)=>{
               
                    return(
                      <div key={index} style={{paddingRight:"5px",display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid',cursor:'pointer'}}>
                            <div style={{display:"flex",alignItems:'center'}}> <Box sx={{  bgcolor: 'white',
                             borderColor: 'text.primary',
                             m: 1,
                             border:'none',
                             width: '2rem',
                             height: '2rem', borderRadius: '50%',
                             overflowY:'hidden',
                             cursor:'pointer'
                              }} >
                                 
          {data.profile? <img src={require('../../'+data.profile)} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
          </Box>
                             <span>{data.username}</span>
                             </div>
                             </div>
                    )
                  })

                  }
               
                  
                </Paper>
              </Grid>:''}
                 
              
              {/* Recent Deposits */}
              {props.value==='mentorlist' || props.value==='userslist'?   <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 440,
                  }}
                >
                  {props.value==='userslist'?<h4>Verified Users</h4>:<h4>Connections</h4>}
                  {props.value==='mentorlist'?
                    connection && connection.map((data,index)=>{
                      let imageProf=data.profile
                      console.log('data90',data)
                      return(
                        
                        <div key={index} style={{paddingRight:"5px",display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid',cursor:'pointer'}}>
                        <div style={{display:"flex",alignItems:'center'}}> <Box sx={{  bgcolor: 'white',
                         borderColor: 'text.primary',
                         m: 1,
                         border:'none',
                         width: '2rem',
                         height: '2rem', borderRadius: '50%',
                         overflowY:'hidden',
                         cursor:'pointer'
                          }} >
                             
      {imageProf? <img src={require('../../'+imageProf)} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
      </Box>
                         <span>{data.username}</span>
                         </div>
                         </div>

                      )

                    }):v_users && v_users.map((data,index)=>{
                      console.log('mentor list users',data)
                      return(
                        <div key={index} style={{paddingRight:"5px",display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid',cursor:'pointer'}}>
                        <div style={{display:"flex",alignItems:'center'}}> <Box sx={{  bgcolor: 'white',
                         borderColor: 'text.primary',
                         m: 1,
                         border:'none',
                         width: '2rem',
                         height: '2rem', borderRadius: '50%',
                         overflowY:'hidden',
                         cursor:'pointer'
                          }} >
                             
      {data.user_image.length===1&&data.user_image? <img src={require('../../'+data.user_image[0].dp.replace('/media/',''))} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
      </Box>
                         <span>{data.username}</span>
                         </div>
                         </div>
                      )
                    })
                  }

                  
                </Paper>
              </Grid>:''}
              {/* chat */}
              {props.value==='chat' && <Grid item xs={12}>
              
              
              
            
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',
              height:440 }}>

<div style={{width:'100%',height:40,display:'flex'}}>
              <div style={{width:'30%',height:"90%",border:'1px solid',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
              <PersonIcon sx={{color:personalstate?'blue':'black',cursor:'pointer'}} onClick={personal}/>
              <VerifiedUserIcon sx={{color:verifeiduser?'blue':'black',cursor:'pointer'}} onClick={VerifiedUser}/>
                    <SupervisedUserCircleIcon sx={{color:mentorstate?'blue':'black',cursor:'pointer'}} 
                    onClick={mentor}
                    />
              </div>
              <div style={{width:'70%',height:'90%',border:'1px solid',display:'flex'}}>
                <div style={{display:'flex',alignItems:'center',overflow:'hidden'}}>
                { selectUser && <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'1px solid #656566',
                        width: '1.5rem',
                        height: '1.5rem', borderRadius: '50%',
                        overflowY:'hidden',
                        cursor:'pointer'
                         }} >
                            
     {selectUser.dp? <img src={require('../'+selectUser.dp)} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
        </Box>}
                      <span style={{fontWeight:'bold'}}>{selectUser && selectUser.username}</span>
                </div>
              
              </div>
              </div>
                <div style={{width:'100%',height:"90%",display:'flex'}}>
                <div style={{width:'30%',border:'1px solid'}}>
                  {personalstate?
                    users && users.map((data,index)=>{
               
                      return(
                        <div key={index} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                              <div style={{display:"flex",alignItems:'center',width:"100%",
                                backgroundColor:divIndex === index | selectIndex === index ?'#bfbebb':'',}}
                                onMouseEnter={()=>borderHandle(index)}
                                onMouseLeave={()=>borderHandle(null)}
                                   onClick={()=>{
                                     roomCreation(data.username,mentorLog.username);
                                     select_user(index);
                                   }}> <Box sx={{  bgcolor: 'white',
                               borderColor: 'text.primary',
                               m: 1,
                               border:'none',
                               width: '2rem',
                               height: '2rem', borderRadius: '50%',
                               overflowY:'hidden',
                               cursor:'pointer',
                       }} >
                                   
            {data.profile? <img src={require('../../'+data.profile)} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
            </Box>
                               <span>{data.username}</span>
                               </div>
                               </div>
                      )
                    }):''
  
                  }
                {
                  verifeiduser?v_users && v_users.map((data,index)=>{
                    console.log('mentor list users',mentorLog.username)
                    return(
                      <div key={index} style={{display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                      <div style={{display:"flex",alignItems:'center',width:"100%",
                                backgroundColor:divIndex === index | selectIndex === index ?'#bfbebb':'',}}
                                onMouseEnter={()=>borderHandle(index)}
                                onMouseLeave={()=>borderHandle(null)}
                                   onClick={()=>{
                                     roomCreation(data.username,mentorLog.username);
                                     select_user(index);
                                   }}> <Box sx={{  bgcolor: 'white',
                       borderColor: 'text.primary',
                       m: 1,
                       border:'none',
                       width: '2rem',
                       height: '2rem', borderRadius: '50%',
                       overflowY:'hidden',
                       cursor:'pointer'
                        }} 
                        onClick={()=>{
                          roomCreation(data.username,mentorLog.username);
                          select_user(index);
                        }}>
                           
    {data.user_image.length===1&&data.user_image? <img src={require('../../'+data.user_image[0].dp.replace('/media/',''))} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
    </Box>
                       <span>{data.username}</span>
                       </div>
                       </div>
                    )
                  }):''
                }

                {mentorstate?
                connection && connection.map((data,index)=>{
                  let imageProf=data.profile
                  console.log('data90',data)
                  return(
                    
                    <div key={index} style={{display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                    <div style={{display:"flex",alignItems:'center',width:"100%",
                                backgroundColor:divIndex === index | selectIndex === index ?'#bfbebb':'',}}
                                onMouseEnter={()=>borderHandle(index)}
                                onMouseLeave={()=>borderHandle(null)}
                                   onClick={()=>{
                                     roomCreation(data.username,mentorLog.username);
                                     select_user(index);
                                   }}> <Box sx={{  bgcolor: 'white',
                     borderColor: 'text.primary',
                     m: 1,
                     border:'none',
                     width: '2rem',
                     height: '2rem', borderRadius: '50%',
                     overflowY:'hidden',
                     cursor:'pointer'
                      }}
                      onClick={()=>{
                        roomCreation(data.username,mentorLog.username);
                        select_user(index);
                      }} >
                         
  {imageProf? <img src={require('../../'+imageProf)} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
  </Box>
                     <span>{data.username}</span>
                     </div>
                     </div>

                  )

                }):''}
                </div>
                <div style={{width:"70%",border:'1px solid'}}>
                {messages && messages.map((data,index)=>{
                  console.log(data.message)
                  return(<div key={index} style={{display:data.sender===mentorLog.username?'flex':'block',
                   justifyContent:data.sender===mentorLog.username?'right':'left',marginBottom:'20px',marginTop:'10px'
                  }}>
                    <div style={{width:'30%',minHeight:'50px',
                    
                    display:'flex',
                    justifyContent:'left',
                    padding:"5px 20px 5px 20px",
                    alignItems:'center',
                    marginTop:'10px',
                    marginLeft:'10px',
                    marginRight:'10px',
                    borderRadius:'50px',
                    backgroundColor:data.sender===mentorLog.username?'#bfbebb':'#0e5ac4'}}>
                      <span style={{color:'white',
                      wordWrap:'break-word'
                      }}>{data.message} </span>
                      </div>
                 </div>)
                })}
                <div ref={messagesEndRef} />
                </div>
                
                </div>
                <div style={{width:"100%",display:"flex"}}>
                <div style={{width:'30%'}}></div>
                <div style={{display:"flex",width:'70%',overflow:'hidden'}}>
                { selectUser&& <><input placeholder='Message...' className='message' type='text' onChange={makeChange} value={msg} name='msg'style={{width:'100%'}}/>
                  {msg&&<button style={{overflow:'hidden',border:'none'}} onClick={sendMessage}>Send</button>}</>
                  }
                </div>

                </div>
                
                
                  
                </Paper>
              </Grid>}
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

{/* popover */}
    <Popover
        id={id}
        open={openpop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        
      >
        {/* <Typography sx={{ p: 2 }}></Typography> */}
        <div style={{
          // border:'1px solid',
          width:"15em",
          display:'flex',
          justifyContent:"center"}}>
        <Box sx={{ ...commonStyles, borderRadius: '50%',cursor:"pointer"
            , }} 
            
             >
                            {profile?<img src={require('../../profileImages/'+profile)} width='100%' height='100%'/>: <Avatar sx={{width:'100%',height:'100%'}}/>}  
                                </Box>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <span>
            {mentorLog.username}
          </span>
        </div>
        <Divider sx={{ my: 1 }} />
        <div  style={{display:'flex',justifyContent:'center'}}>
            <ModalEdit boolval={bool} identity='mentor' modalvalue={modalvalues.profile}/>
        </div>
      </Popover>
      {/* //////////////////////////////////////// */}
    </div>
  );
}

export default function Dashboard(props) {
  return <DashboardContent value={props.val} />;
}