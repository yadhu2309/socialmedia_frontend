import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import axios from 'axios'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



import { LazyLoadImage } from "react-lazy-load-image-component";
import Fade from '@mui/material/Fade';
import Carousel from'../Carousel/Carousel';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

import { AuthContext } from '../../utils/AuthContext'


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
    // minWidth:{lg:700,xs:300},
    display:'flex',
    borderRadius:'10px',
    backgroundColor:'#323333',
    // backgroundColor:'#494646',
    // justifyContent:'center',
    // alignItems:'center'
  
   
  };

export default function BasicModal(props) {

  //image loading
  const [isLoading, setIsLoading] = React.useState(true);

  const handleClose = () => {setOpenModal(false);
    setIsLoading(true)
    props.like&&props.setLike(false)
props.save&&props.setSave(false)};
let{user,usersId,setUsersId,openModal,setOpenModal} = React.useContext(AuthContext)

const saved =()=>{
    axios.post('https://prosmedia.online/api/saved/',{
      pid:props.post_details.id,
      user_who_own:props.post_details.uid,
      user_who_save:user.id,
    }).then((response)=>{
      props.setSave(true)
    //   console.log('response.data',response.data)
    // props.check_save(response.data.pid)
    })

   }

   const unsave=()=>{
    axios.delete(`https://prosmedia.online/api/saved/${props.post_details.pid}/${user.id}`).then((response)=>{
      props.setSave(false)
      
    })
   }
   


  return (
    <div>
      {/* {console.log('modale post detail',props.post_details)} */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
     
              >
        <Fade in={openModal}>
          <Box sx={{...style,height:props.modalContent==='post'?500:300,
    minWidth:props.modalContent==='post'?{lg:700,md:500,sm:400,xs:300}:300}} >
           
          {props.modalContent === 'post'?<> <Box style={{
            border:"1px solid blue",
           width:props.modalContent==='post'?'60%':300,
           paddingTop:'4em'}}>
{/* {props.verify && console.log('postdetails when verify',props.post_details)} */}
          {/* for identifying the user is verified */}
          {/* <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open
       
       >
       <CircularProgress color="inherit" />
     </Backdrop> */}

          {props.verify?
          
          //  <Carousel veri={verify} imgvalone={verifyimage}/>
          props.verifyimage && 
         <> <img style={{display:'none'}}
          // src={props.verifyimage}
          src={require('../../posts/'+props.verifyimage.replace('/media/posts/',''))}

           onLoad={() => setIsLoading(false)} width='100%' height='100%'/>
         {isLoading? <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open
       
       >
       <CircularProgress color="inherit" />
       {console.log("image",props.verifyimage,props.verifyimage.replace('/media/posts/',''))}
     </Backdrop>:<LazyLoadImage
          // className="d-block w-100"
          width='100%'
           height={300}
           onLoad={() => setIsLoading(false)}
           src={require('../../posts/'+props.verifyimage.replace('/media/posts/',''))}
          // src={props.verifyimage}
          alt="First slide"
        />}</>
           : props.foruser==='foruser'
           ?
           <LazyLoadImage
           // className="d-block w-100"
           width='100%'
            height={300}
            
           src={props.foruserSave.image}
           alt="First slide"
         />:
           <Carousel imgvalone={props.postDetailsImage.one}  imgvaltwo={props.postDetailsImage.two} imgvalthree={props.postDetailsImage.three}/>}
</Box>
 <Box id="transition-modal-description" sx={{
  borderLeft:'1px solid #65676b',
  marginLeft:'3px',
  width:'50%'}}>
 <div style={{height:'90%'}}>
 <div style={{borderBottom:'1px solid #65676b',
    margin:'auto',
    width:"97%",
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
                        {/* {console.log('profile modal',props.profile)} */}
     {props.nav?
     props.verify?
      props.post_details && props.post_details.profile?
              <img
              src={props.post_details.profile} 
              width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>
       :props.foruserSave && props.foruserSave.profile ?<img
       src={props.foruserSave.profile} 
       width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/>
       :
     props.bool?
      <img
       src={props.profile} 
       width='100%' height='100%'/>
      :<Avatar sx={{width:'100%',height:'100%'}}/>
      }
        </Box>
        <span style={{color:'#ffff',marginTop:'.5em',cursor:'pointer'}}>
          {props.nav?
          props.verify?
          props.post_details&&props.post_details.username:props.foruserSave&&props.foruserSave.username
          :user.username
          }<span>
            {/* {console.log('iam verifed',verified)} */}
             {props.verified? <VerifiedIcon sx={{marginLeft:'3px',width:'16px',height:'16px'}}/>:''}
             
                        </span>
          </span>
      </div>
      <span style={{color:'#ffff',marginLeft:'.5em',cursor:'pointer'}}>
      {props.post_details && props.post_details.title}
      {!props.verify && props.foruserSave && props.foruserSave.title && props.foruserSave.title }
      </span>
    
 </div>
 <div style={{height:'10%',
 borderTop:'1px solid #65676b',
 width:'97%',margin:'auto',
 display:'flex',alignItems:'center',justifyContent:'space-between'}}>
  <div>
    {/* <ThumbUpOffAltIcon sx={{color:'#65676b'}}/> */}
    {
  props.like ?
  <ThumbUpAltIcon
  //  onClick={dislike}
    sx={{color:'#AF34BA',cursor:'pointer'}}
    onClick={props.nav?()=>{props.dislike(props.post_details.pid);
      // console.log('nav is true')
    }
      :()=>{props.dislike(props.post_details.id)}
    }
    />
    :
      <ThumbUpOffAltIcon sx={
        {color:'#65676b',cursor:'pointer'}}
         onClick={props.nav?()=>{props.Like(props.post_details.pid,user.id)}:()=>{props.Like(props.post_details.id,user.id)}}
        />
 }
 {/* {likeCount && console.log('like count',likeCount)} */}
 {props.likeCount && props.likeCount>= 2 && <span style={{color:'#65676b'}} >{props.likeCount}</span>}
  </div>
{props.save?<BookmarkIcon onClick={unsave} sx={{color:'#ffff'}}/>:<BookmarkBorderIcon onClick={saved} sx={{color:'#65676b'}}/>}
 </div>
            </Box></>:

              // following and followers list in modal

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
                  position:"fixed"}}><span></span>{props.identify?<span>Followers</span>:<span>Following</span>}
                  
                      <div>
                          <CloseIcon sx={{cursor:'pointer'}} onClick={handleClose}/>
                      </div>
                    </div>
            
      <div  style={{
        // border:'1px solid white',
      width:'100%',marginTop:"1.7em"}}>
              {
            props.identify? 
            props.followers && props.followers.map((data)=>{
              let imageProf = data.dp
              // console.log('imagefollowers',data)
              return(<>
                <div style={{display:'flex'}}
                onClick={()=>props.usersDetailhandle(data.acc_uid)}
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
                          
            {
            imageProf? <img src={imageProf}
             width='100%' height='100%'/>
             :<Avatar sx={{width:'100%',height:'100%'}}/>
             }
            </Box>
                  <span style={{display:'flex',
                  alignItems:'center',
                  color:'#ebeae8',
                  paddingLeft:'5px',
                  cursor:'pointer'}}
                  >{data.username}
                  {
                  data.verified? 
                  <VerifiedIcon sx={{marginLeft:'3px',
                  width:'16px',height:'16px'}}/>
                  :''
                  }
                  </span>
                  </div>
                      </>  )
      
              })
              :
              props.following && props.following.map((data)=>{
                let imageProf = data.dp
            //  console.log('imagefollowing',data)
              return(<>
                <div style={{display:'flex'}}
                 onClick={()=>props.usersDetailhandle(data.f_uid)}
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
                          
            {
            imageProf? <>{
            // console.log('bucket',imageProf)
            }
            <img src={imageProf}
             width='100%' height='100%'/></>
             :<Avatar sx={{width:'100%',height:'100%'}}/>
             }
            </Box>
                  <span style={{display:'flex',
                  alignItems:'center',
                  color:'#ebeae8',paddingLeft:'5px',
                  cursor:'pointer'}}
                  >
                    {data.username}
                    {
                      data.verified? 
                      <VerifiedIcon sx={{marginLeft:'3px',
                      width:'16px',height:'16px'}}/>
                      :''
                    }
                    </span>
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

    </div>
  );
}