

import React, { useContext, useEffect,useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'bootstrap/dist/css/bootstrap.min.css'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import useMediaQuery from '@mui/material/useMediaQuery';

import Avatar from '@mui/material/Avatar';

import { AuthContext } from '../../utils/AuthContext'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '4rem',
    height: '4rem',
  };

export default function Slider(props) {
  let{user} = useContext(AuthContext)
    const arr=[]
    const matches = useMediaQuery('(max-width:950px)');
  return (
    <div style={{display:matches?'block':'none'}} className='container py-4 px-4 justify-content-center'>
         {props.follow && props.follow.map((data)=>{
                        arr.push(data.f_uid)})
         }
          <div style={{display:'flex',justifyContent:'left',marginBottom:'10px'}}>
                     <span className='slide_div' style={{color:'#908989',fontWeight:'bold',marginLeft:'2px'}}>Suggestions</span>
                      </div>
        <Swiper style={{zIndex:0}}
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className='mySwiper'
        breakpoints={{
  0:{
    slidesPerView:1,
    spaceBetween:10
  },
  480:{
    slidesPerView:2,
    spaceBetween:10
  }
        }}
        >
            {props.userLoop && props.userLoop.map((data,index)=>{
                if(user.username !== data.username ){
                return(

                    <SwiperSlide key={index}>
                <Card sx={{ minWidth: 200, }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}

       <div style={{display:'flex',justifyContent:'center'}}>

        <Box sx={{ ...commonStyles, borderRadius: '50%',cursor:'pointer' }} >
                                {data.user_image[0]? 
                                <img 
                                src={
                                  require('../../profileImages/'+data.user_image[0].dp.replace('/media/profileImages/',''))
                                 }
                                 width='100%' height='100%'/>:<Avatar sx={{width:'100%',height:'100%'}}/> }
                                </Box>
                                </div>
       
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.username}
        </Typography>
        <Typography variant="body2">
        {/* <Button size="small">Learn More</Button>
          <br /> */}
           {arr.includes(data.id)?
                                 <span style={{color:'#EB07FF',cursor:'pointer'}} onClick={()=>props.handleUnfollow(data.id)}>following</span>
                                 :
                                  <span style={{color:'#EB07FF',cursor:'pointer'}} onClick={()=>props.handleFollow(data.id)}>follow</span>
                                  }
          <CardActions>
       
      </CardActions>
        </Typography>
      </CardContent>
      
    </Card>
            </SwiperSlide>


                )}
            })}
            
            

        </Swiper>
    </div>
  )
}
