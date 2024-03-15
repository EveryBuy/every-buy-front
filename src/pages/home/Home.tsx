import './Home.css';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import LoginWrapper from '../login/LoginWrapper';


function Home() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const toggleLoginModal = ()=>{
    setLoginModalOpen(!isLoginModalOpen);
  };


  return (
    <>
    <header>
      <nav className='right'>
       <IconButton onClick={toggleLoginModal}><PersonIcon/> User</IconButton>
      </nav>
    </header>
    <LoginWrapper isOpen={isLoginModalOpen}/>
    </>
  )
}

export default Home
