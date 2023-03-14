import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import Dashboard from '../../Components/AdminDashboard/Dashboard'
import FormMentors from '../../Components/FormMentor/FormMentor'
import { AuthContext } from '../../utils/AuthContext'

function Mentors() {
  let{mentor,setMentor}=useContext(AuthContext)
  useEffect(()=>{
    axios.get('https://www.smedia.fun/api/mentor_list').then((response)=>{
      setMentor(response.data)
    })

  },[])
  return (
    <div>
      {/* {console.log('iammentor',mentor)} */}
        <Dashboard darray={mentor} val='helo'/>
    </div>
  )
}

export default Mentors