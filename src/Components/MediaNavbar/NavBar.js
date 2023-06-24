import React, { useContext, useEffect,useState } from 'react'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';

import VerifiedIcon from '@mui/icons-material/Verified';


import './NavBar.css'
import { Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { w3cwebsocket as W3CWebSocket } from "websocket"


import Modal from '@mui/material/Modal';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';


//backdrop
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};






export default function BottomAppBar() {
const navigate = useNavigate()

  const[isHovering,setIsHover] = React.useState('inherit')

  const handleMouseOver = ()=> setIsHover('#AF34BA');
  const handleMouseOut = ()=> setIsHover('inherit');

  const[isProfile,setIsHoverProfile] = React.useState('inherit')

  const handleMouseOverProfile = ()=> setIsHoverProfile('#AF34BA');
  const handleMouseOutProfile = ()=> setIsHoverProfile('inherit');

  const[isSearch,setIsHoverSearch] = React.useState('inherit')

  const handleMouseOverSearch = ()=> setIsHoverSearch('#AF34BA');
  const handleMouseOutSearch = ()=> setIsHoverSearch('inherit');

  const[isNoti,setIsHoverNoti] = React.useState('inherit')

  const handleMouseOverNoti = ()=> setIsHoverNoti('#AF34BA');
  const handleMouseOutNoti = ()=> setIsHoverNoti('inherit');

  const[isAdd,setIsHoverAdd] = React.useState('inherit')

  const handleMouseOverAdd = ()=> setIsHoverAdd('#AF34BA');
  const handleMouseOutAdd = ()=> setIsHoverAdd('inherit');

  const[isChat,setIsHoverChat] = React.useState('inherit')

  const handleMouseOverChat = ()=> setIsHoverChat('#AF34BA');
  const handleMouseOutChat = ()=> setIsHoverChat('inherit');
  

  //notification 
  const[notify,setNotify] = React.useState()
  const[notification,setNotification] = React.useState()
  
  let{user,usersId,setUsersId} = useContext(AuthContext)

  //for selecting search and notification
  const[control,setControl] = React.useState()
  
  // const data = React.useMemo( () => {
  // return {
  //     key: 'value'
  // }}, number);
  
  //modal component
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setControl('')
  };

  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '2rem',
    height: '2rem',
  };


  //for search listing all users
  const[allusers,setAllUsers] = React.useState()

  //search
  const[filterdata,setFilterData]=React.useState()
  const [query, setQuery] = React.useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
    let val = event.target.value
    setFilterData(allusers.filter(data=>data.username.includes(val)))
   
    
  };


  // notification
  //room creation using websocket

  const clients = React.useRef()
const[msg,setMsg]=useState('')
const[rooms,setRooms] = useState('')
   
const[messages,setMessages] = useState([])
 const[b,setB]=useState()
  const roomCreation=()=>{
       

    axios.post('https://prosmedia.online/api/rooms',{
     room_name:user.username,
     sender:'a',
     receiver:user.username
    }).then((response)=>{
     if(response.status === 200){
      //  console.log('response 200',response)
       setRooms(response.data)
     }
    //  console.log('successfully created',response.data[0].room_name)
      setRooms(response.data[0])
     
    })}

    //send messages
    // const sendMessage=()=>{
    //   console.log('iam clie',clients.current,msg)
    //   clients.current.send(JSON.stringify({
    //     type:'chat_message',
    //     text:msg,
    //     sender:user.username,
    //     room_name:rooms.id,
    //     receiver:''
    //   }))
    //     setB(true)
    //     setMsg('')
    // }

    useEffect(()=>{
      // console.log('username ',user.username)
       
      clients.current = new W3CWebSocket(`wss://www.smedia.fun/ws/${rooms.room_name}`)

      // setClient(clients)
    //   rooms&&axios.get(`http://127.0.0.1:8000/api/chatmessages/${rooms.id}`).then((response)=>{
    //     setMessages(response.data)
    // })
          //  console.log(clients.current,"hey",rooms.room_name)
        if(clients.current) {
    
          clients.current.onopen = () => {
      // console.log("WebSocket Client Connected");
      }}
    // console.log('after send',clients.current)
    
    
      clients.current.onmessage=(message)=>{
      //  console.log('message whne connect',message)
       let m = JSON.parse(message.data)
      //  console.log('m',m)
        setMessages(messages=>[...messages,m])
     
      }
      
     
   
    
    },[rooms.room_name])



  //choose user
  const usersDetailhandle=(id)=>{
    setUsersId(id)
    localStorage.setItem('usersId',JSON.stringify(id))
    navigate('/user/details')
    handleClose()
    }

  //useeffefct

  // const clients = new W3CWebSocket('ws://127.0.0.1:8000/ws/room/')
  // // console.log(clients,"hey")
  // clients.onopen = () => {
  //     console.log("WebSocket Client Connected");}
  // clients.onmessage=(e)=>{
  //   console.log('websocket notify',JSON.parse(e.data).payloads)
  //   let noti = JSON.parse(e.data)
  //   setNotify(noti.payloads)

  // }
  React.useEffect(()=>{
    axios.get('https://prosmedia.online/api/allusers').then((response)=>{
      setAllUsers(response.data)
    })
    roomCreation()
  },[])

  React.useEffect(()=>{

   

    axios.get(`https://prosmedia.online/api/notify_get/${user.id}`).then((respone)=>{
      setNotification(respone.data)
      // console.log('setnotification',respone.data)
})

  },[notify])

  const handleNotification=()=>{
    axios.get(`https://prosmedia.online/api/notify_get/${user.id}`).then((respone)=>{
            setNotification(respone.data)
            // console.log('setnotification',respone.data)
    })
  }

  return (
    
    <React.Fragment>
      <CssBaseline />
     
      
        
        
      
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0,backgroundColor:'#252525',
      borderTop:2,borderTopColor:'#D9D9D9',
     }}>
        <Toolbar sx={{display:'flex',justifyContent:'center'}}>
        
          <IconButton sx={{marginRight:'1em',color:`${isHovering}`,WebkitUserSelect:'none'}}>
            <motion.div 
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <HomeIcon onClick={()=>navigate('/user')} />
              
            </motion.div>
          </IconButton>

          <IconButton sx={{marginRight:'1em',color:`${isSearch}`}}>
            <motion.div 
            onMouseOver={handleMouseOverSearch}
            onMouseOut={handleMouseOutSearch}
            whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 1.1 }}
              // drag="x"
              dragConstraints={{ left: -100, right: 100 }}
            >
              <SearchIcon onClick={()=>{handleOpen();setControl('search')}}/>
            </motion.div>
          </IconButton>

          <IconButton sx={{marginRight:'1em',color:`${isProfile}`}}>
            <motion.div 
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
            onMouseOver={handleMouseOverProfile}
            onMouseOut={handleMouseOutProfile}
            >
              <AccountCircleIcon onClick={()=>navigate('/user/profile')}/>
            </motion.div>
          </IconButton>

          <IconButton  sx={{marginRight:'1em',color:`${isNoti}`}}>
            <motion.div 
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
            onMouseOver={handleMouseOverNoti}
            onMouseOut={handleMouseOutNoti}
            >
              <Badge badgeContent={messages.length} color="secondary">
                {/* <NotificationsIcon /> */}
            <CircleNotificationsIcon onClick={()=>{handleOpen();handleNotification()}}/>
              </Badge>
            </motion.div>
          </IconButton>

          <IconButton sx={{marginRight:'1em',color:`${isAdd}`}}>
            <motion.div
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            onMouseOver={handleMouseOverAdd}
            onMouseOut={handleMouseOutAdd}
            >
            
            <AddCircleIcon onClick={()=>navigate('/user/create_post')}/>
            </motion.div>
          </IconButton>

          <IconButton sx={{color:`${isChat}`}}>
              <motion.div
              onMouseOver={handleMouseOverChat}
              onMouseOut={handleMouseOutChat}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 1.1 }}
              // drag="x"
              dragConstraints={{ left: -100, right: 100 }}
      
            >
              
            <ForumRoundedIcon onClick={()=>{navigate('/user/chat')}}/>
              </motion.div>
          </IconButton>
          {/* <IconButton color='inherit'>
          <CircleNotificationsIcon/>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
   <div style={{borderBottom:'1px solid',display:"flex",justifyContent:'space-between'}}>
   {control === 'search'?
   <input type="text"
   style={{width:'100%',border:'none'}}
   className='search'
    placeholder='search...'
     value={query} onChange={handleInputChange} />
   :<h3  id="parent-modal-title">Notifications</h3>}
   <CloseIcon onClick={handleClose} sx={{cursor:"pointer"}}/>

    </div> 
    <p id="parent-modal-description">
      {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
      {/* {notify && console.log('noti',notify)} */}
      {notify && notify.show_noti_to === user.username?<p>{notify.current_notification} {notify.count}</p>:''}
    </p>
    {/* { console.log('filterdata',filterdata)} */}
               
    {control==='search'?filterdata&&filterdata.map((data,index)=>{
                  return(
                    <>
                    <div key={index}
                    onClick={()=>usersDetailhandle(data.id)}
                     style={{display:'flex'}}>
                    <Box sx={{ ...commonStyles, borderRadius: '50%',cursor:'pointer' }} >
                                {data.user_image[0]? 
                                <img 
                                src={
                                 data.user_image[0].dp
                                 }
                                 width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/> }
                                </Box>
                      <div style={{display:'flex',alignItems:'center'}}>
                      <span style={{color:'black',cursor:'pointer'}}>
                        {data.username}{data.verified?<VerifiedIcon sx={{marginLeft:'3px',width:'16px',height:'16px'}}/>:''}</span>
                        </div></div></>
                  )
                })

    :messages && messages.map((data,index)=>{
      return(
<div key={index}>{data.message}</div>
      )    
    })}
  </Box>
</Modal>
    </React.Fragment>
  );
}