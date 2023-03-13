
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import Homepage from './Pages/Homepage';
import Card from './Components/Cards/Card';
import SignupPage from './Pages/SignupPage';
import Profile from './Pages/Profile';
import Drawer from './Components/Drawer/Drawer';
import { PrivateRoute } from './utils/PrivateRoute';
import CreatePost from './Pages/CreatePost';
import AdminHomepage from './Pages/AdminPages/AdminHomepage';
import Mentors from './Pages/AdminPages/Mentors';
import AddMentors from './Pages/AdminPages/AddMentors';
import Requests from './Pages/AdminPages/Requests';
import UserProfile from './Pages/UserProfile';
import Chat from './Pages/Chat';
import MentorHomepage from './Pages/MentorPages/MentorHomepage';
import MentorLogin from './Pages/MentorPages/MentorLogin';
import MentorList from './Pages/MentorPages/MentorList';
import MentorUsers from './Pages/MentorPages/MentorUsers';
import MentorChat from './Pages/MentorPages/MentorChat';



function App() {
  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path='/'
           element={<LoginPage/>}
           exact
           />
           <Route path='user'
           element={
           <PrivateRoute>
            <Homepage/>
            </PrivateRoute>
            }
           />
           <Route path='user/profile'
           element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
            }
           />
            <Route path='user/create_post'
           element={
            <PrivateRoute>
              <CreatePost/>
            </PrivateRoute>
            }
           />
           <Route path='user/details'
           element={<UserProfile/>}
           />
           <Route path='user/chat'
           element={
            <PrivateRoute>
           <Chat/>
           </PrivateRoute>
          }
           />
            <Route path='signup/'
           element={<SignupPage/>}
           />
            <Route path='admin/'
           element={<AdminHomepage/>}
           />
            <Route path='admin/mentors'
           element={<Mentors/>}
           />
            <Route path='admin/addmentors'
           element={<AddMentors/>}
           />
            <Route path='admin/requests'
           element={<Requests/>}
           />

 <Route path='mentor/login'
           element={<MentorLogin/>}
           /> 

<Route path='mentor/'
           element={<MentorHomepage/>}
           />
           
           <Route path='mentor/mentorlist/'
           element={<MentorList/>}
           />
            <Route path='mentor/userslist/'
           element={<MentorUsers/>}
           />
            <Route path='mentor/chat/'
           element={<MentorChat/>}
           />
           {/* <Route path='test'
           element={<Carosal/>}
           /> */}
        </Routes>
      </Router>
     {/* <LoginPage/> */}
     {/*  */}
     {/* <NavBar/> */}
     {/* <Card/> */}
     {/*  */}
    </div>
  );
}

export default App;
