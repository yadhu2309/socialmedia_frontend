import { requirePropFactory } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from "react-lazy-load-image-component";

function UncontrolledExample(props) {
  
  return (
    <Carousel>
      
      {props.imgvalone && 
      props.veri ?
      
      <Carousel.Item>
        <LazyLoadImage
          // className="d-block w-100"
          width='100%'
           height={300}
           
          src={props.imgvalone}
          alt={props.veri?'':"First slide"}
        />
        
      </Carousel.Item>:
      <Carousel.Item>
        <LazyLoadImage
          // className="d-block w-100"
          width='100%'
           height={300}
          src={props.imgvalone}
          alt="First slide"
        />
        
      </Carousel.Item>
      }
      {props.imgvaltwo && 
      <Carousel.Item>
        {/* {console.log('carousel10',props.imgval)} */}
        <LazyLoadImage
       
          width='100%'
           height={300}
          src={props.imgvaltwo}
          alt="Second slide"
        />

       
      </Carousel.Item>
      }
      {props.imgvalthree &&
      <Carousel.Item>
       <LazyLoadImage
          // className="d-block w-100"
          width='100%'
          height={300}
          src={props.imgvalthree}
          alt="Third slide"
        />

      </Carousel.Item>
      }
    </Carousel>
  );
}

export default UncontrolledExample;