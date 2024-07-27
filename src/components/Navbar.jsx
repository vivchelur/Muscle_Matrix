import '../stylesheets/navbar.css'
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { signOut } from 'aws-amplify/auth';

import logoblack from '../assets/MuscleMatrixLogoBlack.png';
import usericon from '../assets/profile-log-in.png';
import dropdownmenu from '../assets/menu-dropdown.png';

import home from '../assets/navbar_icons/home.png';
import dumbell from '../assets/navbar_icons/dumbell.png';
import book from '../assets/navbar_icons/book.png'
import progress from '../assets/navbar_icons/progress.png';


export function NavBar() {
    const [showContents, setShowContents] = useState(false);

    const navigate = useNavigate();

    async function signout() {
      try {
        await signOut();
        navigate('/')
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }

    return(<>

      <Navbar className="primary-color">
        <div className='outside-top'>
            <img
                src={dropdownmenu}
                width="35"
                height="32"
                onClick={() => setShowContents(true)}
            />
          <Navbar.Brand href="/today" className='m-0'>
            <img
                src={logoblack}
                width="40"
                height="40"
            />
          </Navbar.Brand>
          <Dropdown drop='down' align='end'>
            <Dropdown.Toggle as="div" className='arrow'>
              <img
                src={usericon}
                width="40"
                height="40"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className='bg-dark'>
              <Dropdown.Item onClick={signout} className='bg-dark' style={{color: 'white'}}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>

      <Offcanvas show={showContents} onHide={() => setShowContents(false)}>
        <Offcanvas.Header closeButton className='primary-color'>
          <Offcanvas.Title className='primary-color d-flex align-items-center'>
          <img
                src={logoblack}
                width="30"
                height="30"
                className='inside-menu-logo-image'
            />
            <p className='inside-menu-logo-text'>Muscle Matrix</p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='inside-menu-body'>
          <Link to='/today'>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src={home} width="40" height="30"/>
            <p className='inside-menu-option-text'>Today's Workout</p>
          </div>
          </Link>
          <Link to='/workouts'>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src={dumbell} width="40" height="30"/>
            <p className='inside-menu-option-text'>My Workout's</p>
          </div>
          </Link>
          <Link to='/exercises'>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src={book} width="40" height="30"/>
            <p className='inside-menu-option-text'>Exercise Library</p>
          </div>
          </Link>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src={progress} width="40" height="30"/>
            <p className='inside-menu-option-text'>Progress</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    </>);

}