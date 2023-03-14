import React, { useContext, useEffect, useRef, useState } from 'react'
import NavBar from '../Components/MediaNavbar/NavBar'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { w3cwebsocket as W3CWebSocket } from "websocket"

import Box from '@mui/material/Box';


import axios from 'axios';
import './pages.css'

//backdrop
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Chat() {

    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '3rem',
        height: '3rem',
      };

      const navigate = useNavigate()
      let{user}  = useContext(AuthContext)
      const[personalstate,setPersonalstate] = useState(true)
      const[groupstate,setGroupstate] = useState(false)
      const[mentorstate,setMentorstate] = useState(false)
      const[mentorlist,setMentorlist] = useState()
      const[profile,setProfile]=useState()
      const[divIndex,setDivIndex]=useState()

      const[rooms,setRooms] = useState('')
   
      const[messages,setMessages] = useState([])
       const[b,setB]=useState()

      const[following,setFollowing] = useState()
      const[followers,setFollowers] = useState()
//  const[client,setClient]=useState()
// let clients;
const clients = useRef()
const[msg,setMsg]=useState('')
//select user
const[selectUser,setSelectUser]=useState()
const[selectIndex,setSelectIndex]=useState()

      const personal=()=>{
        setPersonalstate(true)
        mentorstate && setMentorstate(false)
        groupstate && setGroupstate(false)

      }

      const group=()=>{
        setGroupstate(true)
        mentorstate && setMentorstate(false)
        personalstate && setPersonalstate(false)

      }

      const mentor=()=>{
        setMentorstate(true)
        groupstate && setGroupstate(false)
        personalstate && setPersonalstate(false)
        
        
      }


      const borderHandle=(id)=>{
        setDivIndex(id)

      }

      //selecting user
      const select_user = (index)=>{
        personalstate&&setSelectUser(chatPerson[index])
        mentorstate&&setSelectUser(mentorlist[index])
        setSelectIndex(index)
        messages && setMessages('')

      }

      const roomCreation=(receiver_name,sender_name)=>{
        if(clients.current){clients.current.close()}

         axios.post('https://www.smedia.fun/api/rooms',{
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
       

      }


      

let chat=[];
let chatPerson = []

const sendMessage=()=>{
  console.log('iam clie',clients.current,msg)
  clients.current.send(JSON.stringify({
    type:'chat_message',
    text:msg,
    sender:user.username,
    room_name:rooms.id,
    receiver:''
  }))
    setB(true)
    setMsg('')
}
const makeChange=(e)=>{
setMsg(e.target.value)
}

const messagesEndRef = useRef(null)

const scrollToBottom = () => {
  messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
 rooms && scrollToBottom()
}, [messages]);

useEffect(()=>{
  // console.log('username ',user.username)
   
  clients.current = new W3CWebSocket(`wss://www.smedia.fun/ws/${rooms.room_name}/`)
  // setClient(clients)
  rooms&&axios.get(`https://www.smedia.fun/api/chatmessages/${rooms.id}`).then((response)=>{
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
//  useEffect(()=>{
  


//  },[b])
 


      useEffect(()=>{

       
        
        axios.get(`https://www.smedia.fun/api/profileImage/${user.id}`).then((response)=>{
      if(response.data.dp){
        setProfile(response.data.dp.replace('/media/profileImages/',''))
      }
        })
        // mentor list in chat
        axios.get('https://www.smedia.fun/api/mentor_list').then((response)=>{
            setMentorlist(response.data)
          })

           // following list in chat
        axios.get(`https://www.smedia.fun/api/followgets/${user.id}`).then((response)=>{
          setFollowing(response.data)
          console.log('following',response.data)
        })
        // followers list
        axios.get(`https://www.smedia.fun/api/followers/${user.id}`).then((response)=>{

          console.log('followers',response.data)
          response.data && setFollowers(response.data)
         
        })
        

      },[])

      
  return (
    <div className='homepage'>
       
        <Grid container sx={{paddingTop:'2em'}} spacing={2}>
           
            <Grid
            container
            sx={{width:'95%',margin:'auto',
            border:'1px solid #656566',
            borderRadius:'5px'}}
            >
               <Grid item sx={{border:'1px solid #656566',width:'20%'}}  xs={3}>
               <div style={{width:'100%',height:'100%',display:'flex',
                justifyContent:'space-around',
                alignItems:'center',
                paddingTop:'5px',paddingBottom:'5px',
                // borderBottom:'1px solid #141414',
                
                backgroundColor:'#141414',
                zIndex:1,
                margin:'auto',
              }}>
                    <PersonIcon sx={{color:personalstate?'#AF34BA':'#ffffff',cursor:'pointer'}} onClick={personal}/>
                    {/* <GroupIcon sx={{color:groupstate?'#AF34BA':'#ffffff',cursor:'pointer'}} onClick={group}/> */}
                    <SupervisedUserCircleIcon sx={{color:mentorstate?'#AF34BA':'#ffffff',cursor:'pointer'}} onClick={mentor}/>
                    
                </div>
               </Grid>
               <Grid sx={{border:'1px solid #141414'}} item xs={9}>
               <div style={{width:'100%',height:'100%',
                    // border:'1px solid white',
                    display:'flex',
                    justifyContent:'left',
                    alignItems:'center',
                    backgroundColor:'#141414',paddingLeft:'40px'}}>
                     { selectUser && <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'1px solid #656566',
                        width: '2rem',
                        height: '2rem', borderRadius: '50%',
                        overflowY:'hidden',
                        cursor:'pointer'
                         }} >
                            
     {selectUser.dp? <img src={selectUser.dp} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
        </Box>}
                      <span style={{color:'white',fontWeight:'bold'}}>{selectUser && selectUser.username}</span>
                      {selectUser&&console.log('selected user',selectUser)}
                    
                {/* <input type='text' onChange={makeChange} value={msg}/>
                <button onClick={sendMessage}>send</button> */}
                    </div>
               </Grid>

            </Grid>
            
           <Grid container
            sx={{width:'95%',margin:'auto',
            border:'1px solid #656566',
            borderRadius:'5px',
            marginTop:'1px'
            
            }}>
            <Grid item sx={{height:400,width:'20%',postion:'fixed'}}  xs={3}>
                
                
                {
                    personalstate &&<>
                    <div style={{marginTop:'1%',
                  }}> 
                  {following?following.map((item,index)=>{
                   
                      chat.push(item.username)
                      chatPerson.push(item)
                      // console.log('chat newlist',chat);
                   

                  }):// loader
                  <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
     
    >
      <CircularProgress color="inherit" />
    </Backdrop>
                  }{
                    followers?followers.map((data)=>{
                    if(!chat.includes(data.username)){
                     
                      chatPerson.push(data)
                    
                    }
                  }):
                  // loader
                  <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open
                 
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                  }

                    {following && console.log('chat list',following)}
                        {chatPerson?chatPerson.map((data,index)=>{
                          let imageProf = data.dp
                          return(
                            <>
                            <div  key={index}
                             style={{display:'flex',
                            //  border:"1px solid white",
                             cursor:'pointer',
                             backgroundColor:divIndex === index | selectIndex === index ?'#3d3d3d':'',}}
                             onMouseEnter={()=>borderHandle(index)}
                             onMouseLeave={()=>borderHandle(null)}
                             onClick={()=>{
                              roomCreation(data.username,user.username);
                              select_user(index);
                            }}
                             >
                               <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'none',
                        width: '2rem',
                        height: '2rem', borderRadius: '50%',
                        overflowY:'hidden',
                        cursor:'pointer'
                         }} >
                            
     {imageProf? <img src={imageProf} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
        </Box>
                    <span style={{display:'flex',alignItems:'center',color:'#ebeae8',paddingLeft:'5px',cursor:'pointer'}}>{data.username}</span>
                    
                            </div>
                            
                            </>
                          )
                        })
                      :
                      // loader
                      <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open
                     
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>}
                    </div>
                    </>
                }

                {
                    groupstate && <h1>group</h1>
                }
                
                {
                    mentorstate &&
                    <div style={{marginTop:'5px'}}>
                   { mentorlist? mentorlist.map((data,index)=>{
                        console.log('men',data)
                        let imageProf = data.profile
                        return(
                           <div 
                            key={index}
                            onMouseEnter={()=>borderHandle(index)}
                            onMouseLeave={()=>borderHandle(null)}
                             style={{display:'flex',
                          
                           
                           backgroundColor:divIndex === index?'#3d3d3d':'',
                           
                          
                           cursor:'pointer'}}
                           onClick={()=>{
                            roomCreation(data.username,user.username);
                            select_user(index);
                          }}>
                             <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'none',
                        width: '2rem',
                        height: '2rem', borderRadius: '50%',
                        overflowY:'hidden',
                        cursor:'pointer'
                         }} >
                            
     {imageProf? <img src={imageProf} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
        </Box>
                            <span style={{display:'flex',
                            alignItems:'center',
                            color:'#ebeae8',
                            cursor:'pointer'}}>{data.username}</span>
                           </div>
                           
                        )
                    }):
                    // loader
                    <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                   
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                
                  }
                  </div>
                }
                
                
                
                </Grid>
                <Grid sx={{borderLeft:'2px solid #656566',height:400,postion:'fixed'}} item xs={9}>
                    
               {messages&&console.log('med',messages)}
                {messages && messages.map((data,index)=>{
                  console.log(data.message)
                  return(<div key={index} style={{display:data.sender===user.username?'flex':'block',
                   justifyContent:data.sender===user.username?'right':'left',marginBottom:'20px',marginTop:'10px'
                  }}>
                    <div style={{width:'30%',minHeight:'50px',
                    border:'1px solid #656566',
                    display:'flex',
                    justifyContent:'left',
                    padding:"5px 20px 5px 20px",
                    alignItems:'center',
                    marginTop:'10px',
                    marginLeft:'10px',
                    marginRight:'10px',
                    borderRadius:'50px',
                    backgroundColor:data.sender===user.username?'#3d3d3d':'#141414'}}>
                      <span style={{color:'white',
                      wordWrap:'break-word'
                      }}>{data.message} </span>
                      </div>
                 </div>)
                })}
                      <div ref={messagesEndRef} />

                
                </Grid>
           <Grid item sx={{border:'1px solid #656566',width:'20%'}}  xs={3}></Grid>
           <Grid sx={{border:'1px solid #656566'}} item xs={9}>
               <div style={{width:'100%',height:'100%',
                    
                    display:'flex',
                    }}>
                   
                <input type='text' className='message' placeholder='Message...' style={{width:'100%',
                height:'2em',
                backgroundColor:'#3d3d3d',
                color:'white',
                border:'none',paddingLeft:'10px'}} onChange={makeChange} value={msg}/>
                {msg && <button style={{border:'none',color:"#AF34BA",}} onClick={sendMessage}>send</button>}
                    </div>
               </Grid>
           </Grid>
      </Grid>

        <NavBar/>
    </div>
  )
}

export default Chat