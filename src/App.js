
import './App.css';
import Home from './components/home/Home';
import Explore from './components/explore/Explore';

import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';

import { Community } from './components/community/Community';
import Login from './components/login&signup/Login';
import { Post } from './components/post/Post';
import { CreatePost } from './components/post/CreatePost';
import { useSelector } from "react-redux";
import Profile from './components/profile/Profile'
import { EditProfile } from './components/profile/EditProfile';
import AddNewCommunity from './components/community/AddNewCommunity';
import { GetCommunityPost } from './components/community/GetCommunityPost';
import Chat from './components/chat/Chat';
import ChatMobile from './components/chat/ChatMobile';
import { Search } from './components/search/Search';
import About from './components/About/About';
import ChatBoat from './components/ChatBoat/ChatBoat';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const user = useSelector((state) => state.authReducer.authData);
  return (
   
    
    
      <Router>
        <Routes> 
         
          <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="login" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="../home" /> : <Login />}
        />
        <Route exact path="/createPost" element={user ?<CreatePost />: <Navigate to="../login" />} />
         <Route exact  path="/explore" element={user ?<Explore />:<Navigate to="../login" />} />
          <Route exact  path="/community" element={user ?<Community />: <Navigate to="../login" />} />
          <Route exact  path="/addCommunity" element={user ?<AddNewCommunity />: <Navigate to="../login" />} />
          <Route   path="/post/:id" element={user ?<Post />: <Navigate to="../login" />} />
          <Route   path="/chat" element={user ?<Chat />: <Navigate to="../login" />} />
          <Route   path="/chat-mobile" element={user ?<ChatMobile /> : <Navigate to="../login" />} />
          <Route    path='/search' element={user?<Search />:<Navigate to="../login" />} />
          <Route    path='/about' element={user?<About /> :<Navigate to="../login" />} />
          <Route    path='/CommuVerse' element={user?<ChatBoat /> :<Navigate to="../login" />} />
          <Route    path="/Community/:name" element={user ? <GetCommunityPost />: <Navigate to="../login" />} />
          <Route    path="/profile/:id" element={user ? <Profile/>: <Navigate to="../login" />} />
          <Route    path="/editProfile/:id" element={user ? <EditProfile />: <Navigate to="../login" />} />
          
        </Routes>
      </Router>
    
   
  );
}

export default App;
