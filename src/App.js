import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Music from './pages/Music';
import Admin from './pages/Admin';
import ForgottenPassword from './pages/ForgottenPassword'
import NoPage from './pages/NoPage';
import Logout from "./pages/Logout";
import UserPage from "./pages/UserPage";
import './App.css';

const App = () => {

  return (
    <div className="App">

    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="login" element={ <Login/> } />
      <Route path="music" element={ <Music/> } />
      <Route path="admin" element={ <Admin/> } />
      <Route path="user" element={ <UserPage /> } />
      <Route path="forgotten-password" element={ <ForgottenPassword /> } />
      <Route path="notfound" element={ <NoPage /> } />
      <Route path="logout" element={ <Logout /> } />
      <Route path="*" element={ <NoPage /> } />
    </Routes>
  </div>
  );
}

export default App;
