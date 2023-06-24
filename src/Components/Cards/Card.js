
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';



//media query
import useMediaQuery from '@mui/material/useMediaQuery';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Pop from '../Pop/Pop'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';

import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { w3cwebsocket as W3CWebSocket } from "websocket"


import { motion } from "framer-motion";



import { LazyLoadImage } from "react-lazy-load-image-component";

import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';



export default function RecipeReviewCard(props) {

  //media query
  const matches = useMediaQuery('(max-width:950px)');


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '3rem',
    height: '3rem',
   
  };
   

//popover
const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
// //////////////////////////////////

// notification
  //room creation using websocket

  const clients = React.useRef()
const[msg,setMsg]=React.useState('')
// const rooms = React.useRef()
const[rooms,setRooms] = React.useState()
   
const[messages,setMessages] = React.useState([])
 const[b,setB]=React.useState()
  const roomCreation=()=>{
       

    axios.post('https://prosmedia.online/api/rooms',{
     room_name:props.username,
     sender:user.username,
     receiver:'a'
    }).then((response)=>{
     if(response.status === 200){
      //  console.log('response 200',response)
       setRooms(response.data)
    //  rooms=response.data
     }
    //  console.log('successfully created',response.data[0].room_name)
      // rooms = response.data[0]
      setRooms(response.data[0])
     
    })}

    //send messages
    const sendMessage=()=>{
      // console.log('iam clie',clients.current)
      clients.current.send(JSON.stringify({
        type:'chat_message',
        text:`${user.username} liked your post`,
        sender:user.username,
        // room_name:rooms.id,
        // rname:props.username,
        receiver:''
      }))
        // setB(true)
        // setMsg('')
    }

    // React.useEffect(()=>{
    //   // console.log('username ',user.username)
       
    //   // clients.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${rooms.room_name}/`)

    //   // setClient(clients)
    // //   rooms&&axios.get(`http://127.0.0.1:8000/api/chatmessages/${rooms.id}`).then((response)=>{
    // //     setMessages(response.data)
    // // })
    // //        console.log(clients.current,"hey",rooms.room_name)
    // //     if(clients.current) {
    
    // //       clients.current.onopen = () => {
    // //   console.log("WebSocket Client Connected");
    // //   }}
    // // console.log('after send',clients.current)
    
    
    //   clients.current.onmessage=(message)=>{
    //    console.log('message whne connect',message)
    //    let m = JSON.parse(message.data)
    //    console.log('m',m)
    //     setMessages(messages=>[...messages,m])
     
    //   }
      
     
    
    
    // },[rooms.room_name])


////////////////////////////////////////
  const [expanded, setExpanded] = React.useState(false);

  const [isHovering, setIsHovering] = React.useState(false);
  const[likeHover,setLikeHover] = React.useState(false)

  const[like,setLike] = React.useState()
  const[likeCount,setLikeCount] = React.useState()
  const[likeCountData,setLikeCountData] =React.useState()


  const[save,setSave]=React.useState()

  const[followers,setFollowers] =React.useState()
  const[following,setFollowing] = React.useState()
  const[post,setPost] = React.useState()

  let{user} = React.useContext(AuthContext)

  const handleLike=()=>{
    setLikeHover(!likeHover)

  }

  const handleMouseEnter = (id) => {
    setIsHovering(true);
    axios.get(`https://prosmedia.online/api/followers/${id}`).then((response)=>{
      setFollowers(response.data)
    })
    axios.get(`https://prosmedia.online/api/followget/${id}`).then((response)=>{
      setFollowing(response.data)
    })
  axios.get(`https://prosmedia.online/api/postget/${id}`).then((response)=>{
      // 
      
      setPost(response.data)
      // setLoopBool(true)
      
      
  })
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // saved post
   const saved =()=>{
    axios.post('https://prosmedia.online/api/saved/',{
      pid:props.postId,
      user_who_own:props.id,
      user_who_save:user.id,
    }).then((response)=>{
      setSave(true)
      // console.log('response.data',response.data)
    })

   }

   const unsave=()=>{
    axios.delete(`https://prosmedia.online/api/saved/${props.postId}/${user.id}`).then((response)=>{
      setSave(false)
    })
   }

  const Like = (id,uid)=>{
    // console.log('hello',id,'user',uid)
//room creation

    //websocket connection
    clients.current = new W3CWebSocket(`wss://www.prosmedia.online/ws/${props.username}`)

    // console.log(clients.current,"hey")
        if(clients.current) {
    
          clients.current.onopen = () => {
      // console.log("WebSocket Client Connected");
      }}
  
     
    axios.post(`https://prosmedia.online/api/like/${props.postId}/${user.id}`,{
    pid:id,
    user_who_like:uid,
    }).then((response)=>{
      // console.log('like response',response.data)
      setLike(true);
      setLikeCount(likeCount+1)
  
      sendMessage()

      clients.current.onmessage=(message)=>{
        // console.log('message whne connect',message)
        let m = JSON.parse(message.data)
        // console.log('m',m)
         setMessages(messages=>[...messages,m])
      
       }
    })
  
    
  //   axios.post('http://127.0.0.1:8000/api/notify',{
  //   sender:user.id,
  //   receiver:props.uid,
  //   notify:'Liked your post',
  //   pid:props.postId,
  // })

  };
  
  const dislike = (id,uid)=>{
    axios.delete(`https://prosmedia.online/api/dislike/${props.postId}/${user.id}`).then((response)=>{
    
      setLike(false)
      setLikeCount(likeCount-1);

    })
  }
  let l = props.dp? props.dp:''
  let postImg=props.img
  // console.log('iamimage',props.img)

  React.useEffect(()=>{

    //room creation
     roomCreation()

    axios.get(`https://prosmedia.online/api/like_show/${props.postId}/${user.id}`).then((response)=>{
      if(response.status == 200){
      
    setLike(true)
  }
    }).catch((error)=>{
      // console.log('there might be error')
    })

    // to check saved or not

    axios.get(`https://prosmedia.online/api/saved/${props.postId}/${user.id}`).then((response)=>{
      // console.log('saveme',response.data);
      if(response.status == 200){
    setSave(true)
  }
    }).catch((error)=>{
      // console.log('there might be error')
    })

    axios.get(`https://prosmedia.online/api/countLike/${props.postId}`).then((response)=>{
      // console.log('count',response.data)
     setLikeCount(response.data.length)
     setLikeCountData(response.data)
    }).catch((error)=>{
      // console.log('there might be error')
    })

  },[])

  return (
    <>
    
    <Card sx={{ maxWidth:matches?1000:750
    ,border:1,
    borderColor:'#050504',
    backgroundColor:'#050504',borderRadius:'10px' }}>
      
      <CardHeader
      sx={{color:'#ffffff',height:'4em', overflowY:'hidden'}}
        avatar={
        
          <Box sx={{ ...commonStyles, borderRadius: '50%',cursor:'pointer',margin:0 }} >
         {l ? <LazyLoadImage src={l}
      width='100%' height='100%'
      alt="Image Alt"
    />:<Avatar sx={{width:'100%',height:'100%'}}/>}
    </Box>
       
        }
        
        title={<Typography className='name'
        onMouseEnter={(e)=>{handleMouseEnter(props.id);handlePopoverOpen(e)}}
          onMouseLeave={()=>{handleMouseLeave();
             handlePopoverClose()
          }}
         onClick={()=>props.action(props.id)} 
         style={{display:'flex',
         justifyContent:'left',cursor:'pointer',
          color: isHovering ? '#a8aaad' : '',
          fontSize:'18px',
          fontFamily:'sans-serif'}}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          >
            
          {props.username} <span>{props.verified? <VerifiedIcon sx={{marginLeft:'3px',width:'16px',height:'16px'}}/>:''}</span>
        </Typography>
        }
        // subheader="September 14, 2016"
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon sx={{color:'#ffffff'}}/> */}
            {/* <Pop save={save} actionOne={unsave} action={saved} value='more'/> */}
          </IconButton>
        }
        
      />
   {/* {postImg && console.log('bucket',postImg)} */}
      <LazyLoadImage src={postImg}
        width='100%' height={400}
        alt="Image Alt"
      />
      <CardContent style={{padding:0,display:'flex',justifyContent:'left'}}>
        <Typography variant="body2" sx={{color:'#ffffff',marginLeft:2,marginTop:1,fontFamily:'sans-serif'}}>
        
          {props.title}
        </Typography>
      </CardContent>
      
      <CardActions >
        <div>
        

        <div style={{
         
        display:'flex',
        height:'2em',overflowY:'hidden'}}>
        <IconButton aria-label="add to favorites">
        
          <motion.div 
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
        
            dragConstraints={{ left: -100, right: 100 }} 
            
              onMouseEnter={handleLike}
              onMouseLeave={handleLike}

            >
             {like? <ThumbUpAltIcon onClick={dislike} sx={{color:'#AF34BA'}}/>: <ThumbUpOffAltIcon onClick={()=>Like(props.postId,user.id)} sx={{color:likeHover?'#AF34BA':'#ffffff'}}/>}
             
            </motion.div>
            
            {likeCount && likeCount >=2? <span style={{color:' #65676b',fontSize:'15px'
        ,fontFamily:'sans-serif'}}>{likeCount}</span>:''}
          
        </IconButton>
       

        </div>
        
        </div>
        
        
       
        <div style={{width:'100%',display:'flex',justifyContent:'right',overflowY:'hidden',
        // border:'1px solid white',
        height:'2em'}}>
        <IconButton aria-label="share">
        
          <motion.div 
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
              
              
            >
              {save?<BookmarkIcon onClick={unsave} sx={{color:'#ffff'}}/>:<BookmarkBorderIcon onClick={saved} sx={{color:'#ffffff',}}/>}
            </motion.div>
          
        </IconButton>
        </div>
        
      </CardActions>
   { likeCount && likeCount>=3?  <div style={{
        // border:"1px solid white",
        
      display:'flex',width:'95%',margin:'auto',marginBottom:"10px"}}>
         <AvatarGroup>
          
         {likeCountData ?likeCountData.map((data,index)=>{
          
            if(index<3){
          return(
            <>
           {data.profile ? <Avatar key={index} alt="Remy Sharp" sx={{width:13,height:13}} src={require('../../'+data.profile)} />:
           <Avatar key={index} alt="Remy Sharp" sx={{width:13,height:13}}  />}  
            </>
          )
        // }
          }
        }):''
      }
          
       
</AvatarGroup>
       
        </div>:''}
       
       
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{color:'#ffffff'}} paragraph>Method:</Typography>
          <Typography sx={{color:'#ffffff'}}  paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>

    <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
         onClose={handlePopoverClose}
        // disableRestoreFocus
        
      >
        <div
          style={{width:"100%",
        borderBottom:'1px solid ',
        padding:'10px',display:'flex',overflowY:'hidden'}}>
        <Box sx={{ ...commonStyles, borderRadius: '50%',cursor:'pointer',margin:0 ,border:'none',overflowY:'hidde'}} >
        {/* {console.log('open',open)} */}
         {l ? <LazyLoadImage src={l}
      width='100%' height='100%'
      alt="Image Alt"
    />:<Avatar sx={{width:'100%',height:'100%'}}/>}
    </Box>
        {/* {console.log('followers',followers)} */}
        
<Typography sx={{marginLeft:'10px'}}> {props.username} <span>{props.verified? <VerifiedIcon sx={{marginLeft:'3px',width:'16px',height:'16px'}}/>:''}</span></Typography>
        </div>
        <div style={{width:'100%',
        borderBottom:'1px solid',
        display:'flex',
        justifyContent:'space-around',
        padding:'10px'}}>
          <div>
            <div style={{display:'flex',justifyContent:'center'}}>
              <span>{post?post.length:0}</span>
            </div>
            <span>posts</span>

            </div>
            <div>
              <div style={{display:'flex',justifyContent:"center"}}>
              <span>{followers ?followers.length:'0'}</span>

              </div>
              <span>followers</span>  
              

              
          </div>
          <div>
            <div style={{display:'flex',justifyContent:'center'}}>
              <span>
                {following? following.length:'0'}
              </span>
            </div>
            <span>following</span>
          </div>
        </div>
        <div>
        {post && post.map((data,index)=>{
          // console.log('image data',data)
         if(index<3){
          return(
            <>
            <LazyLoadImage width={150} height={150}
             src={data.image}
         
        alt="Image Alt"
      />
            </>
          )
        }
        })}
        </div>
       
        {/* <Typography sx={{ p: 1 }}>I use Popover.</Typography> */}
      </Popover>
    
    </>
  );
}