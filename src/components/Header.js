import { Link, NavLink } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';

import { auth, provider } from '../firebase/config';

import LOGO from '../assests/UK LOGO.jpg'


export const Header = ({logIn, setLogIn}) => {

  const activeClass = "text-2xl text-white bg-sky-400 rounded-lg px-2 py-2 mx-2";

  const inactiveClass = "text-2xl rounded-lg px-2 py-2 mx-2";

  const handleLogin = () => {
    
    signInWithPopup(auth, provider).then((result)=>{
      const {email, uid} = result.user;
      setLogIn(true);
      localStorage.setItem("user",JSON.stringify({email,uid}));
    }).catch(err => console.log(err))
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setLogIn(false);
      localStorage.removeItem("user");
    }).catch(err=>console.log(err));
  }

  return (
    <nav>
      <header className="max-w-screen-xl mx-auto rounded-b-lg border border-slate-400">
        <div className='flex justify-between'>
          <Link to='/'>
            <div className='flex items-center'>
              <img src={LOGO} alt="Note Logo" className='h-14 rounded-lg'/>
              <span className='text-3xl font-semibold ml-3'>U-Note</span>
            </div>
          </Link>
          <div className='flex items-center'>
            <NavLink to='/' className={({isActive}) => isActive ? activeClass : inactiveClass } >
              Home
            </NavLink>
            
            { logIn && auth?.currentUser?.uid && auth?.currentUser?.uid===JSON.parse(localStorage.getItem("user")).uid ? (
            <>
              <NavLink to='/create' className={({isActive}) => isActive ? activeClass : inactiveClass } >
              Create
              </NavLink>
              <button onClick={handleLogout} className='text-xl text-white bg-sky-400 rounded-lg px-2 py-2 mr-2'><i className="bi bi-door-closed text-white mr-1"></i>Logout</button>
            </>) : (
            <>
              <button onClick={handleLogin} className='text-xl text-white bg-sky-400 rounded-lg px-2 py-2 mr-2'><i className="bi bi-google text-white mr-1"></i>Login</button>
            </>) }
          </div>
        </div>
      </header>
    </nav>
  )
}
