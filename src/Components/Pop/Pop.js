import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ModalEdit from '../Modal/Modal'
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const commonStyles = {
  width:'100%',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:' #0f0f0f',
  color:"#FAFAFA",
  paddingLeft:"3em",
  paddingRight:"3em",
  paddingTop:'.5em',
  paddingBottom:'.5em',
  cursor:'pointer',
}

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const[modalvalues,setModalValues] = React.useState({request:'requesttoverify',editprofile:'editprofile',profile:'profile'})
let{setAuthTokens,setUser}  =React.useContext(AuthContext)
const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const logout =()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokenUser')
    navigate('/')
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
     {props.value ? <MoreVertIcon sx={{color:'#ffffff'}}
     aria-describedby={id}
     onClick={handleClick}
      />:<button aria-describedby={id}
       variant="contained" onClick={handleClick}>
        settings
      </button>}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{marginTop:'1em',
      }}
      >
        <Typography  component='div' sx={{ }}>
          {props.value?''
          // <div style={{...commonStyles,borderBottom:'1px solid #FAFAFA',color:"#ED4956"}}>Unfollow</div>
          :
           <ModalEdit boolval={props.val} modalvalue={modalvalues.profile}/> 
      }
           </Typography>
        <Typography component='div' sx={{ }}>
          {/* <Button>Edit Profile</Button> */}
          {props.value?
          !props.save?<div onClick={()=>{props.action();handleClosePop()}} style={{...commonStyles,borderBottom:'1px solid'}}>
            Add to saved post</div>:
            <div onClick={()=>{props.actionOne();handleClosePop()}} style={{...commonStyles,borderBottom:'1px solid'}}>Unsave</div>:<ModalEdit modalvalue={modalvalues.editprofile}/>}
          </Typography>
        <Typography component='div' sx={{ }}>
          {/* <Button>Request To Verify</Button> */}
          {props.value?'':
          <ModalEdit mveri={props.veri} modalvalue={modalvalues.request}/>}
          </Typography>
        {/* <Typography component='div' sx={{ }}>The content of the Popover.</Typography> */}
        <Typography component='div' sx={{ }}>
          {props.value?<div style={{...commonStyles}} onClick={handleClosePop}>Cancel</div>:<Button onClick={logout}>Logout</Button>}
          </Typography>
      </Popover>
    </div>
  );
}