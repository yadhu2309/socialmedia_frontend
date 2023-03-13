import React, { useState, useTransition} from 'react'
import { animated } from "react-spring";
import './Drawer.css'

function Drawer() {
    const[show,setShow] = useState();
    const transitions = useTransition(show,null,{
        from: { position: "fixed", opacity: 0, width: 0 },
    enter: { opacity: 1, width: 320 },
    leave: { opacity: 0, width: 0 }
    })
  return (
    <div className='tray'>
        <button onClick={()=>setShow((prevState)=>!prevState)}>Click me</button>
        {transitions?.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{ opacity: props.opacity }}
              className="overlay"
            >
              <animated.div style={{ width: props.width }} className="drawer">
                Hey look it's a side drawer!
              </animated.div>
              <div className="fill" onClick={() => setShow(false)} />
            </animated.div>
          )
      )}
    </div>
  )
}

export default Drawer