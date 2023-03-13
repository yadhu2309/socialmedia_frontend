import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { motion } from "framer-motion";

import { LazyLoadImage } from "react-lazy-load-image-component";

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

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  let l;
 if(props.posttype==='saved'){
  // console.log('saved post postytype',props.imgpath)
     l=props.imgpath    // console.log('savedpost',l);
    
    // console.log('new saved',l)
 }else{
  // console.log('post',props.imgpath)
  
  l =props.veri? props.imgpath:props.imgpath
    // console.log('postname',l,props.veri)

 }
  
 


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
   
     sx={{ maxWidth: 345,marginRight:'10px',marginBottom:'10px',cursor:'pointer'}}>
      {props.veri?
      <LazyLoadImage src={l}
      width={350} height={300}
      alt="Image Alt"
    />
      :
        props.foruser ==='foruser'?
        <LazyLoadImage src={l}
      width={350} height={300}
      alt="Image Alt"
    />
      
      :<LazyLoadImage src={l}
        width={350} height={300}
        alt="Image Alt"
      />
      }
      {/* {props.post==='posts' && <LazyLoadImage src={require('.././posts/'+l)}
       width={350} height={300}
       alt="Image Alt"
     />
       } */}
      
    </Card>
  );
}