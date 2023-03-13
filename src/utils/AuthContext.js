import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext()

function AuthProvider({children}) {
    let [company,setCompany] = React.useState([])
    let[mentor,setMentor] = useState([])
    let[detail,setDetail] = useState({})
    let[mentorDetails,setMentorDetails] =useState({})
    let[requests,setRequests] =useState({})
    let[requestDetails,setRequestDetails] =useState({})
    let [slotCheck,setSlotCheck] = useState([])
    let[reqBool,setReqBool] = React.useState(false)
    let[boo,setBoo] = React.useState(false)

    //modal
    let[openModal, setOpenModal] = React.useState(false);

  let[usersId,setUsersId] = useState(()=>localStorage.getItem('usersId')?JSON.parse(localStorage.getItem('usersId')):null)
   let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokenUser')? JSON.parse(localStorage.getItem('authTokenUser')):null)
   let [user,setUser] = useState(()=>localStorage.getItem('authTokenUser')?jwt_decode(localStorage.getItem('authTokenUser')):null)

  let[authTokenMentor,setAuthTokenMentor] = useState(()=>localStorage.getItem('authTokenMentor')? JSON.parse(localStorage.getItem('authTokenMentor')):null)
  let[mentorLog,setMentorLog] = useState(()=>localStorage.getItem('authTokenMentor')?jwt_decode(localStorage.getItem('authTokenMentor')):null)

//    let [authTokensAdmin,setAuthTokensAdmin] = useState(()=>localStorage.getItem('authTokenAdmin')? JSON.parse(localStorage.getItem('authTokenAdmin')):null)
//    let [admin,setAdmin] = useState(()=>localStorage.getItem('authTokenAdmin')?jwt_decode(localStorage.getItem('authTokenAdmin')):null)
// let[followers,setFollowers] = useState()
// useEffect(()=>{
//   axios.get(`http://127.0.0.1:8000/api/followers/${user.id}`).then((response)=>{
//     setFollowers(response.data)
//     console.log('followerscontext',response.data)
//   })
// },[])
  return (
    // <div>AuthContext</div>
    <AuthContext.Provider value={{
      authTokens,
      setAuthTokens,user,setUser,
    company,setCompany,
    slotCheck,setSlotCheck,
    mentor,setMentor,
    detail,setDetail,
    mentorDetails,setMentorDetails,
    requests,setRequests,
    requestDetails,setRequestDetails,
    reqBool,setReqBool,boo,setBoo,
    usersId,setUsersId,
    mentorLog,setMentorLog,
    authTokenMentor,setAuthTokenMentor,
    openModal, setOpenModal,
    // followers,setFollowers,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider