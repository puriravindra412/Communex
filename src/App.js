
import './App.css';
import Home from './components/Home';
import Explore from './components/Explore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,Routes,Route,Redirect } from 'react-router-dom';
import store from './redux/store';
import { Community } from './components/Community';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes> 
          <Route path="/" Component={Home} />
          <Route exact  path="/explore" element={<Explore />} />
          <Route exact  path="/community" element={<Community />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
