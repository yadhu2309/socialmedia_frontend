import { Box, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../Components/MediaNavbar/NavBar'
import { motion } from "framer-motion";
import { Stack } from '@mui/system';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';


const boxDefault={
    height:'80%',
    maxWidth:'100%'
}
const boxDefault1={
    height:'160%',
    maxWidth:'100%'
}


function CreatePost() {
    const[image,setImage] = React.useState();
    const[imageFile,setImageFile] = React.useState();
   let{user} = useContext(AuthContext)
    const[moreImage,setMoreImage] = React.useState({one:'',two:'',three:''})
    const[moreImageFile,setMoreImageFile] = React.useState({one:'',two:''})
    const[next,setNext] = React.useState(false);
    const[selectOne,setSelectOne] = React.useState(false);
    const[selectTwo,setSelectTwo] = React.useState(false);
    const navigate = useNavigate();
const[check,setCheck] = React.useState()

const[error,setError] = useState()

    const[val,setValue] = useState({title:'',describe:''})
    const handleImage=(e)=>{
        // setImage(e.target.files)
        // console.log(e.target.files[0]);
        // setImageName(e.target.files[0].name)
        setImageFile(e.target.files[0])
        // console.log(URL.createObjectURL(e.target.files[0]));
        setImage(URL.createObjectURL(e.target.files[0]))

    }
    const makeChange =(event)=>{
        const {name,value} = event.target;
        if(event.target.value===''){
            // console.log('pls enter')
            setError('Please type something')
        }else{
            setError('')
        }
        
    setValue(prevState =>({...prevState,[name]:value}))
    }
    const handleMoreImage =(e)=>{
      if(!moreImage.one){
        
        const item = {
            ...moreImage,
           one:URL.createObjectURL(e.target.files[0])
           
        }
        const items = {
            ...moreImageFile,
           one:e.target.files[0]
           
        }
        setMoreImageFile(items)
        setMoreImage(item)
        // console.log("one",item.one)
        return moreImage;
    }
    if(!moreImage.two){
        const item={
            ...moreImage,
            two:URL.createObjectURL(e.target.files[0])
        }
        const items = {
            ...moreImageFile,
           two:e.target.files[0]
           
        }
        setMoreImageFile(items)
        setMoreImage(item)
        // console.log("two",item.two)
        return moreImage;
    }  
   
  
       
    }
    const handleSelect = (word)=>{
      word==="one" &&
       setSelectOne(true)
       setSelectTwo(false)
    //   :setSelectTwo(true)
    word==="two" &&
    setSelectOne(false)
    setSelectTwo(true)

    word ==='diff' && setSelectOne(false)
    setSelectTwo(false)

    word ==='diffTwo' && setSelectTwo(false)

    }
    useEffect(()=>{
        axios.get(`https://prosmedia.online/api/userCheck/${user.id}`).then((response)=>{
            // 
            // console.log('kio',response.data)
            setCheck(response.data.verified)
            
            
        })
    },[])
    

    const handleCreate =(e) =>{
        // console.log('iamready')
        // console.log('iamuser',user.id)
        // console.log(imageName);
        // console.log("moreOne",moreImageFile.two)
        const uploadImage = new FormData()
        uploadImage.append('image_one',imageFile)
        uploadImage.append('image_two',moreImageFile.one)
        uploadImage.append('image_three',moreImageFile.two)
        uploadImage.append('title',val.title)
        uploadImage.append('describe',val.describe)
        uploadImage.append('uid',user.id)

        
        axios.post('https://prosmedia.online/api/proposal',uploadImage).then((response)=>{
            // console.log("received",response.data);
            setImageFile('')
            setMoreImageFile({one:'',two:''})
            setValue({title:'',describe:''})
            setMoreImage({one:'',two:''})
            setImage('')
            navigate('/user')
            
        })
    }

    const handleClick = ()=>{
        // console.log(image)
        setNext(true)
    }
    // {console.log('m',check)}
 const handlePost=(e)=>{
    e.preventDefault()
    if(val.title===''){
        // console.log('plsnter')
        setError('Please type something')

    }else{
        setError('')
    const uploadImage = new FormData()
    uploadImage.append('image',imageFile)
    uploadImage.append('title',val.title)
    uploadImage.append('uid',user.id)
    axios.post('https://prosmedia.online/api/postcreate',uploadImage).then((response)=>{
        setValue({title:'',describe:''})
        setImageFile('')
        navigate('/user/profile')
        
    })
}
    
 }

  return (
    <div className='homepage'>
        {image && next?<>
        {/* last page in create post */}

        <Grid sx={{marginTop:'1em',marginLeft:'2em'}} container spacing={2}>
            <Grid item xs={5}>
                <div style={{border:'1px solid white'}}>
                    <img src={image} width='70%' />
                
                </div>
            </Grid>
            <Grid item xs={7}>
                <Grid item xs={10}>
                <Stack spacing={2}>
                     <TextField type='text' variant='filled' placeholder='Type Something' style={{backgroundColor:'#3d3d3d',color:'white'}} name='title'  onChange={makeChange}
                  value={val.title}/>
                  {error&&<span style={{color:'red'}}>{error}</span>}
                  {!check ? <><textarea rows={7} cols={3} name='describe' onChange={makeChange}
                  value={val.describe}/>
                    <div style={{display:'flex',justifyContent:'end'}}>
                    <button
                    type='submit' style={{
                    backgroundColor:'#6047FB',
                    color:'#ffffff',borderRadius:'3px',
                    width:'10%',
                    border:1,
                    paddingTop:'5px',
                    paddingBottom:'5px',
                    cursor:'pointer'}}
                    onClick={handleCreate}
                    >Post</button>
                    </div></>:
                     <div style={{display:'flex',justifyContent:'end'}}>
                    <button style={{
                    backgroundColor:'#6047FB',
                    color:'#ffffff',borderRadius:'3px',
                    width:'10%',
                    border:1,
                    paddingTop:'5px',
                    paddingBottom:'5px',
                    cursor:'pointer'}}
                    onClick={handlePost}
                    >Post</button>
                    </div>}
                </Stack>

                </Grid>
                <Grid item xs={4}>

                </Grid>
              
                    
                
            </Grid>

        </Grid>
        </>:image?
            <>
            {/* add multiple images */}

            {/* <p style={{color:'white'}}>{image}</p> */}
            <Grid sx={{marginTop:'1em',marginLeft:'1em'}} container spacing={2}>
                <Grid item xs={2}>
                    {/* image one two three */}
                    <Stack spacing={1}>
                        {moreImage?<>
                        {/* {selectOne?<img src={image} onClick={()=>handleSelect('diff')}/>: */}
                         <img src={moreImage.one}
                        //   onClick={()=>handleSelect("one")}
                           width='100%'/>
                         {/* }
                        {selectTwo?<img src={image} onClick={()=>handleSelect('diffTwo')}/>: */}
                        <img src={moreImage.two}
                        //  onClick={()=>{handleSelect("two");console.log(selectTwo);}}
                          width='100%'/>
                        {/* } */}
                        {selectOne | selectTwo?<img src={image}
                        //  onClick={()=>handleSelect('diff')}
                         />:''}
                        </>:''}
                    </Stack>
                    
                    {!check &&   <div style={{display:'flex',justifyContent:'right',border:'1px solid white'}}>
                    <input type='file' name='select from device' accept="image/*" onChange={handleMoreImage} id='custom-addfile-input' hidden/>
                <label style={{color:'white'}} htmlFor='custom-addfile-input'>add</label>
                <p style={{color:'white'}}>{selectTwo}</p>
                    </div>}
                

                </Grid>
                <Grid item xs={8}>
                <div style={{border:'1px solid white'}}>
                    {/* main image */}
                <img src={selectOne?moreImage.one:selectTwo?moreImage.two:image} width='50%' />
                
                </div>
                </Grid>
                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'left'}}>
                    <button style={{backgroundColor:'#6047FB',
                    color:'#ffffff',borderRadius:'3px',
                    width:'50%',
                    border:1,
                    paddingTop:'5px',
                    paddingBottom:'5px',
                    cursor:'pointer'}} onClick={handleClick}>Next</button>
                    </div>
                
                
                </Grid>
            
            </Grid>
            </> :
        <Box  m={1}
  display="flex"
  justifyContent="center"
  alignItems="center"
  sx={boxDefault}>
            
             <div style={{height:'30%',overflowY:'hidden'}}>
            <h3 style={{color:'#FFFFFF',marginBottom:'1em',fontFamily: 'Tahoma, Verdana, sans-serif'}}>Photos, Videos and Documents</h3>
            <input type='file' accept="image/*"  onChange={handleImage} id='custom-file-input' hidden/>
            <motion.label className='lab'whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
            // onMouseOver={handleMouseOverNoti}
            // onMouseOut={handleMouseOutNoti}
             htmlFor='custom-file-input'
            
             >
                select from device
             </motion.label>
            </div>
        </Box>
        }
        <NavBar />
    </div>
  )
}

export default CreatePost