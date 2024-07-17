import '../stylesheets/navbar.css'
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

export function NavBar() {
    const [showContents, setShowContents] = useState(false);

    return(<>

      <Navbar className="primary-color">
        <div className='outside-top'>
            <img
                src='src/assets/menu-dropdown.png'
                width="35"
                height="32"
                onClick={() => setShowContents(true)}
            />
            <Navbar.Brand href="/today" className='m-0'>
            <img
                src="src/assets/MuscleMatrixLogoBlack.png"
                width="40"
                height="40"
            />
            </Navbar.Brand>
            <img
                src='src/assets/profile-log-in.png'
                width="40"
                height="40"
            />
        </div>
      </Navbar>

      <Offcanvas show={showContents} onHide={() => setShowContents(false)}>
        <Offcanvas.Header closeButton className='primary-color'>
          <Offcanvas.Title className='primary-color d-flex align-items-center'>
          <img
                src="src/assets/MuscleMatrixLogoBlack.png"
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
            <img src='src/assets/navbar_icons/home.png' width="40" height="30"/>
            <p className='inside-menu-option-text'>Today's Workout</p>
          </div>
          </Link>
          <Link to='/workouts'>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src='src/assets/navbar_icons/dumbell.png' width="40" height="30"/>
            <p className='inside-menu-option-text'>My Workout's</p>
          </div>
          </Link>
          <Link to='/exercises'>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src='src/assets/navbar_icons/book.png' width="40" height="30"/>
            <p className='inside-menu-option-text'>Exercise Library</p>
          </div>
          </Link>
          <div className='inside-menu-option d-flex align-items-center'>
            <img src='src/assets/navbar_icons/progress.png' width="40" height="30"/>
            <p className='inside-menu-option-text'>Progress</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    </>);

}