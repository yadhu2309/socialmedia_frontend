import React, { useContext, useEffect,useState } from 'react'
import NavBar from '../Components/MediaNavbar/NavBar'
import Card from '../Components/Cards/Card';
import Cards from '@mui/material/Card';
import {Stack } from '@mui/system'
import { Grid } from '@mui/material'
import axios from 'axios'
import Box from '@mui/material/Box';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from '../utils/AuthContext'
import {useNavigate } from 'react-router-dom'
import Slider from '../Components/Slider/Slider'
import Carousel from 'react-bootstrap/Carousel';

//backdrop
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//media query
import useMediaQuery from '@mui/material/useMediaQuery';

import './pages.css'
import './homepage.css'
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

import { Button, CardActionArea, CardActions } from '@mui/material';


import VerifiedIcon from '@mui/icons-material/Verified';
import Avatar from '@mui/material/Avatar';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';


function Homepage() {
  const[userList,setUserList]=useState()
  const[profile,setProfile]=useState()
  const[googleprofile,setGoogleProfile]=useState()
  const[userDetails,setUserDetails]=useState()
  const[check,setCheck]= useState(false)
  const[postLoop,setPostLoop] = useState()

  const[expand,setExpand] = useState(false)

  
  
  //newapi
  // const[news,setNews] = useState()
  const[indexHandle,setIndexHandle] = useState()
  
  let{user,usersId,setUsersId} = useContext(AuthContext)
  const[follow,setFollow]  = useState([])
  const navigate = useNavigate()

  const[hover,setHover] = useState('hidden')

  //popover in suggestions

  const[followers,setFollowers] =React.useState()
  const[following,setFollowing] = React.useState()

  // for showing posts of users whether the user follow
  const[followingPost,setFollowingPost]= React.useState()
  let followArray=[];

  const[post,setPost] = React.useState()
  const[profilePicture,setProfilePicture] = React.useState()
  const[profiledata,setProfiledata] =React.useState()
  const [anchorEl, setAnchorEl] = React.useState(null);

  //media query
  const matches = useMediaQuery('(max-width:950px)');


  



  const handlePopoverOpen = (event,id) => {
    setAnchorEl(event.currentTarget);
    axios.get(`https://www.smedia.fun/api/followers/${id}`).then((response)=>{
      setFollowers(response.data)
    })
    axios.get(`https://www.smedia.fun/api/followget/${id}`).then((response)=>{
      setFollowing(response.data)
    })
  axios.get(`https://www.smedia.fun/api/postget/${id}`).then((response)=>{
      // 
      
      setPost(response.data)
      // setLoopBool(true)
      
      
  })
  axios.get(`https://www.smedia.fun/api/profileImage/${id}`).then((response)=>{
    setProfilePicture(response.data)
  })
  
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setProfilePicture('')
    setFollowers('')
    setPost('')
    setFollowers('')
  };

  const open = Boolean(anchorEl);
  ////////////////////////////////////////

  let l;
  let arr=[]
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '2rem',
    height: '2rem',
  };
  const commonStyles1 = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '2rem',
    height: '2rem',
  };
  const commonStyles2 = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '3rem',
    height: '3rem',
  };
 
  useEffect(()=>{
    
    axios.get('https://www.smedia.fun/api/userlist').then((response)=>{
      setUserList(response.data)
    })
   
    axios.get(`https://www.smedia.fun/api/profileImage/${user.id}`).then((response)=>{
      if(response.data.dp){
        setProfile(response.data.dp.replace('/media/profileImages/',''))
      }
      if(response.data.googleprofile){
        // console.log('response.data.googleprofile',response.data.googleprofile)
          setGoogleProfile(response.data.googleprofile)
      }
     
      // console.log('userdetails',response.data)
      setUserDetails(response.data)
    })
    axios.get('https://www.smedia.fun/api/post').then((response)=>{
          setPostLoop(response.data)
    })
    axios.get(`https://www.smedia.fun/api/follow/${user.id}`).then((response)=>{
            //  console.log('haifollow',response.data);
             setFollow(response.data)
    })
    // check && navigate('/user/profile')

    //following
    axios.get(`https://www.smedia.fun/api/followget/${user.id}`).then((response)=>{
      setFollowingPost(response.data)
      // console.log('following',response.data)
    })

    //news api
    // axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e0d0ea342f484c6c832f49d0b5c8e2d5').then((response)=>{
    //   // console.log('lol',response.data);
    //   setNews(response.data)
    // })
  },[])
  const usersDetailhandle=(id)=>{
  setUsersId(id)
  localStorage.setItem('usersId',JSON.stringify(id))
  navigate('/user/details')
  }

  const handleFollow = (id)=>{
    // console.log('followid',id)
    axios.post(`https://www.smedia.fun/api/follow_check/${user.id}`,{
      acc_uid:user.id,
      f_uid:id
    }).then((response)=>{
            //  console.log('followdone',response.data)
            setFollow(response.data)
    })
  }
  const handleUnfollow = (id)=>{
    axios.delete(`https://www.smedia.fun/api/unfollow/${id}/${user.id}`).then((response)=>{
      // console.log('success')
      setFollow(response.data)
    })
  }

  
  return (
    <div className='homepage'>
     
      {/* {postLoop && console.log('posthome',postLoop)} */}
      
        <Grid sx={{marginTop:'2em',paddingBottom:'4em',
        display:'flex',
        // overflow:'auto',
        }} container spacing={2}>
          
            <Grid xs={3.2}></Grid>
            <Grid sx={{paddingBottom:'1em'}} item xs={matches?8:5.16}>
              
              <Grid xs={5.1} sx={{display:'flex',
              // border:'1px solid #212120',
              borderBottomLeftRadius:'10px',
              borderBottomRightRadius:'10px',
              position:'fixed',
              zIndex:1,
              width:'100%',
              margin:'auto',
               backgroundColor:'#141414',
               top:0,
               }}>
              <div className='sticky' style={{
                width:'60%',
                border:'1px solid #212120',
                display:'flex',
               
                // top:0,
              }}>

                        <Box sx={{ ...commonStyles1, borderRadius: '50%',cursor:"pointer"
            , }} onClick={()=>navigate('/user/profile')}  >
                               {profile?<img src={profile} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
                               {googleprofile && <img src={googleprofile} width='100%' height='100%'/>}
                               {/* {console.log('privte',googleprofile)} */}
                                </Box>
                                <div style={{display:"flex",alignItems:'center'}}>
                                <h4 style={{color:'#FFFFFF',cursor:'pointer',fontFamily:'sans-serif',fontWeight:'bold',}} >{ userDetails ? userDetails.username:user.username}</h4>
                                {/* <h6 style={{color:'#FFFFFF',fontFamily:'sans-serif'}}>{ userDetails && userDetails.first_name}{userDetails && userDetails.last_name}</h6> */}
                                </div>
                               {googleprofile && <img scr={googleprofile.googleprofile} alt={googleprofile.googleprofile}/>}


              </div>
              <div style={{width:'50%',
             
              }}>

              </div>
              </Grid>
             
              
            <Stack  spacing={2} sx={{marginTop:'2em'}}>
              {followingPost && followingPost.map((data)=>{
                followArray.push(data.f_uid)
              })}
              {postLoop? postLoop.map((data,index)=>{
                //  console.log('data',data)
                if(followArray && followArray.includes(data.id)){
                return(
                  data.post_user.map((img,index)=>{
                    return(
                  
                  <div key={index}>
                   
                    <Card action={usersDetailhandle}
                    follow={followArray}
                     postId={img.id} 
                     id={data.id} 
                     uid={img.uid}
                     dp={data.user_image.length===1&&data.user_image[0].dp} 
                     title={img.title}
                      img={img.image}
                       username={data.username}
                      verified={data.verified}
                      />
                     {index===postLoop.length/2?
                     <div style={{marginTop:'10px'}}>
                    <Slider 
                      handleFollow={handleFollow} 
                      handleUnfollow={handleUnfollow}
                       follow={follow} userLoop={userList}/>
                       </div> :''}
                
                  </div>
                    )
                 })   
                )
                }
            
              }):
              //loader
              <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
             
            >
              <CircularProgress color="inherit" />
            </Backdrop>}
              
            </Stack>
           
            </Grid>
           
      
            <Grid className='suggestions' item xs={3.3} sx={{color:'#FFFFFF',
            position:'absolute',left:'70%',
            
            width:'100%',
            padding:0,
            height:50,
            backgroundColor:"#141414",
            borderRadius:"5px",
                }}>

                  <div style={{
                       backgroundColor:"#141414",height:30,
                       width:"100%",
                       display:'flex',
                       justifyContent:'center',
                      
                     }}>
                     <span style={{color:'#908989',fontWeight:'bold',marginLeft:'2px',}}>Suggestions</span>
                     </div>
                </Grid>
                <Grid className='suggestions scroll' item xs={3.3} sx={{color:'#FFFFFF',
            position:'absolute',
            left:'70%',
            // border:'1px solid #212120',
            width:'100%',
            padding:0,
            height:300,
            backgroundColor:"#141414",
            borderRadius:"5px",
            marginTop:'3.2em'
                }}>
                       <div style={{paddingRight:'1em',width:'100%',
                    
                       }}>
                        
                      {/* {console.log('use',userList)} */}
                      {follow && follow.map((data)=>{
                        arr.push(data.f_uid)})
                                            }
                       {/* { arr && console.log('iamarray',arr)} */}
                       {/* {console.log('follow',follow)} */}
                          {userList?
                          
                          userList.map((data,index)=>{
                            if(user.username !== data.username ){

                            //  data.user_image[0] && 
                            // console.log('iqml', data)
                            
                            // l=data.user_image[0].dp.replace('/media/profileImages/','')
                            return(
                              
                            <div>
                              <div key={index}  
                              style={{padding:0,display:'flex'}}> 
                              {/* { data.user_image[0] && console.log('dp',data.user_image[0].dp)} */}
                                <div  onClick={()=>usersDetailhandle(data.id)}>
                              <Box sx={{ ...commonStyles, borderRadius: '50%',cursor:'pointer' }} >
                                {data.user_image[0]? 
                                <img 
                                src={
                                  data.user_image[0].dp
                                 }
                                 width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/> }
                                </Box>
                                </div>
                                <div style={{width:'100%',display:'flex',
                                alignItems:'center',justifyContent:'space-between'}}>
                                  <div onClick={()=>usersDetailhandle(data.id)} style={{marginLeft:5}}>
                                  <Typography
                                  aria-owns={open ? 'mouse-over-popover' : undefined}
                                  aria-haspopup="true"
                                  onMouseEnter={(e)=>{handlePopoverOpen(e,data.id);setProfiledata(data)}}
                                  onMouseLeave={()=>{handlePopoverClose();setProfiledata('')}}
                                  sx={{cursor:'pointer'}}
                                >
                                    {data.username}
                                 
                                </Typography>
                                                          {/* <span style={{cursor:'pointer'}}>
                                
                                  </span> */}
                                  </div>
                                  {/* {console.log(data.id in follow.f_uid)} */}
                                
                                 {arr.includes(data.id)?
                                 <span style={{color:'#EB07FF',cursor:'pointer'}} onClick={()=>handleUnfollow(data.id)}>following</span>
                                 :
                                  <span style={{color:'#EB07FF',cursor:'pointer'}} onClick={()=>handleFollow(data.id)}>follow</span>
                                  }
                            </div> 
                            
                            </div>





                            </div>  
                            )}
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
                       
                  
                </Grid>

            





        </Grid>
        
        <NavBar/>

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
        disableRestoreFocus
      >
        
        <div  style={{width:"100%",
        borderBottom:'1px solid ',
        padding:'10px',display:'flex',overflowY:'hidden'}}>
        <Box sx={{ ...commonStyles2, borderRadius: '50%',cursor:'pointer',margin:0 ,border:'none',overflowY:'hidden'}} >
          {profilePicture ? <LazyLoadImage src={profilePicture.dp}
      width='100%' height='100%'
      alt="Image Alt"
    />: 
    <Avatar sx={{width:'100%',height:'100%'}}/>
}
    </Box>
       
        
<Typography sx={{marginLeft:'10px'}}> {profilePicture ?profilePicture.username:profiledata?profiledata.username:''}
 <span>
  {profilePicture ?profilePicture.verified?
   <VerifiedIcon sx={{marginLeft:'3px',width:'16px',height:'16px'}}/>
   :'':profiledata?
   profiledata.verified &&
   <VerifiedIcon sx={{marginLeft:'3px',width:'16px',height:'16px'}}/>:''}
   </span>
  </Typography>
        </div>
        <div style={{width:'20em',
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
        
        
       
       
      </Popover>
    </div>
  )
}

export default Homepage