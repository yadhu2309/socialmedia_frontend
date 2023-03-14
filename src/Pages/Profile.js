// import { Stack } from '@mui/system'
import { Button, Grid, Modal, requirePropFactory } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import NavBar from '../Components/MediaNavbar/NavBar'
import { AuthContext } from '../utils/AuthContext'
import PostCard from '../Components/PostCard/PostCard'
import { Stack } from '@mui/system'
import Box from '@mui/material/Box';

import Pop from '../Components/Pop/Pop'
import ModalEdit from '../Components/Modal/Modal'

//backdrop
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModalProfile from '../Components/Modal/ModalProfile'
import { useNavigate } from 'react-router-dom'

import './pages.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: '#c8ccc9',
    // border: '2px solid white',
    boxShadow: 24,
    padding: 1,
    // height:500,
    minWidth:700,
    display:'flex',
    borderRadius:'10px',
    backgroundColor:'#323333',
    // backgroundColor:'#494646',
    // justifyContent:'center',
    // alignItems:'center'
  
  };

  const commonStyles ={
    // border:'1px solid white'
    width:'97%',
    margin:'auto',
  }

function Profile(props) {


  const navigate=useNavigate()

    const[a,setA]=useState([]);
    let[profile,setProfile] = useState([]);
    const[nav,setNav] = useState(false);
    const[colour,setColour] = useState({post:'',saved:''})
    
    const[bool,setBool]=useState(false)
    const[modalbool,setModalBool] = useState(false)

   const[postDetails,setPostDetails] = useState()
   const[postDetailsImage,setPostDetailsImage] = useState({one:'',two:'',three:''})
   const[post_details,setPost_Details] = useState()

   const[verify,setVerify] = useState()
   const[verifyimage,setVerifyImage]=useState()

   const[verified,setVerified] = useState(false)

   const[loop,setLoop] = useState([])
  // const [open, setOpen] = React.useState(false);
  
  //saved post
  const[savedPost,setSavedPost] = useState()

    // modal function
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);


  // follower following modal content
  const[modalContent,setModalContent] = useState()
  const[identify,setIdentify] = useState()

  const[following,setFollowing] = useState()
  const[followers,setFollowers] = useState()

  //for normal user
  const[foruser,setForuser]=useState('')
  const[foruserSave,setForuserSave]=useState()

  //image loading
  const [isLoading, setIsLoading] = useState(true);

  //like
  const[like,setLike] = useState(false)
  const[likeCount,setLikeCount] = useState()

  //saved post
  const[save,setSave] = useState()
   
  let{user,usersId,setUsersId,openModal,setOpenModal} = React.useContext(AuthContext)


  
// like
const Like = (id,uid)=>{
  console.log('hello',id,'user',uid)
 
  axios.post(`https://www.smedia.fun/api/like/${id}/${user.id}`,{
  pid:id,
  user_who_like:uid,
  }).then((response)=>{
    console.log('like response',response.data)
    setLike(true);
    setLikeCount(likeCount+1)
  })

};
const dislike = (id,uid)=>{
  axios.delete(`https://www.smedia.fun/api/dislike/${id}/${user.id}`).then((response)=>{
    // console.log('suuceess dislike');
    setLike(false)
    setLikeCount(likeCount-1)

  })
}


//user detail view/profile of other user
  const usersDetailhandle=(id)=>{
    setUsersId(id)
    localStorage.setItem('usersId',JSON.stringify(id))
    navigate('/user/details')
    handleClose()
    }

    const handlePostDetails = (id)=>{

      // for selecting post in user profile
     setModalContent('post')
    

    //    setPostDetailsImage({one:'',two:'',three:''})
    verify &&!nav&& setVerifyImage(loop[id].image.replace('/media/posts/',''))
    verify &&!nav && console.log('post detail when verify',loop[id])
     verify &&!nav&& setPost_Details(loop[id])

     //saved post
    verify && nav && setPost_Details(savedPost[id])
     verify && nav && console.log('verify nav',savedPost[id])
    verify&&   nav && setVerifyImage(savedPost[id].image.replace('posts/',''))
setForuserSave(savedPost[id])
      // console.log("postdetails",a[id]); setPostDetails(a[id])
   
   
            
            
            verify && setVerified(loop[id].verified)
            
        //    console.log('onclickimage',a[id].image_one)
        if(a[id].image_one){
           const item = {
            one:a[id].image_one.replace('/media/images/',''),
            
           
        }
        setPostDetailsImage(item)
    }
    if(a[id].image_one && a[id].image_two){ const item = {
        one:a[id].image_one.replace('/media/images/',''),
        two:a[id].image_two.replace('/media/images/',''),
        
       
    }
    setPostDetailsImage(item)
}
        if(a[id].image_one && a[id].image_two && a[id].image_three){
            const item = {
                
                one:a[id].image_one.replace('/media/images/',''),
                two:a[id].image_two.replace('/media/images/',''),
                three:a[id].image_three.replace('/media/images/','')
               
            }
            setPostDetailsImage(item)
        }
     

    }


//check liked or not


const check_like=(id)=>{
  // console.log('pls work')
  //  console.log('checklike,id',id)
  axios.get(`https://www.smedia.fun/api/like_show/${id}/${user.id}`).then((response)=>{
      
      
  //  console.log('userlike',response.data)
       if(response.status === 200){
         setLike(true)
        //  setLikeCount(response.data)
       }
     }).catch((error)=>{
      console.log('console.log check_like ',error)
     })
     axios.get(`https://www.smedia.fun/api/countLike/${id}`).then((response)=>{
      console.log('count',response.data)
      setLikeCount(response.data.length)
     }).catch((error)=>{
       console.log('there might be error')
     })

    
 
}

// saved or not
const check_saved=(id)=>{

  axios.get(`https://www.smedia.fun/api/saved/${id}/${user.id}`).then((response)=>{
      
      
  //  console.log('userlike',response.data)
       if(response.status === 200){
         setSave(true)
        //  setLikeCount(response.data)
       }
     }).catch((error)=>{
      console.log('console.log check_like ',error)
     })

}



    useEffect(()=>{
      axios.get(`https://www.smedia.fun/api/userCheck/${user.id}`).then((response)=>{
            // 
            // console.log('kio',response.data)
            setVerify(response.data.verified)
            
            
        })

      axios.get(`https://www.smedia.fun/api/profileImage/${user.id}`).then((response)=>{
        // 
        // console.log(response.data)
       
        setProfile(response.data.dp.replace('/media/profileImages/',''))
        // console.log("ri",profile);
        setBool(true)
        // dp=response.data.dp.replace('/media/profileImages/','')
        
    })

     !verify &&  axios.get(`http://127.0.0.1:8000/api/proposals/${user.id}`).then((response)=>{
                 setA(response.data)
                //   console.log("response",response.data)
        })

        

       // post list
          axios.get(`https://www.smedia.fun/api/postget/${user.id}`).then((response)=>{
            // 
            // console.log('kio',response.data)
            setLoop(response.data)
            
            
        })

        //saved post

        axios.get(`https://www.smedia.fun/api/saved/${user.id}`).then((response)=>{
          setSavedPost(response.data)
        })

        // following list
        axios.get(`https://www.smedia.fun/api/followget/${user.id}`).then((response)=>{
          setFollowing(response.data)
          // console.log('following',response.data)
        })

        // followers list
        axios.get(`https://www.smedia.fun/api/followers/${user.id}`).then((response)=>{
          setFollowers(response.data)
          // console.log('followers',response.data)
        })

       

        // if (!nav){
        //     const item={
            
        //         post:'1px solid white',
        //         saved:'none'
    
    
        //     };
        //     setColour(item)}
        // console.log("oki",profile)
       
        // profile.map((data)=>{console.log("io",data)})

    },[nav])
   
    const handleNav = (word)=>{
       
       
        word === 'post' && 
        setNav(false)
        

        word ==='saved' &&
         setNav(true)
        //  setColour({post:'none',saved:'1px solid white'})
        // if (!nav){
        //     const item={
            
        //         post:'1px solid white',
        //         saved:'none'
    
    
        //     };
        //     setColour(item)}else{
        //         const item={
        //             post:'none',
        //             saved:'1px solid white'

        //         }
        //         setColour(item)
        //     }
       
       
    }
    {followers && console.log('followcount',followers.length)}
  return (
    <div className='homepage'>
              <div style={{border:'1px solid white',
            // position:'fixed'
            }}>

                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                // marginBottom:'1em',
                margin:'auto',
                width:'97%',
                paddingTop:'1em',
                paddingBottom:'5em',
                backgroundColor:'#323333',
                borderBottomLeftRadius:'5px',
                borderBottomRightRadius:'5px',
                
                // border:'1px solid white'
                }}
                >
                    <Grid key='G1' item  sx={{marginRight:'5em'}}>
                    <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'none',
                        width: '10rem',
                        height: '10rem', borderRadius: '50%',
                        overflowY:'hidden',
                         }} >
                            
                        {/* {console.log('helo',props.mem)} */}
                        <img style={{display:'none'}} src={profile} onLoad={() => setIsLoading(false)} width='100%' height='100%'/>
       {bool?isLoading ?
      <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open
       
       >
       <CircularProgress color="inherit" />
     </Backdrop>:
       <img src={profile} onLoad={() => setIsLoading(false)} width='100%' height='100%'/>
     :<Avatar sx={{width:'100%',height:'100%'}}/>
     }
       
       {/* <img src={require('../profileImages/'+profile)} width='100%' height='100%'/> */}
        </Box>
                {/* {console.log('prosnn',profile)} */}
          </Grid>
                    <Grid  key='G2' sx={{}}>
                        <div key='d01' style={{display:'flex',justifyContent:'space-between',paddingLeft:'3em',paddingRight:'5em',overflowY:'hidden'}}>
                        <h3 style={{color:'#D9D9D9'}}>{user.username}</h3>
                        {/* <Button >Edit Profile</Button>                          */}
                         <Pop veri={verify} val={bool}/> 
                        {/* <ModalEdit/> */}
                        </div>
                        
                        <div key='d02' style={{display:'flex',justifyContent:'center',marginLeft:'2em'}}>
                            <span key='p1' style={{color:'#ffffff',
                            marginRight:'3em',cursor:'pointer',
                            textTransform:'lowercase'}}>
                              <span style={{marginLeft:'2px',fontWeight:'bold'}}>{loop?loop.length:0}</span>
                              &nbsp;POSTS</span>
                            <span key='p2' style={{color:'#ffffff',
                            marginRight:'3em',cursor:'pointer',
                            textTransform:'lowercase',
                            cursor:'pointer'}}
                            onClick={()=>{setModalContent('followers');handleOpen();setIdentify(true)}}>
                              <span style={{marginLeft:'2px',fontWeight:'bold'}}>
                                {followers?followers.length>=0?followers.length:0:
                                //loader
                                <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open
                               
                              >
                                <CircularProgress color="inherit" />
                              </Backdrop>}</span>&nbsp;FOLLOWERS
                                </span>
                            <span style={{color:'#ffffff',
                            marginRight:'3em',
                            cursor:'pointer',
                            textTransform:'lowercase',
                            cursor:'pointer'}}
                            onClick={()=>{setModalContent('following');handleOpen();setIdentify(false)}}
                            >
                              <span style={{marginLeft:'2px',fontWeight:'bold'}}> 
                              {following ?following.length>=0?following.length:0:
                              //loader
                              <Backdrop
                              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                              open
                             
                            >
                              <CircularProgress color="inherit" />
                            </Backdrop>}</span>&nbsp;FOLLOWING</span>
                        </div>
                                                    
                    </Grid>
                 </Grid>
         <hr style={{width:'97%',margin:'auto',backgroundColor:'white',border:'1px solid white',borderRadius:'5px'}} />
         </div>
         <div>
            <Grid xs={12} item sx={{borderTopColor:'#ffffff',
            marginTop:'.1em',
            // backgroundColor:'#323333',
            }}> 
              
                <div key='d11' style={{display:'flex',justifyContent:'center'}}>
                    <div key='d11.1' style={{display:'flex',marginTop:'1em'}}>
                        <p key='p01' id='post' className='navlabel' onClick={()=>handleNav('post')} 
                        style={{color:'#ffffff',marginRight:'3em',cursor:'pointer',
                        fontWeight:'bold'}}>
                          <InsertPhotoIcon/>
                          POSTS
                          </p>
                        <p id='saved'
                         className='navlabel'
                          onClick={()=>handleNav('saved')} 
                          style={{color:'#ffffff',
                          cursor:'pointer',fontWeight:'bold'}}>
                          <BookmarkBorderIcon/>
                          SAVED
                          </p>
                    </div>
                </div>
                
                {/* <Stack  direction={{ xs: 'column', sm: 'row' }}  spacing={1}> */}
                {!nav?
                verify?
                <Grid container spacing={2} direction="row"  justify="center" style={{margin:'auto',width:'97%',paddingLeft:'5em',paddingTop:'1em',paddingBottom:'5em'}} alignItems="center" >
                {loop?loop.map((data,index)=>{
                      // img = data.image.replace('/media/posts/','')
                      // console.log("o",data)
                    // console.log("o",l)
                    return(
                        <div key={index} onClick={()=>{

                          handleOpen();
                          check_like(data.id);
                          check_saved(data.id);
                          handlePostDetails(index);
                       
                        }}>
                           
                         
                         <PostCard  veri={verify}  key={index} imgpath={data.image} />
                         
                        
                         </div>)
                    
                }):
                //loader
                <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
             
            >
              <CircularProgress color="inherit" />
            </Backdrop>} 
                
                
                </Grid>
                :
                <Grid container spacing={2} direction="row"  justify="center" style={{margin:'auto',width:'97%',paddingLeft:'5em',paddingTop:'1em',paddingBottom:'5em'}} alignItems="center" >
                {a?a.map((data,index)=>{
                    let  l = data.image_one
                   
                    
                    return(
                        <div key={index}   onClick={()=>{handleOpen();handlePostDetails(index)}}>
                           
                         
                         <PostCard   key={index} imgpath={data.image_one} />
                         
                        
                         </div>)
                    
                })
              :
               //loader
               <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
               open
              
             >
               <CircularProgress color="inherit" />
             </Backdrop>} 
                
                
                </Grid>:
                //Saved posts
                <Grid container spacing={2} direction="row"  justify="center" style={{margin:'auto',width:'97%',paddingLeft:'5em',paddingTop:'1em',paddingBottom:'5em'}} alignItems="center" >
                {savedPost?savedPost.map((data,index)=>{
                      // img = data.image.replace('/media/posts/','')
                      //  console.log("saved post by user",data)
                    // console.log("o",l)
                    return(
                        <div key={index} onClick={()=>{

                          handleOpen();
                          check_like(data.pid);
                          check_saved(data.pid);
                          handlePostDetails(index);
                          !verify && setForuser('foruser');
                       
                        }}>
                           
                         
                         <PostCard 
                         posttype='saved'
                          veri={verify} 
                          foruser={verify?'':'foruser'}
                           key={index} 
                           imgpath={data.image} 
                          //  username={data.username}
                           />
                         
                        
                         </div>)
                    
                }):
               //loader
               <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
               open
              
             >
               <CircularProgress color="inherit" />
             </Backdrop>} 
                
                
                </Grid>
                
                }
                
               
         
           {/* {console.log("image_one",postDetailsImage)} */}
            
            </Grid>
            </div>


 
  <ModalProfile
  modalContent={modalContent}
  verify={verify}
  verifyimage={verifyimage}
  postDetailsImage={postDetailsImage}
  nav={nav}
  post_details={post_details}
  bool={bool}
  verified={verified}
  dislike={(id,uid)=>dislike(id,uid)}
  Like={(id,uid)=>Like(id,uid)}
  like={like}
  setLike={setLike}
  save={save}
  setSave={setSave}
  likeCount={likeCount}
  identify={identify}
  followers={followers}
  following={following}
  foruser={foruser}
  foruserSave={foruserSave}
  usersDetailhandle={usersDetailhandle}
  check_save={(id)=>check_saved(id)}
  profile={profile}
  />
      
        <NavBar />
        
    </div>
  )
}

export default Profile