import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from "../utils/firebase"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constant';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts.
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      })
  }

  return (
    <div className='absolute w-screen px-8 py-4 bg-linear-to-b from-black z-2 flex justify-between items-center'>
      <img className='w-44' src={LOGO} alt="" />
      {
        user && (<div className='p-2 flex items-center'>
          <img className='w-12 h-12' src={user.photoURL} alt="" />
          <button onClick={handleSignOut} className='font-bold text-white p-2'>(Sign Out)</button>
        </div>)
      }
    </div>
  )
}



export default Header
