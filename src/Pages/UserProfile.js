import {Grid, Modal} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/MediaNavbar/NavBar'
import { AuthContext } from '../utils/AuthContext'
import Box from '@mui/material/Box';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Fade from '@mui/material/Fade';
import UsersPost from '../Components/UsersPost/UserPost'

import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

 import './homepage.css'
import { useNavigate } from 'react-router-dom'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   
    bgcolor: '#ffffff',
    // border: '2px solid white',
    boxShadow: 24,
    padding: 1,
    
    display:'flex',
    borderRadius:'10px',
    backgroundColor:'#252525',
    // justifyContent:'center',
    // alignItems:'center'
  
   
  };


function UserProfile() {
    let{user,usersId,setUsersId} = React.useContext(AuthContext)
    const[detail,setDetail]=useState()
    const[nav,setNav] = useState(false);
    const[profile,setProfile] = useState([]);

    const[bool,setBool] = useState(false)
    const[loop,setLoop] = useState()
    const[loopBool,setLoopBool] = useState(false)
    const[postdetails,setPostDetails] = useState()
    const[postOtherDetails,setOtherDetails] = useState()

    const[following,setFollowing] = useState()
    const[followers,setFollowers] = useState()
    const [modalContent,setModalContent] = useState()
    const[identify,setIdentify] = useState(false)
  

    const[verify, setVerify] = useState()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);setLike(false);setLikeCount()};

    const[like,setLike] = useState()
    const[likeCount,setLikeCount] = useState()
    const navigate=useNavigate()

     // goto account

     const usersDetailhandle=(id)=>{
      setUsersId(id)
      localStorage.setItem('usersId',JSON.stringify(id))
      navigate('/user/details')
      handleClose()
      }


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
     

const handlePostDetails = (id)=>{
  setModalContent('post')
  setPostDetails(loop[id].image.replace('/media/posts/',''))
  setOtherDetails(loop[id])

}

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

    const check_like=(id)=>{
      axios.get(`https://www.smedia.fun/api/like_show/${id}/${user.id}`).then((response)=>{
          
          
       console.log('userlike',response.data)
           if(response.status === 200){
             setLike(true)
            //  setLikeCount(response.data)
           }
         })
         axios.get(`https://www.smedia.fun/api/countLike/${id}`).then((response)=>{
          console.log('count',response.data)
          setLikeCount(response.data.length)
         }).catch((error)=>{
           console.log('there might be error')
         })
   
        
     
    }



    useEffect(()=>{
        usersId && axios.get(`https://www.smedia.fun/api/userDetailview/${usersId}`).then((response)=>{
        setDetail(response.data)
        if(response.data.user_image[0]){
        setProfile(response.data.user_image[0].dp)}
        else{
          setProfile(null)
        }
        setBool(true)
    })

 usersId &&   axios.get(`https://www.smedia.fun/api/postget/${usersId}`).then((response)=>{
      // 
      console.log('kio',response.data)
      setLoop(response.data)
      setLoopBool(true)
      
      
  })
  axios.get(`https://www.smedia.fun/api/userCheck/${user.id}`).then((response)=>{
            // 
            console.log('kio',response.data)
            setVerify(response.data.verified)
            
            
        })
         // following list
         axios.get(`https://www.smedia.fun/api/followgets/${usersId}`).then((response)=>{
          setFollowing(response.data)
          // console.log('following',response.data)
        })

        // followers list
        axios.get(`https://www.smedia.fun/api/followers/${usersId}`).then((response)=>{
          setFollowers(response.data)
          // console.log('followers',response.data)
        })
        //like in modal post

      
     
    },[usersId])
  return (
    <div className='homepage'>
        {/* {detail && console.log('detailoneone',profile)}
        {loop && console.log('setloop',loop)} */}
         <Grid item xs={12} sx={{display:'flex',justifyContent:'center',marginTop:'2em',marginBottom:'1em',}}>
                    <Grid key='G1' item  sx={{marginRight:'5em'}}>
                    <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'none',
                        width: '10rem',
                        height: '10rem', borderRadius: '50%',
                        overflowY:'hidden',
                         }} >
                            
                * {console.log('helo',profile)}
     {bool && profile ? <img src={profile} width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>}
        </Box>
          </Grid>
                    <Grid  key='G2' sx={{}}>
                        <div key='d01' style={{display:'flex',justifyContent:'space-between',paddingLeft:'3em',paddingRight:'5em'}}>
                        <h3 style={{color:'#D9D9D9'}}>
                          {/* {console.log('details',detail)} */}
                            { detail && detail.username}{detail && detail.verified ? <VerifiedIcon sx={{marginLeft:'3px'}}/>:''}
                            </h3>
                       
                        </div>
                        
                        <div key='d02' style={{display:'flex',justifyContent:'center',marginLeft:'2em'}}>
                            <span key='p1' style={{color:'#ffffff',marginRight:'3em',cursor:'pointer',textTransform:'lowercase'}}>
                              POSTS
                              <span style={{marginLeft:'2px',cursor:'pointer'}}>({loop?loop.length:0})</span></span>
                            <span key='p2'
                             style={{color:'#ffffff',marginRight:'3em',
                             cursor:'pointer',textTransform:'lowercase',
                             cursor:'pointer'}}
                             onClick={()=>{setModalContent('followers');handleOpen();setIdentify(true)}}>
                              FOLLOWERS
                              <span style={{marginLeft:'2px'}}>({followers?followers.length:0})</span>
                              </span>
                            <span key='p3'
                             style={{color:'#ffffff',marginRight:'3em',
                             cursor:'pointer',textTransform:'lowercase',
                             cursor:'pointer'}}
                             onClick={()=>{setModalContent('followers');handleOpen();setIdentify(false)}}>
                              
                              FOLLOWING
                              <span style={{marginLeft:'2px'}}>({following ?following.length:0})</span>
                              </span>
                        </div>
                                                    
                    </Grid>
                 </Grid>
         <hr style={{width:'97%',margin:'auto',color:'white',border:'2px solid'}} />
            <Grid xs={12} item sx={{borderTopColor:'#ffffff',marginTop:'1em'}}>
                <div key='d11' style={{display:'flex',justifyContent:'center'}}>
                    <div key='d11.1' style={{display:'flex',marginTop:'1em'}}>
                        <p key='p01' id='post' className='navlabel' 
                        onClick={()=>handleNav('post')} 
                        style={{color:'#ffffff',marginRight:'3em',cursor:'pointer',
                        fontWeight:'bold'}}>
                         <InsertPhotoIcon/> POSTS
                          </p>
                        {/* <p key='p02' id='saved' className='navlabel' onClick={()=>handleNav('saved')} style={{color:'#ffffff',cursor:'pointer',fontWeight:'bold'}}>SAVED</p> */}
                    </div>
                </div>
                
                {/* <Stack  direction={{ xs: 'column', sm: 'row' }}  spacing={1}> */}
                {/* {loop && console.log('loopdatadetails',loop)} */}
                {postOtherDetails && console.log('loopotherdetails',postOtherDetails)}
                {loopBool?
                <Grid container spacing={2} direction="row"  justify="center" style={{margin:'auto',width:'97%',paddingLeft:'5em',paddingTop:'1em',paddingBottom:'5em'}} alignItems="center" >
                {loop.map((data,index)=>{
                      // img = data.image.replace('/media/posts/','')
                   
                    // console.log("o",l)
                    return(
                        <div  key={index} onClick={()=>{handleOpen();
                        handlePostDetails(index);
                        check_like(data.id);
                        }}>
                           
                         
                         <UsersPost  post='posts'  key={index}
                          imgpath={data.image}
                           />
                         
                        
                         </div>)
                    
                })} 
                
                
                </Grid>:''}
                
          
            
            </Grid>


 {/* <Button onClick={()=>{handleOpen();}}>oi</Button> */}
 <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
     
              >
        <Fade in={open}>
       <Box sx={{...style,height:modalContent==='post'?500:300,
    minWidth:modalContent==='post'?700:300}} >
           
         {modalContent==='post'? <> <Box style={{
           
            width:'60%',
            paddingTop:'4em'}}>
           {/* <Carousel imgvalone={postdetails}/> */}
           {postdetails && console.log('imagpost',postdetails)}
          {
              postdetails && 
              <LazyLoadImage
            
                width='100%'
                height={300}
              
              src={postdetails}
              alt="First slide"
        />}
</Box>
 <Box id="transition-modal-description" sx={{
  borderLeft:'1px solid  #65676b',
  width:'50%'}}>
    <div style={{
      // border:'1px solid white',
    height:'90%',
    paddingLeft:'5px',
    paddingTop:'5px',
    color:' #65676b'}}>
      <div style={{borderBottom:'1px solid #65676b',
      width:'100%',
      display:'flex',}}>
      <Box sx={{  bgcolor: 'white',
                        borderColor: 'text.primary',
                        m: 1,
                        border:'none',
                        width: '2rem',
                        height: '2rem', borderRadius: '50%',
                        overflowY:'hidden',
                        cursor:'pointer'
                         }} >
                            
                        {/* {console.log('helo',props.mem)} */}
     {bool && profile? <img src={profile} width='100%' height='100%'/>:
     <Avatar sx={{width:'100%',height:'100%'}}/>}
        </Box>
        <span style={{color:'#ffff',marginTop:'.5em',cursor:'pointer'}}>
          {postOtherDetails && postOtherDetails.username}
          </span>
      </div>

 {/* pppppppppppppp */}
 {postOtherDetails && postOtherDetails.title }{postOtherDetails && console.log('postotherdetails',postOtherDetails)}
    </div>
 {/* <ThumbUpAltIcon/> */}
 <div style={{
  width:'97%',
  margin:'auto',
  borderTop:'1px solid  #65676b',
 height:'10%',display:'flex',
 alignItems:'center',
 justifyContent:'space-between',
 paddingLeft:'5px',paddingRight:'5px'}}>
  {console.log('like',like)}
  <div>
    {
  like ?
  <ThumbUpAltIcon
  //  onClick={dislike}
    sx={{color:'#AF34BA',cursor:'pointer'}}
    onClick={()=>dislike(postOtherDetails.id)}/>
    :
      <ThumbUpOffAltIcon sx={
        {color:'#65676b',cursor:'pointer'}}
        onClick={()=>Like(postOtherDetails.id,user.id)}/>
 }
 {likeCount&&likeCount>=2 && <span style={{color:'#65676b'}} >{likeCount}</span>}
    </div>
 <BookmarkBorderIcon sx={{color:' #65676b',cursor:'pointer'}}/>

 </div>
            </Box>
</>:
//followers modal
<div className='scroll' style={{width:300}}>
      <div style={{display:'flex',justifyContent:'space-between',
      alignItems:'center',width:300,
      borderBottom:'1px solid white',
      zIndex:1,
      backgroundColor:'#323333',
      fontWeight:'bold',
      color:"white",
      top:0,
      padding:'5px',
      position:"fixed"}}><span></span>{identify?<span>Followers</span>:<span>Following</span>}
      
          <div>
              <CloseIcon sx={{cursor:'pointer'}} onClick={handleClose}/>
          </div>
        </div>

<div  style={{
  // border:'1px solid white',
width:'100%',marginTop:"1.7em"}}>
        {
      identify? followers && followers.map((data)=>{
        let imageProf = data.dp
        console.log('imageProf',data)
        return(<>
          <div style={{display:'flex'}}
          onClick={()=>usersDetailhandle(data.acc_uid)}>
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
                </>  )

        })
        :
        following && following.map((data)=>{
          let imageProf = data.dp
        console.log('imageProf',imageProf)
        return(<>
          <div style={{display:'flex'}}
          onClick={()=>usersDetailhandle(data.f_uid)}>
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
      </>  )

        })
}
  </div>
</div>
}
          </Box>
          
        </Fade>
      </Modal>

      
        <NavBar />
        
    </div>
  )
}

export default UserProfile