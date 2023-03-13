import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
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
  // console.log('post',props.imgpath)
  let l,post;
  l =  props.imgpath.replace('/media/posts/','')
//    props.imgpath.replace('/media/images/','')
  //  console.log('postname',l)


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
   
     sx={{ maxWidth: 345,marginRight:'10px',marginBottom:'10px',cursor:'pointer' }}>
      {/* {props.veri?
      <LazyLoadImage src={require('../../posts/'+l)}
      width={350} height={300}
      alt="Image Alt"
    />
      : */}
      <LazyLoadImage src={l}
        width={350} height={300}
        alt="Image Alt"
      />
      
      {/* {props.post==='posts' && <LazyLoadImage src={require('.././posts/'+l)}
       width={350} height={300}
       alt="Image Alt"
     />
       } */}
      
    </Card>
  );
}