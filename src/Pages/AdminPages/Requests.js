import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Dashboard from '../../Components/AdminDashboard/Dashboard'
import { AuthContext } from '../../utils/AuthContext'


function Requests() {
  
let{requests,setRequests,reqBool,setReqBool,boo} = useContext(AuthContext)
  
  return (
    <div>
      {/* {console.log('req',requests)} */}
        <Dashboard val='requests'/>
    </div>
  )
}

export default Requests